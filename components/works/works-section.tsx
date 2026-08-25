'use client'

import { FC, useMemo } from "react"
import { easeInOutQuart } from "@/lib/animation"
import { AnimatePresence, motion } from "framer-motion"

import type { Project, Service } from "@/components/project/project.types"
import { WorksFilters } from "./works-filters"
import { WorksGrid } from "./works-grid"
import { WorksList } from "./works-list"
import { ViewToggle } from "./view-toggle"
import { useSearchParams } from "next/navigation"

interface WorksSectionProps {
  projects: Project[]
  services: Service[]
  view: 'grid' | 'list'
  initialFilter?: string
  setView: (view: 'grid' | 'list') => void
}

export const WorksSection: FC<WorksSectionProps> = ({ projects, services, view, setView, initialFilter }) => {
  const params = useSearchParams()

  const filteredProjects = useMemo(() => {
    const filters = params.get('filter')?.split(',') || []

    const base = !filters?.length
      ? projects
      : projects.filter((project) => project.services?.some((service) => filters.includes(service.slug)))

    // Default order for both grid and list views: newest first by year.
    return [...base].sort((a, b) => {
      const av = a?.year ? new Date(a.year).getTime() : 0
      const bv = b?.year ? new Date(b.year).getTime() : 0
      return bv - av
    })
  }, [params, projects])
  
  const isGrid = useMemo(() => {
    return view === 'grid'
  }, [view])

  return (
    <div className="w-full flex flex-col gap-14 md:gap-30">
      <div className="w-full flex items-start justify-between gap-x-20">
        <motion.div
          className="w-full text-nav"
          initial={{ opacity: 1, pointerEvents: 'auto' }}
          animate={{ opacity: 1, pointerEvents: 'auto' }}
          transition={{ duration: 0.45, ease: easeInOutQuart, delay: isGrid ? 0.45 : 0 }}
        >
          <WorksFilters filters={services} initialFilter={initialFilter} />
        </motion.div>
        <ViewToggle view={view} setView={setView} />
      </div>
      <div className="w-full grid-contain">
        <AnimatePresence mode="wait" initial={false}>
          {view === 'grid' ? (
            <WorksGrid key="grid" projects={filteredProjects} />
          ) : (
            <WorksList key="list" projects={filteredProjects} />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}