import { defineQuery, groq } from "next-sanity";
import { imageFields, videoFields, seoQuery } from "./fragments";

const worksProjectFields = groq`
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
"featuredMedia": media[0] {
  _type,
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
    "projects": *[_type == "projectPage"] {
      ${worksProjectFields},
    },
    "services": *[_type == "service"] {
      _id,
      title,
      "slug": slug.current
    }
  }`
)