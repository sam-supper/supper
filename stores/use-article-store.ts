import { create } from "zustand";

interface ArticleStore {
  textSize: 'sm' | 'md' | 'lg';
  setTextSize: (textSize: 'sm' | 'md' | 'lg') => void;
  focusMode: boolean;
  setFocusMode: (focusMode: boolean) => void;
  mode: 'light' | 'dark';
  setMode: (mode: 'light' | 'dark') => void;
}

export const useArticleStore = create<ArticleStore>((set) => ({
  textSize: 'md',
  setTextSize: (textSize: 'sm' | 'md' | 'lg') => set({ textSize }),
  focusMode: false,
  setFocusMode: (focusMode: boolean) => set({ focusMode }),
  mode: 'light',
  setMode: (mode: 'light' | 'dark') => set({ mode }),
}));