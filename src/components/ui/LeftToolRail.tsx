'use client';

import React from 'react';
import { useCanvasStore } from '../../store/canvasStore';
import { triggerImageUpload } from '../../utils/imageHelper';

const TOOLS = [
  { id: 'select',      label: 'Select',      shortcut: 'V', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 3l14 9-7 2-4 7z"/></svg> },
  { id: 'hand',        label: 'Pan',         shortcut: 'H', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 11V6a2 2 0 00-2-2v0a2 2 0 00-2 2v0M14 10V4a2 2 0 00-2-2v0a2 2 0 00-2 2v2M10 10.5V6a2 2 0 00-2-2v0a2 2 0 00-2 2v8"/><path d="M18 11a2 2 0 114 0v3a8 8 0 01-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 012.83-2.82L7 15"/></svg> },
  { id: 'note',        label: 'Sticky Note', shortcut: 'N', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h8"/><polyline points="14 2 14 8 20 8"/><path d="M16 17l5 5M21 17l-5 5"/></svg> },
  { id: 'text',        label: 'Text',        shortcut: 'T', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></svg> },
  { id: 'draw',        label: 'Freehand',   shortcut: 'D', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 17c3-3 6 3 9 0s6-3 9 0"/><path d="M3 12c3-3 6 3 9 0s6-3 9 0"/></svg> },
  { id: 'eraser',      label: 'Eraser',     shortcut: 'E', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.5l12-12c1-1 2.5-1 3.5 0l4.3 4.3c1 1 1 2.5 0 3.5L10.5 21Z"/><path d="M6 14h11"/></svg> },
  { id: 'rect',        label: 'Rectangle',  shortcut: 'R', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/></svg> },
  { id: 'circle',      label: 'Circle',     shortcut: 'C', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/></svg> },
  { id: 'line',        label: 'Line',       shortcut: 'L', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="19" x2="19" y2="5"/></svg> },
  { id: 'arrow',       label: 'Arrow',      shortcut: 'A', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="19" x2="19" y2="5"/><polyline points="9 5 19 5 19 15"/></svg> },
  { id: 'image',       label: 'Image',      shortcut: 'I', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg> },
  { id: 'frame',       label: 'Frame',      shortcut: 'F', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/></svg> },
  { id: 'export',      label: 'Export Reg.',shortcut: 'Q', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><rect x="8" y="2" width="8" height="8" rx="1" strokeDasharray="3 2"/></svg> },
];

interface LeftToolRailProps {
  onOpenTemplates?: () => void;
  onOpenDiagram?: () => void;
  onOpenShapes?: () => void;
  onOpenIcons?: () => void;
}

export const LeftToolRail: React.FC<LeftToolRailProps> = ({ onOpenTemplates, onOpenDiagram, onOpenShapes, onOpenIcons }) => {
  const store = useCanvasStore();
  const activeTool = store.activeTool;

  return (
    <div
      id="left-toolbar"
      className="absolute left-3 z-[9000] flex-col gap-0.5 p-1.5 glass-panel hidden md:flex"
      style={{
        top: '50%',
        transform: 'translateY(-50%)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-md)',
      }}
    >
      {TOOLS.map((tool) => {
        const isActive = activeTool === tool.id;
        return (
          <div key={tool.id} className="relative group">
            <button
              onClick={() => {
                if (tool.id === 'image') {
                  triggerImageUpload(store);
                } else {
                  store.setTool(tool.id);
                }
              }}
              title={`${tool.label}  ${tool.shortcut}`}
              className="flex items-center justify-center rounded-[10px] transition-all active:scale-95"
              style={{
                width: 36, height: 36,
                background: isActive ? 'var(--accent)' : 'transparent',
                color: isActive ? 'white' : 'var(--text-secondary)',
                border: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = 'var(--bg-hover)'; }}
              onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
            >
              {tool.icon}
            </button>
            {/* Tooltip */}
            <div
              className="pointer-events-none absolute left-full ml-2.5 top-1/2 -translate-y-1/2 flex items-center gap-2 rounded-[8px] px-2.5 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-100 whitespace-nowrap z-50"
              style={{
                background: 'var(--bg-surface)',
                boxShadow: 'var(--shadow-lg)',
                border: '0.5px solid var(--border)',
              }}
            >
              <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)', fontFamily: 'var(--font-ui)' }}>{tool.label}</span>
              <kbd style={{
                fontSize: 10, color: 'var(--text-muted)',
                background: 'var(--bg-secondary)',
                border: '0.5px solid var(--border)',
                borderRadius: 4, padding: '1px 5px',
                fontFamily: 'var(--font-mono)',
              }}>{tool.shortcut}</kbd>
            </div>
          </div>
        );
      })}

      {/* Zoom to Fit All */}
      <div className="relative group">
        <button
          onClick={() => {
            if (typeof window !== 'undefined') {
              store.fitToScreen(window.innerWidth, window.innerHeight);
            }
          }}
          title="Zoom to Fit  Z"
          className="flex items-center justify-center rounded-[10px] transition-all active:scale-95"
          style={{ width: 36, height: 36, background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-hover)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 3H5a2 2 0 00-2 2v3m16-5h3a2 2 0 012 2v3M3 16v3a2 2 0 002 2h3m14 0h3a2 2 0 002-2v-3"/>
            <circle cx="12" cy="12" r="3"/>
          </svg>
        </button>
        <div className="pointer-events-none absolute left-full ml-2.5 top-1/2 -translate-y-1/2 flex items-center gap-2 rounded-[8px] px-2.5 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-100 whitespace-nowrap z-50"
          style={{ background: 'var(--bg-surface)', boxShadow: 'var(--shadow-lg)', border: '0.5px solid var(--border)' }}>
          <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)', fontFamily: 'var(--font-ui)' }}>Zoom to Fit</span>
          <kbd style={{ fontSize: 10, color: 'var(--text-muted)', background: 'var(--bg-secondary)', border: '0.5px solid var(--border)', borderRadius: 4, padding: '1px 5px', fontFamily: 'var(--font-mono)' }}>Z</kbd>
        </div>
      </div>

      {/* Separator + templates + delete */}
      <div style={{ height: 1, background: 'var(--border)', margin: '2px 0' }} />
      {onOpenTemplates && (
        <div className="relative group">
          <button
            onClick={onOpenTemplates}
            title="Templates  ⇧T"
            className="flex items-center justify-center rounded-[10px] transition-all active:scale-95"
            style={{ width: 36, height: 36, background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
              <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
            </svg>
          </button>
          <div className="pointer-events-none absolute left-full ml-2.5 top-1/2 -translate-y-1/2 flex items-center gap-2 rounded-[8px] px-2.5 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-100 whitespace-nowrap z-50"
            style={{ background: 'var(--bg-surface)', boxShadow: 'var(--shadow-lg)', border: '0.5px solid var(--border)' }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)', fontFamily: 'var(--font-ui)' }}>Templates</span>
            <kbd style={{ fontSize: 10, color: 'var(--text-muted)', background: 'var(--bg-secondary)', border: '0.5px solid var(--border)', borderRadius: 4, padding: '1px 5px', fontFamily: 'var(--font-mono)' }}>⇧T</kbd>
          </div>
        </div>
      )}

      {/* Diagram-as-Code */}
      {onOpenDiagram && (
        <div className="relative group">
          <button
            onClick={onOpenDiagram}
            title="Diagram-as-Code  ⇧D"
            className="flex items-center justify-center rounded-[10px] transition-all active:scale-95"
            style={{ width: 36, height: 36, background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="6" height="6" rx="1"/>
              <rect x="15" y="3" width="6" height="6" rx="1"/>
              <rect x="9" y="15" width="6" height="6" rx="1"/>
              <path d="M6 9v3a3 3 0 003 3h6a3 3 0 003-3V9"/>
            </svg>
          </button>
          <div className="pointer-events-none absolute left-full ml-2.5 top-1/2 -translate-y-1/2 flex items-center gap-2 rounded-[8px] px-2.5 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-100 whitespace-nowrap z-50"
            style={{ background: 'var(--bg-surface)', boxShadow: 'var(--shadow-lg)', border: '0.5px solid var(--border)' }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)', fontFamily: 'var(--font-ui)' }}>Diagram-as-Code</span>
            <kbd style={{ fontSize: 10, color: 'var(--text-muted)', background: 'var(--bg-secondary)', border: '0.5px solid var(--border)', borderRadius: 4, padding: '1px 5px', fontFamily: 'var(--font-mono)' }}>⇧D</kbd>
          </div>
        </div>
      )}

      {/* Cloud Shapes Library */}
      {onOpenShapes && (
        <div className="relative group">
          <button
            onClick={onOpenShapes}
            title="Cloud Shapes  ⇧S"
            className="flex items-center justify-center rounded-[10px] transition-all active:scale-95"
            style={{ width: 36, height: 36, background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
            </svg>
          </button>
          <div className="pointer-events-none absolute left-full ml-2.5 top-1/2 -translate-y-1/2 flex items-center gap-2 rounded-[8px] px-2.5 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-100 whitespace-nowrap z-50"
            style={{ background: 'var(--bg-surface)', boxShadow: 'var(--shadow-lg)', border: '0.5px solid var(--border)' }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)', fontFamily: 'var(--font-ui)' }}>Cloud Shapes</span>
            <kbd style={{ fontSize: 10, color: 'var(--text-muted)', background: 'var(--bg-secondary)', border: '0.5px solid var(--border)', borderRadius: 4, padding: '1px 5px', fontFamily: 'var(--font-mono)' }}>⇧S</kbd>
          </div>
        </div>
      )}

      {/* Technology Icon Library */}
      {onOpenIcons && (
        <div className="relative group">
          <button
            onClick={onOpenIcons}
            title="Tech Icons  ⇧I"
            className="flex items-center justify-center rounded-[10px] transition-all active:scale-95"
            style={{ width: 36, height: 36, background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-hover)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 16H5a2 2 0 01-2-2V5a2 2 0 012-2h3"/>
              <path d="M16 3h3a2 2 0 012 2v9a2 2 0 01-2 2h-3"/>
              <path d="M10 20l4-16"/>
              <path d="M8 8l-3 3 3 3"/>
              <path d="M16 8l3 3-3 3"/>
            </svg>
          </button>
          <div className="pointer-events-none absolute left-full ml-2.5 top-1/2 -translate-y-1/2 flex items-center gap-2 rounded-[8px] px-2.5 py-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-100 whitespace-nowrap z-50"
            style={{ background: 'var(--bg-surface)', boxShadow: 'var(--shadow-lg)', border: '0.5px solid var(--border)' }}>
            <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)', fontFamily: 'var(--font-ui)' }}>Tech Icons</span>
            <kbd style={{ fontSize: 10, color: 'var(--text-muted)', background: 'var(--bg-secondary)', border: '0.5px solid var(--border)', borderRadius: 4, padding: '1px 5px', fontFamily: 'var(--font-mono)' }}>⇧I</kbd>
          </div>
        </div>
      )}
      <button
        onClick={store.deleteSelected}
        title="Delete selected  Del"
        className="flex items-center justify-center rounded-[10px] transition-all active:scale-95"
        style={{ width: 36, height: 36, background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--red)' }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,59,48,0.08)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/>
        </svg>
      </button>
    </div>
  );
};
