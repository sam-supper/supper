import type { PortableTextBlock } from "@portabletext/types";

import type { Image, Video, Media } from "@/sanity/types";

export interface Client {
  _id: string;
  title: string;
  slug: string;
}

export interface Service {
  _key?: string;
  _id: string;
  title: string;
  slug: string;
}

export interface MediaRow {
  _key: string;
  _id?: string;
  _type: 'mediaRow';
  media: (Image | Video)[];
}

/**
 * Resolve a `media` object (radio choice of image or video) to its underlying
 * item, or undefined when the chosen slot is empty. Used for the optional grid
 * thumbnail and mobile primary media, which may be either an image or a video.
 */
export const resolveMedia = (media?: Media): Image | Video | undefined => {
  if (!media) return undefined;
  if (media.mediaType === 'video') {
    const video = media.video;
    // Inside a `media` object the video lives in a `file` field, so its stored
    // `_type` is 'file', not 'video'. Normalize it so downstream renderers that
    // branch on `_type === 'video'` (grid item, gallery) pick it up.
    return video?.url ? { ...video, _type: 'video' } : undefined;
  }
  const image = media.image;
  return image?.asset ? { ...image, _type: 'image' } : undefined;
};

export interface Project {
  _id: string;
  title: string;
  slug: string;
  client: Client;
  year: string;
  services: Service[];
  collaborators?: {
    _key: string;
    name: string;
    url?: string;
  }[];
  explanation: PortableTextBlock[];
  featuredMedia: Image | Video;
  gridMedia?: Media;
  mobileMedia?: Media;
  media: Image[] | Video[] | MediaRow[];
  related?: Project[];
}