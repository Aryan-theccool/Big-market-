import { create } from 'zustand';

type SplitMode = 'canvas' | 'split' | 'editor';

interface EditorState {
  splitMode: SplitMode;
  setSplitMode: (mode: SplitMode) => void;
  splitRatio: number; // 0.0–1.0, default 0.5
  setSplitRatio: (r: number) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  splitMode: 'canvas',
  setSplitMode: (splitMode) => set({ splitMode }),
  splitRatio: 0.5,
  setSplitRatio: (splitRatio) => set({ splitRatio: Math.max(0.2, Math.min(0.8, splitRatio)) }),
}));
