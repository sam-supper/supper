export const getRelativePath = ({ slug, type }: { slug: string, type: string }) => {
  switch (type) {
    case 'projectPage':
      return `/projects/${slug}`
    case 'homePage':
      return `/`
    case 'aboutPage':
      return `/about`
    default:
      return `/${slug}`
  }
}