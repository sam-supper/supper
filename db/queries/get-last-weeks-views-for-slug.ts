import { db } from '@/db'
import { ViewStats } from '@/db/types'

export const getLastWeeksViewsForSlug = async (slug: string): Promise<ViewStats[]> => {
  const views = await db`
    SELECT 
      slug,
      COUNT(DISTINCT ip_address) as unique_views,
      COUNT(*) as total_views
    FROM soft_union_article_views
    WHERE slug = ${slug}
    AND viewed_at >= NOW() - INTERVAL '7 days'
    GROUP BY slug
    ORDER BY unique_views DESC;
  `;
  
  return views as ViewStats[];
}