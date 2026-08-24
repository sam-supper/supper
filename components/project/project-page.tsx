import { Suspense, useCallback, type FC } from "react";
import { Project } from "./project.types";
import { PortableText } from "next-sanity";
import Link from "next/link";
import { ProjectGallery } from "./project-gallery";
import { BackButton } from "../global/back-button";
import { ProjectMedia } from "./project-media";
import { RelatedProjectLink } from "./related-project-link";

export interface ProjectPageProps extends Project {}

export const ProjectPage: FC<ProjectPageProps> = (props) => {
  if (!props) return null
  
  const { title, year, services, explanation, media, mobileMedia, related, client, collaborators } = props

  const getYear = useCallback((year?: string) => {
    if (!year) return '';
    const date = new Date(year);
    return date.toUTCString().split(' ')[3];
  }, [])

  return (
    <div className="w-full pt-50 md:pt-60 px-site-x md:px-0">
      <div className="w-full max-md:min-h-[calc(100svh-80px)] flex flex-col gap-20 md:gap-30">
        <div className="w-full flex-1 overflow-hidden flex">
          <Suspense>
            <ProjectGallery media={media} mobileMedia={mobileMedia} />
          </Suspense>
        </div>
        <div className="w-full flex flex-col gap-5 pb-site-y md:px-site-x">
          <div className="italic text-eyebrow">Project:</div>
          <h1 className="text-title">{title}</h1>
        </div>
      </div>
      <div className="flex flex-col md:pt-20 gap-y-20 md:gap-y-40 md:px-site-x">
        <div className="w-full site-grid gap-y-20">
          {explanation ? (
            <div className="w-full md:col-span-6">
              <PortableText
                value={explanation}
                components={{
                  block: {
                    normal: ({ children }) => <p className="text-subtitle pb-24 last-of-type:pb-0">{children}</p>
                  }
                }}
              />
            </div>
          ) : null}

          {/* Metadata — right of the text, aligned with the Information header */}
          <div className="w-full md:col-start-7 md:col-span-6 flex flex-col gap-y-20">
            {services?.length ? (
              <div className="w-full flex flex-col gap-y-5">
                <div className="text-eyebrow italic">Services:</div>
                <ul className="flex flex-col">
                  {services?.map(service => {
                    return (
                      <li key={service._id} className="text-subtitle">
                        <Link href={`/works?filter=${service.slug}`} scroll={false} className="hover:underline">{service.title}</Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ) : null}

            {client?.title ? (
              <div className="w-full flex flex-col gap-y-5">
                <div className="text-eyebrow italic">Client:</div>
                <div className="text-subtitle">
                  {client?.title}
                </div>
              </div>
            ) : null}

            {collaborators?.length ? (
              <div className="w-full flex flex-col gap-y-5">
                <div className="text-eyebrow italic">Collaborators:</div>
                <ul className="flex flex-col">
                  {collaborators?.map(collaborator => {
                    return (
                      <li key={collaborator._key} className="text-subtitle">
                        {collaborator.url ? (
                          <Link href={collaborator.url} target="_blank" rel="noopener noreferrer" className="hover:underline">{collaborator.name}</Link>
                        ) : (
                          <span>{collaborator.name}</span>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            ) : null}

            {year ? (
              <div className="w-full flex flex-col gap-y-5">
                <div className="text-eyebrow italic">Year:</div>
                <div className="text-subtitle">{getYear(year)}</div>
              </div>
            ) : null}
          </div>
        </div>

        <ProjectMedia media={media?.slice(1)} />

        {related?.length ? (
          <div className="w-full flex flex-col items-start gap-y-5">
            <div className="text-eyebrow italic">Related:</div>
            {related?.map(project => (
              <RelatedProjectLink key={project._id} {...project} />
            ))}
          </div>
        ) : null}
      </div>

      <div className="sticky bottom-0 z-[6] w-full md:px-site-x pt-10 pb-site-y flex justify-end pointer-events-none">
        <BackButton
          href="/"
          className="inline-block italic text-[15px] pointer-events-auto text-black dark:text-white hover:underline transition-colors duration-200 ease"
        >
          [Back]
        </BackButton>
      </div>
    </div>
  );
};

