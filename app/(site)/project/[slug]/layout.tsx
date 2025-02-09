import { sanityFetch } from "@/sanity/lib/live";
import { settingsFooterQuery } from "@/sanity/queries/settings";

import { Footer } from "@/components/global/footer";

export default async function ProjectLayout({ children }: { children: React.ReactNode }) {
  const { data: footer } = await sanityFetch({ query: settingsFooterQuery });

  return (
    <div className="min-h-screen flex flex-col gap-140">
      <div className="w-full flex-1">
        {children}
      </div>
      <Footer {...footer} />
    </div>
  )
}