import { defineType, defineField } from "sanity";

export default defineType({
  name: 'seo',
  title: 'SEO Meta',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: true
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'If left blank, the global site title will be used. If left blank on a project, the project title will be used.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'If left blank, the global site description will be used.'
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'If left blank, the global OG Image will be used.'
    })
  ]
})