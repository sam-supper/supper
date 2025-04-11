'use client'

import { useMemo, type FC } from "react";
import { useWorksStore } from "./use-works-store";
import type { Image as ImageType, Video as VideoType } from "@/sanity/types";

import { Image } from "../global/image";
import { Video } from "../global/video";
import Link from "next/link";

interface WorksGridItemProps {
  title: string;
  client: any;
  slug: string;
  media: ImageType | VideoType;
  hoverMedia?: ImageType | VideoType;
  index: number
}

export const WorksGridItem: FC<WorksGridItemProps> = (props) => {
  const { title, client, slug, media, hoverMedia, index } = props;
  const gridSize = useWorksStore((state) => state.gridSize)

  const aspectRatio = useMemo(() => {
    return media?.aspectRatio || 1;
  }, [media])

  if (!(media as any)?.url && !(media as any)?.asset) return null

  return (
    <Link
      scroll={false}
      href={`/project/${slug}?mediaIndex=${index}`}
      className="group block w-full relative overflow-hidden md:h-0 md:pb-[var(--padding-bottom)] max-md:aspect-[var(--aspect-ratio)]"
      style={{
        '--padding-bottom': `${100 / (4/5)}%`,
        '--aspect-ratio': aspectRatio
      } as any}
    >
      {gridSize == 4 || gridSize == 6 ? (
        <div
          className="absolute inset-0 w-full h-full z-[5] p-10 text-white bg-[rgba(196,196,196,0.15)] backdrop-blur-[20px] flex flex-col justify-end text-nav opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease"
        >
          {client?.title ? <div>{client.title}</div> : null}
          <div>{title}</div>
        </div>
      ) : null}

      <div className="absolute inset-0 w-full h-full z-[1]">
        {media?._type === "image" && media?.asset ? (
          <Image image={media} className="object-cover w-full h-full" alt={title} sizes="(max-width: 800px) 30vw, 20vw" />
        ) : null}
        {media?._type === "video" ? (
          <Video {...media} className="object-cover w-full h-full" />
        ) : null}
      </div>
    </Link>
  )
}