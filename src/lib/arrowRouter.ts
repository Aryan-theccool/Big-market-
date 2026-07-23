/**
 * Smart Connector — Manhattan (Orthogonal) Arrow Routing
 *
 * Algorithm:
 * 1. Pick the best anchor pair on the source and target boxes
 *    (cardinal: N/S/E/W mid-points of each side)
 * 2. Run a simplified Manhattan path:
 *    - Exit the source perpendicularly
 *    - Enter the target perpendicularly
 *    - Connect with a single elbow or two elbows to stay axis-aligned
 * 3. Obstacle avoidance: push segments away from intersecting boxes
 *    using a grid-based detour heuristic
 *
 * Returns an SVG path string (M … L … L …) for rendering.
 */

export interface Rect { x: number; y: number; w: number; h: number; }
export interface Point { x: number; y: number; }

type Side = 'top' | 'bottom' | 'left' | 'right';

/* ─── Cardinal anchor points on a box ──────────────────────────────── */
export function anchors(r: Rect): Record<Side, Point> {
  return {
    top:    { x: r.x + r.w / 2, y: r.y },
    bottom: { x: r.x + r.w / 2, y: r.y + r.h },
    left:   { x: r.x,           y: r.y + r.h / 2 },
    right:  { x: r.x + r.w,     y: r.y + r.h / 2 },
  };
}

/* ─── Outward direction vector per side ────────────────────────────── */
function sideDir(s: Side): Point {
  switch (s) {
    case 'top':    return { x: 0, y: -1 };
    case 'bottom': return { x: 0, y:  1 };
    case 'left':   return { x: -1, y: 0 };
    case 'right':  return { x:  1, y: 0 };
  }
}

/* ─── Expand rect by margin ─────────────────────────────────────────── */
function expand(r: Rect, m: number): Rect {
  return { x: r.x - m, y: r.y - m, w: r.w + 2 * m, h: r.h + 2 * m };
}

/* ─── Point inside rect? ────────────────────────────────────────────── */
function inRect(p: Point, r: Rect): boolean {
  return p.x >= r.x && p.x <= r.x + r.w && p.y >= r.y && p.y <= r.y + r.h;
}

/* ─── Segment-rect intersection (axis-aligned segment) ─────────────── */
function segIntersectsRect(
  a: Point, b: Point, r: Rect,
): boolean {
  // Only handle horizontal / vertical segments
  if (a.y === b.y) {
    // Horizontal
    const minX = Math.min(a.x, b.x);
    const maxX = Math.max(a.x, b.x);
    return a.y >= r.y && a.y <= r.y + r.h && maxX >= r.x && minX <= r.x + r.w;
  }
  if (a.x === b.x) {
    // Vertical
    const minY = Math.min(a.y, b.y);
    const maxY = Math.max(a.y, b.y);
    return a.x >= r.x && a.x <= r.x + r.w && maxY >= r.y && minY <= r.y + r.h;
  }
  return false;
}

/* ─── Choose best anchor pair ───────────────────────────────────────── */
function chooseSides(src: Rect, dst: Rect): [Side, Side] {
  const dx = (dst.x + dst.w / 2) - (src.x + src.w / 2);
  const dy = (dst.y + dst.h / 2) - (src.y + src.h / 2);

  // Dominant axis
  if (Math.abs(dx) > Math.abs(dy)) {
    return dx > 0 ? ['right', 'left'] : ['left', 'right'];
  } else {
    return dy > 0 ? ['bottom', 'top'] : ['top', 'bottom'];
  }
}

/* ─── Build a Manhattan waypoint path ──────────────────────────────── */
const GAP = 20; // stub length before bending

function manhattanPath(
  start: Point,
  end: Point,
  srcSide: Side,
  dstSide: Side,
): Point[] {
  const d1 = sideDir(srcSide);
  const d2 = sideDir(dstSide);

  // Stub out from each anchor
  const p1: Point = { x: start.x + d1.x * GAP, y: start.y + d1.y * GAP };
  const p4: Point = { x: end.x   + d2.x * GAP, y: end.y   + d2.y * GAP };

  // Connect with 1 or 2 bends
  const horizontal1 = d1.x !== 0; // start segment is horizontal
  const horizontal2 = d2.x !== 0; // end segment is horizontal

  let p2: Point;
  let p3: Point;

  if (horizontal1 === horizontal2) {
    // Parallel exits — use midpoint elbow
    const midX = (p1.x + p4.x) / 2;
    const midY = (p1.y + p4.y) / 2;

    if (horizontal1) {
      p2 = { x: midX, y: p1.y };
      p3 = { x: midX, y: p4.y };
    } else {
      p2 = { x: p1.x, y: midY };
      p3 = { x: p4.x, y: midY };
    }
  } else {
    // Perpendicular exits — single elbow
    if (horizontal1) {
      p2 = { x: p4.x, y: p1.y };
      p3 = p2;
    } else {
      p2 = { x: p1.x, y: p4.y };
      p3 = p2;
    }
  }

  // Deduplicate identical adjacent points
  const raw = [start, p1, p2, p3, p4, end];
  const path: Point[] = [raw[0]];
  for (let i = 1; i < raw.length; i++) {
    const prev = path[path.length - 1];
    if (prev.x !== raw[i].x || prev.y !== raw[i].y) path.push(raw[i]);
  }
  return path;
}

/* ─── Obstacle avoidance: push a segment away from blocking rects ─── */
function avoidObstacles(
  path: Point[],
  obstacles: Rect[],
  srcRect: Rect,
  dstRect: Rect,
): Point[] {
  if (obstacles.length === 0) return path;

  const result: Point[] = [...path];
  const PUSH = 24; // pixels to push away

  for (let i = 0; i < result.length - 1; i++) {
    const a = result[i];
    const b = result[i + 1];

    for (const obs of obstacles) {
      // Don't push away from source/dest boxes themselves
      if (
        (obs.x === srcRect.x && obs.y === srcRect.y) ||
        (obs.x === dstRect.x && obs.y === dstRect.y)
      ) continue;

      const blocker = expand(obs, 8);
      if (!segIntersectsRect(a, b, blocker)) continue;

      // Horizontal segment — push vertically
      if (a.y === b.y) {
        const above = obs.y - 8;
        const below = obs.y + obs.h + 8;
        const pushTo = Math.abs(a.y - above) < Math.abs(a.y - below) ? above - PUSH : below + PUSH;
        const mid1: Point = { x: a.x, y: pushTo };
        const mid2: Point = { x: b.x, y: pushTo };
        result.splice(i + 1, 0, mid1, mid2);
        i += 2;
        break;
      }
      // Vertical segment — push horizontally
      if (a.x === b.x) {
        const leftOf  = obs.x - 8;
        const rightOf = obs.x + obs.w + 8;
        const pushTo  = Math.abs(a.x - leftOf) < Math.abs(a.x - rightOf) ? leftOf - PUSH : rightOf + PUSH;
        const mid1: Point = { x: pushTo, y: a.y };
        const mid2: Point = { x: pushTo, y: b.y };
        result.splice(i + 1, 0, mid1, mid2);
        i += 2;
        break;
      }
    }
  }

  return result;
}

/* ─── Convert waypoints → SVG path string ──────────────────────────── */
export function pointsToPath(pts: Point[]): string {
  if (pts.length < 2) return '';
  let d = `M ${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    d += ` L ${pts[i].x.toFixed(1)},${pts[i].y.toFixed(1)}`;
  }
  return d;
}

/* ─── Arrowhead polygon at the end of the path ─────────────────────── */
export function arrowheadPoints(pts: Point[], size = 10): string {
  if (pts.length < 2) return '';
  const tip  = pts[pts.length - 1];
  const prev = pts[pts.length - 2];
  const ang  = Math.atan2(tip.y - prev.y, tip.x - prev.x);
  const a1   = ang + 2.8;
  const a2   = ang - 2.8;
  const p1   = { x: tip.x + Math.cos(a1) * size, y: tip.y + Math.sin(a1) * size };
  const p2   = { x: tip.x + Math.cos(a2) * size, y: tip.y + Math.sin(a2) * size };
  return `${tip.x.toFixed(1)},${tip.y.toFixed(1)} ${p1.x.toFixed(1)},${p1.y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
}

/* ─── Public API ────────────────────────────────────────────────────── */
export interface RoutedArrow {
  path: string;         // SVG path d= string
  arrowhead: string;    // polygon points= string
  labelPoint: Point;    // midpoint for label
}

export function routeArrow(
  srcRect: Rect,
  dstRect: Rect,
  obstacles: Rect[] = [],
): RoutedArrow {
  const [srcSide, dstSide] = chooseSides(srcRect, dstRect);
  const srcAnchors         = anchors(srcRect);
  const dstAnchors         = anchors(dstRect);
  const start              = srcAnchors[srcSide];
  const end                = dstAnchors[dstSide];

  let pts = manhattanPath(start, end, srcSide, dstSide);
  pts     = avoidObstacles(pts, obstacles, srcRect, dstRect);

  const mid = pts[Math.floor(pts.length / 2)];

  return {
    path:       pointsToPath(pts),
    arrowhead:  arrowheadPoints(pts),
    labelPoint: mid,
  };
}
