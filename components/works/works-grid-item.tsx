'use client'

import { useMemo, type FC } from "react";
import { useWorksStore } from "./use-works-store";
import { motion } from "framer-motion";

import type { Image as ImageType, Video as VideoType } from "@/sanity/types";

import { Image } from "../global/image";
import { Video } from "../global/video";
import Link from "next/link";
import { easeInOutQuart } from "@/lib/animation";

interface WorksGridItemProps {
  title: string;
  client: any;
  slug: string;
  featuredMedia: ImageType | VideoType;
  index: number
}

const MotionLink = motion.create(Link, { forwardMotionProps: true })

export const WorksGridItem: FC<WorksGridItemProps> = (props) => {
  const { title, client, slug, featuredMedia, index } = props;
  const gridSize = useWorksStore((state) => state.gridSize)

  const aspectRatio = useMemo(() => {
    return featuredMedia?.aspectRatio || 1;
  }, [featuredMedia])

  return (
    <MotionLink
      scroll={false}
      href={`/project/${slug}?mediaIndex=${index}`}
      className="group block w-full relative overflow-hidden h-0 pb-[var(--padding-bottom)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.45, ease: easeInOutQuart, delay: index * 0.025 } }}
      transition={{ duration: 0.45, ease: easeInOutQuart }}
      exit={{ opacity: 0 }}
      style={{
        '--padding-bottom': `${100 / (4/5)}%`,
        '--aspect-ratio': aspectRatio
      } as any}
    >
      {gridSize == 4 || gridSize == 6 ? (
        <div>
          <div
            className="absolute inset-0 w-full h-full z-[5] bg-[rgba(196,196,196,0.15)] backdrop-blur-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-400 ease will-change-transform"
          ></div>
          <div className="absolute inset-0 w-full h-full z-[6] p-10 flex flex-col justify-end text-nav mix-blend-difference text-white opacity-0 will-change-transform group-hover:opacity-100 transition-opacity duration-400 ease">
            {client?.title ? <div>{client.title}</div> : null}
            <div>{title}</div>
          </div>
        </div>
      ) : null}

      <div className="absolute inset-0 w-full h-full z-[1]">
        {featuredMedia?._type === "image" && featuredMedia?.asset ? (
          <Image image={featuredMedia} className="object-cover w-full h-full" alt={title} sizes="(max-width: 800px) 30vw, 20vw" />
        ) : null}
        {featuredMedia?._type === "video" ? (
          <Video {...featuredMedia} className="object-cover w-full h-full" />
        ) : null}
      </div>
    </MotionLink>
  )
}