'use client'

import { type FC, useEffect } from "react";
import type { SEO } from "@/sanity/types";

import { useDynamicMetaTitle } from "@/hooks/use-dynamic-meta-title";
import { useSiteStore } from "@/stores/use-site-store";
import { easeInOutQuart, easeOutCubic } from "@/lib/animation";

import { PortableTextReactComponents } from "@portabletext/react";
import { AnimatePresence, motion } from "motion/react";
import { Footer } from "../global/footer";
import { RichTextSimple } from "../global/rich-text-simple";
import Link from "next/link";
import { useLenis } from "lenis/react";

interface InformationOverlayProps {
  content: any
  footer: any
  seo: SEO
}

const informationComponents: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => <p className="text-sans-small [&_em]:font-serif [&_em]:text-serif-small">{children}</p>,
  },
  marks: {
    em: ({ children }) => <em className="italic">{children}</em>,
    year: () => <>{new Date().getFullYear()}</>,
    internalLink: ({ children, value }) => {
      const { to } = value

      return (
        <Link href={`/${to.slug}`} scroll={false} className="relative text-grey underline hover:text-black active:text-black transition-colors duration-300 ease">
          {children}
        </Link>
      )
    },
    externalLink: ({ children, value }) => {
      const { url } = value

      return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="relative text-grey underline hover:text-black active:text-black transition-colors duration-300 ease">{children}</a>
      )
    }
  }
}

export const InformationOverlay: FC<InformationOverlayProps> = ({ footer, seo, content }) => {
  const isOpen = useSiteStore((state) => state.informationOpen)
  const setIsOpen = useSiteStore((state) => state.setInformationOpen)
  const lenis = useLenis();

  useDynamicMetaTitle({
    title: seo?.title,
    enabled: isOpen
  })

  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keyup', handleKeyUp)
    return () => window.removeEventListener('keyup', handleKeyUp)
  }, [])

  useEffect(() => {
    if (isOpen) {
      lenis?.stop()
    } else {
      lenis?.start()
    }

    return () => {
      if (lenis) {
        lenis.start()
      }
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="w-full h-screen fixed inset-0 z-[99] bg-overlay dark:bg-[#0e0e0efa] text-black dark:text-white transition-colors duration-500 ease"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.75,
            ease: easeOutCubic
          }}
        >
          <div className="w-full min-h-full flex flex-col">
            <div className="w-full flex-1 px-site-x pt-110 md:pt-150 text-title-lg flex flex-col gap-40 md:gap-80">
              {content?.map((item: any) => {
                if (item._type === "splitTextRow") {
                  return (
                    <div key={item._key} className="w-full flex items-start gap-site-x">
                      <div className="w-full flex-1">
                        <RichTextSimple value={item.columnOne} components={informationComponents} />
                      </div>
                      <div className="w-full flex-1">
                        <RichTextSimple value={item.columnTwo} components={informationComponents} />
                      </div>
                    </div>
                  )
                }

                return (
                  <div key={item._key} className="w-full site-grid">
                    <div className="col-span-full md:col-span-9">
                      <RichTextSimple value={item.text} components={informationComponents} />
                    </div>
                  </div>
                )
              })}
            </div>
            <Footer {...footer} />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}