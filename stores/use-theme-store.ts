import { create } from "zustand";

export const useThemeStore = create<{
  theme: 'light' | 'dark'
  setTheme: (theme: 'light' | 'dark') => void
}>((set) => ({
  theme: 'light',
  setTheme: (theme) => set({ theme }),
}))