"use client";

import { useArticleStore } from "@/stores/use-article-store";

import { TextButton } from "@/components/global/text-button";
import { TextIcon } from "@/components/library/icons/text-icon";
import { useMemo } from "react";
import { Label } from "../global/label";

export const ReadingTools = () => {
  const textSize = useArticleStore((state) => state.textSize);
  const focusMode = useArticleStore((state) => state.focusMode);
  const setFocusMode = useArticleStore((state) => state.setFocusMode);
  const mode = useArticleStore((state) => state.mode);
  const setMode = useArticleStore((state) => state.setMode);

  return (
    <div className="flex flex-col gap-2 items-start text-sans-small font-sans">
      <div className="pb-2">Reading Tools</div>
      <div className="flex items-end gap-4 relative">
        <Label>Text Size:</Label>
        <div className="flex items-end gap-4 font-serif absolute left-full pl-4 bottom-6 text-serif-small">
          <TextSizeButton size="sm" active={textSize === 'sm'} title="Small" />
          <TextSizeButton size="md" active={textSize === 'md'} title="Medium" />
          <TextSizeButton size="lg" active={textSize === 'lg'} title="Large" />
        </div>
      </div>
      <div className="flex items-end gap-4">
        <Label>Focus Mode:</Label>
        <div className="text-serif-small font-serif pb-1 flex items-center gap-2">
          <TextButton active={focusMode} onClick={() => setFocusMode(true)}>
            On
          </TextButton>
          <span>/</span>
          <TextButton active={!focusMode} onClick={() => setFocusMode(false)}>
            Off
          </TextButton>
        </div>
      </div>
      <div className="flex items-end gap-4">
        <Label>Mode:</Label>
        <div className="text-serif-small font-serif pb-1 flex items-center gap-2">
          <TextButton active={mode === 'light'} onClick={() => setMode('light')}>
            Light
          </TextButton>
          <span>/</span>
          <TextButton active={mode === 'dark'} onClick={() => setMode('dark')}>
            Dark
          </TextButton>
        </div>
      </div>
    </div>
  )
}

const TextSizeButton = ({ size, title, active }: { size: 'sm' | 'md' | 'lg', title: string, active: boolean }) => {
  const setTextSize = useArticleStore((state) => state.setTextSize);

  const handleClick = () => {
    setTextSize(size);
  }

  const buttonTitle = useMemo(() => {
    if (active) {
      return `${title} (Current)`;
    }

    return `Set to ${title}`;
  }, [active, title]);

  return (
    <TextButton onClick={handleClick} active={active}>
      <TextIcon title={buttonTitle} size={size} />
    </TextButton>
  )
}