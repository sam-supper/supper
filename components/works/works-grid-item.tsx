import { useMemo, type FC } from "react";
import type { Project } from "@/components/project/project.types";
import { Media } from "../global/media";
import Link from "next/link";

interface WorksGridItemProps extends Partial<Project> {}

export const WorksGridItem: FC<WorksGridItemProps> = (props) => {
  const { title, slug, featuredMedia } = props;

  const aspectRatio = useMemo(() => {
    return featuredMedia?.image?.aspectRatio || 1;
  }, [featuredMedia])

  return (
    <Link href={`/project/${slug}`} className="w-full relative" style={{ aspectRatio }}>
      {featuredMedia ? (
        <Media {...featuredMedia} alt={`Project: ${title}`} fit="cover" />
      ) : null}
    </Link>
  )
}