'use client';

import React, { useMemo } from 'react';
import { useCanvasStore, CanvasElement } from '../../store/canvasStore';
import { routeArrow, type Rect } from '../../lib/arrowRouter';

interface SmartArrowProps {
  element: CanvasElement;
  isSelected: boolean;
  onPointerDown: (e: React.PointerEvent) => void;
}

export const SmartArrow: React.FC<SmartArrowProps> = ({ element, isSelected, onPointerDown }) => {
  const elements = useCanvasStore((s) => s.elements);

  // Resolve source and target boxes from fromId / toId stored on the element
  const fromId = (element as any).fromId as string | undefined;
  const toId   = (element as any).toId   as string | undefined;
  const dashed = (element as any).dashed as boolean | undefined;

  const { path, arrowhead, labelPoint } = useMemo(() => {
    const findRect = (id: string | undefined): Rect | null => {
      if (!id) return null;
      const el = elements.find((e) => e.id === id);
      if (!el) return null;
      return { x: el.x, y: el.y, w: el.w || 100, h: el.h || 56 };
    };

    const srcRect = findRect(fromId) ?? {
      x: element.x - 1, y: element.y - 1, w: 2, h: 2,
    };
    const dstRect = findRect(toId) ?? {
      x: (element.x2 ?? element.x) - 1,
      y: (element.y2 ?? element.y) - 1,
      w: 2, h: 2,
    };

    // Build obstacle list — all rects except source and destination
    const obstacles: Rect[] = elements
      .filter((e) => e.id !== fromId && e.id !== toId && e.id !== element.id)
      .filter((e) => ['rect', 'circle', 'note', 'frame'].includes(e.type))
      .map((e) => ({ x: e.x, y: e.y, w: e.w || 100, h: e.h || 56 }));

    return routeArrow(srcRect, dstRect, obstacles);
  }, [element, elements, fromId, toId]);

  const color = element.stroke || '#1976D2';
  const sw    = element.strokeWidth ?? 2;

  // Bounding box for pointer hit area and z positioning
  return (
    <svg
      data-id={element.id}
      className="absolute pointer-events-none overflow-visible"
      style={{
        left: 0, top: 0,
        width: '100%', height: '100%',
        position: 'absolute',
        zIndex: element.z || 0,
        overflow: 'visible',
      }}
      onPointerDown={onPointerDown}
    >
      {/* Path */}
      <path
        d={path}
        fill="none"
        stroke={isSelected ? '#0071e3' : color}
        strokeWidth={isSelected ? sw + 1 : sw}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={dashed ? '6 4' : undefined}
        style={{ pointerEvents: 'stroke', cursor: 'pointer' }}
      />

      {/* Arrowhead */}
      {arrowhead && (
        <polygon
          points={arrowhead}
          fill={isSelected ? '#0071e3' : color}
          stroke="none"
          style={{ pointerEvents: 'none' }}
        />
      )}

      {/* Label */}
      {element.text && labelPoint && (
        <g>
          <rect
            x={labelPoint.x - 28}
            y={labelPoint.y - 10}
            width={56}
            height={20}
            rx={4}
            fill="var(--bg-surface)"
            stroke={color}
            strokeWidth={0.5}
            opacity={0.9}
          />
          <text
            x={labelPoint.x}
            y={labelPoint.y + 4}
            textAnchor="middle"
            style={{
              fontSize: 11,
              fontFamily: 'var(--font-ui)',
              fill: 'var(--text-primary)',
              pointerEvents: 'none',
            }}
          >
            {element.text}
          </text>
        </g>
      )}

      {/* Selection handles at endpoints */}
      {isSelected && (
        <>
          <circle cx={element.x} cy={element.y} r={5}
            fill="white" stroke="#0071e3" strokeWidth={1.5}
            style={{ pointerEvents: 'all', cursor: 'move' }}
          />
          <circle cx={element.x2 ?? element.x} cy={element.y2 ?? element.y} r={5}
            fill="white" stroke="#0071e3" strokeWidth={1.5}
            style={{ pointerEvents: 'all', cursor: 'move' }}
          />
        </>
      )}
    </svg>
  );
};
