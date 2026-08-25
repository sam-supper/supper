import { useCallback, useEffect, type FC } from "react";
import { useSiteStore } from "@/stores/use-site-store";
import { easeOutExpo } from "@/lib/animation";

import type { PortableTextBlock } from "@portabletext/types";

import { AnimatePresence, motion } from "framer-motion";
import { PortableText } from "next-sanity";
import Link from "next/link";
import { CopyButton } from "@/components/global/copy-button";

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

export const MobileMenu: FC<MobileMenuProps> = ({ links, information, projectCount }) => {
  // Use the same Contact source as the desktop header (the contact link's child links)
  // so the two stay in sync instead of drifting.
  const contactLink = links?.find((link) => link.type === 'contact')
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
              <span className="underline">{contactLink?.label}</span>
            </div>
            <div className="flex flex-col">
              {contactLink?.childLinks?.map((child) => {
                const url = child.url ?? ''
                const isMailto = url.includes('mailto:')
                const isHttp = url.includes('http')

                // Bare handles/emails copy to clipboard; real links open — same as desktop.
                if (!isMailto && !isHttp) {
                  return (
                    <div key={child.label}>
                      <CopyButton text={url}>{child.label}</CopyButton>
                    </div>
                  )
                }

                return (
                  <div key={child.label}>
                    <a
                      onClick={closeMobileMenu}
                      href={url}
                      {...(isHttp ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    >
                      {child.label}
                    </a>
                  </div>
                )
              })}
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