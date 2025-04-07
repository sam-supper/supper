'use client'

import { useThemeStore } from "@/stores/use-theme-store"
import { AnimatePresence, motion } from "motion/react"

export const ThemeToggle = () => {
  const theme = useThemeStore((state) => state.theme)
  const setTheme = useThemeStore((state) => state.setTheme)

  return (
    <div className="w-full grid-contain">
      <AnimatePresence initial={false}>
        {theme === 'dark' ? (
          <button key="light" className="site-link text-right" onClick={() => setTheme('light')}>
            Light Mode
          </button>
        ) : (
          <button key="dark" className="site-link text-right" onClick={() => setTheme('dark')}>
            Dark Mode
          </button>
        )}
      </AnimatePresence>
    </div>
  )
}