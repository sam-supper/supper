import { type FC } from "react";
import { easeInOutQuart } from "@/lib/easings";

import type { Project } from "@/components/project/project.types";

import { motion } from "framer-motion";
import { WorksGridItem } from "@/components/works/works-grid-item";

interface WorksGridProps {
  projects: Project[]
}

export const WorksGrid: FC<WorksGridProps> = ({ projects }) => {
  return (
    <motion.div
      className="w-full grid grid-cols-4 gap-32 lg:gap-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: easeInOutQuart }}
    >
      {projects.map((project) => (
        <WorksGridItem key={project.slug} {...project} />
      ))}
    </motion.div>
  )
}