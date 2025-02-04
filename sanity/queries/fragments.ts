import { groq } from "next-sanity";


export const imageFields = groq`
  _id,
  _type,
  asset,
  alt,
  "aspectRatio": asset->metadata.dimensions.aspectRatio
`

export const linkFields = groq`
  _key,
  _type,
  label,
  to -> {
    _type,
    "slug": slug.current
  }
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
  },
  _type == "popularEntriesList" => {
    title,
    weeklyTitle,
    allTimeTitle,
    link {
      ${linkFields}
    }
  }
`
