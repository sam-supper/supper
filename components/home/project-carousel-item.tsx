'use client';

import { useMemo, type FC } from "react";

import { Media } from "@/components/global/media";
import Link from "next/link";

interface ProjectCarouselItemProps {
  featuredMedia: any
  title: string
  slug: string
}

export const ProjectCarouselItem: FC<ProjectCarouselItemProps> = (props) => {
  const {featuredMedia, title, slug } = props;

  const isFullWidth = useMemo(() => {
    return featuredMedia.image?.aspectRatio > 1
  }, [featuredMedia])

  return (
    <div className="w-full h-full relative">
      <Media {...featuredMedia} fit={isFullWidth ? 'cover' : 'contain'} />
      <Link href={`/project/${slug}`} className="absolute bottom-0 left-0 z-[2] pl-20 pb-15">
        {title}: See More
      </Link>
    </div>
  )
}