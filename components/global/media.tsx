import { FC, useMemo } from "react";
import { Image } from "./image";
import { MediaType } from "@/sanity/types";

export interface MediaProps {
  mediaType: MediaType
  alt?: string
  image?: any
  video?: any
  fit?: 'contain' | 'cover'
  position?: 'center' | 'bottom' | 'top'
}

export const Media: FC<MediaProps> = (props) => {
  const { mediaType, image, video, fit = 'cover', alt, position = 'center' } = props

  const fitClasses = useMemo(() => {
    const fitClass = fit === 'contain' ? 'object-contain' : 'object-cover';
    const positionClass = position === 'center' ? 'object-center' : position === 'bottom' ? 'object-bottom' : 'object-top';

    return [fitClass, positionClass].join(' ');
  }, [fit, position])

  return (
    <div className="w-full h-full flex items-center justify-center">
      {mediaType === 'image' ? <Image className={`w-full h-full ${fitClasses}`} image={image} alt={alt} /> : null}
      {mediaType === 'video' ? (
        <div className="w-full h-full">
          <video
            className={`w-full h-full ${fitClasses}`}
            src={video.url}
            autoPlay
            muted
            loop
            playsInline
          />
          {alt ? <span className="sr-only">{alt}</span> : null}
        </div>
      ) : null}
    </div>
  )
}