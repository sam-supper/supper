'use client'

import { useWorksView } from "../works/use-works-view";
import { useSiteStore } from "@/stores/use-site-store";

import { AnimatePresence, motion } from "motion/react";
import { WorksSection } from "../works/works-section";
import { ProjectCarousel } from "./project-carousel";
import { SplashCarousel } from "../splash/splash-carousel";
import { Suspense } from "react";

export interface HomePageProps {
  title: string
  featuredProjects: any
  projects: any
  services: any
  splashPage?: any
}

export const HomePage = (props: HomePageProps) => {
  const [view, setView] = useWorksView('list')
  const hasLoaded = useSiteStore((state) => state.hasLoaded)

  if (!props) return null

  const { title, featuredProjects, projects, services, splashPage } = props

  return (
    <div>
      <AnimatePresence initial={false}>
        {!hasLoaded ? (
          <motion.div
            key="splash-carousel"
            initial={{ opacity: 0, }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="fixed inset-0 z-[999] bg-white flex items-center will-change-transform"
          >
            <SplashCarousel {...splashPage} />
          </motion.div>
        ) : null}
      </AnimatePresence>
      <h1 className="sr-only">{title}</h1>
      <ProjectCarousel projects={featuredProjects} />

      <div className="w-full pt-40 px-site-x flex flex-col gap-80 md:gap-140 text-black">
        <Suspense fallback={null}>
          <WorksSection projects={projects} services={services} view={view} setView={setView} />
        </Suspense>
      </div>
    </div>
  );
};

