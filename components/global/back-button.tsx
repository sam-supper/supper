'use client'

import { type FC, type ComponentProps } from "react";
import { useRouter } from "next/navigation";

import Link from "next/link";

interface BackButtonProps extends ComponentProps<'a'> {}

export const BackButton: FC<BackButtonProps> = (props) => {
  const { children, href = '/', onClick, ...rest } = props
  const router = useRouter()

  const onBackClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (window.history.length <= 2) {
      router.push(href)
    } else {
      router.back()
    }

    onClick?.(e)
  }

  return <Link href={href} scroll={false} onClick={onBackClick} {...rest}>{children}</Link>
}

