import type { FC } from "react";
import { cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

interface LabelProps {
  element?: 'div' | 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  children: React.ReactNode;
  className?: string;
  uppercase?: boolean
  tone?: 'light' | 'dark' | 'default'
}

const labelStyles = cva(['text-grey'], {
  variants: {
    uppercase: {
      true: 'uppercase'
    },
    tone: {
      light: 'text-grey-light',
      dark: 'text-grey-dark',
      default: 'text-grey'
    }
  }
})

export const Label: FC<LabelProps> = (props) => {
  const { children, className, uppercase = false, element = 'div', tone = 'default', ...rest } = props;
  const Component = element;

  return (
    <Component className={twMerge(labelStyles({ uppercase, tone }), className)} {...rest}>{children}</Component>
  )
}