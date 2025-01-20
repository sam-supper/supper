import { type FC } from "react";
import type { ArticlePageQueryResult } from "@/sanity.types"

import { FormattedDate } from "../global/formatted-date";
import { Label } from "../global/label";

export const ArticleDetails: FC<ArticlePageQueryResult> = (props) => {
  if (!props) return null;
  
  const { title, category, published, originalPublished, authors, wordCount, readingTime } = props;

  return (
    <div className="flex flex-col gap-24">
      <div>
        <Label element="div" className="text-sans-small pb-2">{category}</Label>
        <h1 className="text-sans-medium">{title}</h1>
        {authors?.map((author: any, index: number) => (
          <div key={author._key} className="text-sans-medium text-royal-blue dark:text-royal-blue-dark">
            {author.name}
            {index < authors.length - 1 ? ', ' : null}
          </div>
        ))}
      </div>
      <div className="text-serif-small text-grey font-serif">
        <div><FormattedDate date={published} /></div>
        {originalPublished && (
          <div>Originally Published <FormattedDate date={originalPublished} /></div>
        )}
        <div>{wordCount} Words</div>
        <div>{readingTime} Min Read</div>
      </div>
    </div>
  )
}