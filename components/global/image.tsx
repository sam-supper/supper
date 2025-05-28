'use client'

import { useMemo, useState, type FC } from "react";
import { urlFor } from "@/sanity/lib/image";
import { AnimatePresence, motion } from "motion/react";

interface ImageProps {
  image: any
  alt?: string
  className?: string
  quality?: number
  sizes?: string
  placeholder?: boolean
}

export const Image: FC<ImageProps> = ({ image, quality = 90, alt, className, sizes = 'auto', placeholder = false }) => {
  const [hasLoaded, setHasLoaded] = useState(false)
  const deviceSizes = [320, 480, 768, 1024, 1280, 1536, 1920, 2560]

  const initialSrc = useMemo(() => {
    if (!image) return '';
    return urlFor(image).width(320).format('webp').quality(quality).url()
  }, [image, quality])

  const srcSet = useMemo(() => {
    if (!image) return '';
    return deviceSizes.map(size => `${urlFor(image).width(size).format('webp').quality(quality).url()} ${size}w`).join(', ')
  }, [image, quality])

  if (placeholder) {
    return (
      <div className={`${className} relative overflow-hidden`}>
        <AnimatePresence>
          {!hasLoaded ? (
            <motion.img
              src={image?.lqip}
              alt={alt}
              className="absolute inset-0 w-full h-full object-cover"
              sizes={sizes}
            />
          ) : null}
        </AnimatePresence>

        <img
          src={image?.lqip ?? initialSrc}
          srcSet={srcSet}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          sizes={sizes}
          onLoad={() => setHasLoaded(true)}
        />
      </div>
    )
  }

  return (
    <img
      src={image?.lqip ?? initialSrc}
      srcSet={srcSet}
      alt={alt}
      className={className}
      sizes={sizes}
    />
  )
}