'use client'

import { ComponentProps, useCallback, useEffect, type FC } from "react"
import { useWorksStore } from "./use-works-store"
import { AnimatePresence, motion } from "motion/react"
import { easeOutExpo } from "@/lib/easings"
import { cva } from "class-variance-authority"

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

  const toggleFilter = (slug: string) => {
    if (activeFilter === slug) {
      setActiveFilter(null)
    } else {
      setActiveFilter(slug)
    }
  }

  return (
    <div className="grid-contain place-items-start">
      <AnimatePresence initial={false}>
        {filtersExpanded ? (
          // Filter List
          <motion.ul
            key="filters"
            className="group flex items-center gap-3"
            initial={{ opacity: 0, y: '60%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '60%' }}
            transition={{ duration: 0.75, ease: easeOutExpo }}
          >
            <motion.li
              key="all"
              initial={{ opacity: 0, y: '60%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '60%' }}
              transition={{ duration: 0.75, ease: easeOutExpo }}
            >
              <FilterButton toggleFilter={toggleFilter} slug="all" active={isActiveFilter('all')}>
                All,
              </FilterButton>
            </motion.li>
            {filters?.map((filter, index) => {
              return (
                <motion.li
                  key={filter._id}
                  initial={{ opacity: 0, y: '60%' }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: '60%' }}
                  transition={{ duration: 0.75, delay: (index + 1) * 0.035, ease: easeOutExpo }}
                >
                  <FilterButton toggleFilter={toggleFilter} slug={filter.slug} active={isActiveFilter(filter.slug)}>
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
            className="text-nav py-4"
            onClick={toggleFilters}
            initial={{ opacity: 0, y: '-60%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-60%' }}
            transition={{ duration: 0.75, ease: easeOutExpo }}
          >
            Filter
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

interface FilterButtonProps extends ComponentProps<'button'> {
  slug: string
  active?: boolean
  toggleFilter: (slug: string) => void
}

const filterButtonStyles = cva([' py-4 transition-colors duration-200 ease transform-gpu'], {
  variants: {
    active: {
      true: 'text-black group-hover:text-grey group-hover:hover:text-black group-hover:active:text-black',
      false: 'text-grey hover:text-black active:text-black'
    }
  }
})

const FilterButton: FC<FilterButtonProps> = (props) => {
  const { children, slug, active, toggleFilter, ...rest } = props

  return <button {...rest} onClick={() => toggleFilter(slug)} className={filterButtonStyles({ active })}>{children}</button>
}