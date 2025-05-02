'use client'

import { ComponentProps, useCallback, useEffect, useRef, useState, type FC } from "react"
import { useWorksStore } from "./use-works-store"
import { revealTop, revealBottom, transitionWithDelay, easeOutExpo } from "@/lib/animation"
import { cva } from "class-variance-authority"
import { useClickAway } from "react-use"
import { useKeyPress } from "@/hooks/use-key-press"
import { easeOutCubic } from "@/lib/animation"

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
  const activeFilter = useWorksStore((state) => state.activeFilter) ?? initialFilter
  const setActiveFilter = useWorksStore((state) => state.setActiveFilter)
  const [filtersExpanded, setFiltersExpanded] = useState(initialFilter ? true : false)

  const filtersRef = useRef<HTMLDivElement>(null)

  const toggleFilters = () => {
    setFiltersExpanded(!filtersExpanded)
  }

  const isActiveFilter = useCallback((slug: string) => {
    return activeFilter === slug
  }, [activeFilter])

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
  }, [setFiltersExpanded, setActiveFilter])

  const toggleFilter = (e: React.MouseEvent<HTMLAnchorElement>, slug: string) => {
    e.preventDefault()

    if (typeof window !== 'undefined') {
      window.history.replaceState({}, '', `/works/${slug}`)
    }

    if (activeFilter === slug) {
      setActiveFilter(null)
    } else {
      setActiveFilter(slug)
    }
  }

  useClickAway(filtersRef, closeFilters)
  useKeyPress('Escape', closeFilters)

  return (
    <div className="relative grid-contain place-items-start" ref={filtersRef}>
      <AnimatePresence initial={false}>
        {filtersExpanded ? (
          // Filter List
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
            className="text-nav py-4 lg:py-10"
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