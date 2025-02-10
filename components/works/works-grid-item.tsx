import { useMemo, type FC } from "react";
import type { Project } from "@/components/project/project.types";

import { Image } from "../global/image";
import { Video } from "../global/video";
import Link from "next/link";

interface WorksGridItemProps extends Partial<Project> {}

export const WorksGridItem: FC<WorksGridItemProps> = (props) => {
  const { title, slug, featuredMedia } = props;

  const aspectRatio = useMemo(() => {
    return featuredMedia?.aspectRatio || 1;
  }, [featuredMedia])

  return (
    <Link href={`/project/${slug}`} className="w-full relative" style={{ aspectRatio }}>
      {featuredMedia?._type === "image" ? (
        <Image image={featuredMedia} className="object-contain w-full h-full" />
      ) : null}
      {featuredMedia?._type === "video" ? (
        <Video {...featuredMedia} className="object-contain w-full h-full" />
      ) : null}
    </Link>
  )
}