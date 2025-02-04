export const getRelativePath = ({ slug, type }: { slug: string, type: string }) => {
  switch (type) {
    case 'articlePage':
      return `/library/${slug}`
    case 'libraryPage':
      return `/library`
    case 'homePage':
      return `/`
    case 'legalPage':
      return `/legal/${slug}`
    default:
      return `/${slug}`
  }
}