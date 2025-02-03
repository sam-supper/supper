import { articlePageQuery, articlePageSlugsQuery } from "@/sanity/queries/article";
import { sanityFetch } from "@/sanity/lib/live";
import { client } from "@/sanity/lib/client";
import { ArticlePage } from "@/components/library/article-page";
import { notFound } from "next/navigation";

export default async function About({ params }: any) {
  const { data: article } = await sanityFetch({
    query: articlePageQuery,
    params: await params
  });

  if (!article) return notFound();
  
  return <ArticlePage {...article} />
}

export async function generateStaticParams() {
  const slugs = await client.fetch(articlePageSlugsQuery);

  return slugs.map((slug: { slug: string }) => ({ slug: slug.slug }));
}