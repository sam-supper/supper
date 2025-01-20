"use client";

import { FC, useMemo } from "react"
import { useArticleStore } from "@/stores/use-article-store"
import { PortableTextBlock } from "@portabletext/types"

import { PortableText } from "@portabletext/react"

type ArticleContentProps = {
  content: PortableTextBlock[]
}

export const ArticleContent: FC<ArticleContentProps> = ({ content }) => {
  const textSize = useArticleStore((state) => state.textSize);

  const textClass = useMemo(() => {
    if (textSize === 'sm') {
      return 'text-reading-small pb-24 last-of-type:pb-0';
    }

    if (textSize === 'md') {
      return 'text-reading-medium pb-30 last-of-type:pb-0';
    }

    return 'text-reading-large pb-32 last-of-type:pb-0';
  }, [textSize])

  const colSpanClass = useMemo(() => {
    if (textSize === 'lg') {
      return 'col-span-8';
    }

    return 'col-span-6';
  }, [textSize])
  
  return (
    <div className={`${colSpanClass} col-start-4 row-start-2 pt-70 w-full font-serif`} style={{ fontFamily: 'serif' }}>
      <PortableText
        value={content}
        components={{
          block: {
            normal: ({ children }) => <p className={textClass}>{children}</p>
          }
        }}
      />
    </div>
  )
}