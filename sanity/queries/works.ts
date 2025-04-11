import { defineQuery, groq } from "next-sanity";
import { imageFields, videoFields, seoQuery } from "./fragments";

export const worksProjectFields = groq`
_id,
title,
"slug": slug.current,
year,
client -> {
  _id,
  title,
  "slug": slug.current
},
services[] -> {
  _id,
  title,
  "slug": slug.current
},
media[] {
  _type,
  _type == "mediaRow" => {
    media[] {
      _type == "image" => {
        ${imageFields}
      },
      _type == "video" => {
        ${videoFields}
      }
    }
  },
  _type == "image" => {
    ${imageFields}
  },
  _type == "video" => {
    ${videoFields}
  }
},
"featuredMedia": media[0] {
  _type,
  _type == "mediaRow" => {
    media[] {
      _type == "image" => {
        ${imageFields}
      },
      _type == "video" => {
        ${videoFields}
      }
    }
  },
  _type == "image" => {
    ${imageFields}
  },
  _type == "video" => {
    ${videoFields}
  }
}
`

export const worksPageQuery = defineQuery(
  groq`*[_type == "worksPage"][0] {
    ${seoQuery},
    "projects": *[_type == "projectPage"] | order(orderRank) {
      ${worksProjectFields},
    },
    "services": *[_type == "service"] {
      _id,
      title,
      "slug": slug.current
    }
  }`
)

export const worksPagePathsQuery = defineQuery(
  groq`*[_type == "service" && defined(slug.current)] {
    "slug": slug.current
  }`
)

export const worksMediaQuery = defineQuery(
  groq`*[_type == "projectPage"] {
    "featuredMedia": media[0] {
      _type,
      _type == "mediaRow" => {
        media[] {
          _type == "image" => {
            ${imageFields}
          },
          _type == "video" => {
            ${videoFields}
          }
        }
      },
      _type == "image" => {
        ${imageFields}
      },
      _type == "video" => {
        ${videoFields}
      }
    }
  }`
)