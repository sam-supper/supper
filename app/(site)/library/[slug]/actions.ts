'use server'

import { headers } from 'next/headers'
import { userAgent } from 'next/server'
import { db } from '@/db'

interface UpdateArticleViewsProps {
  slug: string;
  textSize: 'sm' | 'md' | 'lg';
  focusMode: boolean;
  readingMode: 'light' | 'dark';
}

export const updateArticleViews = async ({ slug, textSize, focusMode, readingMode }: UpdateArticleViewsProps) => {
  const headersList = await headers();
  const referrer = headersList.get('referer');
  const ipAddress = headersList.get('x-real-ip') || headersList.get('x-forwarded-for');

  const userAgentStructure = {headers: headersList}
  const agent  = userAgent(userAgentStructure)
  const browser = agent.browser?.name
  const device = Object.values(agent.device).join(' ')

  // Check if article exists in DB
  const existingArticle = await db(`
    SELECT * FROM soft_union_article_views 
    WHERE slug = '${slug}'
    LIMIT 1
  `);

  try {
    const response = await db(`
      INSERT INTO soft_union_article_views (slug, duration_seconds, referrer, ip_address, browser, device, is_bot, text_size, focus_mode, reading_mode)
      VALUES(
        '${slug}',
        0,
        '${referrer}',
        '${ipAddress}',
        '${browser}',
        '${device}',
        ${agent.isBot},
        '${textSize}',
        ${focusMode},
        '${readingMode}'
      )
    `)

    return response
  } catch (error) {
    console.error(error)
    return error
  }

  return existingArticle
}