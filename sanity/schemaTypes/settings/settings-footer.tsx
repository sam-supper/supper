import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "settingsFooter",
  title: "Footer",
  type: "document",
  fields: [
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'column',
          title: 'Column',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Text',
              type: 'richTextSimple'
            })
          ],
          preview: {
            select: {
              text: 'text'
            },
            prepare: ({ text }) => ({
              title: text?.[0]?.children?.[0]?.text
            })
          }
        })
      ]
    }),
    defineField({
      name: 'externalLinks',
      title: 'External Links',
      type: 'array',
      of: [{ type: 'externalLink' }]
    })
  ],
  preview: {
    select: {},
    prepare: () => ({
      title: 'Footer'
    })
  }
});
