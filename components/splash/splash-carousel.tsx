'use client'

import { useEffect, useRef, useState } from "react"

import { Image } from "../global/image"
import { motion } from "motion/react"

export interface SplashCarouselProps {
  images: any[]
}

export const SplashCarousel: React.FC<SplashCarouselProps> = (props) => {
  const { images } = props
  const [currendIndex, setCurrendIndex] = useState(images.length ? images.length / 2 : 0)

  return (
    <div className="w-full overflow-hidden whitespace-nowrap">
      {images?.map((image) => {
        return (
          <div key={image._id} className="inline-block align-middle w-[18vw] h-auto" style={{ aspectRatio: image.aspectRatio > 1 ? image.aspectRatio : image.aspectRatio }}>
            <Image image={image} className="w-full h-full object-cover" sizes="30vw" />
          </div>
        )
      })}
    </div>
  )
}