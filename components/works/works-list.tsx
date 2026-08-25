'use client'

import { useMemo, useState, type FC } from "react";
import { easeInOutQuart } from "@/lib/animation";

import type { Project } from "@/components/project/project.types";

import { motion } from "framer-motion";
import { WorksListItem } from "@/components/works/works-list-item";
import { WorksListHoverImage } from "@/components/works/works-list-hover-image";

interface WorksListProps {
  projects: Project[]
}

type SortKey = 'title' | 'client' | 'year'
type SortDir = 'asc' | 'desc'

export const WorksList: FC<WorksListProps> = ({ projects }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [sortKey, setSortKey] = useState<SortKey>('year')
  const [sortDir, setSortDir] = useState<SortDir>('desc')

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((dir) => (dir === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      // Year feels most natural newest-first; text columns A→Z
      setSortDir(key === 'year' ? 'desc' : 'asc')
    }
  }

  const sortedProjects = useMemo(() => {
    const arr = [...projects]

    arr.sort((a, b) => {
      let cmp = 0

      if (sortKey === 'year') {
        const av = a?.year ? new Date(a.year).getTime() : 0
        const bv = b?.year ? new Date(b.year).getTime() : 0
        cmp = av - bv
      } else if (sortKey === 'title') {
        cmp = (a?.title || '').localeCompare(b?.title || '')
      } else if (sortKey === 'client') {
        cmp = (a?.client?.title || '').localeCompare(b?.client?.title || '')
      }

      return sortDir === 'asc' ? cmp : -cmp
    })

    return arr
  }, [projects, sortKey, sortDir])

  return (
    <motion.div
      className="w-full md:min-h-[calc(100svh-390px)] relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: easeInOutQuart }}
    >
      <div className="relative w-full flex flex-col gap-25">
        <div className="w-full site-grid text-list-title italic text-black dark:text-grey transition-colors duration-400 ease">
          <div className="col-span-4 md:col-span-10 lg:col-span-9 md:grid md:grid-cols-9 gap-x-20">
            <div className="md:col-span-3">
              <SortHeader label="Project:" active={sortKey === 'title'} dir={sortDir} onClick={() => handleSort('title')} />
            </div>
            <div className="hidden md:block md:col-span-3">
              <SortHeader label="Client:" active={sortKey === 'client'} dir={sortDir} onClick={() => handleSort('client')} />
            </div>
            <div className="hidden md:block md:col-span-3">Service:</div>
          </div>
          <div className="col-span-2 lg:col-span-3 text-right md:text-left">
            <SortHeader label="Year:" active={sortKey === 'year'} dir={sortDir} onClick={() => handleSort('year')} />
          </div>
        </div>
        <div className="flex flex-col group">
          {sortedProjects.map((project, index) => (
            <WorksListItem
              key={project._id}
              onPointerEnter={() => setHoveredIndex(index)}
              onPointerLeave={() => setHoveredIndex(null)}
              {...project}
            />
          ))}
        </div>
        <WorksListHoverImage
          projects={sortedProjects}
          activeIndex={hoveredIndex}
        />
      </div>
    </motion.div>
  )
}

interface SortHeaderProps {
  label: string
  active: boolean
  dir: SortDir
  onClick: () => void
}

const SortHeader: FC<SortHeaderProps> = ({ label, active, dir, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`italic transition-colors duration-200 ease hover:text-black dark:hover:text-grey-light ${active ? 'underline' : ''}`}
    >
      {label}
      {active ? <span className="ml-2 not-italic">{dir === 'asc' ? '↑' : '↓'}</span> : null}
    </button>
  )
}
