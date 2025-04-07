import { type FC } from "react";
import { Project } from "../project/project.types";
import { Image } from "../global/image";
import { Video } from "../global/video";

interface WorksListHoverImageProps {
  projects: Project[]
  activeIndex: number | null
}

export const WorksListHoverImage: FC<WorksListHoverImageProps> = ({ projects, activeIndex }) => {
  return (
    <div className="absolute bottom-0 right-0 w-[calc((100%/12)*3-100px)] z-[2] grid-contain place-items-end pointer-events-none">
      {projects?.map((project, index) => {
        const { featuredMedia, title } = project;
        const aspectRatio = featuredMedia?.aspectRatio ?? (4/5);

        if (!featuredMedia) return null;

        return (
          <div
            key={project._id}
            className={`w-full h-auto ${index === activeIndex ? 'opacity-100' : 'opacity-0'}`}
            style={{ aspectRatio }}
          >
            {featuredMedia._type === "image" ? (
              <Image image={featuredMedia} className="object-contain object-bottom w-full h-full" sizes="300px" />
            ) : null}
            {featuredMedia._type === "video" ? (
              <Video {...featuredMedia} className="object-contain object-bottom w-full h-full" />
            ) : null}
          </div>
        )
      })}
    </div>
  )
}