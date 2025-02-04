import { articlePageQuery, articlePageSlugsQuery } from "@/sanity/queries/article";
import { sanityFetch } from "@/sanity/lib/live";
import { client } from "@/sanity/lib/client";
import { ArticlePage } from "@/components/library/article-page";
import { notFound } from "next/navigation";
import { UpdateViewCount } from "./update-view-count";
import { getAllViews } from "@/db/queries/get-all-views";

export default async function About({ params }: any) {
  const paramsValue = await params;

  const views = await getAllViews();

  console.log('views: ', views)
  
  const { data: article } = await sanityFetch({
    query: articlePageQuery,
    params: paramsValue
  });

  if (!article) return notFound();
  
  return (
    <>
      <UpdateViewCount slug={paramsValue.slug} />
      <ArticlePage {...article} />
    </>
  )
}

export async function generateStaticParams() {
  const slugs = await client.fetch(articlePageSlugsQuery);

  return slugs.map((slug: { slug: string }) => ({ slug: slug.slug }));
}