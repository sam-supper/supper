import { InternalLink } from "@/sanity.types"

interface GetRelativePathProps {
  slug?: string,
  type?: string
}

export const getRelativePath = ({ slug, type }: GetRelativePathProps): string => {
  switch (type) {
    case 'projectPage':
      return `/projects/${slug}`
    case 'worksPage':
      return `/works`
    case 'homePage':
      return `/`
    default:
      return `/${slug}`
  }
}