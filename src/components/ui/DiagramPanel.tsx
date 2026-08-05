'use client';

import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCanvasStore } from '../../store/canvasStore';
import { diagramToCanvasElements, parseDiagramCode } from '../../lib/diagramParser';

/* ─── Sample diagrams ────────────────────────────────────────────────── */
const SAMPLES: Record<string, string> = {
  'Custom DSL': `// Custom DSL — nodes, edges, styles, groups
node LB   "Load Balancer"   rect
node API  "API Gateway"     rect
node AUTH "Auth Service"    rect
node DB   "PostgreSQL"      rect
node CACHE "Redis Cache"    rect
node MQ   "Message Queue"   rect

edge LB -> API
edge API -> AUTH  "verify"
edge API -> DB    "query"
edge API -> CACHE "cache"
edge API -> MQ    "publish"

style LB    fill:#DBEAFE stroke:#1976D2
style API   fill:#E8F5E9 stroke:#388E3C
style AUTH  fill:#FFF3E0 stroke:#F57C00
style DB    fill:#EDE7F6 stroke:#7B1FA2
style CACHE fill:#FCE4EC stroke:#E91E63
style MQ    fill:#E0F2F1 stroke:#00796B

group "Data Layer" DB CACHE
group "Services"   API AUTH`,

  'Mermaid Flowchart': `flowchart TD
  A[User Request] --> B{Auth Check}
  B -->|Pass| C[API Gateway]
  B -->|Fail| D[401 Unauthorized]
  C --> E[Load Balancer]
  E --> F[Service A]
  E --> G[Service B]
  F & G --> H[(Database)]
  H --> I[Cache]
  I --> J((Response))`,

  'System Design': `flowchart LR
  Client[Client App] --> CDN[CDN / Edge]
  CDN --> LB[Load Balancer]
  LB --> API1[API Server 1]
  LB --> API2[API Server 2]
  API1 & API2 --> Cache[(Redis)]
  API1 & API2 --> DB[(PostgreSQL)]
  DB --> Replica[(Read Replica)]`,

  'Sequence': `sequence
participant Client
participant Gateway
participant AuthService
participant Database

Client -> Gateway: POST /login
Gateway -> AuthService: Validate token
AuthService --> Gateway: Token valid
Gateway -> Database: Fetch user
Database --> Gateway: User record
Gateway --> Client: 200 OK + JWT`,
};

/* ─── Direction options ──────────────────────────────────────────────── */
const DIRECTIONS = [
  { id: 'TB', label: 'Top → Bottom' },
  { id: 'LR', label: 'Left → Right' },
  { id: 'BT', label: 'Bottom → Top' },
  { id: 'RL', label: 'Right → Left' },
] as const;

interface DiagramPanelProps {
  onClose: () => void;
}

export const DiagramPanel: React.FC<DiagramPanelProps> = ({ onClose }) => {
  const store = useCanvasStore();
  const [code, setCode] = useState(SAMPLES['Custom DSL']);
  const [direction, setDirection] = useState<'TB' | 'LR' | 'BT' | 'RL'>('TB');
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const [activeSample, setActiveSample] = useState('Custom DSL');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Live validation — parse without laying out
  const validate = useCallback((src: string) => {
    const { errors: errs } = parseDiagramCode(src);
    setErrors(errs);
  }, []);

  const handleCodeChange = (v: string) => {
    setCode(v);
    setSuccess(false);
    validate(v);
  };

  const handleSample = (name: string) => {
    setActiveSample(name);
    setCode(SAMPLES[name]);
    setSuccess(false);
    validate(SAMPLES[name]);
  };

  const handleRender = () => {
    const vp = store.viewport;
    const vw = typeof window !== 'undefined' ? window.innerWidth  : 1200;
    const vh = typeof window !== 'undefined' ? window.innerHeight : 800;

    // Place diagram near canvas center
    const originX = (vw / 2 - vp.x) / vp.zoom - 200;
    const originY = (vh / 2 - vp.y) / vp.zoom - 150;

    const { elements, errors: errs } = diagramToCanvasElements(code, {
      direction,
      originX: Math.max(40, originX),
      originY: Math.max(40, originY),
      nodeSpacingX: 100,  // Increased from 60
      nodeSpacingY: 120,  // Increased from 80
    });

    if (errs.length > 0) {
      setErrors(errs);
      return;
    }

    store.pushHistory();
    // Add all elements at once
    elements.forEach((el) => store.addElement(el));
    // Select all newly added elements
    store.setSelected(elements.map((e) => e.id));

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 900);
  };

  // Tab key inserts spaces instead of leaving the textarea
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const ta = textareaRef.current!;
      const start = ta.selectionStart;
      const end   = ta.selectionEnd;
      const next  = code.slice(0, start) + '  ' + code.slice(end);
      setCode(next);
      requestAnimationFrame(() => {
        ta.selectionStart = ta.selectionEnd = start + 2;
      });
    }
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handleRender();
    }
  };

  const preview = parseDiagramCode(code);
  const nodeCount = preview.nodes.length;
  const edgeCount = preview.edges.length;

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="glass-panel flex flex-col w-full sm:max-w-[760px]"
        style={{
          borderRadius: '20px 20px 0 0',
          maxHeight: '92vh',
          overflow: 'hidden',
        }}
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 360, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="rounded-full" style={{ width: 36, height: 4, background: 'var(--border)' }} />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-1 pb-4 flex-shrink-0" style={{ borderBottom: '0.5px solid var(--border)' }}>
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center rounded-[10px]" style={{ width: 34, height: 34, background: 'var(--accent-glow)' }}>
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="6" height="6" rx="1"/>
                <rect x="15" y="3" width="6" height="6" rx="1"/>
                <rect x="9" y="15" width="6" height="6" rx="1"/>
                <path d="M6 9v3a3 3 0 003 3h6a3 3 0 003-3V9"/>
              </svg>
            </div>
            <div>
              <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-ui)' }}>
                Diagram-as-Code
              </p>
              <p style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-ui)' }}>
                {nodeCount} node{nodeCount !== 1 ? 's' : ''} · {edgeCount} edge{edgeCount !== 1 ? 's' : ''} · ⌘↵ to render
              </p>
            </div>
          </div>
          <button onClick={onClose} className="icon-button" style={{ width: 32, height: 32, borderRadius: 9 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Sample buttons */}
        <div className="flex items-center gap-1.5 px-5 py-3 overflow-x-auto flex-shrink-0" style={{ borderBottom: '0.5px solid var(--border)' }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', fontFamily: 'var(--font-ui)', textTransform: 'uppercase', letterSpacing: '0.07em', marginRight: 4, flexShrink: 0 }}>
            Examples:
          </span>
          {Object.keys(SAMPLES).map((name) => (
            <button
              key={name}
              onClick={() => handleSample(name)}
              className="rounded-full whitespace-nowrap transition-all active:scale-95 flex-shrink-0"
              style={{
                padding: '4px 12px',
                fontSize: 12, fontWeight: 500,
                fontFamily: 'var(--font-ui)',
                border: 'none', cursor: 'pointer',
                background: activeSample === name ? 'var(--accent)' : 'var(--bg-secondary)',
                color: activeSample === name ? 'white' : 'var(--text-secondary)',
              }}
            >
              {name}
            </button>
          ))}
        </div>

        {/* Main area: editor + options */}
        <div className="flex flex-1 min-h-0 overflow-hidden">
          {/* Code editor */}
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => handleCodeChange(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              className="flex-1 resize-none outline-none p-4"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
                lineHeight: 1.65,
                color: 'var(--text-primary)',
                background: 'var(--bg-secondary)',
                border: 'none',
                borderRight: '0.5px solid var(--border)',
                minHeight: 260,
                tabSize: 2,
              }}
            />
            {/* Error list */}
            <AnimatePresence>
              {errors.length > 0 && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden flex-shrink-0"
                  style={{ background: 'rgba(255,59,48,0.08)', borderTop: '0.5px solid rgba(255,59,48,0.2)' }}
                >
                  <div className="px-4 py-2.5">
                    {errors.map((err, i) => (
                      <div key={i} className="flex items-start gap-2" style={{ fontSize: 12, color: 'var(--red)', fontFamily: 'var(--font-mono)', lineHeight: 1.5 }}>
                        <span>⚠</span>
                        <span>{err}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Options sidebar */}
          <div className="flex flex-col gap-4 p-4 flex-shrink-0" style={{ width: 180 }}>
            <div>
              <p className="mb-2" style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', fontFamily: 'var(--font-ui)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                Direction
              </p>
              {DIRECTIONS.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setDirection(d.id)}
                  className="w-full flex items-center gap-2 rounded-[8px] px-3 py-2 mb-1 transition-all text-left"
                  style={{
                    fontSize: 12, fontFamily: 'var(--font-ui)', border: 'none', cursor: 'pointer',
                    background: direction === d.id ? 'var(--accent-glow)' : 'transparent',
                    color: direction === d.id ? 'var(--accent)' : 'var(--text-secondary)',
                    fontWeight: direction === d.id ? 600 : 400,
                  }}
                >
                  <div
                    className="rounded flex-shrink-0"
                    style={{
                      width: 8, height: 8, borderRadius: '50%',
                      background: direction === d.id ? 'var(--accent)' : 'var(--border)',
                    }}
                  />
                  {d.label}
                </button>
              ))}
            </div>

            {/* Syntax reference */}
            <div style={{ borderTop: '0.5px solid var(--border)', paddingTop: 12 }}>
              <p className="mb-2" style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', fontFamily: 'var(--font-ui)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>
                Quick Ref
              </p>
              {[
                ['node A "Label" rect', 'Define node'],
                ['edge A -> B', 'Arrow'],
                ['edge A --> B', 'Dashed'],
                ['style A fill:#fff', 'Style'],
                ['group "G" A B', 'Frame'],
                ['flowchart TD', 'Mermaid'],
                ['A[Box] --> B', 'Mermaid edge'],
              ].map(([code, desc]) => (
                <div key={code} className="mb-1.5">
                  <code style={{ fontSize: 10, color: 'var(--accent)', fontFamily: 'var(--font-mono)', display: 'block' }}>{code}</code>
                  <span style={{ fontSize: 10, color: 'var(--text-muted)', fontFamily: 'var(--font-ui)' }}>{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-4 flex-shrink-0" style={{ borderTop: '0.5px solid var(--border)' }}>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', fontFamily: 'var(--font-ui)' }}>
            Supports Custom DSL · Mermaid Flowchart · Sequence
          </p>
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="ghost-button" style={{ padding: '6px 16px', fontSize: 14 }}>
              Cancel
            </button>
            <button
              onClick={handleRender}
              disabled={nodeCount === 0}
              className="primary-button"
              style={{ padding: '6px 18px', fontSize: 14 }}
            >
              {success ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Added!
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                  Render to Canvas
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
