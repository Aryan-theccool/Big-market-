'use client';

import React, { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useEditorStore } from '@/store/editorStore';
import { MarkdownEditor } from './MarkdownEditor';

interface SplitScreenLayoutProps {
  roomId: string;
  canvasSlot: React.ReactNode;
}

export const SplitScreenLayout: React.FC<SplitScreenLayoutProps> = ({ roomId, canvasSlot }) => {
  const { splitMode, splitRatio, setSplitRatio } = useEditorStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  // Drag the divider to resize panes
  const onDividerPointerDown = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    isDraggingRef.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onDividerPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    setSplitRatio(ratio);
  }, [setSplitRatio]);

  const onDividerPointerUp = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  if (splitMode === 'canvas') {
    return <>{canvasSlot}</>;
  }

  if (splitMode === 'editor') {
    return (
      <motion.div
        className="absolute inset-0 top-[52px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.18 }}
      >
        <MarkdownEditor roomId={roomId} />
      </motion.div>
    );
  }

  // split mode
  const editorPct = Math.round(splitRatio * 100);
  const canvasPct = 100 - editorPct;

  return (
    <motion.div
      ref={containerRef}
      className="absolute inset-0 top-[52px] flex"
      style={{ bottom: 32 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      onPointerMove={onDividerPointerMove}
      onPointerUp={onDividerPointerUp}
    >
      {/* Editor pane */}
      <div
        className="flex-shrink-0 overflow-hidden"
        style={{ width: `${editorPct}%` }}
      >
        <MarkdownEditor roomId={roomId} />
      </div>

      {/* Draggable divider */}
      <div
        className="relative flex-shrink-0 flex items-center justify-center group"
        style={{
          width: 6,
          background: 'var(--border)',
          cursor: 'col-resize',
          userSelect: 'none',
          zIndex: 100,
        }}
        onPointerDown={onDividerPointerDown}
      >
        {/* Visual handle pill */}
        <div
          className="absolute flex flex-col gap-0.5 items-center justify-center rounded-full transition-all group-hover:scale-110"
          style={{
            width: 16, height: 40,
            background: 'var(--bg-panel)',
            backdropFilter: 'var(--blur-panel)',
            border: '0.5px solid var(--border)',
            boxShadow: 'var(--shadow-md)',
            pointerEvents: 'none',
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{ width: 2, height: 2, borderRadius: '50%', background: 'var(--text-muted)' }}
            />
          ))}
        </div>
      </div>

      {/* Canvas pane */}
      <div
        className="flex-shrink-0 overflow-hidden relative"
        style={{ width: `${canvasPct}%` }}
      >
        {canvasSlot}
      </div>
    </motion.div>
  );
};
