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
      className="w-full flex flex-col gap-25 md:min-h-[calc(100svh-360px)] relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: easeInOutQuart }}
    >
      <div className="w-full site-grid text-list-title italic">
        <div className="col-span-4 md:col-span-9 md:grid md:grid-cols-9 gap-x-20 text-black dark:text-grey">
          <div className="hidden md:block md:col-span-3">Client:</div>
          <div className="md:col-span-3">Project:</div>
          <div className="hidden md:block md:col-span-3">Service:</div>
        </div>
        <div className="col-span-2 md:col-span-3 text-right md:text-left">
          Year:
        </div>
      </div>
      <div className="flex flex-col group">
        {projects.map((project, index) => (
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
    </motion.div>
  )
}
