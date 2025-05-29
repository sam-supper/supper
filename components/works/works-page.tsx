'use client'

import { Suspense, type FC } from "react";
import type { Project, Service } from '@/components/project/project.types'

import { useWorksView } from "./use-works-view";

import { WorksSection } from "./works-section";

interface WorksPageProps {
  projects: Project[]
  services: Service[]
  initialView?: 'grid' | 'list'
  initialFilter?: string
}

export const WorksPage: FC<WorksPageProps> = ({ projects, services, initialView, initialFilter }) => {
  const [view, setView] = useWorksView(initialView)

  return (
    <Suspense fallback={null}>
      <WorksSection projects={projects} services={services} view={view} setView={setView} initialFilter={initialFilter} />
    </Suspense>
  )
}