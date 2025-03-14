import type { ComponentProps, FC } from "react";
import type { LinkProps as NextLinkProps } from "next/link";

import { cva } from "class-variance-authority";

import NextLink from "next/link";
import { InternalLink } from "@/sanity.types";

interface LinkProps extends NextLinkProps, InternalLink, Omit<ComponentProps<'a'>, 'href'> {
  children: React.ReactNode;
  className?: string;
  active?: boolean;
}

const linkStyles = cva(['site-link'], {
  variants: {
    active: {
      true: 'underline',
      false: ''
    }
  }
})

export const Link: FC<LinkProps> = (props) => {
  const { children, className, active = false, ...rest } = props;

  return (
    <NextLink scroll={false} className={`${className} ${linkStyles({ active })}`} {...rest}>{children}</NextLink>
  )
}