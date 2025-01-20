import type { FC } from "react";
import type { PortableTextBlock } from "sanity";
import type { PortableTextReactComponents } from "@portabletext/react";

import { IconArrowDiagonal } from "../icons/icon-arrow-diagonal";

import { PortableText } from "@portabletext/react";
import { useMemo } from "react";
import Link from "next/link";

interface RichTextSimpleProps {
  value: PortableTextBlock[]
  components?: Partial<PortableTextReactComponents>
}

const defaultComponents: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => <p className="text-sans-small [&_em]:font-serif [&_em]:text-serif-small">{children}</p>,
  },
  marks: {
    em: ({ children }) => <em>{children}</em>,
    year: () => <>{new Date().getFullYear()}</>,
    internalLink: ({ children, value }) => {
      const { to, arrow } = value

      return (
        <Link href={`/${to.slug}`} className="relative group text-royal-blue dark:text-royal-blue-dark">
          {children}
          {arrow ? <IconArrowDiagonal size="sm" className="inline-block h-[.8em] w-auto ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-400 will-change-transform ease" /> : null}
        </Link>
      )
    }
  }
}

export const RichTextSimple: FC<RichTextSimpleProps> = (props) => {
  const { value, components: componentsOverride } = props
  const components = useMemo(() => ({ ...defaultComponents, ...componentsOverride }), [componentsOverride])

  return <PortableText value={value} components={components} />
}