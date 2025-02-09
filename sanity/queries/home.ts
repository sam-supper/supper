import { defineQuery, groq } from "next-sanity";
import { mediaFields, seoQuery } from "./fragments";
export const homePageQuery = defineQuery(
  groq`*[_type == "homePage"][0] {
    ${seoQuery},
    title,
    featuredProjects[] {
      _key,
      "title": project -> title,
      "slug": project -> slug.current,
      "featuredMedia": project -> featuredMedia {
        ${mediaFields}
      },
      color
    },
  }`
)