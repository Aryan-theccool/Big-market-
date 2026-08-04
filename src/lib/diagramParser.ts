/**
 * Diagram-as-Code Parser + Dagre Layout Engine
 *
 * Supported DSL syntaxes:
 *
 * 1. Custom DSL (default):
 *    node A "Label" rect|circle|diamond
 *    node B "Another"
 *    edge A -> B "label"
 *    edge B --> C          (dashed)
 *    edge C ->> D          (double arrow)
 *    style A fill:#E3F2FD stroke:#1976D2
 *    group "My Group" A B C
 *
 * 2. Mermaid-compatible flowchart:
 *    flowchart TD
 *      A[Load Balancer] --> B[API Gateway]
 *      B --> C[(PostgreSQL)]
 *      B --> D[/Redis/]
 *      C & D --> E((Done))
 *
 * 3. Sequence-style (simplified):
 *    sequence
 *      Client -> Server: Request
 *      Server --> Client: Response
 */

import dagre from 'dagre';
import type { CanvasElement } from '../store/canvasStore';

const uid = () => 'dg_' + Math.random().toString(36).slice(2, 9);

/* ─── DSL Node types → canvas element types ─────────────────────────── */
type NodeShape = 'rect' | 'circle' | 'diamond' | 'note' | 'cylinder' | 'stadium';

interface ParsedNode {
  id: string;
  label: string;
  shape: NodeShape;
  fill?: string;
  stroke?: string;
  w: number;
  h: number;
}

interface ParsedEdge {
  from: string;
  to: string;
  label?: string;
  dashed?: boolean;
  double?: boolean;
}

interface ParsedGroup {
  label: string;
  members: string[];
}

export interface ParseResult {
  nodes: ParsedNode[];
  edges: ParsedEdge[];
  groups: ParsedGroup[];
  errors: string[];
}

/* ─── Mermaid node shape detection ──────────────────────────────────── */
function parseMermaidNodeDecl(raw: string): { id: string; label: string; shape: NodeShape } {
  // Round edges: (label) or ([label])
  let m = raw.match(/^(\w+)\(\[(.+?)\]\)$/);
  if (m) return { id: m[1], label: m[2], shape: 'stadium' };

  m = raw.match(/^(\w+)\((.+?)\)$/);
  if (m) return { id: m[1], label: m[2], shape: 'circle' };

  // Database cylinder: [(label)]
  m = raw.match(/^(\w+)\[?\[(.+?)\]\]?$/);
  if (m && raw.includes('[(')) return { id: m[1], label: m[2], shape: 'cylinder' };

  // Diamond: {label}
  m = raw.match(/^(\w+)\{(.+?)\}$/);
  if (m) return { id: m[1], label: m[2], shape: 'diamond' };

  // Circle: ((label))
  m = raw.match(/^(\w+)\(\((.+?)\)\)$/);
  if (m) return { id: m[1], label: m[2], shape: 'circle' };

  // Subroutine: [[label]]
  m = raw.match(/^(\w+)\[\[(.+?)\]\]$/);
  if (m) return { id: m[1], label: m[2], shape: 'rect' };

  // Slant: /label/ or \label\
  m = raw.match(/^(\w+)\[?\/(.+?)\/\]?$/);
  if (m) return { id: m[1], label: m[2], shape: 'stadium' };

  // Standard rect: [label]
  m = raw.match(/^(\w+)\[(.+?)\]$/);
  if (m) return { id: m[1], label: m[2], shape: 'rect' };

  // Bare id
  m = raw.match(/^(\w+)$/);
  if (m) return { id: m[1], label: m[1], shape: 'rect' };

  return { id: raw, label: raw, shape: 'rect' };
}

/* ─── Default node dimensions per shape ─────────────────────────────── */
function defaultSize(shape: NodeShape): { w: number; h: number } {
  switch (shape) {
    case 'circle':   return { w: 80,  h: 80  };
    case 'diamond':  return { w: 120, h: 80  };
    case 'stadium':  return { w: 140, h: 50  };
    case 'cylinder': return { w: 120, h: 70  };
    case 'note':     return { w: 160, h: 100 };
    default:         return { w: 160, h: 56  };
  }
}

/* ─── Parse the custom DSL ───────────────────────────────────────────── */
function parseCustomDSL(lines: string[]): ParseResult {
  const nodes = new Map<string, ParsedNode>();
  const edges: ParsedEdge[] = [];
  const groups: ParsedGroup[] = [];
  const errors: string[] = [];
  const styles = new Map<string, { fill?: string; stroke?: string }>();

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line || line.startsWith('//') || line.startsWith('#')) continue;

    // style A fill:#fff stroke:#000
    if (line.startsWith('style ')) {
      const parts = line.slice(6).split(/\s+/);
      const nodeId = parts[0];
      const styleObj: { fill?: string; stroke?: string } = {};
      parts.slice(1).forEach((p) => {
        const [k, v] = p.split(':');
        if (k === 'fill') styleObj.fill = v;
        if (k === 'stroke') styleObj.stroke = v;
      });
      styles.set(nodeId, styleObj);
      continue;
    }

    // group "Label" A B C
    if (line.startsWith('group ')) {
      const m = line.match(/^group\s+"([^"]+)"\s+(.+)$/);
      if (m) {
        groups.push({ label: m[1], members: m[2].trim().split(/\s+/) });
      }
      continue;
    }

    // node A "Label" rect
    if (line.startsWith('node ')) {
      const m = line.match(/^node\s+(\S+)\s+"([^"]+)"(?:\s+(\w+))?$/);
      if (m) {
        const shape = (m[3] as NodeShape) || 'rect';
        const size  = defaultSize(shape);
        nodes.set(m[1], { id: m[1], label: m[2], shape, ...size });
      } else {
        errors.push(`Invalid node: ${line}`);
      }
      continue;
    }

    // edge A -> B "label"  /  A --> B  /  A ->> B
    const edgeMatch = line.match(/^(\S+)\s+(-->?|->?>)\s+(\S+)(?:\s+"([^"]*)")?$/);
    if (edgeMatch) {
      const [, from, arrow, to, label] = edgeMatch;
      const dashed = arrow.includes('--');
      const double = arrow.includes('>>');

      // Auto-register unknown nodes
      if (!nodes.has(from)) nodes.set(from, { id: from, label: from, shape: 'rect', ...defaultSize('rect') });
      if (!nodes.has(to))   nodes.set(to,   { id: to,   label: to,   shape: 'rect', ...defaultSize('rect') });

      edges.push({ from, to, label, dashed, double });
      continue;
    }

    errors.push(`Unrecognised: ${line}`);
  }

  // Apply styles
  styles.forEach((s, id) => {
    const n = nodes.get(id);
    if (n) { n.fill = s.fill; n.stroke = s.stroke; }
  });

  return { nodes: Array.from(nodes.values()), edges, groups, errors };
}

/* ─── Parse Mermaid flowchart ────────────────────────────────────────── */
function parseMermaid(lines: string[]): ParseResult {
  const nodes = new Map<string, ParsedNode>();
  const edges: ParsedEdge[] = [];
  const errors: string[] = [];

  // Skip direction line (TD, LR, etc.)
  const contentLines = lines.slice(1);

  for (const rawLine of contentLines) {
    const line = rawLine.trim();
    if (!line || line.startsWith('%%')) continue;

    // Edge pattern:  A[Label] --> B[Label2] or A & B --> C
    const edgeRx = /^(.+?)\s+(-->?|-.->|===>?|--\|.*?\|-->?)\s+(.+?)(?:\s*:\s*(.+))?$/;
    const m = line.match(edgeRx);

    if (m) {
      const rawFrom = m[1].trim();
      const rawTo   = m[3].trim();
      const label   = m[4]?.trim();
      const dashed  = m[2].includes('-.');

      // Handle multi-source: A & B --> C
      const fromParts = rawFrom.split('&').map((s) => s.trim());
      const toParts   = rawTo.split('&').map((s) => s.trim());

      fromParts.forEach((fp) => {
        toParts.forEach((tp) => {
          const fromParsed = parseMermaidNodeDecl(fp);
          const toParsed   = parseMermaidNodeDecl(tp);

          if (!nodes.has(fromParsed.id)) {
            nodes.set(fromParsed.id, { ...fromParsed, ...defaultSize(fromParsed.shape) });
          }
          if (!nodes.has(toParsed.id)) {
            nodes.set(toParsed.id, { ...toParsed, ...defaultSize(toParsed.shape) });
          }
          edges.push({ from: fromParsed.id, to: toParsed.id, label, dashed });
        });
      });
    } else if (line && !line.match(/^(flowchart|graph|subgraph|end)\b/i)) {
      // Standalone node declaration
      const parsed = parseMermaidNodeDecl(line);
      if (!nodes.has(parsed.id)) {
        nodes.set(parsed.id, { ...parsed, ...defaultSize(parsed.shape) });
      }
    }
  }

  return { nodes: Array.from(nodes.values()), edges, groups: [], errors };
}

/* ─── Parse sequence diagram ─────────────────────────────────────────── */
function parseSequence(lines: string[]): ParseResult {
  const participants = new Map<string, ParsedNode>();
  const edges: ParsedEdge[] = [];
  const errors: string[] = [];
  let seqY = 0;

  for (const rawLine of lines.slice(1)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('//')) continue;

    // participant A as "Label"
    const partM = line.match(/^participant\s+(\w+)(?:\s+as\s+"([^"]+)")?$/i);
    if (partM) {
      participants.set(partM[1], { id: partM[1], label: partM[2] || partM[1], shape: 'rect', ...defaultSize('rect') });
      continue;
    }

    // A -> B: Message  or  A ->> B: Message
    const seqM = line.match(/^(\w+)\s+(--?>?>?)\s+(\w+)(?:\s*:\s*(.+))?$/);
    if (seqM) {
      const [, from, arrow, to, label] = seqM;
      if (!participants.has(from)) participants.set(from, { id: from, label: from, shape: 'rect', ...defaultSize('rect') });
      if (!participants.has(to))   participants.set(to,   { id: to,   label: to,   shape: 'rect', ...defaultSize('rect') });
      edges.push({ from, to, label, dashed: arrow.startsWith('--'), double: arrow.endsWith('>>') });
      seqY++;
    }
  }

  return { nodes: Array.from(participants.values()), edges, groups: [], errors };
}

/* ─── Main entry: detect syntax and parse ───────────────────────────── */
export function parseDiagramCode(code: string): ParseResult {
  const lines = code.split('\n');
  const first = lines[0].trim().toLowerCase();

  if (first.startsWith('flowchart') || first.startsWith('graph')) {
    return parseMermaid(lines);
  }
  if (first === 'sequence' || first.startsWith('sequencediagram')) {
    return parseSequence(lines);
  }
  return parseCustomDSL(lines);
}

/* ─── Dagre layout engine ────────────────────────────────────────────── */
export interface LayoutOptions {
  direction?: 'TB' | 'BT' | 'LR' | 'RL';
  nodeSpacingX?: number;
  nodeSpacingY?: number;
  originX?: number;
  originY?: number;
}

export interface DiagramCanvas {
  elements: Omit<CanvasElement, 'id'>[];
  // node id → canvas element coords (for arrow routing)
  nodeMap: Map<string, { x: number; y: number; w: number; h: number }>;
}

export function layoutDiagram(parsed: ParseResult, opts: LayoutOptions = {}): DiagramCanvas {
  const {
    direction   = 'TB',
    nodeSpacingX = 60,
    nodeSpacingY = 80,
    originX      = 100,
    originY      = 100,
  } = opts;

  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({
    rankdir:  direction,
    nodesep:  nodeSpacingX,
    ranksep:  nodeSpacingY,
    marginx:  20,
    marginy:  20,
  });

  // Add nodes
  for (const n of parsed.nodes) {
    g.setNode(n.id, { width: n.w, height: n.h, label: n.label });
  }

  // Add edges
  for (const e of parsed.edges) {
    if (g.hasNode(e.from) && g.hasNode(e.to)) {
      g.setEdge(e.from, e.to);
    }
  }

  dagre.layout(g);

  const elements: Omit<CanvasElement, 'id'>[] = [];
  const nodeMap = new Map<string, { x: number; y: number; w: number; h: number }>();

  let zBase = Math.round(Date.now() / 1000) % 100000;

  // Emit node canvas elements
  for (const n of parsed.nodes) {
    if (!g.hasNode(n.id)) continue;
    const pos = g.node(n.id);
    const cx  = originX + pos.x - n.w / 2;
    const cy  = originY + pos.y - n.h / 2;

    nodeMap.set(n.id, { x: cx, y: cy, w: n.w, h: n.h });

    if (n.shape === 'note') {
      elements.push({
        type:   'note',
        x: cx, y: cy, w: n.w, h: n.h,
        text:   n.label,
        color:  'yellow',
        z:      zBase++,
      });
    } else {
      // Preserve shape information for proper rendering
      elements.push({
        type:        'rect', // Canvas element type
        x: cx, y: cy, w: n.w, h: n.h,
        text:        n.label,
        fill:        n.fill  || '#E3F2FD',
        stroke:      n.stroke || '#1976D2',
        strokeWidth: 2,
        roughness:   0.4,
        // Store the Mermaid shape type for rendering
        ...(({ shapeType: n.shape } as any)),
        radius:      n.shape === 'diamond' ? 4 : n.shape === 'stadium' ? 28 : n.shape === 'circle' ? 40 : 8,
        fontSize:    13,
        z:           zBase++,
      });
    }
  }

  // Emit label elements for text inside shapes (handled above via text field)
  // Emit group frames
  for (const grp of parsed.groups) {
    const members = grp.members
      .map((id) => nodeMap.get(id))
      .filter(Boolean) as { x: number; y: number; w: number; h: number }[];

    if (members.length === 0) continue;

    const pad = 24;
    const fx  = Math.min(...members.map((m) => m.x)) - pad;
    const fy  = Math.min(...members.map((m) => m.y)) - pad - 20;
    const fr  = Math.max(...members.map((m) => m.x + m.w)) + pad;
    const fb  = Math.max(...members.map((m) => m.y + m.h)) + pad;

    elements.push({
      type:        'frame',
      x: fx, y: fy,
      w: fr - fx, h: fb - fy,
      text:        grp.label,
      fill:        'rgba(0,113,227,0.04)',
      stroke:      '#0071e3',
      strokeWidth: 1.5,
      roughness:   0,
      z:           zBase++,
    });
  }

  // Emit smart arrows (stored as type 'smart-arrow' extended field)
  for (const e of parsed.edges) {
    const fromBox = nodeMap.get(e.from);
    const toBox   = nodeMap.get(e.to);
    if (!fromBox || !toBox) continue;

    // Use center-to-center for dagre points; actual routing done in renderer
    const fx = fromBox.x + fromBox.w / 2;
    const fy = fromBox.y + fromBox.h / 2;
    const tx = toBox.x  + toBox.w  / 2;
    const ty = toBox.y  + toBox.h  / 2;

    elements.push({
      type:        'arrow' as any,
      x:  fx, y:  fy,
      x2: tx, y2: ty,
      text:        e.label || '',
      stroke:      '#1976D2',
      strokeWidth: 2,
      roughness:   0,
      // Store routing metadata in closed flag (temp hack) — router reads fromId/toId
      // We store these as extra fields; TS cast to any
      ...(({ fromId: e.from, toId: e.to, dashed: e.dashed } as any)),
      z: zBase++,
    } as any);
  }

  return { elements, nodeMap };
}

/* ─── Convert ParseResult + layout → CanvasElements[] ───────────────── */
export function diagramToCanvasElements(
  code: string,
  opts?: LayoutOptions,
): { elements: CanvasElement[]; errors: string[] } {
  const parsed = parseDiagramCode(code);
  const { elements: raw, nodeMap } = layoutDiagram(parsed, opts);
  
  // Generate a unique groupId for all elements in this diagram
  const diagramGroupId = 'dg_' + Math.random().toString(36).slice(2, 9);

  const elements: CanvasElement[] = raw.map((el) => ({
    ...el,
    id: uid(),
    groupId: diagramGroupId, // All diagram elements share the same group
  } as CanvasElement));

  return { elements, errors: parsed.errors };
}
