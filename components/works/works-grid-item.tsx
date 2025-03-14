import { useMemo, type FC } from "react";
import type { Image as ImageType, Video as VideoType } from "@/sanity/types";

import { Image } from "../global/image";
import { Video } from "../global/video";
import Link from "next/link";

interface WorksGridItemProps {
  title: string;
  slug: string;
  media: ImageType | VideoType;
  hoverMedia?: ImageType | VideoType;
  index: number
}

export const WorksGridItem: FC<WorksGridItemProps> = (props) => {
  const { title, slug, media, hoverMedia, index } = props;

  const aspectRatio = useMemo(() => {
    return media?.aspectRatio || 1;
  }, [media])

  if (!(media as any)?.url && !(media as any)?.asset) return null

  return (
    <Link
      scroll={false}
      href={`/project/${slug}?mediaIndex=${index}`}
      className="group block w-full relative overflow-hidden h-0"
      style={{ paddingBottom: `${100 / (4/5)}%` }}
    >
      <div className="absolute inset-0 w-full h-full z-[1]">
        {media?._type === "image" && media?.asset ? (
          <Image image={media} className="object-cover w-full h-full" alt={title} sizes="40vw" />
        ) : null}
        {media?._type === "video" ? (
          <Video {...media} className="object-cover w-full h-full" />
        ) : null}
      </div>

      <div className="absolute inset-0 w-full h-full z-[2] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {hoverMedia?._type === "image" && hoverMedia?.asset ? (
          <Image image={hoverMedia} className="object-cover w-full h-full" alt={title} sizes="40vw" />
        ) : null}
        {hoverMedia?._type === "video" ? (
          <Video {...hoverMedia} className="object-cover w-full h-full" />
        ) : null}
      </div>
    </Link>
  )
}