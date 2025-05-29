import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "settingsHeader",
  title: "Header",
  type: "document",
  fields: [
    defineField({
      name: 'links',
      title: 'Main Links',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'link',
          title: 'Link',
          type: 'link'
        })
      ],
    }),
    defineField({
      name: 'contact',
      title: 'Contact',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string',
        }),
        defineField({
          name: 'url',
          title: 'Contact URL',
          type: 'url',
          validation: (Rule) => Rule.uri({
            scheme: ['http', 'https', 'mailto', 'tel']
          }),
        }),
        defineField({
          name: 'content',
          title: 'Expanded Content',
          type: 'array',
          of: [
            defineField({
              name: 'row',
              title: 'Content Row',
              type: 'externalLink',
              description: 'Leave url blank for simple text'
            })
          ]
        }),
      ]
    }),
    defineField({
      name: 'information',
      title: 'Information',
      type: 'object',
      fields: [
        defineField({
          name: 'label',
          title: 'Label',
          type: 'string',
        }),
        defineField({
          name: 'content',
          title: 'Content',
          type: 'richTextSimple'
        })
      ]
    }),
  ],
  preview: {
    select: {},
    prepare: () => ({
      title: 'Header'
    })
  }
});
