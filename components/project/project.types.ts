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
  const item = media.mediaType === 'video' ? media.video : media.image;
  if (!item) return undefined;
  const populated = item._type === 'image' ? !!(item as Image).asset : !!(item as Video).url;
  return populated ? item : undefined;
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