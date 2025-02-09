import { sanityFetch } from "@/sanity/lib/live";
import { settingsFooterQuery } from "@/sanity/queries/settings";

import { Footer } from "@/components/global/footer";
import { ViewToggle } from "@/components/works/view-toggle";

export default async function WorksLayout({ children }: { children: React.ReactNode }) {
  const { data: footer } = await sanityFetch({ query: settingsFooterQuery });

  return (
    <div className="w-full pt-80 md:pt-150 px-site-x min-h-screen flex flex-col gap-80 md:gap-140">
      <div className="w-full relative flex-1">
        <div className="absolute top-0 right-0">
          <ViewToggle />
        </div>
        {children}
      </div>
      <Footer {...footer} />
    </div>
  )
}