'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import { getYRoom, getOrInitProvider } from '@/lib/yjs';
import { useCollabStore } from '@/store/collabStore';

/* ─── Toolbar button ─────────────────────────────────────────────────── */
function TBtn({
  onClick, active, disabled, title, children,
}: {
  onClick: () => void; active?: boolean; disabled?: boolean;
  title?: string; children: React.ReactNode;
}) {
  return (
    <button
      onMouseDown={(e) => { e.preventDefault(); onClick(); }}
      disabled={disabled}
      title={title}
      className="flex items-center justify-center rounded-[7px] transition-all active:scale-95 disabled:opacity-30"
      style={{
        width: 28, height: 28, border: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
        background: active ? 'var(--accent)' : 'transparent',
        color: active ? 'white' : 'var(--text-secondary)',
        fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-ui)',
      }}
      onMouseEnter={(e) => { if (!active && !disabled) e.currentTarget.style.background = 'var(--bg-hover)'; }}
      onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent'; }}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div style={{ width: 1, height: 18, background: 'var(--border)', margin: '0 2px', flexShrink: 0 }} />;
}

/* ─── Toolbar ────────────────────────────────────────────────────────── */
function EditorToolbar({ editor }: { editor: any }) {
  if (!editor) return null;

  return (
    <div
      className="flex items-center gap-0.5 flex-wrap px-3 py-2 flex-shrink-0"
      style={{ borderBottom: '0.5px solid var(--border)', background: 'var(--bg-panel)', backdropFilter: 'var(--blur-panel)' }}
    >
      {/* History */}
      <TBtn onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo (⌘Z)">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 14L4 9l5-5"/><path d="M4 9h11a6 6 0 010 12h-1"/></svg>
      </TBtn>
      <TBtn onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo (⌘⇧Z)">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 14l5-5-5-5"/><path d="M20 9H9a6 6 0 000 12h1"/></svg>
      </TBtn>

      <Divider />

      {/* Headings */}
      <TBtn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })} title="Heading 1">H1</TBtn>
      <TBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Heading 2">H2</TBtn>
      <TBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="Heading 3">H3</TBtn>
      <TBtn onClick={() => editor.chain().focus().setParagraph().run()} active={editor.isActive('paragraph')} title="Paragraph">¶</TBtn>

      <Divider />

      {/* Inline marks */}
      <TBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold (⌘B)">
        <b>B</b>
      </TBtn>
      <TBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic (⌘I)">
        <i style={{ fontStyle: 'italic' }}>I</i>
      </TBtn>
      <TBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Underline (⌘U)">
        <u>U</u>
      </TBtn>
      <TBtn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="Strikethrough">
        <s>S</s>
      </TBtn>
      <TBtn onClick={() => editor.chain().focus().toggleHighlight().run()} active={editor.isActive('highlight')} title="Highlight">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M15.53 3.83a1 1 0 000-1.41L13.12.01a1 1 0 00-1.41 0L.59 11.13a1 1 0 000 1.41l2.54 2.54 1.41 1.41L6.96 18h4.04l8.53-8.53-4.24-4.24.24-.24zm-5.09 10.83H8.5L4.83 11l8.49-8.49 3.54 3.54-6.42 6.61z"/></svg>
      </TBtn>
      <TBtn onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive('code')} title="Inline code">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
      </TBtn>

      <Divider />

      {/* Lists */}
      <TBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet list">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="9" y1="6" x2="20" y2="6"/><line x1="9" y1="12" x2="20" y2="12"/><line x1="9" y1="18" x2="20" y2="18"/><circle cx="4" cy="6" r="1" fill="currentColor"/><circle cx="4" cy="12" r="1" fill="currentColor"/><circle cx="4" cy="18" r="1" fill="currentColor"/></svg>
      </TBtn>
      <TBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Numbered list">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="10" y1="6" x2="21" y2="6"/><line x1="10" y1="12" x2="21" y2="12"/><line x1="10" y1="18" x2="21" y2="18"/><path d="M4 6h1v4M4 10h2M6 18H4c0-1 2-2 2-3s-1-2-2-1"/></svg>
      </TBtn>
      <TBtn onClick={() => editor.chain().focus().toggleTaskList().run()} active={editor.isActive('taskList')} title="Task list">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
      </TBtn>
      <TBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Blockquote">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M14 17h3l2-4V7h-6v6h3zM6 17h3l2-4V7H5v6h3z"/></svg>
      </TBtn>
      <TBtn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')} title="Code block">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="M8 10l-3 2 3 2M16 10l3 2-3 2M12 8l-2 8"/></svg>
      </TBtn>

      <Divider />

      {/* Alignment */}
      <TBtn onClick={() => editor.chain().focus().setTextAlign('left').run()} active={editor.isActive({ textAlign: 'left' })} title="Align left">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="15" y2="12"/><line x1="3" y1="18" x2="18" y2="18"/></svg>
      </TBtn>
      <TBtn onClick={() => editor.chain().focus().setTextAlign('center').run()} active={editor.isActive({ textAlign: 'center' })} title="Align center">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="6" y1="12" x2="18" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>
      </TBtn>
      <TBtn onClick={() => editor.chain().focus().setTextAlign('right').run()} active={editor.isActive({ textAlign: 'right' })} title="Align right">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="9" y1="12" x2="21" y2="12"/><line x1="6" y1="18" x2="21" y2="18"/></svg>
      </TBtn>

      <Divider />

      {/* Horizontal rule */}
      <TBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal rule">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="12" x2="21" y2="12"/></svg>
      </TBtn>
    </div>
  );
}

/* ─── Main Editor Component ──────────────────────────────────────────── */
interface MarkdownEditorProps {
  roomId: string;
}

export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ roomId }) => {
  const { remoteUsers } = useCollabStore();
  const providerRef = useRef<any>(null);
  const [providerReady, setProviderReady] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  // Get the shared Y.XmlFragment for this room
  const { doc, yText } = getYRoom(roomId);

  // Init provider once
  useEffect(() => {
    if (!roomId) return;
    getOrInitProvider(roomId, doc).then((p) => {
      providerRef.current = p;
      setProviderReady(true);
    });
  }, [roomId, doc]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Disable history — Collaboration handles it via Y.js
        history: false,
      }),
      Underline,
      Highlight.configure({ multicolor: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') return 'Heading…';
          return 'Start writing… (markdown shortcuts work: # ## ### > - 1. ``` **)';
        },
      }),
      // Y.js collaborative editing bound to the shared XmlFragment
      Collaboration.configure({ document: doc, field: 'markdown-doc' }),
      // Remote cursors — only add when provider is ready
      ...(providerReady && providerRef.current
        ? [
            CollaborationCursor.configure({
              provider: providerRef.current,
              user: {
                name: 'You',
                color: 'var(--accent)',
              },
            }),
          ]
        : []),
    ],
    editorProps: {
      attributes: {
        class: 'inkspace-editor',
        spellcheck: 'true',
      },
    },
    onUpdate: ({ editor }) => {
      const text = editor.getText();
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;
      setWordCount(words);
    },
    immediatelyRender: false,
  }, [providerReady]); // recreate when provider becomes ready

  return (
    <div
      className="flex flex-col h-full overflow-hidden"
      style={{ background: 'var(--bg-surface)' }}
    >
      {/* Panel header */}
      <div
        className="flex items-center justify-between px-4 flex-shrink-0"
        style={{ height: 52, borderBottom: '0.5px solid var(--border)', background: 'var(--bg-panel)', backdropFilter: 'var(--blur-panel)' }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="flex items-center justify-center rounded-[8px] flex-shrink-0"
            style={{ width: 26, height: 26, background: 'var(--accent-glow)' }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
              <polyline points="10 9 9 9 8 9"/>
            </svg>
          </div>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', fontFamily: 'var(--font-ui)' }}>
            Notes
          </span>
          {/* Collab indicators */}
          {remoteUsers.length > 0 && (
            <div className="flex items-center gap-1.5 ml-1">
              <div className="flex -space-x-1.5">
                {remoteUsers.slice(0, 3).map((u) => (
                  <div
                    key={u.clientId}
                    title={u.name}
                    className="rounded-full flex items-center justify-center text-white"
                    style={{
                      width: 20, height: 20, background: u.color,
                      border: '1.5px solid var(--bg-surface)',
                      fontSize: 8, fontWeight: 700,
                    }}
                  >
                    {u.name[0].toUpperCase()}
                  </div>
                ))}
              </div>
              <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-ui)' }}>
                {remoteUsers.length} editing
              </span>
            </div>
          )}
        </div>
        <span style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          {wordCount} {wordCount === 1 ? 'word' : 'words'}
        </span>
      </div>

      {/* Toolbar */}
      <EditorToolbar editor={editor} />

      {/* Editor content area */}
      <div className="flex-1 overflow-y-auto editor-scroll-area">
        <EditorContent editor={editor} className="h-full" />
      </div>
    </div>
  );
};
