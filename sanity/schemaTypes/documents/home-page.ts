import { defineType, defineField, defineArrayMember } from "sanity";
import {HomeIcon} from '@sanity/icons'

export default defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO Meta',
      type: 'seo'
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: 'featuredProjects',
      title: 'Featured Projects',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'project',
          title: 'Project',
          type: 'object',
          fields: [
            defineField({
              name: 'color',
              title: 'Text Color',
              type: 'string',
              options: {
                list: [
                  { title: 'Black', value: 'black' },
                  { title: 'White', value: 'white' },
                ],
                layout: 'radio',
                direction: 'horizontal',
              },
              initialValue: 'black',
            }),
            defineField({
              name: 'project',
              title: 'Project',
              type: 'reference',
              to: [{ type: 'projectPage' }],
            }),
            defineField({
              name: 'media',
              title: 'Media',
              type: 'media',
            }),
          ],
          preview: {
            select: {
              title: 'project.title',
              media: 'project.featuredMedia.asset',
              color: 'color',
            },
            prepare: ({ title, media, color }) => ({
              title,
              subtitle: `Text Color: ${color}`,
              media,
            }),
          },
        }),
      ]
    }),
  ],
});
