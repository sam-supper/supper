'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useSiteStore } from "@/stores/use-site-store";
import { easeInOutQuart } from "@/lib/animation";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

import { AnimatePresence, motion } from "framer-motion";
import { ProjectCarouselItem } from "./project-carousel-item";
import Link from "next/link";

interface ProjectCarouselProps {
  projects: any
}

export const ProjectCarousel = (props: ProjectCarouselProps) => {
  const { projects } = props
  const [activeIndex, setActiveIndex] = useState(0)
  const carouselRef = useRef<any>(null)
  const pathname = usePathname()
  const router = useRouter();
  
  const setHeroTheme = useSiteStore((state) => state.setHeroTheme)

  useEffect(() => {
    const currentColor = projects[activeIndex].color
    setHeroTheme(currentColor === 'white' ? 'dark' : 'light')
  }, [activeIndex])

  useEffect(() => {
    const resetTheme = () => {
      setHeroTheme('light')
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

  const handlePreviousClick = useCallback(() => {
    setActiveIndex(previousIndex)
  }, [previousIndex, setActiveIndex])

  const handleNextClick = useCallback(() => {
    setActiveIndex(nextIndex)
  }, [nextIndex, setActiveIndex])

  const handleProjectClick = useCallback(() => {
    router.push(`/project/${projects[activeIndex].slug}`)
  }, [activeIndex, projects])

  const handleKeyDown = useCallback((event: any) => {
    if (event.key === 'Enter') { 
      handleProjectClick()
    }
  }, [handleProjectClick])

  return (
    <div 
      ref={carouselRef}
      className="w-full h-[100svh] grid-contain"
    >
      <button className="absolute top-0 left-0 z-[5] w-1/3 h-full bg-transparent cursor-w-resize" onClick={handlePreviousClick}>
        <span className="sr-only">Previous</span>
      </button>
      <button className="absolute top-0 right-0 z-[5] w-1/3 h-full bg-transparent cursor-e-resize" onClick={handleNextClick}>
        <span className="sr-only">Next</span>
      </button>
      <AnimatePresence>
        <motion.div
          role="button"
          tabIndex={0}
          onClick={handleProjectClick}
          onKeyDown={handleKeyDown}
          key={`${activeIndex}-${projects[activeIndex]._key}`}
          className="w-full h-full relative cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: {
            duration: 0.45,
            ease: easeInOutQuart,
            delay: 0.45,
          } }}
          transition={{ duration: 0.45, ease: easeInOutQuart }}
        >
          <ProjectCarouselItem {...projects[activeIndex]} />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}