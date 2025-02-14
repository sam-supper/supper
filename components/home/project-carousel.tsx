'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useThemeStore } from "@/stores/use-theme-store";
import { easeInOutQuart } from "@/lib/animation";
import { useWindowSize } from "react-use";
import { useMouse } from "react-use";
import { usePathname } from "next/navigation";

import { AnimatePresence, motion } from "framer-motion";
import { ProjectCarouselItem } from "./project-carousel-item";
import { Cursor } from "../global/cursor";

interface ProjectCarouselProps {
  projects: any
}

export const ProjectCarousel = (props: ProjectCarouselProps) => {
  const { projects } = props
  const [activeIndex, setActiveIndex] = useState(0)
  const [cursorVisible, setCursorVisible] = useState(false)
  const carouselRef = useRef<any>(null)
  const { width } = useWindowSize()
  const { docX } = useMouse(carouselRef)
  const pathname = usePathname()
  
  const setTheme = useThemeStore((state) => state.setTheme)
  

  useEffect(() => {
    const currentColor = projects[activeIndex].color
    setTheme(currentColor === 'white' ? 'dark' : 'light')
  }, [activeIndex])

  useEffect(() => {
    const resetTheme = () => {
      setTheme('light')
    }

    if (pathname !== '/') {
      resetTheme()
    }
  }, [pathname])

  const nextIndex = useMemo(() => {
    return activeIndex === projects.length - 1 ? 0 : activeIndex + 1
  }, [activeIndex, projects])

  const previousIndex = useMemo(() => {
    return activeIndex === 0 ? projects.length - 1 : activeIndex - 1
  }, [activeIndex, projects])

  const cursorLabel = useMemo(() => {
    return (docX > (width / 2)) ? `Next` : `Previous`
  }, [docX, width, nextIndex, previousIndex])

  const handleCarouselClick = useCallback(() => {
    if (docX > (width / 2)) {
      setActiveIndex(nextIndex)
    } else {
      setActiveIndex(previousIndex)
    }
  }, [docX, width, nextIndex, previousIndex, setActiveIndex])

  const showCursor = useCallback(() => {
    if (cursorVisible) return

    setCursorVisible(true)
  }, [cursorVisible])

  const hideCursor = useCallback(() => {
    if (!cursorVisible) return
    
    setCursorVisible(false)
  }, [cursorVisible])

  return (
    <div 
      ref={carouselRef}
      className="w-full h-[100svh] cursor-none grid-contain"
      onClick={handleCarouselClick}
      onMouseEnter={showCursor}
      onMouseLeave={hideCursor}
      onMouseMove={showCursor}
    >
      <Cursor text={cursorLabel} hidden={!cursorVisible} />
      <AnimatePresence>
        <motion.div
          key={`${activeIndex}-${projects[activeIndex]._key}`}
          className="w-full h-full relative"
          initial={{ opacity: 0, zIndex: 1 }}
          animate={{ opacity: 1, zIndex: 2 }}
          exit={{ opacity: 0, zIndex: 1 }}
          transition={{ duration: 0.25, ease: easeInOutQuart }}
        >
          <ProjectCarouselItem {...projects[activeIndex]} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}