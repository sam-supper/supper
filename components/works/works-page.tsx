'use client'

import { useEffect, useMemo, type FC } from "react";
import { useWorksView } from "./use-works-view";
import { useWorksStore } from "@/components/works/use-works-store";
import { shuffleArray } from "@/lib/shuffle-array";

import type { Project, Service } from '@/components/project/project.types'
import type { Image, Video } from "@/sanity/types";

import { WorksSection } from "./works-section";
import { AnimatePresence, motion } from "framer-motion";
import { WorksGrid } from "@/components/works/works-grid";
import { WorksList } from "@/components/works/works-list";
import { WorksFilters } from "./works-filters";
import { easeInOutQuart } from "@/lib/animation";
import { ViewToggle } from "./view-toggle";
interface WorksPageProps {
  projects: Project[]
  services: Service[]
  initialView?: 'grid' | 'list'
  route?: string
}

export const WorksPage: FC<WorksPageProps> = ({ projects, services }) => {
  const [view, setView] = useWorksView('list')

  return <WorksSection projects={projects} services={services} view={view} setView={setView} />
}