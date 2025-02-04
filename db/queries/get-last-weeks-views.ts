import { db } from '@/db'

export interface ViewStats {
  slug: string;
  unique_views: number;
  total_views: number;
}

export const getLastWeeksViews = async (): Promise<ViewStats[]> => {
  const views = await db`
    SELECT 
      slug,
      COUNT(DISTINCT ip_address) as unique_views,
      COUNT(*) as total_views
    FROM soft_union_article_views
    WHERE viewed_at >= NOW() - INTERVAL '7 days'
    GROUP BY slug
    ORDER BY unique_views DESC;
  `;
  
  return views as ViewStats[];
}