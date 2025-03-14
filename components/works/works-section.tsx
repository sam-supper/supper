'use client'

import { FC, useMemo } from "react"
import { useWorksStore } from "./use-works-store"
import { shuffleArray } from "@/lib/shuffle-array"
import { easeInOutQuart } from "@/lib/animation"
import { AnimatePresence, motion } from "framer-motion"

import type { Image, Video } from "@/sanity/types"
import type { Project, Service } from "@/components/project/project.types"
import { WorksFilters } from "./works-filters"
import { WorksGrid } from "./works-grid"
import { WorksList } from "./works-list"
import { ViewToggle } from "./view-toggle"

interface WorksSectionProps {
  projects: Project[]
  services: Service[]
  view: 'grid' | 'list'
  initialFilter?: string
  setView: (view: 'grid' | 'list') => void
}

export const WorksSection: FC<WorksSectionProps> = ({ projects, services, view, setView, initialFilter }) => {
  const activeFilter = useWorksStore((state) => state.activeFilter);

  const filteredProjects = useMemo(() => {
    const currentFilter = activeFilter ?? initialFilter;

    if (currentFilter === 'all' || !currentFilter) {
      return projects
    }

    return projects.filter((project) => project.services?.some((service) => service.slug === currentFilter))
  }, [activeFilter, initialFilter])

  const mediaItems: any = useMemo(() => {
    const allMedia = filteredProjects?.reduce((acc, project) => {
      if (project.media?.length > 0) {
        project.media?.forEach((item, index) => {
          const firstMedia = project.media?.[0] as Image | Video
          const secondMedia = project.media?.[1] as Image | Video

          if (item._type === 'mediaRow') {
            item.media?.forEach((mediaItem) => {
              acc.push({
                index,
                title: project.title,
                slug: project.slug,
                media: mediaItem as Image | Video,
                hoverMedia: item._id === firstMedia._id ? secondMedia : firstMedia
              })
            })
          } else {
            acc.push({
              index,
              title: project.title,
              slug: project.slug,
              media: item as Image | Video,
              hoverMedia: item._id === firstMedia._id ? secondMedia : firstMedia
            })
          }
        })
      }
      return acc
    }, [] as Array<any>)

    return shuffleArray(allMedia, 2)
  }, [filteredProjects])

  const isGrid = useMemo(() => {
    return view === 'grid'
  }, [view])


  return (
    <div className="w-full flex flex-col gap-30">
      <div className="w-full flex items-center justify-between gap-x-20">
        <motion.div
          className="w-full text-nav"
          initial={{ opacity: isGrid ? 1 : 0, pointerEvents: isGrid ? 'auto' : 'none' }}
          animate={{ opacity: isGrid ? 1 : 0, pointerEvents: isGrid ? 'auto' : 'none' }}
          transition={{ duration: 0.45, ease: easeInOutQuart, delay: isGrid ? 0.45 : 0 }}
        >
          <WorksFilters filters={services} initialFilter={initialFilter} />
        </motion.div>
        <ViewToggle view={view} setView={setView} />
      </div>
      <div className="w-full flex flex-col gap-10">
        <AnimatePresence mode="wait" initial={false}>
          {view === 'grid' ? (
            <WorksGrid key={`grid-${activeFilter}`} projects={mediaItems} />
          ) : (
            <WorksList key={`list-${activeFilter}`} projects={filteredProjects} />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}