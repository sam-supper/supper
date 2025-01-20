import { defineQuery, groq } from "next-sanity";
import { imageFields } from "./fragments";

export const articlePageQuery = defineQuery(
  groq`*[_type == "articlePage" && slug.current == $slug][0]{
    _id,
    _type,
    title,
    slug,
    authors[] -> {
      _key,
      _type,
      name,
      slug
    },
    "category": category->title,
    published,
    originalPublished,
    featuredImage {
      ${imageFields}
    },
    content[] {
      _key,
      _type,
      style,
      markDefs,
      children
    },
    "wordCount": round(length(pt::text(content)) / 5),
    "readingTime": round(length(pt::text(content)) / 5 / 180 )
  }`
)

export const articlePageSlugsQuery = defineQuery(
  groq`*[_type == "articlePage"]{
    "slug": slug.current
  }`
)