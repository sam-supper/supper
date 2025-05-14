import { useMetadata } from "@/hooks/use-metadata";
import { sanityFetch } from "@/sanity/lib/live";
import { worksPageQuery } from "@/sanity/queries/works";
import { settingsFooterQuery } from "@/sanity/queries/settings";

export async function generateMetadata() {
  const { data: worksPage } = await sanityFetch({ query: worksPageQuery })

  return useMetadata({ data: worksPage?.seo })
}

export default async function WorksLayout({ children }: { children: React.ReactNode }) {
  const { data: footer } = await sanityFetch({ query: settingsFooterQuery });

  return (
    <div className="w-full pt-80 md:pt-150 px-site-x flex flex-col">
      {children}
    </div>
  )
}
