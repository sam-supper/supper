import { groq } from "next-sanity";

export const imageFields = groq`
  _id,
  _type,
  asset,
  alt,
  "aspectRatio": asset->metadata.dimensions.aspectRatio
`