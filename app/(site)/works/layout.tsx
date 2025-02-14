import { useMetadata } from "@/hooks/use-metadata";
import { sanityFetch } from "@/sanity/lib/live";
import { worksPageQuery } from "@/sanity/queries/works";
import { settingsFooterQuery } from "@/sanity/queries/settings";

import { Footer } from "@/components/global/footer";
import { ViewToggle } from "@/components/works/view-toggle";

export async function generateMetadata() {
  const { data: worksPage } = await sanityFetch({ query: worksPageQuery })

  return useMetadata({ data: worksPage?.seo })
}

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
    </div>
  )
}
