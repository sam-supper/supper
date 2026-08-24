import { type FC, type ComponentProps, useCallback } from "react";
import type { Project } from "@/components/project/project.types";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

interface WorksListItemProps extends Partial<Project>, Omit<ComponentProps<'a'>, 'title' | 'media'> {}

export const WorksListItem: FC<WorksListItemProps> = (props) => {
  const { title, slug, client, services, year, featuredMedia, gridMedia, media, ...rest } = props;

  const { replace } = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  const getYear = useCallback((year?: string) => {
    if (!year) return '';

    const date = new Date(year);
    return date.toUTCString().split(' ')[3];
  }, [])

  // Clicking a service filters the list to that service rather than opening the project.
  const filterByService = useCallback((e: React.MouseEvent, serviceSlug?: string) => {
    e.preventDefault()
    e.stopPropagation()
    if (!serviceSlug) return

    const newParams = new URLSearchParams(params)
    newParams.set('filter', serviceSlug)
    replace(`${pathname}?${newParams.toString()}`, { scroll: false })
  }, [params, pathname, replace])

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
                <button
                  type="button"
                  onClick={(e) => filterByService(e, service.slug)}
                  className="hover:underline"
                >
                  {service.title}
                </button>{index < services.length - 1 ? ', ' : ''}
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