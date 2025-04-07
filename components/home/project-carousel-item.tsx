'use client';

import { useCallback, useMemo, type FC } from "react";

import { Media } from "@/components/global/media";
import Link from "next/link";
import { Image } from "../global/image";
import { Video } from "../global/video";

interface ProjectCarouselItemProps {
  featuredMedia: any
  title: string
  client?: string
  slug: string
  color?: string
}

export const ProjectCarouselItem: FC<ProjectCarouselItemProps> = (props) => {
  const {featuredMedia, title, client, color, slug } = props;

  const isFullWidth = useMemo(() => {
    return featuredMedia?.aspectRatio > 1
  }, [featuredMedia])

  const fitClass = useMemo(() => {
    return isFullWidth ? 'object-cover' : 'object-contain'
  }, [isFullWidth])

  const handleLinkClick = useCallback((e: any) => {
    e.stopPropagation()
  }, [])

  return (
    <div className={`w-full h-full relative text-white`}>
      {featuredMedia._type === 'image' ? (
        <Image image={featuredMedia} alt={title} className={`w-full h-full ${fitClass}`} />
      ) : null}
      {featuredMedia._type === 'video' ? (
        <Video {...featuredMedia} className={`w-full h-full ${fitClass}`} />
      ) : null}
      <Link href={`/project/${slug}`} onClick={handleLinkClick} className="absolute bottom-0 left-0 z-[2] pl-20 pb-15 text-title-sm hover:underline">
        {client ?? title}
      </Link>
    </div>
  )
}