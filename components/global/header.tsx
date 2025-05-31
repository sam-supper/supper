'use client'

import { type FC, type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useSiteStore } from "@/stores/use-site-store";
import { getRelativePath } from "@/lib/get-relative-path";
import { easeInOutQuart } from "@/lib/animation";
import { useClickAway } from "react-use";
import { useKeyPress } from "@/hooks/use-key-press";
import { PortableText } from "next-sanity"

import type { SanityLink } from "@/sanity/types";

import { AnimatePresence, motion } from "framer-motion";
import { PortableTextBlock } from "next-sanity";
import { MobileMenuButton } from "../mobile-menu/mobile-menu-button";
import { MobileMenu } from "../mobile-menu/mobile-menu";
import { Logo } from "./logo";
import Link from "next/link";
import { useLenis } from "lenis/react";
import { ThemeToggle } from "./theme-toggle";
import { useThemeStore } from "@/stores/use-theme-store";
import { CopyButton } from "./copy-button";

export interface HeaderProps {
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
  }
  projectCount?: string | number
}

export const Header: FC<HeaderProps> = (props) => {
  const { links, contact, information } = props
  
  const [hasScrolled, setHasScrolled] = useState(false)
  const [disableHeroTheme, setDisableHeroTheme] = useState(false)

  const theme = useThemeStore((state) => state.theme)
  const heroTheme = useSiteStore((state) => state.heroTheme)
  
  const contactOpen = useSiteStore((state) => state.contactOpen)
  const pathname = usePathname()

  const informationOpen = useSiteStore((state) => state.informationOpen)
  const setInformationOpen = useSiteStore((state) => state.setInformationOpen)
  const setMobileMenuOpen = useSiteStore((state) => state.setMobileMenuOpen)
  const setContactOpen = useSiteStore((state) => state.setContactOpen)
  
  useLenis(({ scroll }) => {
    if (typeof window === 'undefined') return

    const heroThemeDisabled = scroll > (window.innerHeight - 50)
    const hasScrolled = scroll > 100

    if (hasScrolled) {
      setContactOpen(false)
    }
    
    setDisableHeroTheme(heroThemeDisabled)
    setHasScrolled(hasScrolled)
  });

  const headerRef = useRef<HTMLDivElement>(null)

  // const isActive = useMemo(() => {
  //   return (pathname === '/' || contactOpen) && !hasScrolled
  // }, [pathname, contactOpen, hasScrolled])

  const toggleInfo = useCallback(() => {
    console.log('toggleInfo', informationOpen)
     setInformationOpen(!informationOpen)
   }, [informationOpen, setInformationOpen])

  const toggleContact = useCallback(() => {
    setContactOpen(!contactOpen)
    setInformationOpen(false)
  }, [contactOpen, setContactOpen, setInformationOpen])

  useEffect(() => {
    setInformationOpen(false)
    if (pathname !== '/') {
      setContactOpen(false)
    }
  }, [pathname])

  useClickAway(headerRef, () => {
    setContactOpen(false)
    setMobileMenuOpen(false)
    setInformationOpen(false)
  })

  const handleLinkClick = useCallback(() => {
    setInformationOpen(false)
  }, [setContactOpen, setInformationOpen])

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false)
  }, [setMobileMenuOpen])

  useKeyPress('Escape', () => {
    setContactOpen(false)
    setInformationOpen(false)
  })

  const handleLogoClick = useCallback(() => {
    setMobileMenuOpen(false)

    if (pathname === '/') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }, [pathname])

  const colorClass = useMemo(() => {
    if (informationOpen) {
      return 'text-black dark:text-white'
    }

    if (!disableHeroTheme) {
      return heroTheme === 'dark' ? 'text-white' : 'text-black dark:text-white'
    }

    return theme === 'dark' ? 'text-white' : 'text-black dark:text-white'
  }, [theme, heroTheme, disableHeroTheme, informationOpen])

  return (
    <header 
      ref={headerRef}
      className={`
        w-full fixed top-0 left-0 px-site-x z-[100] py-16 md:pt-16 md:pb-12 backdrop-blur-nav text-nav text-black transition-colors duration-500 ease
        ${colorClass}
        ${!informationOpen ? 'bg-translucent' : ''}
      `
      }
    >
      <div className="w-full flex items-start justify-between">
        <Link onClick={handleLogoClick} scroll={false} href="/" className="md:flex-1">
          <Logo className="h-24 md:h-18 w-auto" />
        </Link>
          {links?.map((link) => {
            const { _key, label, to, url, type, childLinks = [] } = link;

            const linkProps = type === 'internal' ? {
              href: getRelativePath({
                slug: to?.slug,
                type: to?._type
              }) ?? '',
              scroll: false,
              onClick: handleLinkClick
            } : type === 'external' ? { 
              href: url ?? '',
              target: '_blank',
              onClick: handleLinkClick
            } : {
              href: '',
            }

            if (type === 'information') {
              return (
                <button
                  key={_key}
                  onClick={toggleInfo}
                  aria-expanded={informationOpen}
                  aria-controls="information-content"
                  className={`site-link max-md:hidden md:flex-1 text-left ${informationOpen ? 'site-link--active' : ''}`}
                >
                  {label}
                </button>
              )
            }

            if (type === 'contact') {
              return (
                <ToggleRow
                  key={_key}
                  label={label}
                  enabled={contactOpen}
                  onLabelClick={toggleContact}
                >
                  <ul className="w-full flex flex-col items-start justify-start">
                    {childLinks.map((childLink) => {
                      if (!childLink.url?.includes('mailto:') || !childLink.url?.includes('http')) {
                        return (
                          <li key={childLink.label}>
                            <CopyButton text={childLink.url ?? ''}>
                              <span className="site-link">{childLink.label}</span>
                            </CopyButton>
                          </li>
                        )
                      }
                      return (
                        <li key={childLink.label}>
                          <Link href={childLink.url ?? ''} className="site-link">
                            {childLink.label}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </ToggleRow>
              )
            }

            return (
              <Link
                key={_key}
                {...linkProps}
                className="site-link max-md:hidden md:flex-1"
              >
                {label}
              </Link>
            )
          })}
        <div className="hidden md:block w-auto">
          &copy;{new Date().getFullYear()}
          {/* <ThemeToggle /> */}
        </div>
        <MobileMenuButton />
      </div>
      <MobileMenu {...props} />
    </header>
  )
}

const ToggleRow = ({ label, children, enabled, onLabelClick, suffix, url }: { label: string, children: ReactNode, enabled: boolean, suffix?: ReactNode, onLabelClick?: () => void, url?: string }) => {
  return (
    <div className="max-md:hidden w-full md:flex-1 grid-contain">
      <AnimatePresence initial={false}>
        {enabled ? (
          <motion.div
            key={`${label}-content`}
            className="w-full overflow-hidden"
            initial={{ opacity: 0, height: 0, y: 4 }}
            animate={{ opacity: 1, height: 'auto', y: 0, transition: { duration: 0.55, ease: easeInOutQuart, delay: 0.15 } }}
            exit={{ opacity: 0, height: 0, y: 4 }}
            transition={{
              duration: 0.55,
              ease: easeInOutQuart
            }}
          >
            <div className="w-full">{children}</div>
          </motion.div>
        ) : (
          <motion.div
            key={label}
            className="w-full flex items-start justify-between"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.55, ease: easeInOutQuart, delay: 0.15 } }}
            exit={{ opacity: 0, y: -4 }}
            transition={{
              duration: 0.55,
              ease: easeInOutQuart
            }}
          >
            {url ? (
              <>
                <a href={url} target="_blank" className="site-link md:hidden" onClick={onLabelClick}>{label}</a>
                <button className="hidden md:flex site-link" onClick={onLabelClick}>{label}</button>
              </>
            ) : (
              <button className="site-link" onClick={onLabelClick}>{label}</button>
            )}
            {suffix ?? null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
