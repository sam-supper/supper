import { type FC } from "react";
import { Project } from "./project.types";
import { PortableText } from "next-sanity";
import Link from "next/link";
import { ProjectGallery } from "./project-gallery";

export interface ProjectPageProps extends Project {}

export const ProjectPage: FC<ProjectPageProps> = (props) => {
  if (!props) return null

  const { title, year, client, services, explanation, media, related } = props

  return (
    <div className="w-full pt-150">
      <div className="w-full min-h-[calc(100svh-150px)] flex flex-col gap-20">
        <div className="w-full px-site-x">
          <Link href="/works" className="italic text-footer">[Back]</Link>
        </div>
        <div className="w-full flex-1 relative overflow-hidden">
          <ProjectGallery media={media} />
        </div>
        <div className="w-full flex flex-col gap-5 pb-site-y px-site-x">
          <div className="italic text-eyebrow">Project:</div>
          <h1 className="text-title">{title}</h1>
        </div>
      </div>
      <div className="flex flex-col pt-20 gap-y-40 px-site-x">
        <div className="w-full site-grid">
          <div className="w-full md:col-span-9">
            <PortableText
              value={explanation}
              components={{
                block: {
                  normal: ({ children }) => <p className="text-subtitle pb-24 last-of-type:pb-0">{children}</p>
                }
              }}
            />
          </div>
        </div>
        
        <div className="w-full site-grid">
            <div className="w-full md:col-span-3 flex flex-col gap-y-5">
              <div className="text-eyebrow italic">Services:</div>
              {services?.map(service => {
                return (
                  <div key={service._id} className="text-title">{service.title}</div>
                )
              })}
            </div>
            <div className="w-full md:col-span-3 flex flex-col gap-y-5">
              <div className="text-eyebrow italic">Year:</div>
              <div className="text-title">{year}</div>
            </div>
        </div>

        {related?.length ? (
          <div className="w-full flex flex-col gap-y-5">
            <div className="text-eyebrow italic">Related:</div>
            {related?.map(project => {
              return (
                <Link href={`/project/${project.slug}`} key={project._id} className="text-title">{project.title}</Link>
              )
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

