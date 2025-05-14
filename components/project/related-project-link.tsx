'use client'

import { FC, useCallback, useMemo, useState } from "react";
import { Project } from "./project.types";
import type { MediaType } from "@/sanity/types";
import { Media } from "../global/media";
import Link from "next/link";

export const RelatedProjectLink: FC<Partial<Project>> = (props) => {
  const { slug, title, featuredMedia } = props;
  
  const [isHovered, setIsHovered] = useState(false);
  
  const featuredMediaProps = useMemo(() => {
    if (!featuredMedia) return null;

    return {
      mediaType: featuredMedia._type as MediaType,
      ...(featuredMedia._type === 'image' ? { image: featuredMedia } : { video: featuredMedia })
    }
  }, [featuredMedia])

  const maxWidth = useMemo(() => {
    if (!featuredMedia?.aspectRatio) return 150;

    if (featuredMedia.aspectRatio > 1) {
      return 180
    }

    return 150;
  }, [featuredMedia])

  const handlePointerEnter = useCallback(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 800) return;

    setIsHovered(true);
  }, []);
  
  const handlePointerLeave = useCallback(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 800) return;

    setIsHovered(false);
  }, []);

  return (
    <div
    className="relative"
    onPointerEnter={handlePointerEnter}
    onPointerLeave={handlePointerLeave}
    onPointerCancel={handlePointerLeave}
    >
      <Link href={`/project/${slug}`} scroll={false} className="text-subtitle">{title}</Link>
      {featuredMedia ? (
        <div
          className={`absolute z-[5] top-0 left-[calc(100%+20px)] h-auto transition-opacity duration-200 ease-in-out-quart ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          style={{ aspectRatio: featuredMedia?.aspectRatio, width: maxWidth }}
        >
          <Media mediaType={featuredMedia._type as MediaType} {...featuredMediaProps} sizes="350px" />
        </div>
      ) : null}
    </div>
  )
}