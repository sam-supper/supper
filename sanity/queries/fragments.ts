import { groq } from "next-sanity";


export const imageFields = `
  _id,
  _type,
  asset,
  alt,
  "aspectRatio": asset -> metadata.dimensions.aspectRatio
`

export const linkFields = `
  _key,
  _type,
  label,
  to -> {
    _type,
    "slug": slug.current
  }
`
