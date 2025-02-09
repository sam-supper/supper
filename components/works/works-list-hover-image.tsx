import { type FC } from "react";
import { Project } from "../project/project.types";
import { Media } from "../global/media";

interface WorksListHoverImageProps {
  projects: Project[]
  activeIndex: number | null
}

export const WorksListHoverImage: FC<WorksListHoverImageProps> = ({ projects, activeIndex }) => {
  return (
    <div className="absolute bottom-0 right-0 w-[calc((100%/12)*3-150px)] z-[2] grid-contain place-items-end">
      {projects?.map((project, index) => {
        const { featuredMedia, title } = project;
        const aspectRatio = featuredMedia?.image?.aspectRatio ?? (4/5);

        return (
          <div
            key={project._id}
            className={`w-full h-auto ${index === activeIndex ? 'opacity-100' : 'opacity-0'}`}
            style={{ aspectRatio }}
          >
            <Media {...featuredMedia} alt={`Project: ${title}`} fit="cover" />
          </div>
        )
      })}
    </div>
  )
}