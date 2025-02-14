import { useMemo, type FC } from "react";
import type { Image as ImageType, Video as VideoType } from "@/sanity/types";

import { Image } from "../global/image";
import { Video } from "../global/video";
import Link from "next/link";

interface WorksGridItemProps {
  title: string;
  slug: string;
  media: ImageType | VideoType;
  index: number
}

export const WorksGridItem: FC<WorksGridItemProps> = (props) => {
  const { title, slug, media, index } = props;

  const aspectRatio = useMemo(() => {
    return media?.aspectRatio || 1;
  }, [media])

  return (
    <Link
      scroll={false}
      href={`/project/${slug}?mediaIndex=${index}`}
      className="block w-full relative overflow-hidden h-0"
      style={{ paddingBottom: `${100 / aspectRatio}%` }}
    >
      <div className="absolute inset-0 w-full h-full">
        {media?._type === "image" ? (
          <Image image={media} className="object-contain w-full h-full" alt={title} sizes="20vw" />
        ) : null}
        {media?._type === "video" ? (
          <Video {...media} className="object-contain w-full h-full" />
        ) : null}
      </div>
    </Link>
  )
}