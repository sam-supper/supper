'use client'

import { useState, type FC } from "react";
import { easeInOutQuart } from "@/lib/easings";

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
      className="w-full flex flex-col gap-25 min-h-[600px] relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: easeInOutQuart }}
    >
      <div className="w-full site-grid text-list-title italic">
        <div className="md:col-span-9 md:grid md:grid-cols-[30%_30%_40%] gap-x-20">
          <div>Client:</div>
          <div>Project:</div>
          <div>Service:</div>
        </div>
        <div className="md:col-span-3">
          Year:
        </div>
      </div>
      <div className="flex flex-col group">
        {projects.map((project, index) => (
          <WorksListItem
            key={project.slug}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
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