export interface SanityLink {
  _key: string
  _type: string
  label: string
  to: {
    slug: string
    _type: string
  }
}

export type MediaType = 'image' | 'video'

export interface Video {
  _key?: string
  _id?: string
  _type: 'video' | 'file'
  url: string
  aspectRatio?: number
}

export interface Image {
  _key?: string
  _id?: string
  _type: 'image'
  asset: any
  alt?: string
  aspectRatio?: number
}

export interface Media {
  _key?: string
  mediaType: MediaType
  image?: Image
  video?: Video
}

export interface SEO {
  title?: string
  description?: string
  favicon?: Image
  ogImage?: Image
}