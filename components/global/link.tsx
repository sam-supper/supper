import type { ComponentProps, FC } from "react";
import type { LinkProps as NextLinkProps } from "next/link";

import { twMerge } from "tailwind-merge";
import { cva } from "class-variance-authority";

import NextLink from "next/link";

interface LinkProps extends NextLinkProps, Omit<ComponentProps<'a'>, 'href'> {
  children: React.ReactNode;
  className?: string;
  underline?: boolean;
}

const linkStyles = cva(['text-current hover:text-royal-blue active:text-royal-blue dark:hover:text-royal-blue-dark dark:active:text-royal-blue-dark transition-colors duration-300 ease'], {
  variants: {
    underline: {
      true: 'underline'
    }
  }
})

export const Link: FC<LinkProps> = (props) => {
  const { children, className, underline = false, ...rest } = props;

  return (
    <NextLink className={twMerge(linkStyles({ underline }), className)} {...rest}>{children}</NextLink>
  )
}