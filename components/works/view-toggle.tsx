'use client'

import { ComponentProps, type FC, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter, usePathname } from "next/navigation";
import { useWorksStore } from "@/components/works/use-works-store";
import { useClickAway } from "react-use";
import { revealTop, revealBottom, easeOutExpo } from "@/lib/animation";
import { cva } from "class-variance-authority";

import { AnimatePresence, motion, HTMLMotionProps } from "motion/react";
import { useKeyPress } from "@/hooks/use-key-press";

interface ViewToggleProps extends ComponentProps<'div'> {
  view: 'grid' | 'list'
  setView: (view: 'grid' | 'list') => void
}

const gridSizes = [4, 6, 8];

export const ViewToggle: FC<ViewToggleProps> = (props) => {
  const { view, setView, ...rest } = props

  const gridControlsRef = useRef<HTMLDivElement>(null)

  const setGridControlsActive = useWorksStore((state) => state.setGridControlsActive)
  const gridSize = useWorksStore((state) => state.gridSize)
  const setGridSize = useWorksStore((state) => state.setGridSize)
  
  const pathname = usePathname()
  const { replace } = useRouter()
  const params = useSearchParams()

  const clearFilters = useCallback(() => {
    const newParams = new URLSearchParams(params)
    newParams.delete('filter')

    replace(`${pathname}?${newParams.toString()}`, { scroll: false });
  }, [params, pathname])

  const handleViewChange = (view: 'grid' | 'list') => {
    setView(view)
    setGridControlsActive(false)

    if (view === 'list') {
      clearFilters()
    }
  }

  useClickAway(gridControlsRef, () => {
    setGridControlsActive(false)
  })

  useKeyPress('Escape', () => {
    setGridControlsActive(false)
  })

  return (
    <div className={"flex items-center gap-0 relative z-[10]"} {...rest}>
      <div
        ref={gridControlsRef}
        className="hidden md:grid grid-contain place-items-end"
      >
        <AnimatePresence initial={false}>
          {view === 'grid' ? (
            <motion.div
              key="grid-controls"
              className="flex items-center"
              variants={revealBottom.variants}
              initial={revealBottom.hide}
              animate={revealBottom.show}
              exit={revealBottom.hide}
            >
              {gridSizes.map((size) => {
                return (
                  <GridControlsButton
                    key={size}
                    active={gridSize == size}
                    onClick={() => setGridSize(size)}
                  >
                    {size}
                  </GridControlsButton>
                )
              })}
            </motion.div>
          ) : (
            <ToggleButton
              animate
              key="toggle-button"
              active={false}
              view="grid"
              toggleView={handleViewChange}
            >
              Grid
            </ToggleButton>
          )}
        </AnimatePresence>
      </div>
      
      <ToggleButton
        animate
        key="toggle-button"
        active={view === 'grid'}
        view="grid"
        toggleView={handleViewChange}
        className="md:hidden"
      >
        Grid
      </ToggleButton>
      <span className="text-grey dark:text-grey-light">/</span>
      <ToggleButton
        active={view === 'list'}
        view="list"
        toggleView={handleViewChange}
      >
        List
      </ToggleButton>
    </div>
  )
}

interface ToggleButtonProps extends HTMLMotionProps<'button'> {
  active: boolean
  animate?: boolean
  view: 'grid' | 'list'
  toggleView: (view: 'grid' | 'list') => void
}

const toggleButtonStyles = cva(["text-nav transition-colors duration-200 ease"], {
  variants: {
    active: {
      true: ["text-black dark:text-grey-light"],
      false: ["text-grey dark:text-grey hover:text-black dark:hover:text-grey active:text-black dark:active:text-grey"],
    },
  },
});

const ToggleButton: FC<ToggleButtonProps> = (props) => {
  const { active, className, children, animate = false, toggleView, view, ...rest } = props;

  const handleClick = () => {
    toggleView(view)
  }

  return (
    <motion.button
      {...rest}
      className={toggleButtonStyles({ active, className })}
      onClick={handleClick}
      {...(animate ? {
        variants: revealTop.variants,
        initial: revealTop.hide,
        animate: revealTop.show,
        exit: revealTop.hide
      } : {})}
    >
      {children}
    </motion.button>
  )
}

interface GridControlsButtonProps extends HTMLMotionProps<'button'> {
  active: boolean
  children: React.ReactNode
}

const gridControlButtonStyles = cva(['relative text-nav px-4 h-18 transition-colors duration-200 ease grid-contain place-items-center'], {
  variants: {
    active: {
      true: ['text-black dark:text-grey-light'],
      false: ['text-grey hover:text-black dark:text-grey dark:hover:text-grey-light']
    }
  }
})

const GridControlsButton: FC<GridControlsButtonProps> = (props) => {
  const { children, active = false, ...rest } = props;

  return (
    <motion.button
      {...rest}
      className={gridControlButtonStyles({ active })}
    >
      <span>{children}</span>

      {active ? (
        <motion.div
          layoutId="grid-control-underline"
          className="absolute w-[calc(100%+2px)] bottom-0 -left-1 h-1 bg-black"
          transition={{
            duration: 0.45,
            ease: easeOutExpo
          }}
        />
      ) : null}
    </motion.button>
  )
}