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
        { type: 'homePage' },
        { type: 'aboutPage' },
        { type: 'projectPage' },
      ]
    })
  ]
})