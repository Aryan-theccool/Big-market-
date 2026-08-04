'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';
import { useCanvasStore } from '../../store/canvasStore';
import { ICON_CATEGORIES, ICON_LIBRARY, TechIconItem, filterIcons, getIconById } from '../../lib/iconRegistry';

interface IconLibraryPanelProps {
  onClose: () => void;
}

const RECENT_KEY = 'inkspace-recent-icons';

function readRecent(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeRecent(ids: string[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(ids.slice(0, 18)));
  } catch {
    // ignore storage failures
  }
}

function IconCard({ icon, onAdd, compact = false }: { icon: TechIconItem; onAdd: (icon: TechIconItem) => void; compact?: boolean }) {
  return (
    <button
      onClick={() => onAdd(icon)}
      className="group flex flex-col items-center justify-center text-center rounded-[16px] transition-all active:scale-95"
      style={{
        minHeight: compact ? 82 : 116,
        padding: compact ? 10 : 14,
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border)',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--accent)';
        e.currentTarget.style.background = 'var(--accent-glow)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.background = 'var(--bg-secondary)';
      }}
      title={`Add ${icon.name}`}
    >
      <div
        className="flex items-center justify-center rounded-[12px] mb-2 transition-transform group-hover:scale-110"
        style={{
          width: compact ? 42 : 54,
          height: compact ? 42 : 54,
          background: 'var(--bg-surface)',
          border: '0.5px solid var(--border)',
        }}
      >
        <Icon icon={icon.id} width={compact ? 28 : 36} height={compact ? 28 : 36} />
      </div>
      <span
        style={{
          fontFamily: 'var(--font-ui)',
          fontSize: compact ? 11 : 12,
          fontWeight: 650,
          color: 'var(--text-primary)',
          maxWidth: '100%',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {icon.name}
      </span>
      {!compact && (
        <span style={{ fontFamily: 'var(--font-ui)', fontSize: 10, color: 'var(--text-muted)', marginTop: 3 }}>
          {icon.category}
        </span>
      )}
    </button>
  );
}

export const IconLibraryPanel: React.FC<IconLibraryPanelProps> = ({ onClose }) => {
  const store = useCanvasStore();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<(typeof ICON_CATEGORIES)[number]>('All');
  const [recent, setRecent] = useState<string[]>([]);
  const [added, setAdded] = useState<string | null>(null);
  const [addCount, setAddCount] = useState(0);

  useEffect(() => {
    setRecent(readRecent());
  }, []);

  const filtered = useMemo(() => filterIcons(query, category), [query, category]);
  const popular = useMemo(() => ICON_LIBRARY.filter((icon) => icon.popular).slice(0, 18), []);
  const recentIcons = useMemo(() => recent.map(getIconById).filter(Boolean) as TechIconItem[], [recent]);

  const addIconToCanvas = (icon: TechIconItem) => {
    const vp = store.viewport;
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
    const size = 112;
    const stagger = (addCount % 6) * 18;
    const x = (vw / 2 - vp.x) / vp.zoom - size / 2 + stagger;
    const y = (vh / 2 - vp.y) / vp.zoom - size / 2 + stagger;
    const maxZ = store.elements.length ? Math.max(...store.elements.map((el) => el.z || 0)) : 0;

    store.addElement({
      id: 'icon_' + Math.random().toString(36).slice(2, 10),
      type: 'icon',
      x: Math.max(40, x),
      y: Math.max(40, y),
      w: size,
      h: size,
      iconId: icon.id,
      iconName: icon.name,
      text: icon.name,
      fill: 'var(--bg-surface)',
      stroke: 'var(--text-primary)',
      z: maxZ + 1,
    });

    const nextRecent = [icon.id, ...recent.filter((id) => id !== icon.id)].slice(0, 18);
    setRecent(nextRecent);
    writeRecent(nextRecent);
    setAdded(icon.name);
    setAddCount((c) => c + 1);
    setTimeout(() => setAdded(null), 1400);
  };

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.42)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="glass-panel w-full sm:max-w-[900px] flex flex-col overflow-hidden"
        style={{
          borderRadius: '22px 22px 0 0',
          maxHeight: '90vh',
          boxShadow: 'var(--shadow-lg)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
        initial={{ y: 60, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 36, opacity: 0, scale: 0.99 }}
        transition={{ type: 'spring', stiffness: 360, damping: 32 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="rounded-full" style={{ width: 38, height: 4, background: 'var(--border)' }} />
        </div>

        {/* Header */}
        <div className="px-5 pt-2 pb-4 flex-shrink-0" style={{ borderBottom: '0.5px solid var(--border)' }}>
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <h2 style={{ fontFamily: 'var(--font-ui)', fontSize: 20, fontWeight: 750, color: 'var(--text-primary)' }}>
                Tech Icon Library
              </h2>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
                {ICON_LIBRARY.length} curated language, framework, cloud, database and tool icons. Click any icon to add it to the canvas.
              </p>
            </div>
            <button onClick={onClose} className="icon-button" style={{ flexShrink: 0 }} aria-label="Close icon library">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>

          {/* Search */}
          <div
            className="mt-4 flex items-center gap-2 rounded-[14px] px-3 py-2"
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  e.preventDefault();
                  if (query) setQuery('');
                  else onClose();
                }
              }}
              placeholder="Search Python, React, Docker, AWS, Postgres..."
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-ui)',
                fontSize: 14,
              }}
            />
            {query && (
              <button onClick={() => setQuery('')} className="icon-button" style={{ width: 24, height: 24, borderRadius: 7 }}>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            )}
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-1.5 px-5 py-3 overflow-x-auto flex-shrink-0" style={{ borderBottom: '0.5px solid var(--border)' }}>
          {ICON_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className="rounded-full whitespace-nowrap transition-all active:scale-95 flex-shrink-0"
              style={{
                padding: '6px 13px',
                fontFamily: 'var(--font-ui)',
                fontSize: 12,
                fontWeight: 650,
                border: 'none',
                cursor: 'pointer',
                background: category === cat ? 'var(--accent)' : 'var(--bg-secondary)',
                color: category === cat ? 'white' : 'var(--text-secondary)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          {!query && category === 'All' && recentIcons.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <p style={{ fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 750, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Recent
                </p>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-9 gap-3">
                {recentIcons.map((icon) => <IconCard key={icon.id} icon={icon} onAdd={addIconToCanvas} compact />)}
              </div>
            </div>
          )}

          {!query && category === 'All' && (
            <div className="mb-6">
              <p className="mb-3" style={{ fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 750, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Popular
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                {popular.map((icon) => <IconCard key={icon.id} icon={icon} onAdd={addIconToCanvas} />)}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mb-3">
            <p style={{ fontFamily: 'var(--font-ui)', fontSize: 12, fontWeight: 750, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              {query ? `Results for “${query}”` : category === 'All' ? 'All icons' : category}
            </p>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
              {filtered.length} icons
            </span>
          </div>

          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
              {filtered.map((icon) => <IconCard key={icon.id} icon={icon} onAdd={addIconToCanvas} />)}
            </div>
          ) : (
            <div className="py-16 text-center rounded-[18px]" style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🔎</div>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: 15, fontWeight: 700, color: 'var(--text-primary)' }}>No icons found</p>
              <p style={{ fontFamily: 'var(--font-ui)', fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
                Try searching for language, framework, database, cloud, or tool names.
              </p>
            </div>
          )}
        </div>

        {/* Added toast */}
        <AnimatePresence>
          {added && (
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 bottom-5 rounded-full px-4 py-2"
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)', fontFamily: 'var(--font-ui)', fontSize: 13, fontWeight: 650, color: 'var(--text-primary)' }}
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.98 }}
            >
              Added {added} to canvas
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};
