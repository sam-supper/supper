'use client'

import { useMemo, type FC } from "react";
import { useWorksStore } from "@/components/works/use-works-store";
import { shuffleArray } from "@/lib/shuffle-array";

import type { Project, Service } from '@/components/project/project.types'
import type { Image, Video } from "@/sanity/types";

import { AnimatePresence, motion } from "framer-motion";
import { WorksGrid } from "@/components/works/works-grid";
import { WorksList } from "@/components/works/works-list";
import { WorksFilters } from "./works-filters";
import { easeInOutQuart } from "@/lib/animation";
import { ViewToggle } from "./view-toggle";

interface WorksPageProps {
  projects: Project[]
  services: Service[]
}

export const WorksPage: FC<WorksPageProps> = ({ projects, services }) => {
  const view = useWorksStore((state) => state.view)
  const activeFilter = useWorksStore((state) => state.activeFilter)

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all' || !activeFilter) {
      return projects
    }

    return projects.filter((project) => project.services.some((service) => service.slug === activeFilter))
  }, [activeFilter])

  const mediaItems: any = useMemo(() => {
    const allMedia = filteredProjects?.reduce((acc, project) => {
      if (project.media?.length > 0) {
        project.media?.forEach((item, index) => {
          acc.push({
            index,
            title: project.title,
            slug: project.slug,
            media: item as Image | Video
          })
        })
      }
      return acc
    }, [] as Array<any>)

    return shuffleArray(allMedia)
  }, [filteredProjects])

  const isGrid = useMemo(() => {
    return view === 'grid'
  }, [view])


  return (
    <div className="w-full flex flex-col gap-20">
      <div className="w-full flex items-center justify-between">
        <motion.div
          className="w-full text-nav"
          initial={{ opacity: isGrid ? 1 : 0, pointerEvents: isGrid ? 'auto' : 'none' }}
          animate={{ opacity: isGrid ? 1 : 0, pointerEvents: isGrid ? 'auto' : 'none' }}
          transition={{ duration: 0.45, ease: easeInOutQuart, delay: isGrid ? 0.45 : 0 }}
        >
          <WorksFilters filters={services} />
        </motion.div>
        <ViewToggle />
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