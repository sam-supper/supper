import { WorksPage } from "@/components/works/works-page";
import { worksPageQuery } from "@/sanity/queries/works";
import { sanityFetch } from "@/sanity/lib/live";

export default async function WorksRoute() {
  const { data: worksPage } = await sanityFetch({ query: worksPageQuery })

  return (
    <WorksPage {...worksPage} />
  )
}