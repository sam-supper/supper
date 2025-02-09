'use client'

import { type FC, type ReactNode, useCallback, useEffect, useMemo, useRef } from "react";
import { usePathname } from "next/navigation";
import { useSiteStore } from "@/stores/use-site-store";
import { getRelativePath } from "@/lib/get-relative-path";
import { easeInOutQuart } from "@/lib/easings";
import { useClickAway } from "react-use";

import type { SanityLink } from "@/sanity/types";

import { AnimatePresence, motion } from "framer-motion";
import { PortableText, PortableTextBlock } from "next-sanity";
import { MobileMenuButton } from "../mobile-menu/mobile-menu-button";
import { MobileMenu } from "../mobile-menu/mobile-menu";
import { Logo } from "./logo";
import Link from "next/link";

export interface HeaderProps {
  links: SanityLink[]
  contact: {
    label: string
    content: {
      _key: string
      label: string
      url?: string
    }[]
  }
  information: {
    label: string
    content: PortableTextBlock
  }
  projectCount?: string | number
}

export const Header: FC<HeaderProps> = (props) => {
  const { links, contact, information } = props

  const setInformationOpen = useSiteStore((state) => state.setInformationOpen)
  const setContactOpen = useSiteStore((state) => state.setContactOpen)
  const informationOpen = useSiteStore((state) => state.informationOpen)
  const contactOpen = useSiteStore((state) => state.contactOpen)
  const pathname = usePathname()

  const headerRef = useRef<HTMLDivElement>(null)

  const isActive = useMemo(() => {
    return pathname === '/' || contactOpen
  }, [pathname, contactOpen])

  const toggleInfo = useCallback(() => {
    setInformationOpen(!informationOpen)
  }, [informationOpen, setInformationOpen])

  const toggleContact = useCallback(() => {
    setContactOpen(!contactOpen)
  }, [contactOpen, setContactOpen])

  useEffect(() => {
    setInformationOpen(false)
    if (pathname !== '/') {
      setContactOpen(false)
    }
  }, [pathname])

  useClickAway(headerRef, () => {
    setContactOpen(false)
  })

  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setContactOpen(false)
      }
    }

    window.addEventListener('keyup', handleKeyUp)
    return () => window.removeEventListener('keyup', handleKeyUp)
  }, [])

  return (
    <header 
      ref={headerRef}
      className="w-full fixed top-0 left-0 px-site-x z-[100] py-16 md:pt-16 md:pb-12 bg-translucent backdrop-blur-nav text-nav"
    >
      <div className="w-full flex items-center justify-between md:site-grid place-items-start">
        <nav className="hidden md:flex items-center md:col-span-3">
          {links?.map((link) => {
            const { _key, label, to } = link;

            const url = getRelativePath({
              slug: to?.slug,
              type: to?._type
            })

            return (
              <Link key={_key} href={url}>{label}</Link>
            )
          })}
        </nav>
        <Link href="/" className="md:col-span-3">
          <Logo className="w-full h-auto max-w-70 md:max-w-100" />
        </Link>
        <div className="hidden md:grid md:col-span-3 grid-contain">
          <ToggleRow
            label={contact.label}
            enabled={isActive}
            onLabelClick={toggleContact}
          >
            <div className="w-full">
              {contact.content?.map((row) => (
                <div key={row._key}>
                  {row.url ? (
                    <a href={row.url} target="_blank">{row.label}</a>
                  ) : (
                    <div>{row.label}</div>
                  )}
                </div>
              ))}
            </div>
          </ToggleRow>
        </div>
        <div className="hidden md:grid md:col-span-3 grid-contain">
          <ToggleRow
            label={information.label}
            enabled={isActive}
            onLabelClick={toggleInfo}
          >
            <PortableText value={information.content} />
          </ToggleRow>
        </div>
        <MobileMenuButton />
      </div>
      <MobileMenu {...props} />
    </header>
  )
}

const ToggleRow = ({ label, children, enabled, onLabelClick }: { label: string, children: ReactNode, enabled: boolean, onLabelClick?: () => void }) => {
  return (
    <div className="w-full grid-contain">
      <AnimatePresence initial={false} mode="wait">
        {enabled ? (
          <motion.div
            key={`${label}-content`}
            className="w-full overflow-hidden"
            initial={{ opacity: 0, height: 0, y: 2 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: 2 }}
            transition={{
              duration: 0.45,
              ease: easeInOutQuart
            }}
          >
            <div className="w-full">{children}</div>
          </motion.div>
        ) : (
          <motion.button
            key={label}
            className="w-full"
            initial={{ opacity: 0, y: 2 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 2 }}
            onClick={onLabelClick}
            transition={{
              duration: 0.45,
              ease: easeInOutQuart
            }}
          >
            {label}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}