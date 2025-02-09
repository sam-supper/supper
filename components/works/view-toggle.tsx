'use client'

import { ComponentProps, type FC } from "react";
import { useWorksStore } from "@/components/works/use-works-store";
import { cva } from "class-variance-authority";

interface ViewToggleProps extends ComponentProps<'div'> {}

export const ViewToggle: FC<ViewToggleProps> = (props) => {
  const { ...rest } = props

  const view = useWorksStore((state) => state.view)
  const setView = useWorksStore((state) => state.setView)

  return (
    <div className={"flex items-center gap-0"} {...rest}>
      <ToggleButton
        active={view === 'grid'}
        view="grid"
        toggleView={setView}
      >
        Grid
      </ToggleButton>
      <span className="text-grey">/</span>
      <ToggleButton
        active={view === 'list'}
        view="list"
        toggleView={setView}
      >
        List
      </ToggleButton>
    </div>
  )
}

interface ToggleButtonProps extends ComponentProps<'button'> {
  active: boolean
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
  const { active, children, toggleView, view, ...rest } = props;

  const handleClick = () => {
    toggleView(view)
  }

  return (
    <button
      {...rest}
      className={toggleButtonStyles({ active })}
      onClick={handleClick}
    >
      {children}
    </button>
  )
}