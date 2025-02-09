'use client'

import { type FC, useEffect } from "react";
import { PortableTextReactComponents } from "@portabletext/react";
import { useSiteStore } from "@/stores/use-site-store";
import { easeInOutQuart } from "@/lib/easings";

import { AnimatePresence, motion } from "motion/react";
import { Footer } from "../global/footer";
import { RichTextSimple } from "../global/rich-text-simple";
import Link from "next/link";

interface InformationOverlayProps {
  content: any
  footer: any
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
        <Link href={`/${to.slug}`} className="relative text-grey underline hover:text-black active:text-black transition-colors duration-300 ease">
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

export const InformationOverlay: FC<InformationOverlayProps> = ({ footer, content }) => {
  const isOpen = useSiteStore((state) => state.informationOpen)
  const setIsOpen = useSiteStore((state) => state.setInformationOpen)

  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keyup', handleKeyUp)
    return () => window.removeEventListener('keyup', handleKeyUp)
  }, [])

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="w-full h-screen fixed inset-0 z-[99] bg-overlay text-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.45,
            ease: easeInOutQuart
          }}
        >
          <div className="w-full min-h-full flex flex-col">
            <div className="w-full flex-1 px-site-x pt-150 text-title-lg flex flex-col gap-80">
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
                  <div key={item._key}>
                    <RichTextSimple value={item.text} components={informationComponents} />
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