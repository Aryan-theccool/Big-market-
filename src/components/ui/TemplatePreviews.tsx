'use client';

import React from 'react';
import { CanvasElement } from '../../store/canvasStore';

/* ─── SVG Miniature Previews ─────────────────────────────────────────────── */

export function PreviewStartupLean() {
  return (
    <svg viewBox="0 0 280 160" style={{ width: '100%', height: '100%' }}>
      <rect width="280" height="160" fill="#FFF7ED"/>
      <defs><pattern id="psl1" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="7" cy="7" r="0.7" fill="#FB923C" opacity="0.35"/></pattern></defs>
      <rect width="280" height="160" fill="url(#psl1)"/>
      <rect x="4"   y="4"  width="44" height="92" fill="white" rx="3" stroke="#F97316" strokeWidth="0.8" opacity="0.9"/>
      <rect x="52"  y="4"  width="44" height="44" fill="white" rx="3" stroke="#F97316" strokeWidth="0.8" opacity="0.9"/>
      <rect x="100" y="4"  width="44" height="92" fill="white" rx="3" stroke="#F97316" strokeWidth="0.8" opacity="0.9"/>
      <rect x="148" y="4"  width="44" height="44" fill="white" rx="3" stroke="#F97316" strokeWidth="0.8" opacity="0.9"/>
      <rect x="196" y="4"  width="80" height="92" fill="white" rx="3" stroke="#F97316" strokeWidth="0.8" opacity="0.9"/>
      <rect x="52"  y="52" width="44" height="44" fill="white" rx="3" stroke="#F97316" strokeWidth="0.8" opacity="0.9"/>
      <rect x="148" y="52" width="44" height="44" fill="white" rx="3" stroke="#F97316" strokeWidth="0.8" opacity="0.9"/>
      <text x="6"   y="12" fill="#EA580C" fontSize="4" fontWeight="bold">Problem</text>
      <text x="54"  y="12" fill="#EA580C" fontSize="4" fontWeight="bold">Solution</text>
      <text x="102" y="12" fill="#EA580C" fontSize="4" fontWeight="bold">Unique Value</text>
      <text x="150" y="12" fill="#EA580C" fontSize="4" fontWeight="bold">Advantage</text>
      <text x="198" y="12" fill="#EA580C" fontSize="4" fontWeight="bold">Segments</text>
      <rect x="8"   y="104" width="72" height="48" fill="#FEF9C3" rx="4" stroke="#EAB308" strokeWidth="0.8" transform="rotate(-2,44,128)"/>
      <text x="14"  y="118" fill="#92400E" fontSize="5">Hard to visualize</text>
      <text x="14"  y="127" fill="#92400E" fontSize="5">complex systems</text>
      <rect x="100" y="108" width="72" height="44" fill="#DCFCE7" rx="4" stroke="#22C55E" strokeWidth="0.8" transform="rotate(1,136,130)"/>
      <text x="106" y="122" fill="#166534" fontSize="5">Infinite real-time</text>
      <text x="106" y="131" fill="#166534" fontSize="5">canvas</text>
      <rect x="196" y="104" width="76" height="44" fill="#DBEAFE" rx="4" stroke="#3B82F6" strokeWidth="0.8" transform="rotate(-1,234,126)"/>
      <text x="202" y="118" fill="#1E40AF" fontSize="5">Eng Teams &amp;</text>
      <text x="202" y="127" fill="#1E40AF" fontSize="5">Founders</text>
    </svg>
  );
}

export function PreviewSystemDesignAWS() {
  return (
    <svg viewBox="0 0 280 160" style={{ width: '100%', height: '100%' }}>
      <rect width="280" height="160" fill="#F8FAFC"/>
      <defs>
        <pattern id="psaws" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="8" cy="8" r="0.6" fill="#94A3B8" opacity="0.3"/></pattern>
        <marker id="aaws" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto"><path d="M0,0 L4,2 L0,4Z" fill="#3B82F6"/></marker>
      </defs>
      <rect width="280" height="160" fill="url(#psaws)"/>
      <rect x="100" y="6"  width="80" height="22" fill="#DBEAFE" rx="5" stroke="#3B82F6" strokeWidth="1"/>
      <text x="108" y="20" fill="#1E40AF" fontSize="5" fontWeight="bold">Load Balancer</text>
      <rect x="100" y="40" width="80" height="22" fill="#111827" rx="5" stroke="#22C55E" strokeWidth="1"/>
      <text x="116" y="54" fill="#4ADE80" fontSize="5" fontWeight="bold">API GATEWAY</text>
      <rect x="14"  y="76" width="72" height="20" fill="#F5F3FF" rx="4" stroke="#8B5CF6" strokeWidth="0.8"/>
      <text x="18"  y="88" fill="#6D28D9" fontSize="4.5">Auth Service</text>
      <rect x="104" y="76" width="72" height="20" fill="#ECFDF5" rx="4" stroke="#10B981" strokeWidth="0.8"/>
      <text x="112" y="88" fill="#065F46" fontSize="4.5">Core API (Go)</text>
      <rect x="194" y="76" width="72" height="20" fill="#FFF1F2" rx="4" stroke="#F43F5E" strokeWidth="0.8"/>
      <text x="198" y="88" fill="#9F1239" fontSize="4.5">Media Service</text>
      <rect x="30"  y="112" width="68" height="18" fill="#EFF6FF" rx="4" stroke="#3B82F6" strokeWidth="0.8"/>
      <text x="38"  y="123" fill="#1E40AF" fontSize="4.5">PostgreSQL</text>
      <rect x="106" y="112" width="68" height="18" fill="#FEF2F2" rx="4" stroke="#EF4444" strokeWidth="0.8"/>
      <text x="118" y="123" fill="#991B1B" fontSize="4.5">Redis Cache</text>
      <line x1="140" y1="28" x2="140" y2="40" stroke="#3B82F6" strokeWidth="1.2" markerEnd="url(#aaws)"/>
      <line x1="120" y1="62" x2="50"  y2="76" stroke="#94A3B8" strokeWidth="0.8" markerEnd="url(#aaws)"/>
      <line x1="140" y1="62" x2="140" y2="76" stroke="#94A3B8" strokeWidth="0.8" markerEnd="url(#aaws)"/>
      <line x1="160" y1="62" x2="230" y2="76" stroke="#94A3B8" strokeWidth="0.8" markerEnd="url(#aaws)"/>
      <line x1="50"  y1="96" x2="64"  y2="112" stroke="#94A3B8" strokeWidth="0.8" markerEnd="url(#aaws)"/>
      <line x1="140" y1="96" x2="140" y2="112" stroke="#94A3B8" strokeWidth="0.8" markerEnd="url(#aaws)"/>
    </svg>
  );
}

export function PreviewDSABST() {
  return (
    <svg viewBox="0 0 280 160" style={{ width: '100%', height: '100%' }}>
      <rect width="280" height="160" fill="#1C1A00"/>
      <defs>
        <pattern id="psbst" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="7" cy="7" r="0.6" fill="#A16207" opacity="0.4"/></pattern>
      </defs>
      <rect width="280" height="160" fill="url(#psbst)"/>
      <circle cx="140" cy="22" r="14" fill="#854D0E" stroke="#FDE047" strokeWidth="1.5"/>
      <text x="136" y="26" fill="#FEF08A" fontSize="9" fontWeight="bold">8</text>
      <circle cx="80"  cy="60" r="12" fill="#713F12" stroke="#FACC15" strokeWidth="1.2"/>
      <text x="76"  y="64" fill="#FDE047" fontSize="9">3</text>
      <circle cx="200" cy="60" r="12" fill="#713F12" stroke="#FACC15" strokeWidth="1.2"/>
      <text x="193" y="64" fill="#FDE047" fontSize="9">10</text>
      <circle cx="44"  cy="100" r="11" fill="#422006" stroke="#EAB308" strokeWidth="1"/>
      <text x="40"  y="104" fill="#FDE047" fontSize="9">1</text>
      <circle cx="116" cy="100" r="11" fill="#422006" stroke="#EAB308" strokeWidth="1"/>
      <text x="112" y="104" fill="#FDE047" fontSize="9">6</text>
      <circle cx="236" cy="100" r="11" fill="#422006" stroke="#EAB308" strokeWidth="1"/>
      <text x="229" y="104" fill="#FDE047" fontSize="8">14</text>
      <line x1="128" y1="34" x2="90"  y2="50" stroke="#FACC15" strokeWidth="1.5"/>
      <line x1="152" y1="34" x2="190" y2="50" stroke="#FACC15" strokeWidth="1.5"/>
      <line x1="70"  y1="70" x2="52"  y2="90" stroke="#EAB308" strokeWidth="1.2"/>
      <line x1="90"  y1="70" x2="108" y2="90" stroke="#EAB308" strokeWidth="1.2"/>
      <line x1="210" y1="70" x2="228" y2="90" stroke="#EAB308" strokeWidth="1.2"/>
      <rect x="4" y="118" width="272" height="36" fill="#0C0A00" rx="4" stroke="#EAB308" strokeWidth="0.8"/>
      <text x="10" y="130" fill="#FDE047" fontSize="5" fontWeight="bold">BFS: 8 → 3 → 10 → 1 → 6 → 14</text>
      <text x="10" y="140" fill="#D97706" fontSize="4.5">Insert: O(log n)  Search: O(log n)  Space: O(n)</text>
      <text x="10" y="150" fill="#A16207" fontSize="4.5">DFS Inorder: 1, 3, 6, 8, 10, 14</text>
    </svg>
  );
}

export function PreviewProductRoadmapKanban() {
  return (
    <svg viewBox="0 0 280 160" style={{ width: '100%', height: '100%' }}>
      <rect width="280" height="160" fill="#FAF5FF"/>
      <defs><pattern id="psprk" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="7" cy="7" r="0.6" fill="#C4B5FD" opacity="0.35"/></pattern></defs>
      <rect width="280" height="160" fill="url(#psprk)"/>
      <rect x="4"   y="4" width="84" height="18" fill="#7C3AED" rx="4"/>
      <text x="22"  y="16" fill="white" fontSize="6" fontWeight="bold">Q1 (Jan–Mar)</text>
      <rect x="98"  y="4" width="84" height="18" fill="#9333EA" rx="4"/>
      <text x="116" y="16" fill="white" fontSize="6" fontWeight="bold">Q2 (Apr–Jun)</text>
      <rect x="192" y="4" width="84" height="18" fill="#A855F7" rx="4"/>
      <text x="210" y="16" fill="white" fontSize="6" fontWeight="bold">Q3 (Jul–Sep)</text>
      <rect x="8"   y="28" width="76" height="28" fill="#EDE9FE" rx="4" stroke="#8B5CF6" strokeWidth="0.8"/>
      <text x="12"  y="38" fill="#4C1D95" fontSize="4.5" fontWeight="600">Real-time Collab</text>
      <text x="12"  y="47" fill="#6D28D9" fontSize="4">WebSockets refactor</text>
      <rect x="8"   y="60" width="76" height="28" fill="#EDE9FE" rx="4" stroke="#8B5CF6" strokeWidth="0.8"/>
      <text x="12"  y="70" fill="#4C1D95" fontSize="4.5" fontWeight="600">SSO Login</text>
      <text x="12"  y="79" fill="#6D28D9" fontSize="4">Enterprise plan</text>
      <rect x="102" y="28" width="76" height="28" fill="#DBEAFE" rx="4" stroke="#3B82F6" strokeWidth="0.8"/>
      <text x="106" y="38" fill="#1E40AF" fontSize="4.5" fontWeight="600">GPT-4 Integration</text>
      <text x="106" y="47" fill="#1D4ED8" fontSize="4">Auto-generate nodes</text>
      <rect x="102" y="60" width="76" height="28" fill="#EDE9FE" rx="4" stroke="#8B5CF6" strokeWidth="0.8"/>
      <text x="106" y="70" fill="#4C1D95" fontSize="4.5" fontWeight="600">Dashboard v2</text>
      <text x="106" y="79" fill="#6D28D9" fontSize="4">Custom layouts</text>
      <rect x="196" y="28" width="76" height="28" fill="#DCFCE7" rx="4" stroke="#22C55E" strokeWidth="0.8"/>
      <text x="200" y="38" fill="#14532D" fontSize="4.5" fontWeight="600">Mobile App Beta</text>
      <text x="200" y="47" fill="#166534" fontSize="4">iOS and Android</text>
      <rect x="196" y="60" width="76" height="28" fill="#FEF9C3" rx="4" stroke="#EAB308" strokeWidth="0.8"/>
      <text x="200" y="70" fill="#713F12" fontSize="4.5" fontWeight="600">Analytics v1</text>
      <text x="200" y="79" fill="#92400E" fontSize="4">Usage reporting</text>
      <line x1="94"  y1="4" x2="94"  y2="156" stroke="#C4B5FD" strokeWidth="0.6" strokeDasharray="3 2"/>
      <line x1="188" y1="4" x2="188" y2="156" stroke="#C4B5FD" strokeWidth="0.6" strokeDasharray="3 2"/>
      <rect x="4" y="136" width="272" height="18" fill="white" rx="4" stroke="#E9D5FF" strokeWidth="0.7"/>
      <rect x="8" y="140" width="80" height="10" fill="#EDE9FE" rx="5"/>
      <rect x="8" y="140" width="60" height="10" fill="#7C3AED" rx="5"/>
      <text x="96" y="149" fill="#6B21A8" fontSize="4.5">Sprint 12 of 16 · On Track</text>
    </svg>
  );
}

export function PreviewBrainstormMindMap() {
  return (
    <svg viewBox="0 0 280 160" style={{ width: '100%', height: '100%' }}>
      <rect width="280" height="160" fill="#FFFBEB"/>
      <defs><pattern id="psbmm" width="14" height="14" patternUnits="userSpaceOnUse"><circle cx="7" cy="7" r="0.7" fill="#FCD34D" opacity="0.35"/></pattern></defs>
      <rect width="280" height="160" fill="url(#psbmm)"/>
      <ellipse cx="140" cy="80" rx="40" ry="24" fill="#F97316" stroke="#EA580C" strokeWidth="1.5"/>
      <text x="118" y="76" fill="white" fontSize="6" fontWeight="bold">LAUNCH</text>
      <text x="122" y="86" fill="white" fontSize="6" fontWeight="bold">IDEAS</text>
      <rect x="4"   y="6"  width="72" height="36" fill="#FEF9C3" rx="5" stroke="#EAB308" strokeWidth="1" transform="rotate(-5,40,24)"/>
      <text x="10"  y="20" fill="#92400E" fontSize="5">Partner with design</text>
      <text x="10"  y="29" fill="#92400E" fontSize="5">agencies for templates</text>
      <rect x="204" y="8"  width="72" height="36" fill="#DCFCE7" rx="5" stroke="#22C55E" strokeWidth="1" transform="rotate(4,240,26)"/>
      <text x="208" y="22" fill="#166534" fontSize="5">Product Hunt video</text>
      <text x="208" y="31" fill="#166534" fontSize="5">show drag-and-drop</text>
      <rect x="4"   y="118" width="72" height="36" fill="#FCE7F3" rx="5" stroke="#EC4899" strokeWidth="1" transform="rotate(3,40,136)"/>
      <text x="10"  y="132" fill="#9D174D" fontSize="5">Add dark mode</text>
      <text x="10"  y="141" fill="#9D174D" fontSize="5">before beta launch</text>
      <rect x="204" y="116" width="72" height="36" fill="#DBEAFE" rx="5" stroke="#3B82F6" strokeWidth="1" transform="rotate(-4,240,134)"/>
      <text x="208" y="130" fill="#1E40AF" fontSize="5">Freemium model:</text>
      <text x="208" y="139" fill="#1E40AF" fontSize="5">3 free, $10/mo</text>
      <line x1="76"  y1="24" x2="104" y2="66" stroke="#F97316" strokeWidth="1" strokeDasharray="4 2" opacity="0.7"/>
      <line x1="204" y1="26" x2="176" y2="66" stroke="#F97316" strokeWidth="1" strokeDasharray="4 2" opacity="0.7"/>
      <line x1="76"  y1="136" x2="104" y2="94" stroke="#F97316" strokeWidth="1" strokeDasharray="4 2" opacity="0.7"/>
      <line x1="204" y1="134" x2="176" y2="94" stroke="#F97316" strokeWidth="1" strokeDasharray="4 2" opacity="0.7"/>
    </svg>
  );
}

export function PreviewAIWorkflowNodes() {
  return (
    <svg viewBox="0 0 280 160" style={{ width: '100%', height: '100%' }}>
      <rect width="280" height="160" fill="#0A0E1A"/>
      <defs>
        <pattern id="psain" width="20" height="20" patternUnits="userSpaceOnUse"><circle cx="10" cy="10" r="0.6" fill="#6366F1" opacity="0.25"/></pattern>
        <filter id="gain"><feGaussianBlur stdDeviation="1.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <marker id="aain" markerWidth="4" markerHeight="4" refX="3" refY="2" orient="auto"><path d="M0,0 L4,2 L0,4Z" fill="#6366F1"/></marker>
      </defs>
      <rect width="280" height="160" fill="url(#psain)"/>
      <rect x="4"   y="60" width="56" height="40" fill="#0D1B3E" rx="6" stroke="#3B82F6" strokeWidth="1.2" filter="url(#gain)"/>
      <text x="8"   y="74" fill="#60A5FA" fontSize="4.5" fontWeight="bold">TRIGGER</text>
      <text x="8"   y="84" fill="#93C5FD" fontSize="4">User Input</text>
      <text x="8"   y="93" fill="#93C5FD" fontSize="4">Prompt</text>
      <rect x="100" y="55" width="60" height="50" fill="#0D1B3E" rx="30" stroke="#6366F1" strokeWidth="1.2" filter="url(#gain)"/>
      <text x="108" y="76" fill="#A5B4FC" fontSize="4.5" fontWeight="bold">Decision</text>
      <text x="112" y="86" fill="#C7D2FE" fontSize="4.5">Router</text>
      <rect x="180" y="20" width="60" height="36" fill="#0D1B3E" rx="6" stroke="#8B5CF6" strokeWidth="1.2" filter="url(#gain)"/>
      <text x="184" y="33" fill="#A78BFA" fontSize="4.5" fontWeight="bold">LLM NODE</text>
      <text x="184" y="43" fill="#C4B5FD" fontSize="4">Claude 3.5 Sonnet</text>
      <rect x="180" y="104" width="60" height="36" fill="#0D1B3E" rx="6" stroke="#3B82F6" strokeWidth="1.2" filter="url(#gain)"/>
      <text x="184" y="117" fill="#60A5FA" fontSize="4.5" fontWeight="bold">LLM NODE</text>
      <text x="184" y="127" fill="#93C5FD" fontSize="4">GPT-4o Fast</text>
      <rect x="220" y="62" width="56" height="36" fill="#0D1B3E" rx="6" stroke="#10B981" strokeWidth="1.2" filter="url(#gain)"/>
      <text x="224" y="75" fill="#34D399" fontSize="4.5" fontWeight="bold">ACTION</text>
      <text x="224" y="85" fill="#6EE7B7" fontSize="4">Save to</text>
      <text x="224" y="94" fill="#6EE7B7" fontSize="4">Vector DB</text>
      <line x1="60"  y1="80" x2="100" y2="80" stroke="#6366F1" strokeWidth="1.2" markerEnd="url(#aain)"/>
      <line x1="160" y1="68" x2="180" y2="38" stroke="#6366F1" strokeWidth="1.2" markerEnd="url(#aain)"/>
      <line x1="160" y1="92" x2="180" y2="122" stroke="#6366F1" strokeWidth="1.2" markerEnd="url(#aain)"/>
      <line x1="240" y1="56" x2="240" y2="62" stroke="#6366F1" strokeWidth="1.2" markerEnd="url(#aain)"/>
      <line x1="240" y1="140" x2="248" y2="98" stroke="#6366F1" strokeWidth="1.2" markerEnd="url(#aain)"/>
      <rect x="4" y="140" width="48" height="14" fill="#0D1B3E" rx="3" stroke="#10B981" strokeWidth="0.6"/>
      <circle cx="11" cy="147" r="2.5" fill="#10B981"/>
      <text x="16" y="150" fill="#34D399" fontSize="4">Running</text>
    </svg>
  );
}

/* ─── Template metadata + element data ───────────────────────────────────── */

export interface TemplateCard {
  id: string;
  title: string;
  desc: string;
  tag: string;
  tagColor: string;
  tagBg: string;
  glow: string;
  avatars: string[];
  Preview: React.FC;
  elements: Omit<CanvasElement, 'id'>[];
}

export const TEMPLATE_CARDS: TemplateCard[] = [
  {
    id: 'startup-lean',
    title: 'Startup Lean Canvas',
    desc: 'Lean canvas grid with floating sticky notes for problem, solution and customer segments.',
    tag: 'Strategy', tagColor: '#F97316', tagBg: '#FFF7ED', glow: 'rgba(249,115,22,0.12)',
    avatars: ['#F97316','#FBBF24'],
    Preview: PreviewStartupLean,
    elements: [
      { type: 'frame', x: 60,  y: 80,  w: 140, h: 260, fill: 'rgba(249,115,22,0.05)', stroke: '#F97316', strokeWidth: 1.5, roughness: 0, z: 0,  text: '1. Problem' },
      { type: 'frame', x: 220, y: 80,  w: 140, h: 120, fill: 'rgba(249,115,22,0.05)', stroke: '#F97316', strokeWidth: 1.5, roughness: 0, z: 1,  text: '4. Solution' },
      { type: 'frame', x: 380, y: 80,  w: 140, h: 260, fill: 'rgba(249,115,22,0.05)', stroke: '#F97316', strokeWidth: 1.5, roughness: 0, z: 2,  text: '3. Unique Value' },
      { type: 'frame', x: 540, y: 80,  w: 140, h: 120, fill: 'rgba(249,115,22,0.05)', stroke: '#F97316', strokeWidth: 1.5, roughness: 0, z: 3,  text: '9. Unfair Advantage' },
      { type: 'frame', x: 700, y: 80,  w: 140, h: 260, fill: 'rgba(249,115,22,0.05)', stroke: '#F97316', strokeWidth: 1.5, roughness: 0, z: 4,  text: '2. Customer Segments' },
      { type: 'frame', x: 220, y: 220, w: 140, h: 120, fill: 'rgba(249,115,22,0.05)', stroke: '#F97316', strokeWidth: 1.5, roughness: 0, z: 5,  text: '8. Key Metrics' },
      { type: 'frame', x: 540, y: 220, w: 140, h: 120, fill: 'rgba(249,115,22,0.05)', stroke: '#F97316', strokeWidth: 1.5, roughness: 0, z: 6,  text: '5. Channels' },
      { type: 'note', x: 80,  y: 380, w: 180, h: 90, color: 'yellow', rot: -2, text: 'Hard to visualize\ncomplex systems remotely.', z: 10 },
      { type: 'note', x: 400, y: 380, w: 180, h: 90, color: 'green',  rot:  1, text: 'Infinite, real-time\nmultiplayer canvas.', z: 11 },
      { type: 'note', x: 700, y: 380, w: 180, h: 90, color: 'blue',   rot: -1, text: 'Engineering Teams\n& Startup Founders.', z: 12 },
    ],
  },
  {
    id: 'system-design-aws',
    title: 'System Design (AWS)',
    desc: 'Load balancer, API gateway, microservices and database layer with connecting arrows.',
    tag: 'Engineering', tagColor: '#3B82F6', tagBg: '#EFF6FF', glow: 'rgba(59,130,246,0.14)',
    avatars: ['#3B82F6','#22D3EE'],
    Preview: PreviewSystemDesignAWS,
    elements: [
      { type: 'rect', x: 330, y: 60,  w: 180, h: 52, fill: '#DBEAFE', stroke: '#3B82F6', strokeWidth: 2, roughness: 0, radius: 10, z: 0, text: 'Load Balancer\n(Route 53)' },
      { type: 'rect', x: 310, y: 180, w: 220, h: 52, fill: '#111827', stroke: '#22C55E', strokeWidth: 2, roughness: 0, radius: 10, z: 1, text: 'API GATEWAY' },
      { type: 'rect', x: 80,  y: 310, w: 180, h: 52, fill: '#F5F3FF', stroke: '#8B5CF6', strokeWidth: 2, roughness: 0, radius: 10, z: 2, text: 'Auth Service\nNode.js / Express' },
      { type: 'rect', x: 330, y: 310, w: 180, h: 52, fill: '#ECFDF5', stroke: '#10B981', strokeWidth: 2, roughness: 0, radius: 10, z: 3, text: 'Core API\nGo (Golang)' },
      { type: 'rect', x: 580, y: 310, w: 180, h: 52, fill: '#FFF1F2', stroke: '#F43F5E', strokeWidth: 2, roughness: 0, radius: 10, z: 4, text: 'Media Service\nPython / FastAPI' },
      { type: 'rect', x: 130, y: 440, w: 180, h: 52, fill: '#EFF6FF', stroke: '#3B82F6', strokeWidth: 2, roughness: 0, radius: 10, z: 5, text: 'PostgreSQL' },
      { type: 'rect', x: 380, y: 440, w: 180, h: 52, fill: '#FEF2F2', stroke: '#EF4444', strokeWidth: 2, roughness: 0, radius: 10, z: 6, text: 'Redis Cache' },
      { type: 'arrow', x: 420, y: 112, x2: 420, y2: 180, stroke: '#3B82F6', strokeWidth: 2, roughness: 0.3, z: 7 },
      { type: 'arrow', x: 420, y: 232, x2: 170, y2: 310, stroke: '#94A3B8', strokeWidth: 1.5, roughness: 0.3, z: 8 },
      { type: 'arrow', x: 420, y: 232, x2: 420, y2: 310, stroke: '#94A3B8', strokeWidth: 1.5, roughness: 0.3, z: 9 },
      { type: 'arrow', x: 420, y: 232, x2: 670, y2: 310, stroke: '#94A3B8', strokeWidth: 1.5, roughness: 0.3, z: 10 },
      { type: 'arrow', x: 170, y: 362, x2: 220, y2: 440, stroke: '#94A3B8', strokeWidth: 1.5, roughness: 0.3, z: 11 },
      { type: 'arrow', x: 420, y: 362, x2: 470, y2: 440, stroke: '#94A3B8', strokeWidth: 1.5, roughness: 0.3, z: 12 },
    ],
  },
  {
    id: 'dsa-bst',
    title: 'DSA — Binary Search Tree',
    desc: 'BST node tree with BFS/DFS traversal, linked list and complexity annotations.',
    tag: 'CS / Interview', tagColor: '#EAB308', tagBg: '#1C1A00', glow: 'rgba(234,179,8,0.18)',
    avatars: ['#EAB308','#F97316'],
    Preview: PreviewDSABST,
    elements: [
      { type: 'note', x: 380, y: 60,  w: 70, h: 70, color: 'yellow', text: '8',  z: 0 },
      { type: 'note', x: 220, y: 180, w: 70, h: 70, color: 'yellow', text: '3',  z: 1 },
      { type: 'note', x: 540, y: 180, w: 70, h: 70, color: 'yellow', text: '10', z: 2 },
      { type: 'note', x: 120, y: 300, w: 70, h: 70, color: 'orange', text: '1',  z: 3 },
      { type: 'note', x: 320, y: 300, w: 70, h: 70, color: 'orange', text: '6',  z: 4 },
      { type: 'note', x: 620, y: 300, w: 70, h: 70, color: 'orange', text: '14', z: 5 },
      { type: 'arrow', x: 415, y: 130, x2: 255, y2: 180, stroke: '#FACC15', strokeWidth: 3, roughness: 0.5, z: 6 },
      { type: 'arrow', x: 415, y: 130, x2: 575, y2: 180, stroke: '#FACC15', strokeWidth: 3, roughness: 0.5, z: 7 },
      { type: 'arrow', x: 255, y: 250, x2: 155, y2: 300, stroke: '#EAB308', strokeWidth: 2, roughness: 0.5, z: 8 },
      { type: 'arrow', x: 255, y: 250, x2: 355, y2: 300, stroke: '#EAB308', strokeWidth: 2, roughness: 0.5, z: 9 },
      { type: 'arrow', x: 575, y: 250, x2: 655, y2: 300, stroke: '#EAB308', strokeWidth: 2, roughness: 0.5, z: 10 },
      { type: 'note', x: 720, y: 80,  w: 220, h: 110, color: 'orange', text: '// Binary Search Tree\nInsert: O(log n)\nSearch: O(log n)\nSpace:  O(n)', z: 11 },
      { type: 'note', x: 720, y: 220, w: 220, h: 80,  color: 'yellow', text: 'Linked List\n4 → 8 → 15 → null', z: 12 },
      { type: 'note', x: 720, y: 330, w: 220, h: 90,  color: 'orange', text: 'DFS Inorder\nLeft → Root → Right\nResult: 1,3,6,8,10,14', z: 13 },
    ],
  },
  {
    id: 'product-roadmap-kanban',
    title: 'Product Roadmap (Kanban)',
    desc: 'Q1–Q3 kanban board with draggable feature cards for real-time collab, AI and mobile.',
    tag: 'Product', tagColor: '#7C3AED', tagBg: '#FAF5FF', glow: 'rgba(124,58,237,0.14)',
    avatars: ['#7C3AED','#A855F7'],
    Preview: PreviewProductRoadmapKanban,
    elements: [
      { type: 'frame', x: 60,  y: 60, w: 260, h: 420, fill: 'rgba(124,58,237,0.05)', stroke: '#7C3AED', strokeWidth: 1.5, roughness: 0, z: 0, text: 'Q1 (Jan – Mar)' },
      { type: 'frame', x: 360, y: 60, w: 260, h: 420, fill: 'rgba(147,51,234,0.05)', stroke: '#9333EA', strokeWidth: 1.5, roughness: 0, z: 1, text: 'Q2 (Apr – Jun)' },
      { type: 'frame', x: 660, y: 60, w: 260, h: 420, fill: 'rgba(168,85,247,0.05)', stroke: '#A855F7', strokeWidth: 1.5, roughness: 0, z: 2, text: 'Q3 (Jul – Sep)' },
      { type: 'note', x: 80,  y: 130, w: 220, h: 80, color: 'purple', text: 'Real-time Collaboration\nWebSockets refactor', z: 3 },
      { type: 'note', x: 80,  y: 230, w: 220, h: 80, color: 'blue',   text: 'SSO Login\nEnterprise plan', z: 4 },
      { type: 'note', x: 380, y: 130, w: 220, h: 80, color: 'blue',   text: 'GPT-4 Integration\nAuto-generate nodes', z: 5 },
      { type: 'note', x: 380, y: 230, w: 220, h: 80, color: 'purple', text: 'Dashboard v2\nCustom layouts', z: 6 },
      { type: 'note', x: 680, y: 130, w: 220, h: 80, color: 'green',  text: 'Mobile App Beta\niOS and Android', z: 7 },
      { type: 'note', x: 680, y: 230, w: 220, h: 80, color: 'yellow', text: 'Analytics v1\nUsage reporting', z: 8 },
    ],
  },
  {
    id: 'brainstorm-mindmap',
    title: 'Brainstorm Mind Map',
    desc: 'Central idea hub with satellite sticky notes and dashed connector lines.',
    tag: 'Ideation', tagColor: '#F97316', tagBg: '#FFF7ED', glow: 'rgba(249,115,22,0.14)',
    avatars: ['#F97316','#EAB308'],
    Preview: PreviewBrainstormMindMap,
    elements: [
      { type: 'note', x: 380, y: 300, w: 200, h: 80, color: 'orange', text: 'LAUNCH IDEAS\nYour central theme', z: 0 },
      { type: 'note', x: 60,  y: 60,  w: 220, h: 100, color: 'yellow', rot: -3, text: 'Partner with design agencies\nto offer templates out of the box!', z: 1 },
      { type: 'note', x: 660, y: 80,  w: 220, h: 100, color: 'green',  rot:  2, text: 'Product Hunt launch video\nneeds to show drag-and-drop.', z: 2 },
      { type: 'note', x: 60,  y: 500, w: 220, h: 100, color: 'pink',   rot: -1, text: 'Add dark mode before beta.\nUsers will ask for it.', z: 3 },
      { type: 'note', x: 660, y: 480, w: 220, h: 100, color: 'blue',   rot:  3, text: 'Freemium model:\n3 boards free, then $10/mo.', z: 4 },
      { type: 'arrow', x: 280, y: 160, x2: 430, y2: 300, stroke: '#94A3B8', strokeWidth: 1.5, roughness: 1.2, z: 5 },
      { type: 'arrow', x: 660, y: 180, x2: 540, y2: 300, stroke: '#94A3B8', strokeWidth: 1.5, roughness: 1.2, z: 6 },
      { type: 'arrow', x: 280, y: 550, x2: 430, y2: 380, stroke: '#94A3B8', strokeWidth: 1.5, roughness: 1.2, z: 7 },
      { type: 'arrow', x: 660, y: 530, x2: 540, y2: 380, stroke: '#94A3B8', strokeWidth: 1.5, roughness: 1.2, z: 8 },
    ],
  },
  {
    id: 'ai-workflow-nodes',
    title: 'AI Workflow (Node Graph)',
    desc: 'Trigger → Decision Router → LLM nodes (Claude, GPT-4o) → Action node pipeline.',
    tag: 'Automation', tagColor: '#6366F1', tagBg: '#0A0E1A', glow: 'rgba(99,102,241,0.2)',
    avatars: ['#6366F1','#8B5CF6'],
    Preview: PreviewAIWorkflowNodes,
    elements: [
      { type: 'note', x: 60,  y: 260, w: 200, h: 80, color: 'blue',   text: 'TRIGGER\nUser Input Prompt', z: 0 },
      { type: 'note', x: 360, y: 240, w: 180, h: 100, color: 'yellow', text: 'Decision\nRouter', z: 1 },
      { type: 'note', x: 640, y: 140, w: 200, h: 80, color: 'purple', text: 'LLM NODE\nClaude 3.5 Sonnet', z: 2 },
      { type: 'note', x: 640, y: 360, w: 200, h: 80, color: 'blue',   text: 'LLM NODE\nGPT-4o Fast', z: 3 },
      { type: 'note', x: 920, y: 250, w: 200, h: 80, color: 'green',  text: 'ACTION\nSave to Vector DB', z: 4 },
      { type: 'arrow', x: 260, y: 300, x2: 360, y2: 290, stroke: '#6366F1', strokeWidth: 2.5, roughness: 0.3, z: 5 },
      { type: 'arrow', x: 540, y: 270, x2: 640, y2: 180, stroke: '#6366F1', strokeWidth: 2.5, roughness: 0.3, z: 6 },
      { type: 'arrow', x: 540, y: 310, x2: 640, y2: 400, stroke: '#6366F1', strokeWidth: 2.5, roughness: 0.3, z: 7 },
      { type: 'arrow', x: 840, y: 180, x2: 920, y2: 270, stroke: '#6366F1', strokeWidth: 2.5, roughness: 0.3, z: 8 },
      { type: 'arrow', x: 840, y: 400, x2: 920, y2: 310, stroke: '#6366F1', strokeWidth: 2.5, roughness: 0.3, z: 9 },
    ],
  },
];
