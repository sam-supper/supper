'use client';

import { ComponentProps, type FC } from "react";
import { useSiteStore } from "@/stores/use-site-store";

interface MobileMenuButtonProps extends ComponentProps<'button'> {}

export const MobileMenuButton: FC<MobileMenuButtonProps> = ({ ...props }) => {
  const isOpen = useSiteStore(state => state.mobileMenuOpen);
  const setIsOpen = useSiteStore(state => state.setMobileMenuOpen);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  }

  return (
    <button
      className={`
        md:hidden grid-contain w-18 h-18 place-items-center
        transition-transform duration-300 ease-in-out-quart
        ${isOpen ? '-rotate-45' : ''}
      `}
      onClick={toggleOpen}
    >
      <span className="sr-only">{isOpen ? 'Close Menu' : 'Open Menu'}</span>
      <div className="w-full h-[1.5px] bg-current"></div>
      <div className="w-full h-[1.5px] bg-current rotate-90"></div>
    </button>
  )
}