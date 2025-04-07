'use client';

import { useThemeStore } from "@/stores/use-theme-store";

interface ThemeProviderProps {
  children: React.ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const theme = useThemeStore((state) => state.theme)

  return (
    <html lang="en" className={theme}>
      {children}
    </html>
  )
}