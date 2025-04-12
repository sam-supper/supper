import { HomePage } from "@/components/home/home-page";
import { sanityFetch } from "@/sanity/lib/live";
import { homePageQuery } from "@/sanity/queries/home";
import { settingsSplashQuery } from "@/sanity/queries/settings";

export default async function Home() {
  const [{data: homePage}, {data: splashPage}] = await Promise.all([
    sanityFetch({ query: homePageQuery }),
    sanityFetch({ query: settingsSplashQuery })
  ])

  return <HomePage {...homePage} splashPage={splashPage} />;
}
