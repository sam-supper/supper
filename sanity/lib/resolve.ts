import {
  type PresentationPluginOptions,
  defineLocations,
} from "sanity/presentation";

export const resolve: PresentationPluginOptions["resolve"] = {
  locations: {
    articlePage: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current'
      },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title,
            href: `/library/${doc?.slug}`
          },
          {
            title: 'Library',
            href: `/library`
          }
        ]
      })
    })
  }
}