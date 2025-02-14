import { useState } from "react"

export const useWorksView = (initialView: 'grid' | 'list' = 'list') => {
  const [view, setView] = useState<'grid' | 'list'>(initialView)

  return [
    view,
    setView
  ] as const
}