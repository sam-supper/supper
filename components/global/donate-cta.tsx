import { sanityFetch } from "@/sanity/lib/live";
import { settingsQuery } from "@/sanity/queries/settings";

import { IconArrowDiagonal } from "../icons/icon-arrow-diagonal";
import { Label } from "./label";
import Link from "next/link";

export const DonateCta = async () => {
  const { data: settings } = await sanityFetch({ query: settingsQuery });

  return (
    <div className="py-140 flex flex-col items-center justify-center gap-20">
      <Label element="h2" uppercase className="text-center text-sans-small">{settings?.donate?.title}</Label>
      <div className="flex flex-col text-[64px] leading-100 font-serif">
        <p>{settings?.donate?.text}</p>
        <Link className="text-royal-blue dark:text-royal-blue-dark relative group" href="#">
          <span>{settings?.donate?.linkText}</span>
          <IconArrowDiagonal className="inline-block ml-20 relative top-1 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-400 ease will-change-transform" />
        </Link>
      </div>
    </div>
  )
}