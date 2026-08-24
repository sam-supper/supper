import { type FC } from "react";
import { type Project } from "./project.types";
import type { Image as ImageType, Video as VideoType } from "@/sanity/types";
import { Image } from "../global/image";
import { Video } from "../global/video";

export interface ProjectMediaProps {
  media: Project['media']
}

export const ProjectMedia: FC<ProjectMediaProps> = (props) => {
  const { media } = props

  return (
    <div className="w-full flex flex-col gap-y-10 md:gap-y-20">
      {media?.map((item) => {
        if (item._type === 'mediaRow') {
          return <MediaRow key={item._key} items={item.media} />
        }

        return (
          <div key={item._key} className="w-full relative overflow-hidden h-auto" style={{ aspectRatio: item.aspectRatio ?? '16/9' }}>
            <div className="w-full h-full">
              {item._type === 'image' ? (
                <Image image={item} className="object-contain w-full h-full" alt="" sizes="90vw" />
              ) : null}
              {item._type === 'video' ? (
                <Video {...item} className="object-contain w-full h-full" />
              ) : null}
            </div>
          </div>
        )
      })}
    </div>
  );
};

const MediaRow: FC<{ items: (ImageType | VideoType)[] }> = (props) => {
  const { items } = props

  return (
    <div 
      className="w-full gap-x-10 md:gap-x-20 grid grid-cols-[var(--grid-cols)]"
      style={{
        '--grid-cols': `repeat(${items.length}, 1fr)`
      } as React.CSSProperties}
    >
      {items.map((item) => {
        return (
          <div key={item._key} className="w-full relative overflow-hidden h-auto" style={{ aspectRatio: item.aspectRatio ?? '1/1' }}>
            {item._type === 'image' ? (
              <Image image={item} className="object-cover w-full h-full" alt="" sizes="90vw" />
            ) : null}
            {item._type === 'video' ? (
              <Video {...item} className="object-cover w-full h-full" />
            ) : null}
          </div>
        )
      })}
    </div>
  )
}
