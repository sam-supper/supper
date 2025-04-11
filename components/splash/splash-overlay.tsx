import { sanityFetch } from "@/sanity/lib/live";
import { SplashCarousel } from "./splash-carousel";
import { settingsSplashQuery } from "@/sanity/queries/settings";

export const SplashOverlay: React.FC = async () => {
  const { data: splashPage } = await sanityFetch({ query: settingsSplashQuery });

  return (
    <div className="fixed inset-0 z-[999] bg-white flex items-center">
      <SplashCarousel {...splashPage} />
    </div>
  )
}