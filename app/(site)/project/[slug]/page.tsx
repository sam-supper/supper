import { ProjectPage } from "@/components/project/project-page"
import { client } from "@/sanity/lib/client"
import { sanityFetch } from "@/sanity/lib/live"
import { projectQuery, projectPathsQuery } from "@/sanity/queries/project"

export default async function ProjectRoute({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug
  const { data: project} = await sanityFetch({ query: projectQuery, params: { slug } })
  
  return <ProjectPage {...project} />
}

export async function generateStaticParams() {
  const slugs = await client.fetch(projectPathsQuery);

  return slugs.map((slug: { slug: string }) => ({ slug: slug.slug }));
}