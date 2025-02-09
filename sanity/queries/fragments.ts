import { groq } from "next-sanity";


export const imageFields = groq`
  _id,
  _type,
  asset,
  alt,
  "aspectRatio": asset -> metadata.dimensions.aspectRatio
`

export const videoFields = groq`
  _id,
  _type,
  "url": asset -> url
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

export const mediaFields = groq`
  _key,
  _type,
  mediaType,
  image {
    ${imageFields}
  },
  video {
    ${videoFields}
  }
`