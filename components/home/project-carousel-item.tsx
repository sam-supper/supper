'use client';

import { useCallback, useMemo, type FC } from "react";

import Link from "next/link";
import { Image } from "../global/image";
import { Video } from "../global/video";

interface ProjectCarouselItemProps {
  media: any
  title: string
  client?: string
  slug: string
  color?: string
}

export const ProjectCarouselItem: FC<ProjectCarouselItemProps> = (props) => {
  const {media, title, client, color, slug } = props;

  const isFullWidth = useMemo(() => {
    return media?.image?.aspectRatio > 1 || media?.video?.aspectRatio > 1
  }, [media])

  const fitClass = useMemo(() => {
    return isFullWidth ? 'object-cover' : 'object-contain'
  }, [isFullWidth])

  const colorClass = useMemo(() => {
    return color === 'white' ? 'text-white' : 'text-black'
  }, [color])

  const handleLinkClick = useCallback((e: any) => {
    e.stopPropagation()
  }, [])

  return (
    <div className={`w-full h-full relative ${colorClass}`}>
      {media.mediaType === 'image' ? (
        <Image image={media.image} alt={title} className={`w-full h-full ${fitClass}`} sizes="100vw" />
      ) : null}
      {media.mediaType === 'video' ? (
        <Video {...media.video} className={`w-full h-full ${fitClass}`} />
      ) : null}
      <Link
        href={`/project/${slug}`}
        onClick={handleLinkClick}
        className="absolute bottom-0 left-0 z-[2] pl-20 pb-15 text-title-sm hover:underline"
      >
        {client ?? title}
      </Link>
    </div>
  )
}