'use client'

import { ComponentProps, useCallback, useEffect, useRef, type FC } from "react"
import { useWorksStore } from "./use-works-store"
import { AnimatePresence, motion } from "motion/react"
import { revealTop, revealBottom, transitionWithDelay } from "@/lib/animation"
import { cva } from "class-variance-authority"
import { useClickAway } from "react-use"
import { useKeyPress } from "@/hooks/use-key-press"

interface WorksFiltersProps {
  filters: {
    _id: string
    title: string
    slug: string
  }[]
}

export const WorksFilters: FC<WorksFiltersProps> = ({ filters }) => {
  const activeFilter = useWorksStore((state) => state.activeFilter)
  const setActiveFilter = useWorksStore((state) => state.setActiveFilter)
  const filtersExpanded = useWorksStore((state) => state.filtersExpanded)
  const setFiltersExpanded = useWorksStore((state) => state.setFiltersExpanded)

  const filtersRef = useRef<HTMLDivElement>(null)

  const toggleFilters = () => {
    setFiltersExpanded(!filtersExpanded)
  }

  const isActiveFilter = useCallback((slug: string) => {
    return activeFilter == null ? true : activeFilter === slug
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

  const toggleFilter = (slug: string) => {
    if (activeFilter === slug) {
      setActiveFilter(null)
    } else {
      setActiveFilter(slug)
    }
  }

  useClickAway(filtersRef, closeFilters)
  useKeyPress('Escape', closeFilters)

  return (
    <div className="grid-contain place-items-start" ref={filtersRef}>
      <AnimatePresence initial={false}>
        {filtersExpanded ? (
          // Filter List
          <motion.ul
            key="filters"
            className="group flex items-center gap-3"
            variants={revealBottom.variants}
            initial={revealBottom.hide}
            animate={revealBottom.show}
            exit={revealBottom.hide}
          >
            <motion.li
              {...revealBottom}
            >
              <FilterButton onClick={closeFilters} active={false}>
                Close
              </FilterButton>
            </motion.li>
            <motion.li
              key="all"
              {...transitionWithDelay({
                delay: 0.035,
                template: revealBottom
              })}
            >
              <FilterButton onClick={() => toggleFilter('all')} slug="all" active={isActiveFilter('all')}>
                All,
              </FilterButton>
            </motion.li>
            {filters?.map((filter, index) => {
              const transition = transitionWithDelay({
                delay: (index + 2) * 0.035,
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
                  <FilterButton onClick={() => toggleFilter(filter.slug)} slug={filter.slug} active={isActiveFilter(filter.slug)}>
                    {filter.title.trim()}{index < filters.length - 1 ? ',' : ''}
                  </FilterButton>
                </motion.li>
              )
            })}
          </motion.ul>
        ) : (
          // Filter Toggle
          <motion.button
            key="filters-toggle"
            className="text-nav py-10"
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

interface FilterButtonProps extends ComponentProps<'button'> {
  slug?: string
  active?: boolean
}

const filterButtonStyles = cva([' py-10 transition-colors duration-200 ease transform-gpu'], {
  variants: {
    active: {
      true: 'text-black group-hover:text-grey group-hover:hover:text-black group-hover:active:text-black',
      false: 'text-grey hover:text-black active:text-black'
    }
  }
})

const FilterButton: FC<FilterButtonProps> = (props) => {
  const { children, active, ...rest } = props

  return <button {...rest} className={filterButtonStyles({ active })}>{children}</button>
}