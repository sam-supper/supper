import { type FC, type ComponentProps, useCallback } from "react";
import type { Project } from "@/components/project/project.types";
import Link from "next/link";

interface WorksListItemProps extends Partial<Project>, Omit<ComponentProps<'a'>, 'title' | 'media'> {}

export const WorksListItem: FC<WorksListItemProps> = (props) => {
  const { title, slug, client, services, year, featuredMedia, media, ...rest } = props;

  const getYear = useCallback((year?: string) => {
    if (!year) return '';

    const date = new Date(year);
    return date.toUTCString().split(' ')[3];
  }, [])

  return (
    <Link
      scroll={false}
      aria-labelledby={slug}
      href={`/project/${slug}`}
      className="w-full site-grid text-list-title text-black dark:text-grey dark:group-hover:text-grey dark:group-hover:hover:text-grey-light group-hover:text-grey group-hover:hover:text-black group-hover:hover:underline pb-5 last-of-type:pb-0 transition-colors duration-200 ease"
      {...rest}
    >
      <div className="col-span-4 md:col-span-10 lg:col-span-9 md:grid md:grid-cols-9 gap-x-20">
        <div className="md:col-span-3">{title}</div>
        <div className="hidden md:block md:col-span-3">{client?.title}</div>
        <div className="hidden md:block md:col-span-3 whitespace-nowrap overflow-hidden text-ellipsis">
          {services?.map((service, index) => {
            return (
              <span key={service._id}>
                {service.title}{index < services.length - 1 ? ', ' : ''}
              </span>
            )
          })}
        </div>
      </div>
      <div className="col-span-2 lg:col-span-3 text-right md:text-left">
        {getYear(year)}
      </div>
    </Link>
  )
}