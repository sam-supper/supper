'use client'

import { useEffect, useMemo, useRef, useState, Suspense } from "react"
import { useLenis } from "lenis/react"

import { useAnimate } from "motion/react"
import { Image } from "../global/image"
import { easeInOutExpo, easeInOutQuart, easeOutExpo } from "@/lib/animation"
import { clamp } from "@/lib/clamp"
import { useSiteStore } from "@/stores/use-site-store"
export interface SplashCarouselProps {
  images: any[]
}

export const SplashCarousel: React.FC<SplashCarouselProps> = (props) => {
  const setHasLoaded = useSiteStore((state) => state.setHasLoaded)

  useEffect(() => {
    setTimeout(() => {
      setHasLoaded(true)
    }, 4000)
  }, [setHasLoaded])

  return <SplashCarouselContent {...props} />
}

export const SplashCarouselContent: React.FC<SplashCarouselProps> = (props) => {
  const { images } = props

  const [currentIndex, setCurrentIndex] = useState(5)
  const [lastIndex, setLastIndex] = useState(currentIndex - 1)
  const [isFirst, setIsFirst] = useState(true)
  const [scope, animate] = useAnimate()
  const container = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<HTMLDivElement[]>([])
  const lenis = useLenis()

  useEffect(() => {
    lenis?.stop();

    return () => {
      lenis?.start();
    }
  }, [lenis])

  useEffect(() => {
    // Create an interval to change the current image every 3 seconds
    const interval = setInterval(() => {
      // Increment the index and loop back to 0 when we reach the end
      setCurrentIndex((prevIndex) => {
        // If we're at the last image, go back to the first one
        if (prevIndex >= images.length - 1) {
          return 0;
        }
        // Otherwise, go to the next image
        return prevIndex + 1;
      });
    }, 700);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(interval);
    };
  }, [images])

  useEffect(() => {
    if (!container.current || typeof window === 'undefined') return
    const images = document.querySelectorAll('.splash-image-container')

    const lastImageContainer = images[lastIndex]
    const lastImage = lastImageContainer?.querySelector('.splash-image')

    const currentImageContainer = images[currentIndex]
    const currentImage = currentImageContainer?.querySelector('.splash-image')
    
    if (!lastImage || !currentImage) return
    
    const currentImageRect = currentImage.getBoundingClientRect()
    const containerRect = container.current.getBoundingClientRect()
    
    const scale = 1.65;
    const defaultWidth = clamp({ value: window.innerWidth * 0.12, min: 100, max: 400});
    const activeWidth = defaultWidth * scale;
    const inactiveWidth = defaultWidth;

    const imageCenter = -1 * (currentImageRect.left - window.innerWidth / 2 + (defaultWidth * scale) / 2)
    const containerOffset = containerRect.x

    const targetPosition = imageCenter + containerOffset + (!isFirst ? (activeWidth - defaultWidth) : 0)

    images?.forEach((image, index) => {      
      
      if (index === currentIndex) {
        animate(image, {
          width: activeWidth,
          z: 0
        }, {
          duration: 0.6,
          ease: easeInOutQuart
        })
      } else {
        animate(image, {
          width: inactiveWidth,
          z: 0
        }, {
          duration: 0.6,
          ease: easeInOutQuart
        })
      }
    })
    
    animate(container.current, {
      x: targetPosition,
      z: 0
    }, {
      duration: 0.6,
      ease: easeInOutQuart
    })

    setLastIndex(currentIndex)
    setIsFirst(false)
  }, [currentIndex])

  const randomizedImages = useMemo(() => {
    return images;
    // return images.sort(() => Math.random() - 0.5)
  }, [images])

  return (
    <div ref={scope} className="w-full h-screen overflow-hidden whitespace-nowrap place-content-center">
      <div ref={container} className="align-middle w-fit will-change-transform">
        {randomizedImages?.map((image, index) => {
          return (
            <div 
              key={image._id}
              className="splash-image-container inline-block align-middle w-[clamp(100px,12vw,400px)] h-auto origin-center will-change-transform transform-gpu"
              style={{ aspectRatio: image.aspectRatio > 1 ? image.aspectRatio : image.aspectRatio }}
              ref={(el) => {
                if (el) {
                  imagesRef.current[index] = el
                }
              }}
            >
              <div className="absolute inset-0 w-full h-full splash-image">
                <Image image={image} placeholder className="w-full h-full object-cover" sizes="350px" />
              </div>
            </div>
          )
        })}
        <div className="align-middle inline-block w-[100vw] overflow-hidden">
          {randomizedImages?.map((image) => {
            return (
              <div key={`${image._id}-clone`} className="inline-block align-middle w-[clamp(100px,12vw,400px)] h-auto" style={{ aspectRatio: image.aspectRatio > 1 ? image.aspectRatio : image.aspectRatio }}>
                <Image image={image} placeholder className="w-full h-full object-cover" sizes="350px" />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
