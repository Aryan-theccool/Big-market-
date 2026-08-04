'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import type { CanvasElement } from '../../store/canvasStore';

interface IconElementProps {
  element: CanvasElement;
  isSelected: boolean;
  onPointerDown: (e: React.PointerEvent) => void;
}

export const IconElement: React.FC<IconElementProps> = ({ element, isSelected, onPointerDown }) => {
  const w = element.w || 104;
  const h = element.h || 104;
  const label = element.text || element.iconName || '';
  const iconSize = Math.max(28, Math.min(w, h) * (label ? 0.54 : 0.68));

  return (
    <div
      data-id={element.id}
      className="absolute pointer-events-auto select-none group"
      onPointerDown={onPointerDown}
      style={{
        left: element.x,
        top: element.y,
        width: w,
        height: h,
        zIndex: element.z || 0,
        opacity: element.opacity ?? 1,
        transform: `rotate(${element.rot || 0}deg)`,
        transformOrigin: 'center',
        borderRadius: 16,
        border: isSelected ? '1.5px solid var(--accent)' : '1px solid transparent',
        background: isSelected ? 'var(--accent-glow)' : 'transparent',
        boxShadow: isSelected ? '0 8px 26px rgba(0,113,227,0.12)' : 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        cursor: 'move',
      }}
    >
      <div
        className="flex items-center justify-center rounded-[14px] transition-transform group-hover:scale-[1.04]"
        style={{
          width: Math.max(48, w - 24),
          height: label ? Math.max(48, h - 40) : Math.max(48, h - 20),
          background: element.fill || 'var(--bg-surface)',
          border: '0.5px solid var(--border)',
        }}
      >
        <Icon
          icon={element.iconId || 'logos:javascript'}
          width={iconSize}
          height={iconSize}
          color={element.iconColor}
          aria-hidden
        />
      </div>

      {label && (
        <div
          style={{
            marginTop: 7,
            maxWidth: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            textAlign: 'center',
            fontFamily: 'var(--font-ui)',
            fontSize: element.fontSize || 12,
            fontWeight: element.bold ? 700 : 600,
            color: element.stroke || 'var(--text-primary)',
            lineHeight: 1.15,
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};
