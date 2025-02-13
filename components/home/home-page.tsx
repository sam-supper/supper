import { WorksPage } from "../works/works-page";
import { ProjectCarousel } from "./project-carousel";
import { ViewToggle } from "../works/view-toggle";

export interface HomePageProps {
  title: string
  featuredProjects: any
  projects: any
  services: any
}

export const HomePage = (props: HomePageProps) => {
  if (!props) return null

  const { title, featuredProjects, projects, services } = props

  return (
    <div>
      <h1 className="sr-only">{title}</h1>
      <ProjectCarousel projects={featuredProjects} />

      <div className="w-full pt-40 px-site-x flex flex-col gap-80 md:gap-140 text-black">
        <WorksPage projects={projects} services={services} />
      </div>
    </div>
  );
};

