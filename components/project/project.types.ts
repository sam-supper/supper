import type { PortableTextBlock } from "@portabletext/types";

import type { Image, Video } from "@/sanity/types";

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
  _type: 'mediaRow';
  media: (Image | Video)[];
}

export interface Project {
  _id: string;
  title: string;
  slug: string;
  client: Client;
  year: string;
  services: Service[];
  explanation: PortableTextBlock[];
  featuredMedia: Image | Video;
  media: Image[] | Video[] | MediaRow[];
  related?: Project[];
}