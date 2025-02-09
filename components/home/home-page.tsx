import { ProjectCarousel } from "./project-carousel";

export interface HomePageProps {
  title: string
  featuredProjects: any
}

export const HomePage = (props: HomePageProps) => {
  if (!props) return null

  const { title, featuredProjects } = props

  return (
    <div className="min-h-screen grid grid-cols-1 *:col-start-1 *:col-span-1 *:row-start-1 *:row-span-1">
      <h1 className="sr-only">{title}</h1>
      <ProjectCarousel projects={featuredProjects} />
    </div>
  );
};

