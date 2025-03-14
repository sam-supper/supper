'use client'

import { type FC, useState, useRef, useCallback, useEffect } from "react";
import { easeInOutQuart } from "@/lib/animation";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

import { Image as ImageType, Video as VideoType } from "@/sanity/types";
import { MediaRow } from "./project.types";
import { Image } from "../global/image";
import { Cursor } from "../global/cursor";
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
  const [pageDirection, setPageDirection] = useState<'Previous' | 'Next' | null>(null)

  useEffect(() => {
    if (mediaIndex && typeof window !== 'undefined') {
      const url = new URL(window.location.href)
      url.searchParams.delete('mediaIndex')
      window.history.replaceState({}, '', url)
    }
  }, [])

  const onPrevClick = useCallback(() => {
    setActiveIndex(prev => prev === 0 ? media.length - 1 : prev - 1)
  }, [])

  const onNextClick = useCallback(() => {
    setActiveIndex(prev => prev === media.length - 1 ? 0 : prev + 1)
  }, [])

  const handleMouseEnter = useCallback(() => {
    if (!hovered) {
      setHovered(true)
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    setHovered(false)
  }, [])

  return (
    <div 
      ref={galleryRef} 
      className="w-full flex-1 grid-contain cursor-none"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Cursor
        text={`${pageDirection}`}
        hidden={!hovered}
      />
      <button
        className="absolute left-0 top-0 z-[5] w-1/2 h-screen appearance-none border-none outline-none cursor-none"
        onClick={onPrevClick}
        onMouseEnter={() => setPageDirection('Previous')}
      >
        <span className="sr-only">Previous</span>
      </button>
      <button
        className="absolute right-0 top-0 z-[5] w-1/2 h-screen appearance-none bg-transparent border-none outline-none cursor-none"
        onClick={onNextClick}
        onMouseEnter={() => setPageDirection('Next')}
      >
        <span className="sr-only">Next</span>
      </button>
      <div className="w-full h-full relative md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[75%] md:h-[65%] grid-contain">
        {media?.map((item, index) => {
          const isActive = index === activeIndex
          const opacity = isActive ? 1 : 0

          return (
            <motion.div
              key={item._key}
              initial={{ opacity: opacity }}
              animate={{ opacity: opacity }}
              transition={{ duration: 0.25, ease: easeInOutQuart }}
              className="w-full h-full"
            >
              {item._type === 'image' ? (
                <Image image={item} className="object-contain w-full h-full" />
              ) : null}
              {item._type === 'video' ? (
                <Video {...item} className="object-contain w-full h-full" />
              ) : null}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}