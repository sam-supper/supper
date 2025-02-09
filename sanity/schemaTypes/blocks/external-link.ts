import { defineType, defineField } from "sanity";

export default defineType({
  name: 'externalLink',
  title: 'External Link',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string'
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) => Rule.uri({
        scheme: ['http', 'https', 'mailto', 'tel']
      })
    })
  ],
  preview: {
    select: {
      label: 'label',
      url: 'url'
    },
    prepare: ({ label, url }) => ({
      title: label,
      subtitle: url ? `url: ${url}` : ''
    })
  }
})