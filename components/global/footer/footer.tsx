import type { FC } from "react";
import { sanityFetch } from "@/sanity/lib/live";
import { settingsFooterQuery } from "@/sanity/queries/settings";

import { RichTextSimple } from '@/components/global/rich-text-simple'

interface FooterProps {
  columns: any
  externalLinks: any
}

export const Footer: FC<FooterProps> = ({ columns, externalLinks }) => {
  return (
    <footer className="px-site-x py-site-y flex flex-col md:site-grid text-footer">
      <div className="md:col-span-6 flex items-end justify-between gap-site-x">
        {columns?.map((column: any, index: number) => {
          const visibleOnMobile = index === 0
          return (
            <div
              key={column._key}
              className={`${!visibleOnMobile ? 'hidden md:block' : ''} relative max-w-140`}
            >
              <RichTextSimple value={column.text} />
            </div>
          )
        })}
      </div>
      <div className="hidden md:flex items-end justify-end gap-50 md:col-span-6">
        <ul className="flex items-center gap-3">
          {externalLinks?.map((link: any, index: number) => {
            return (
              <li key={link._key}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group text-footer"
                >
                  {link.label}{index < externalLinks?.length - 1 ? ',' : ''}
                </a>
              </li>
            )
          })}
        </ul>
        <p>(C){new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}