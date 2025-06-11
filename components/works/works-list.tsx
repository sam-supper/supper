'use client'

import { useState, type FC } from "react";
import { easeInOutQuart } from "@/lib/animation";

import type { Project } from "@/components/project/project.types";

import { motion } from "framer-motion";
import { WorksListItem } from "@/components/works/works-list-item";
import { WorksListHoverImage } from "@/components/works/works-list-hover-image";

interface WorksListProps {
  projects: Project[]
}

export const WorksList: FC<WorksListProps> = ({ projects }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

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
            <div className="md:col-span-3">Project:</div>
            <div className="hidden md:block md:col-span-3">Client:</div>
            <div className="hidden md:block md:col-span-3">Service:</div>
          </div>
          <div className="col-span-2 lg :col-span-3 text-right md:text-left">
            Year:
          </div>
        </div>
        <div className="flex flex-col group">
          {projects.sort((a: any, b: any) => b?.year && a?.year ? new Date(b.year).getTime() - new Date(a.year).getTime() : 0).map((project, index) => (
            <WorksListItem
              key={project._id}
              onPointerEnter={() => setHoveredIndex(index)}
              onPointerLeave={() => setHoveredIndex(null)}
              {...project}
            />
          ))}
        </div>
        <WorksListHoverImage
          projects={projects}
          activeIndex={hoveredIndex}
        />
      </div>
    </motion.div>
  )
}
