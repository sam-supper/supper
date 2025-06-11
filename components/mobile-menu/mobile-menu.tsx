import { useCallback, useEffect, type FC } from "react";
import { useSiteStore } from "@/stores/use-site-store";
import { easeOutExpo } from "@/lib/animation";

import type { PortableTextBlock } from "@portabletext/types";

import { AnimatePresence, motion } from "framer-motion";
import { PortableText } from "next-sanity";
import Link from "next/link";

interface MobileMenuProps {
  links: {
    _key: string
    label: string
    type: 'internal' | 'external' | 'information' | 'contact'
    to?: {
      _type: string
      slug: string
    }
    url?: string
    childLinks?: {
      label: string
      url?: string
    }[]
  }[]
  contact: {
    label: string
    url?: string
    content: {
      _key: string
      label: string
      url?: string
    }[]
  }
  information: {
    label: string
    content: PortableTextBlock
  },
  projectCount?: string | number
}

export const MobileMenu: FC<MobileMenuProps> = ({ links, contact, information, projectCount }) => {
  const isOpen = useSiteStore((state) => state.mobileMenuOpen)
  const setMobileMenuOpen = useSiteStore((state) => state.setMobileMenuOpen)
  const informationOpen = useSiteStore((state) => state.informationOpen)
  const setInformationOpen = useSiteStore((state) => state.setInformationOpen)

  const toggleInformation = useCallback(() => {
    const isInfoOpen = !informationOpen

    if (isInfoOpen) {
      setMobileMenuOpen(false)
    }
    
    setInformationOpen(isInfoOpen)
  }, [informationOpen])

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false)
    setInformationOpen(false)
  }, [setMobileMenuOpen, setInformationOpen])

  useEffect(() => {
    return () => {
      setInformationOpen(false)
      setMobileMenuOpen(false)
    }
  }, [])

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div 
          className="overflow-hidden"
          initial={{ opacity: 0, y: -2, height: 0 }}
          animate={{ opacity: 1, y: 0, height: 'auto' }}
          exit={{ opacity: 0, y: -2, height: 0 }}
          transition={{ duration: 0.55, ease: easeOutExpo }}
        >
          <div className="w-full pt-24 pb-5 grid grid-cols-[auto_1fr] gap-x-30 gap-y-12">
            <div>
              <button className="underline" onClick={toggleInformation}>{information.label}</button>
            </div>
            <div>
              <PortableText value={information.content} />
            </div>

            <div>
              <a onClick={closeMobileMenu} href={contact.url} target="_blank" className="underline">{contact.label}</a>
            </div>
            <div className="flex flex-col">
              {contact.content?.map((row) => (
                <div key={row._key}>
                  {row.url ? (
                    <a onClick={closeMobileMenu} href={row.url} target="_blank">{row.label}</a>
                  ) : (
                    <div>{row.label}</div>
                  )}
                </div>
              ))}
            </div>

            <div>
              <Link href="/works" scroll={false} onClick={closeMobileMenu} className="underline">Works</Link>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}