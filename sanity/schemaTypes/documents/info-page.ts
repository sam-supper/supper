import { defineType, defineField, defineArrayMember } from "sanity";
import {InfoOutlineIcon} from '@sanity/icons'

export default defineType({
  name: "infoPage",
  title: "Information Page",
  type: "document",
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: 'seo',
      title: 'SEO Meta',
      type: 'seo'
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'textRow',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Text',
              type: 'richTextSimple',
            })
          ],
          preview: {
            select: {
              text: 'text',
            },
            prepare: ({ text }) => {
              const title = text?.[0]?.children?.[0]?.text
              
              return {
                title: title,
                subtitle: 'Text Row',
              }
            }
          }
        }),
        defineArrayMember({
          name: 'splitTextRow',
          type: 'object',
          fields: [
            defineField({
              name: 'columnOne',
              title: 'Column One',
              type: 'richTextSimple',
            }),
            defineField({
              name: 'columnTwo',
              title: 'Column Two',
              type: 'richTextSimple',
            })
          ],
          preview: {
            select: {
              columnOne: 'columnOne',
              columnTwo: 'columnTwo',
            },
            prepare: ({ columnOne, columnTwo }) => {
              const titleOne = columnOne?.[0]?.children?.[0]?.text
              
              return {
                title: titleOne,
                subtitle: 'Split Text Row',
              }
            }
          }
        })
      ]
    })
  ],
  preview: {
    select: {},
    prepare: () => ({
      title: 'Information Page',
    })
  }
});
