import { defineQuery, groq } from "next-sanity";
import { mediaFields } from "./fragments";

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
featuredMedia {
  ${mediaFields}
}
`

export const worksPageQuery = defineQuery(
  groq`*[_type == "worksPage"][0] {
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