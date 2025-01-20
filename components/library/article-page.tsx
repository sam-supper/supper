import type { ArticlePageQueryResult } from "@/sanity.types"
import { Image } from "@/components/global/image"
import { ArticleContent } from "@/components/library/article-content"
import { ArticleDetails } from "./article-details";
import { ReadingTools } from "./reading-tools";
import { ArticleShare } from "./article-share";
import { DonateCta } from "@/components/global/donate-cta";

export const ArticlePage = (props: ArticlePageQueryResult) => {
  if (!props) return null;

  const { featuredImage, content } = props;
  
  return (
    <div className="px-site-x py-site-y pt-100 md:pt-160">
      <div className="site-grid w-full">
        <div className="col-span-3 sticky self-start top-110 flex flex-col gap-24">
          <ArticleDetails {...props} />
          <ReadingTools />
          <ArticleShare />
        </div>
        <div className="col-span-8">
          {featuredImage ? (
            <div className="relative w-full h-auto aspect-article-hero">
              <Image image={featuredImage} className="absolute inset-0 w-full h-full object-cover" sizes="(max-width: 768px) 90vw, 70vw" />
            </div>
          ) : null}
        </div>
        <ArticleContent content={content as any} />
      </div>
      <DonateCta />
    </div>
  )
}