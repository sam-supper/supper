import { defineType, defineField } from "sanity";
import {HomeIcon} from '@sanity/icons'

const lastTenYears = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 10 }, (_, i) => (currentYear - i).toString());
};

export default defineType({
  name: "projectPage",
  title: "Projects",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'media', title: 'Media' },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: 'content',
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: 'content',
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "client",
      title: "Client",
      type: 'reference',
      group: 'content',
      to: [{ type: 'client' }],
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      group: 'content',
      options: {
        list: lastTenYears(),
      },
      initialValue: () => new Date().getFullYear().toString(),
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
    }),
    defineField({
      name: 'explanation',
      title: 'Explanation',
      type: 'richTextSimple',
    }),
    defineField({
      name: 'featuredMedia',
      title: 'Featured Media',
      type: 'object',
      fields: [
        defineField({
          name: 'mediaType',
          title: 'Media Type',
          type: 'string',
          options: {
            list: ['image', 'video'],
          },
          initialValue: 'image',
        }),
        defineField({
          name: 'image',
          title: 'Image',
          type: 'image',
          hidden: ({ parent }) => parent?.mediaType !== 'image',
        }),
        defineField({
          name: 'video',
          title: 'Video',
          type: 'file',
          options: {
            accept: 'video/*',
          },
          hidden: ({ parent }) => parent?.mediaType !== 'video',
        }),
      ],
    }),
    defineField({
      name: 'media',
      title: 'Media',
      type: 'array',
      group: 'media',
      of: [
        { type: 'image' },
        { 
          name: 'video',
          type: 'file',
          options: {
            accept: 'video/*',
          },
        },
      ],
    }),
    defineField({
      name: 'related',
      title: 'Related Projects',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'projectPage' }] }],
    }),
  ],
});
