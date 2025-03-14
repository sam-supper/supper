import type { FC } from "react";
import type { PortableTextBlock } from "sanity";
import type { PortableTextReactComponents } from "@portabletext/react";

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
    em: ({ children }) => <em className="italic">{children}</em>,
    year: () => <>{new Date().getFullYear()}</>,
    internalLink: ({ children, value }) => {
      const { to } = value

      return (
        <Link href={`/${to.slug}`} scroll={false} className="relative group text-royal-blue dark:text-royal-blue-dark">
          {children}
        </Link>
      )
    },
    externalLink: ({ children, value }) => {
      const { url } = value

      return (
        <a href={url} target="_blank" rel="noopener noreferrer" className="relative group text-royal-blue dark:text-royal-blue-dark">{children}</a>
      )
    }
  }
}

export const RichTextSimple: FC<RichTextSimpleProps> = (props) => {
  const { value, components: componentsOverride } = props
  const components = useMemo(() => ({ ...defaultComponents, ...componentsOverride }), [componentsOverride])

  return <PortableText value={value} components={components} />
}