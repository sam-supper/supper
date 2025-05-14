'use client'

import { type FC, useState, useRef, useCallback, useEffect, useMemo } from "react";
import { easeInOutQuart } from "@/lib/animation";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

import { Image as ImageType, Video as VideoType } from "@/sanity/types";
import { MediaRow } from "./project.types";
import { Image } from "../global/image";
import { Video } from "../global/video";

interface ProjectGalleryProps {
  media: (ImageType | VideoType | MediaRow)[]
}

export const ProjectGallery: FC<ProjectGalleryProps> = ({ media }) => {
  const queryParams = useSearchParams();
  const mediaIndex = queryParams?.get('mediaIndex')
  
  const [hovered, setHovered] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number>(mediaIndex ? parseInt(mediaIndex) : 0)

  const galleryRef = useRef<any>(null)
  // const [pageDirection, setPageDirection] = useState<'Previous' | 'Next'>('Next')

  const mediaItem = useMemo(() => {
    return media?.[0]
  }, [activeIndex, media])

  useEffect(() => {
    if (mediaIndex && typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      url.searchParams.delete('mediaIndex')
      window.history.replaceState({}, '', url)
    }
  }, [])

  const aspectRatio = useMemo(() => {
    return (mediaItem as any)?.aspectRatio ?? 1.77
  }, [mediaItem])

  if (!mediaItem) return null

  return (
    <div 
      ref={galleryRef} 
      className="w-full flex-1 flex justify-center"
    >
      <div
        className={`w-full h-full relative ${aspectRatio > 1 ? 'md:w-[80%] md:h-auto' : 'md:w-[60%] md:h-auto'}`}
        style={{
          '--aspect-ratio': aspectRatio
        } as React.CSSProperties}
      >
        <div
          className="w-full h-full md:aspect-[var(--aspect-ratio)]"
        >
          {mediaItem._type === 'image' ? (
            <Image image={mediaItem} className="object-contain w-full h-full" />
          ) : null}
          {mediaItem._type === 'video' ? (
            <Video {...mediaItem} className="object-contain w-full h-full" />
          ) : null}
        </div>
      </div>
    </div>
  )
}
