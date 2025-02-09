'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useThemeStore } from "@/stores/use-theme-store";
import { easeInOutQuart } from "@/lib/easings";
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
  const carouselRef = useRef<any>(null)
  const setTheme = useThemeStore((state) => state.setTheme)
  const { width } = useWindowSize()
  const { docX } = useMouse(carouselRef)
  const pathname = usePathname()

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

  return (
    <div 
      ref={carouselRef}
      className="w-full h-full cursor-none grid-contain"
      onClick={handleCarouselClick}
    >
      <Cursor text={cursorLabel} />
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