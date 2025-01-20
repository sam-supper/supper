import { HomePage } from "@/components/home/home-page";
import { sanityFetch } from "@/sanity/lib/live";
import { homePageQuery } from "@/sanity/queries/home";

export default async function Home() {
  const { data: homePage } = await sanityFetch({ query: homePageQuery });
  return <HomePage {...homePage} />;
}
