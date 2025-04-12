import { sanityFetch } from "@/sanity/lib/live";
import { SplashCarousel } from "./splash-carousel";
import { settingsSplashQuery } from "@/sanity/queries/settings";
import dynamic from "next/dynamic";

export interface SplashOverlayProps {
  images: any[]
}

export const SplashOverlay: React.FC<SplashOverlayProps> = ({ images }) => {

  return (
    <div className="fixed inset-0 z-[999] bg-white flex items-center">
      <SplashCarousel images={images} />
    </div>
  )
}