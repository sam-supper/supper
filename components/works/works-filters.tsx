'use client'

import { ComponentProps, useCallback, useEffect, useMemo, useRef, useState, type FC } from "react"
import { revealTop, revealBottom, transitionWithDelay, easeOutExpo } from "@/lib/animation"
import { useRouter, usePathname } from "next/navigation"
import { useKeyPress } from "@/hooks/use-key-press"
import { useSearchParams } from "next/navigation"
import { cva } from "class-variance-authority"
import { useClickAway } from "react-use"

import { AnimatePresence, motion } from "motion/react"
import Link from "next/link"

interface WorksFiltersProps {
  filters: {
    _id: string
    title: string
    slug: string
  }[]
  initialFilter?: string
}

export const WorksFilters: FC<WorksFiltersProps> = ({ filters, initialFilter }) => {
  const [filtersExpanded, setFiltersExpanded] = useState(initialFilter ? true : false)

  const { replace } = useRouter()
  const params = useSearchParams()
  const pathname = usePathname()
  const activeFilters = useMemo(() => params.get('filter')?.split(',') || [], [params])

  const filtersRef = useRef<HTMLDivElement>(null)

  const toggleFilters = () => {
    setFiltersExpanded(!filtersExpanded)
  }

  const isActiveFilter = useCallback((slug: string) => {
    return activeFilters.includes(slug) || (slug === 'all' && !activeFilters.length)
  }, [activeFilters, params])

  useEffect(() => {
    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setFiltersExpanded(false)
      }
    }

    window.addEventListener('keyup', handleKeyUp)
    return () => window.removeEventListener('keyup', handleKeyUp)
  }, [])

  const closeFilters = useCallback(() => {
    setFiltersExpanded(false)
  }, [setFiltersExpanded])

  const toggleFilter = useCallback((e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    e.preventDefault()

    const newParams = new URLSearchParams(params)
    let newFilters = [...activeFilters]

    if (slug === 'all') {
      newParams.delete('filter')
      return replace(`${pathname}?${newParams.toString()}`, { scroll: false })
    }

    if (activeFilters.includes(slug)) {
      newFilters = newFilters.filter((filter) => filter !== slug)
    } else {
      newFilters.push(slug)
    }

    if (newFilters.length > 0) {
      newParams.set('filter', newFilters.join(','))
    } else {
      newParams.delete('filter')
    }

    replace(`${pathname}?${newParams.toString()}`, { scroll: false })
  }, [activeFilters, params, replace, pathname])

  useClickAway(filtersRef, closeFilters)
  useKeyPress('Escape', closeFilters)

  return (
    <div className="relative grid-contain place-items-start" ref={filtersRef}>
      <AnimatePresence initial={false}>
        {filtersExpanded ? (
          <motion.div
            key="filters"
            className="overflow-hidden will-change-auto"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.65, ease: easeOutExpo }}
          >
            <motion.ul
              key="filters-list"
              className="relative top-0 left-0 w-full group flex items-center gap-6 justify-start flex-wrap py-8"
              variants={revealBottom.variants}
              initial={revealBottom.hide}
              animate={revealBottom.show}
              exit={revealBottom.hide}
            >
              <motion.li
                {...revealBottom}
                className="will-change-transform"
              >
                <button onClick={closeFilters} className="text-grey hover:underline active:underline">
                  Close
                </button>
              </motion.li>
              <motion.li
                key="all"
                {...transitionWithDelay({
                  enter: 0.035,
                  exit: (filters?.length + 1) * 0.035,
                  template: revealBottom
                })}
                className="will-change-transform"
              >
                <FilterButton onClick={(e) => toggleFilter(e, 'all')} slug="all" active={isActiveFilter('all')}>
                  All,
                </FilterButton>
              </motion.li>
              {filters?.map((filter, index) => {
                const transition = transitionWithDelay({
                  enter: (index + 2) * 0.035,
                  exit: ((filters?.length + 2) - index) * 0.035,
                  template: revealBottom
                })

                return (
                  <motion.li
                    key={filter._id}
                    variants={transition.variants}
                    initial={transition.hide}
                    animate={transition.show}
                    exit={transition.hide}
                    className="will-change-transform"
                  >
                    <FilterButton
                      onClick={(e) => toggleFilter(e, filter.slug)}
                      slug={filter.slug}
                      active={isActiveFilter(filter.slug)}
                    >
                      {filter.title.trim()}{index < filters.length - 1 ? ',' : ''}
                    </FilterButton>
                  </motion.li>
                )
              })}
            </motion.ul>
          </motion.div>
        ) : (
          // Filter Toggle
          <motion.button
            key="filters-toggle"
            className="text-nav py-4 lg:py-8 will-change-transform"
            onClick={toggleFilters}
            variants={revealTop.variants}
            initial={revealTop.hide}
            animate={revealTop.show}
            exit={revealTop.hide}
          >
            Filter
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

interface FilterButtonProps extends ComponentProps<'a'> {
  slug?: string
  active?: boolean
}

const filterButtonStyles = cva(['lg:py-10 transition-colors duration-200 ease transform-gpu'], {
  variants: {
    active: {
      true: 'underline',
      false: 'hover:underline active:underline'
    }
  }
})

const FilterButton: FC<FilterButtonProps> = (props) => {
  const { children, active, slug, ...rest } = props

  return <Link href={`/works/${slug}`} scroll={false} shallow {...rest} className={filterButtonStyles({ active })}>{children}</Link>
}