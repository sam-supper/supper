import type { FC } from "react";

import { RichTextSimple } from '@/components/global/rich-text-simple'

interface FooterProps {
  columns: any
  externalLinks: any
}

export const Footer: FC<FooterProps> = ({ columns, externalLinks }) => {
  return (
    <footer className="px-site-x py-site-y mt-200 flex flex-col md:site-grid text-footer">
      <div className="md:col-span-9 lg:col-span-6 flex items-end justify-between gap-site-x">
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
      <div className="hidden md:flex items-end justify-end gap-50 md:col-span-3 lg:col-span-6">
        <p className="text-footer">
          (C){new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}