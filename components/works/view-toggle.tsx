'use client'

import { ComponentProps, type FC, useRef } from "react";
import { useWorksStore } from "@/components/works/use-works-store";
import { useClickAway } from "react-use";
import { revealTop, revealBottom } from "@/lib/animation";
import { cva } from "class-variance-authority";

import { AnimatePresence, motion, HTMLMotionProps } from "motion/react";
import { useKeyPress } from "@/hooks/use-key-press";

interface ViewToggleProps extends ComponentProps<'div'> {
  view: 'grid' | 'list'
  setView: (view: 'grid' | 'list') => void
}

export const ViewToggle: FC<ViewToggleProps> = (props) => {
  const { view, setView, ...rest } = props

  const gridControlsRef = useRef<HTMLDivElement>(null)

  const gridControlsActive = useWorksStore((state) => state.gridControlsActive)
  const setGridControlsActive = useWorksStore((state) => state.setGridControlsActive)
  const gridSize = useWorksStore((state) => state.gridSize)
  const setGridSize = useWorksStore((state) => state.setGridSize)
  const setActiveFilter = useWorksStore((state) => state.setActiveFilter)

  const handleViewChange = (view: 'grid' | 'list') => {
    setView(view)
    setGridControlsActive(false)
    setActiveFilter(null)
  }

  const toggleGridControls = () => {
    setGridControlsActive(!gridControlsActive)
  }

  const handleGridSizeChange = (action: 'decrease' | 'increase') => {
    if (action === 'increase' && gridSize > 4) {
      setGridSize(gridSize - 2)
    } else if (action === 'decrease' && gridSize < 10) {
      setGridSize(gridSize + 2)
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
        className="grid-contain place-items-end"
      >
        <AnimatePresence initial={false}>
          {gridControlsActive ? (
            <motion.div
              key="grid-controls"
              className="flex items-center pr-5"
              variants={revealBottom.variants}
              initial={revealBottom.hide}
              animate={revealBottom.show}
              exit={revealBottom.hide}
            >
              <GridControlsButton
                action="increase"
                disabled={gridSize === 4}
                onClick={() => handleGridSizeChange('increase')}
              />
              <GridControlsButton
                action="decrease"
                disabled={gridSize === 10}
                onClick={() => handleGridSizeChange('decrease')}
              />
            </motion.div>
          ) : (
            <ToggleButton
              animate
              key="toggle-button"
              active={view === 'grid'}
              view="grid"
              toggleView={view === 'grid' ? toggleGridControls : handleViewChange}
            >
              Grid
            </ToggleButton>
          )}
        </AnimatePresence>
      </div>
      <span className="text-grey">/</span>
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
      true: ["text-black"],
      false: ["text-grey hover:text-black active:text-black"],
    },
  },
});

const ToggleButton: FC<ToggleButtonProps> = (props) => {
  const { active, children, animate = false, toggleView, view, ...rest } = props;

  const handleClick = () => {
    toggleView(view)
  }

  return (
    <motion.button
      {...rest}
      className={toggleButtonStyles({ active })}
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
  action: 'decrease' | 'increase'
}

const gridControlButtonStyles = cva(['relative w-18 h-38 transition-colors duration-200 ease grid-contain place-items-center'], {
  variants: {
    disabled: {
      true: ['text-grey cursor-not-allowed'],
      false: ['text-black cursor-pointer']
    }
  }
})

const GridControlsButton: FC<GridControlsButtonProps> = (props) => {
  const { action, disabled, ...rest } = props;

  return (
    <motion.button
      {...rest}
      className={gridControlButtonStyles({ disabled })}
    >
      <div className="absolute w-10 h-1 bg-current" />
      {action === 'increase' ? (
        <div className="absolute w-10 h-1 bg-current rotate-90" />
      ) : null}
    </motion.button>
  )
}