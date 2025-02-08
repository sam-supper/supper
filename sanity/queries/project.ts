import { defineQuery, groq } from "next-sanity";

export const projectPathsQuery = defineQuery(
  groq`*[_type == "projectPage"] {
    "slug": slug.current
  }`
)

export const projectQuery = defineQuery(
  groq`*[_type == "projectPage" && slug.current == $slug][0] {
    title,
    "slug": slug.current
  }`
)