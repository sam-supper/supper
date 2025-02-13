import { type FC } from "react";
import { useWorksStore } from "./use-works-store";
import { easeInOutQuart } from "@/lib/animation";
import { motion } from "framer-motion";
import { cva } from "class-variance-authority";

import type { Project } from "@/components/project/project.types";
import { WorksGridItem } from "@/components/works/works-grid-item";

interface WorksGridProps {
  projects: Project[]
}

const gridSizeStyles = cva(['w-full grid'], {
  variants: {
    size: {
      4: 'grid-cols-4 gap-[5%]',
      6: 'grid-cols-6 gap-[5%]',
      8: 'grid-cols-8 gap-[5%]',
      10: 'grid-cols-10 gap-[5%]',
    }
  }
})

export const WorksGrid: FC<WorksGridProps> = ({ projects }) => {
  const gridSize = useWorksStore((state) => state.gridSize)

  return (
    <motion.div
      className={gridSizeStyles({ size: gridSize as 4 | 6 | 8 | 10 })}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: easeInOutQuart }}
    >
      {projects?.map((item: any, index: number) => (
        <WorksGridItem key={`${index}-${item.slug}`} {...item} />
      ))}
    </motion.div>
  )
}