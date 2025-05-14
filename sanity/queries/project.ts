import { defineQuery, groq } from "next-sanity";
import { mediaFields, videoFields, imageFields, seoQuery } from "./fragments";

export const projectPathsQuery = defineQuery(
  groq`*[_type == "projectPage"] {
    "slug": slug.current
  }`
)

export const projectQuery = defineQuery(
  groq`*[_type == "projectPage" && slug.current == $slug][0] {
    ${seoQuery},
    title,
    "slug": slug.current,
    year,
    client -> {
      title
    },
    services[] -> {
      _id,
      title,
      "slug": slug.current
    },
    collaborators[] {
      _key,
      name,
      url
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
      },
      _type == "mediaRow" => {
        media[] {
          _type,
          _key,
          _type == "image" => {
            ${imageFields}
          },
          _type == "video" => {
            ${videoFields}
          }
        }
      }
    },
    related[] -> {
      _id,
      title,
      "slug": slug.current,
      "featuredMedia": media[] {
        _type,
        _key,
        _type == "image" => {
          ${imageFields}
        },
        _type == "video" => {
          ${videoFields}
        }
      }[0]
    }
  }`
)