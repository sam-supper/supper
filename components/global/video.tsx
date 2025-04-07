'use client'

import { useInView } from "motion/react";
import { ComponentProps, useEffect, useRef, type FC } from "react";

interface VideoProps extends ComponentProps<'video'> {
  url: string
  className?: string
}

export const Video: FC<VideoProps> = (props) => {
  const { url, className } = props;

  const videoRef = useRef<HTMLVideoElement>(null)

  const isInView = useInView(videoRef)

  useEffect(() => {
    if (!videoRef.current) return

    if (isInView) {
      if (videoRef.current.paused) {
        videoRef.current.play()
      }
    } else {
      if (!videoRef.current.paused) {
        videoRef.current.pause()
      }
    }
  }, [isInView])

  return <video ref={videoRef} src={url} muted loop playsInline className={className} preload="metadata" />
}