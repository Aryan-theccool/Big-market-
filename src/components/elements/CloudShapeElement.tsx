'use client';

import React from 'react';
import { CanvasElement } from '../../store/canvasStore';
import { getCloudShape } from '../../lib/cloudShapes';

interface CloudShapeElementProps {
  element: CanvasElement;
  isSelected: boolean;
  onPointerDown: (e: React.PointerEvent) => void;
}

export const CloudShapeElement: React.FC<CloudShapeElementProps> = ({
  element,
  isSelected,
  onPointerDown,
}) => {
  const shapeId = (element as any).shapeId as string | undefined;
  const shape = shapeId ? getCloudShape(shapeId) : null;

  if (!shape) {
    return (
      <svg
        data-id={element.id}
        className="absolute pointer-events-auto overflow-visible"
        style={{
          left: element.x,
          top: element.y,
          width: element.w || 90,
          height: element.h || 60,
          zIndex: element.z || 0,
          opacity: element.opacity ?? 1,
          transform: element.rot ? `rotate(${element.rot}deg)` : undefined,
          transformOrigin: 'center',
        }}
        onPointerDown={onPointerDown}
      >
        <rect
          x={0}
          y={0}
          width={element.w || 90}
          height={element.h || 60}
          fill="#E0E0E0"
          stroke="#999"
          strokeWidth={2}
          rx={4}
        />
        <text
          x={(element.w || 90) / 2}
          y={(element.h || 60) / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={12}
          fill="#666"
          fontFamily="var(--font-ui)"
        >
          ? {shapeId}
        </text>
      </svg>
    );
  }

  const w = element.w || shape.defaultW;
  const h = element.h || shape.defaultH;
  const fill = element.fill || shape.defaultFill;
  const stroke = element.stroke || shape.defaultStroke;

  return (
    <svg
      data-id={element.id}
      className="absolute pointer-events-auto overflow-visible"
      style={{
        left: element.x,
        top: element.y,
        width: w,
        height: h,
        zIndex: element.z || 0,
        opacity: element.opacity ?? 1,
        transform: element.rot ? `rotate(${element.rot}deg)` : undefined,
        transformOrigin: 'center',
        cursor: 'pointer',
      }}
      onPointerDown={onPointerDown}
      viewBox={`0 0 ${w} ${h}`}
    >
      {/* Background rect */}
      <rect
        x={0}
        y={0}
        width={w}
        height={h}
        fill={fill}
        stroke={isSelected ? '#0071E3' : stroke}
        strokeWidth={isSelected ? 3 : 2}
        rx={8}
        opacity={0.15}
      />

      {/* Icon using foreignObject */}
      <foreignObject x={w / 2 - 24} y={h / 2 - 24} width={48} height={48}>
        <div style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <shape.Icon width={48} height={48} fill={fill} stroke={stroke} />
        </div>
      </foreignObject>

      {/* Label below */}
      {element.text && (
        <text
          x={w / 2}
          y={h + 14}
          textAnchor="middle"
          fontSize={12}
          fontWeight={600}
          fill="var(--text-primary)"
          fontFamily="var(--font-ui)"
        >
          {element.text}
        </text>
      )}

      {/* Selection box */}
      {isSelected && (
        <rect
          x={-4}
          y={-4}
          width={w + 8}
          height={h + 8}
          fill="none"
          stroke="#0071E3"
          strokeWidth={1.5}
          strokeDasharray="4 2"
          rx={10}
        />
      )}
    </svg>
  );
};
