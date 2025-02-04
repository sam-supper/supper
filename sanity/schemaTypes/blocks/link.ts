import { defineType, defineField } from "sanity";

export default defineType({
  name: 'link',
  title: 'Internal Link',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string'
    }),
    defineField({
      name: 'to',
      title: 'To',
      type: 'reference',
      to: [
        { type: 'articlePage' },
        { type: 'homePage' },
        { type: 'aboutPage' },
        { type: 'libraryPage' },
        { type: 'legalPage' }
      ]
    })
  ]
})