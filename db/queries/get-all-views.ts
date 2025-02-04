import { db } from '@/db'

export interface ViewStats {
  slug: string;
  unique_views: number;
  total_views: number;
}

export const getAllViews = async (): Promise<ViewStats[]> => {
  const views = await db`
    SELECT 
      slug,
      COUNT(DISTINCT ip_address) as unique_views,
      COUNT(*) as total_views
    FROM soft_union_article_views
    GROUP BY slug
    ORDER BY unique_views DESC;
  `;
  
  return views as ViewStats[];
}