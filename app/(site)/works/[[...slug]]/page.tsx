import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";

import { WorksPage } from "@/components/works/works-page";
import { worksPageQuery, worksPagePathsQuery } from "@/sanity/queries/works";

export const dynamicParams = false

export default async function WorksRoute({ params }: any) {
  const { slug } = await params
  const { data: worksPage } = await sanityFetch({ query: worksPageQuery })

  const slugString = slug?.join('')

  return (
    <WorksPage {...worksPage} initialFilter={slugString} initialView={slugString?.length ? 'grid' : 'list'} />
  )
}

export async function generateStaticParams() {
  const worksPagePaths = await client.fetch(worksPagePathsQuery)

  const paths = worksPagePaths?.map((service: any) => ({
    slug: [service.slug],
  }))

  return [
    {
      slug: [''],
    },
    {
      slug: ['all'],
    },
    ...paths
  ]
}