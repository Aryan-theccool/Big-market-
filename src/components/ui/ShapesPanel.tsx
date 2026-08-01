'use client';

import React, { useState } from 'react';
import { useCanvasStore } from '../../store/canvasStore';
import { CLOUD_SHAPES, groupShapesByProvider, CloudProvider } from '../../lib/cloudShapes';
import type { CloudShapeDef } from '../../lib/cloudShapes';

interface ShapesPanelProps {
  onClose: () => void;
}

const PROVIDERS: CloudProvider[] = ['AWS', 'Azure', 'GCP', 'K8s', 'Generic'];

export const ShapesPanel: React.FC<ShapesPanelProps> = ({ onClose }) => {
  const store = useCanvasStore();
  const [activeProvider, setActiveProvider] = useState<CloudProvider>('AWS');
  const grouped = groupShapesByProvider();

  const shapes = grouped[activeProvider] || [];

  const handleSelectShape = (shape: CloudShapeDef) => {
    const vp = store.viewport;
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const vh = typeof window !== 'undefined' ? window.innerHeight : 800;

    // Center in viewport
    const x = (vw / 2 - vp.x) / vp.zoom - shape.defaultW / 2;
    const y = (vh / 2 - vp.y) / vp.zoom - shape.defaultH / 2;

    store.addElement({
      type: 'cloud-shape',
      id: `cloud-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      x: Math.max(40, x),
      y: Math.max(40, y),
      w: shape.defaultW,
      h: shape.defaultH,
      shapeId: shape.id,
      fill: shape.defaultFill,
      stroke: shape.defaultStroke,
      z: Math.max(...store.elements.map((e) => e.z), 0) + 1,
    });

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="w-full max-w-2xl max-h-[80vh] rounded-2xl glass-panel flex flex-col overflow-hidden"
        style={{
          boxShadow: 'var(--shadow-lg)',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/20 flex-shrink-0">
          <h2 className="text-lg font-semibold text-slate-900">Cloud & Engineering Shapes</h2>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Close"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-4 py-3 border-b border-white/20 flex-shrink-0 overflow-x-auto">
          {PROVIDERS.map((provider) => (
            <button
              key={provider}
              onClick={() => setActiveProvider(provider)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-all whitespace-nowrap flex-shrink-0 ${
                activeProvider === provider
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {provider}
            </button>
          ))}
        </div>

        {/* Shapes Grid */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 p-6">
            {shapes.map((shape) => (
              <ShapeCard
                key={shape.id}
                shape={shape}
                onSelect={() => handleSelectShape(shape)}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-white/20 text-sm text-slate-500 bg-slate-50/50">
          {shapes.length} shape{shapes.length !== 1 ? 's' : ''} in {activeProvider}
        </div>
      </div>
    </div>
  );
};

interface ShapeCardProps {
  shape: CloudShapeDef;
  onSelect: () => void;
}

const ShapeCard: React.FC<ShapeCardProps> = ({ shape, onSelect }) => {
  return (
    <button
      onClick={onSelect}
      className="p-4 border border-slate-200 rounded-xl hover:border-blue-400 hover:bg-blue-50/50 transition-all group cursor-pointer"
    >
      {/* Icon Preview */}
      <div className="flex items-center justify-center h-24 mb-3 bg-slate-50 rounded-lg group-hover:bg-white transition-colors">
        <shape.Icon width={48} height={48} fill={shape.defaultFill} stroke={shape.defaultStroke} />
      </div>

      {/* Label */}
      <p className="font-semibold text-sm text-slate-900 text-center mb-1">{shape.label}</p>

      {/* Category */}
      <p className="text-xs text-slate-500 text-center">{shape.category}</p>
    </button>
  );
};
