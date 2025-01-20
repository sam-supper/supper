import { type ComponentProps } from "react";

import { sanityFetch } from "@/sanity/lib/live";
import { settingsFooterQuery } from "@/sanity/queries/settings";

import { ParsedCopyright } from '@/components/global/footer/parsed-copyright'
import { RichTextSimple } from '@/components/global/rich-text-simple'
import { CreditsRow } from "@/components/global/footer/credits-row";
import { Label } from "@/components/global/label";

export const Footer = async () => {
  const { data: footer } = await sanityFetch({ query: settingsFooterQuery });
  
  return (
    <footer className="bg-grey-light px-site-x py-site-x flex flex-col justify-between w-full aspect-footer text-sans-small">
      <div className="w-full site-grid">
        <div className="col-span-3 flex flex-col gap-18">
          {footer.siteInfo?.map((item: any) => {
            if (item._type === 'textBlock') {
              return (
                <div key={item._key} className="max-w-[320px]">
                  <RichTextSimple value={item.text} />
                </div>      
              )
            }

            if (item._type === 'credit') {
              return (
                <CreditsRow key={item._key} {...item} />
              )
            }
          })}
        </div>
        <div className="col-start-6 col-span-7 pr-[4%] grid grid-cols-4 gap-20">
          <div>
            <Label element="h3">Navigation</Label>
          </div>
          <div>
            <Label element="h3">Legal</Label>
          </div>
          <div>
            <Label element="h3">Social</Label>
          </div>
          <div>
            <Label element="h3">Contact</Label>
          </div>
        </div>
      </div>

      <div className="w-full site-grid items-end">
        <div className="col-span-3">
          <div className="max-w-[240px]">Sign up for our newsletter to stay notified of New Literature.</div>
        </div>
        <div className="col-span-7 col-start-6">
          <span className="text-grey">Generously supported by</span> Garden Variety
        </div>
      </div>
    </footer>
  )
}