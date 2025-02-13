import { type FC } from "react";
import { useSiteStore } from "@/stores/use-site-store";
import { easeOutExpo } from "@/lib/animation";

import type { SanityLink } from "@/sanity/types";
import type { PortableTextBlock } from "@portabletext/types";

import { AnimatePresence, motion } from "framer-motion";
import { PortableText } from "next-sanity";
import Link from "next/link";

interface MobileMenuProps {
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
  },
  projectCount?: string | number
}

export const MobileMenu: FC<MobileMenuProps> = ({ links, contact, information, projectCount }) => {
  const isOpen = useSiteStore((state) => state.mobileMenuOpen)
  const setIsOpen = useSiteStore((state) => state.setMobileMenuOpen)

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
          <div className="w-full pt-20 grid grid-cols-[auto_1fr] gap-x-30 gap-y-12">
            <div>
              {information.label}
            </div>
            <div>
              <PortableText value={information.content} />
            </div>

            <div>
              {contact.label}
            </div>
            <div className="flex flex-col">
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

            <div>
              <Link href="/works">Works Index</Link>
            </div>
            <div>{projectCount} Case Studies</div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}