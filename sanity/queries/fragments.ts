import { groq } from "next-sanity";

export const imageFields = groq`
  _type,
  asset,
  alt,
  "_id": asset._ref,
  "aspectRatio": asset -> metadata.dimensions.aspectRatio,
  "lqip": asset -> metadata.lqip,
`

export const videoFields = groq`
  _key,
  "_id": asset._ref,
  _type,
  "url": asset -> url,
  aspectRatio
`

export const linkFields = groq`
  _key,
  _type,
  label,
  url,
  childLinks[] {
    label,
    url,
  },
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

export const seoQuery = groq`
seo {
  title,
  description,
  ogImage {
    ${imageFields}
  }
}
`