import { defineQuery, groq } from "next-sanity";
import { mediaFields, videoFields, imageFields } from "./fragments";

export const projectPathsQuery = defineQuery(
  groq`*[_type == "projectPage"] {
    "slug": slug.current
  }`
)

export const projectQuery = defineQuery(
  groq`*[_type == "projectPage" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    year,
    client -> {
      title
    },
    services[] -> {
      _id,
      title
    },
    explanation,
    featuredMedia {
      ${mediaFields}
    },
    media[] {
      _type,
      _key,
      _type == "image" => {
        ${imageFields}
      },
      _type == "video" => {
        ${videoFields}
      }
    },
    related[] -> {
      _id,
      title,
      "slug": slug.current,
    }
  }`
)