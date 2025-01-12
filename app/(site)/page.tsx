import { HomePage } from "@/components/home/home-page";
import { sanityFetch } from "@/sanity/lib/live";
import { homePageQuery } from "@/sanity/lib/queries";

export default async function Home() {
  const { data: homePage } = await sanityFetch({ query: homePageQuery });
  return <HomePage {...homePage} />;
}
