'use client'

import { type FC, useState, useRef, useCallback } from "react";
import { easeInOutQuart } from "@/lib/easings";
import { motion } from "framer-motion";

import { Image as ImageType, Video as VideoType } from "@/sanity/types";
import { Image } from "../global/image";
import { Cursor } from "../global/cursor";

interface ProjectGalleryProps {
  media: (ImageType | VideoType)[]
}

export const ProjectGallery: FC<ProjectGalleryProps> = ({ media }) => {
  const [hovered, setHovered] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const galleryRef = useRef<any>(null)

  const onPrevClick = useCallback(() => {
    setActiveIndex(prev => prev === 0 ? media.length - 1 : prev - 1)
  }, [])

  const onNextClick = useCallback(() => {
    setActiveIndex(prev => prev === media.length - 1 ? 0 : prev + 1)
  }, [])

  const handleMouseEnter = useCallback(() => {
    setHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setHovered(false)
  }, [])

  return (
    <div 
      ref={galleryRef} 
      className="absolute inset-0 w-full h-full grid-contain cursor-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Cursor
        text={`${(activeIndex + 1).toString().padStart(2, '0')}/${media?.length.toString().padStart(2, '0')}`}
        hidden={!hovered}
      />
      <button
        className="absolute left-0 top-0 z-[10] w-1/2 h-screen appearance-none border-none outline-none cursor-none"
        onClick={onPrevClick}
      >
        <span className="sr-only">Previous</span>
      </button>
      <button
        className="absolute right-0 top-0 z-[10] w-1/2 h-screen appearance-none bg-transparent border-none outline-none cursor-none"
        onClick={onNextClick}
      >
        <span className="sr-only">Next</span>
      </button>
      {media?.map((item, index) => {
        const isActive = index === activeIndex
        const opacity = isActive ? 1 : 0

        if (item._type === 'image') {
          return (
            <motion.div
              key={item._key}
              initial={{ opacity: opacity }}
              animate={{ opacity: opacity }}
              transition={{ duration: 0.25, ease: easeInOutQuart }}
              className="w-full h-full"
            >
              <Image image={item} className="object-contain w-full h-full" />
            </motion.div>
          )
        }
      })}
    </div>
  )
}