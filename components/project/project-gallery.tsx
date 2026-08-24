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
  /** Optional mobile-only primary image, used instead of the first media on small screens. */
  mobileMedia?: ImageType
}

const renderMedia = (item: any) => {
  if (!item) return null
  if (item._type === 'image') return <Image image={item} className="object-contain w-full h-full" />
  if (item._type === 'video') return <Video {...item} className="object-contain w-full h-full" />
  return null
}

export const ProjectGallery: FC<ProjectGalleryProps> = ({ media, mobileMedia }) => {
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

  // Prefer the dedicated mobile image when set; otherwise fall back to the first media.
  const mobileItem = (mobileMedia as any)?.asset ? mobileMedia : mediaItem

  if (!mediaItem) return null

  return (
    <div
      ref={galleryRef}
      className="w-full flex-1 flex justify-center"
    >
      {/* Mobile primary image */}
      <div className="md:hidden w-full h-full relative">
        <div className="w-full h-full">
          {renderMedia(mobileItem)}
        </div>
      </div>

      {/* Desktop — full bleed */}
      <div
        className="hidden md:block w-full h-full relative"
        style={{
          '--aspect-ratio': aspectRatio
        } as React.CSSProperties}
      >
        <div
          className="w-full h-full md:aspect-[var(--aspect-ratio)]"
        >
          {renderMedia(mediaItem)}
        </div>
      </div>
    </div>
  )
}
