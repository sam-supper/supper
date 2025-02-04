'use client'
 
import { useEffect } from 'react'
import { useArticleStore } from '@/stores/use-article-store'
import { updateArticleViews } from './actions'
 
export const UpdateViewCount = ({ slug }: { slug: string }) => {
  const textSize = useArticleStore((state) => state.textSize);
  const focusMode = useArticleStore((state) => state.focusMode);
  const mode = useArticleStore((state) => state.mode);

  useEffect(() => {
    const updateViews = async () => {
      await updateArticleViews({
        slug,
        textSize,
        focusMode,
        readingMode: mode
      })
    }
 
    updateViews()
  }, [])

  return null;
}