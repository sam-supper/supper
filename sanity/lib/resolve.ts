import {
  type PresentationPluginOptions,
  defineLocations,
} from "sanity/presentation";

export const resolve: PresentationPluginOptions["resolve"] = {
  locations: {
    projectPage: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current'
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title,
            href: `/project/${doc?.slug}`
          },
          {
            title: 'Works',
            href: `/works`
          }
        ]
      })
    })
  }
}