import type { FC } from 'react'
import type { SanityLink } from '@/sanity/types'

import { articlesBySlugsQuery } from '@/sanity/queries/article'
import { sanityFetch } from '@/sanity/lib/live'

import { getLastWeeksViews } from '@/db/queries/get-last-weeks-views'
import { getAllViews } from '@/db/queries/get-all-views'

import { InternalLink } from '../global/internal-link'
import { Label } from '../global/label'
import Link from 'next/link'

interface PopularEntriesListProps {
  title: string
  weeklyTitle: string
  allTimeTitle: string
  link?: SanityLink
}

export const PopularEntriesList: FC<PopularEntriesListProps> = async ({ title, weeklyTitle, allTimeTitle, link }) => {
  const [articlesByWeek, articlesAllTime] = await Promise.all([
    await getLastWeeksViews(),
    await getAllViews()
  ])

  const lastWeeksSlugs = articlesByWeek.map((article) => article.slug)
  const allTimeSlugs = articlesAllTime.map((article) => article.slug)

  const { data: lastWeeksArticles } = await sanityFetch({ query: articlesBySlugsQuery, params: { slugs: lastWeeksSlugs } })
  const { data: allTimeArticles } = await sanityFetch({ query: articlesBySlugsQuery, params: { slugs: allTimeSlugs } })
  
  return (
    <div className="flex flex-col items-center justify-center gap-32 pt-40">
      <Label element="h2" className="text-sans-small" uppercase>{title}</Label>

      <div className="w-full grid grid-cols-2 gap-16">
        <ListColumn title={weeklyTitle} articles={lastWeeksArticles} />
        <ListColumn title={allTimeTitle} articles={allTimeArticles} link={link} />
      </div>
    </div>
  )
}

const ListColumn: FC<Partial<PopularEntriesListProps & { articles?: any[] }>> = ({ title, articles, link }) => {
  return (
    <div className="flex flex-col gap-50">
      <div className="flex items-end justify-between">
        <h3 className="text-sans-medium uppercase">{title}</h3>
        {link ? <InternalLink className="text-sans-small text-grey hover:text-royal-blue active:text-royal-blue-dark transition-colors duration-300 ease" {...link} /> : null}
      </div>
      <ol className="flex flex-col gap-20">
        {articles?.map((article, index) => {
          return (
            <li key={index} className="w-full">
              <Link href={`/library/${article.slug}`} className="flex items-start gap-32 md:gap-72">
                <div className="text-sans-medium">{index + 1}</div>
                <div className="flex flex-col">
                  <div className="text-sans-medium font-sans text-grey">{article.authors.map((author: any) => author.name).join(', ')}</div>
                  <div className="text-serif-medium font-serif">{article.title}</div>
                </div>
              </Link>
            </li>
          )
        })}
      </ol>
    </div>
  )
}