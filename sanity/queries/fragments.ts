import { groq } from "next-sanity";

export const imageFields = groq`
  _id,
  _type,
  asset,
  alt,
  "aspectRatio": asset->metadata.dimensions.aspectRatio
`

export const modulesFields = groq`
  _key,
  _type,
  _type == "featuredEntries" => {
    "entries": entries[] -> {
      _id,
      title,
      featuredImage,
      "slug": slug.current,
      "category": category->title,
      "authors": authors[] -> {
        _id,
        "name": name
      }
    }
  },
  _type == "textCallout" => {
    text
  },
  _type == "donateCta" => {
    text
  }
`