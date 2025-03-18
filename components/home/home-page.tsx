'use client'

import { useWorksView } from "../works/use-works-view";
import { WorksSection } from "../works/works-section";
import { ProjectCarousel } from "./project-carousel";

export interface HomePageProps {
  title: string
  featuredProjects: any
  projects: any
  services: any
}

export const HomePage = (props: HomePageProps) => {
  const [view, setView] = useWorksView('grid')

  if (!props) return null

  const { title, featuredProjects, projects, services } = props

  return (
    <div>
      <h1 className="sr-only">{title}</h1>
      <ProjectCarousel projects={featuredProjects} />

      <div className="w-full pt-40 px-site-x flex flex-col gap-80 md:gap-140 text-black">
        <WorksSection projects={projects} services={services} view={view} setView={setView} />
      </div>
    </div>
  );
};

