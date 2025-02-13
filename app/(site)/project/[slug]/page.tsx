import { ProjectPage } from "@/components/project/project-page"
import { useMetadata } from "@/hooks/use-metadata"
import { projectQuery, projectPathsQuery } from "@/sanity/queries/project"
import { sanityFetch } from "@/sanity/lib/live"
import { client } from "@/sanity/lib/client"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug
  
  const { data: project } = await sanityFetch({ query: projectQuery, params: { slug } })

  const seoData = {
    title: project?.seo?.title || project?.title,
    ...project?.seo
  }

  return useMetadata({ data: seoData })
}

export default async function ProjectRoute({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug
  const { data: project} = await sanityFetch({ query: projectQuery, params: { slug } })
  
  return <ProjectPage {...project} />
}

export async function generateStaticParams() {
  const slugs = await client.fetch(projectPathsQuery);

  return slugs.map((slug: { slug: string }) => ({ slug: slug.slug }));
}