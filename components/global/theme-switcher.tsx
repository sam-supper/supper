'use client'

import { useArticleStore } from "@/stores/use-article-store"
import { useEffect } from "react"

export const ThemeSwitcher = () => {
  const mode = useArticleStore((state) => state.mode)

  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [mode])

  return null;
}