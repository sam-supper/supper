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

const gridSizeStyles = cva(['w-full grid grid-auto-rows overflow-hidden place-items-start gap-y-36 md:gap-y-100 grid-cols-2 gap-x-34'], {
  variants: {
    size: {
      4: 'md:grid-cols-4 md:gap-x-[5%]',
      6: 'md:grid-cols-6 md:gap-x-[5%]',
      8: 'md:grid-cols-8 md:gap-x-[5%]',
      10: 'md:grid-cols-10 md:gap-x-[5%]',
    }
  }
})

export const WorksGrid: FC<WorksGridProps> = ({ projects }) => {
  const gridSize = useWorksStore((state) => state.gridSize)

  return (
    <motion.div
      key="grid-items"
      className={gridSizeStyles({ size: gridSize as 4 | 6 | 8 | 10 })}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: easeInOutQuart }}
    >
      {projects?.map((item: any, index: number) => (
        <WorksGridItem key={`${index}-${item.slug}`} {...item} index={index} />
      ))}
    </motion.div>
  )
}