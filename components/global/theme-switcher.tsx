'use client'

import { useThemeStore } from "@/stores/use-theme-store"
import { useEffect } from "react"

export const ThemeSwitcher = () => {
  const theme = useThemeStore((state) => state.theme)

  useEffect(() => {
    if (typeof window === 'undefined') return

    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return null
}