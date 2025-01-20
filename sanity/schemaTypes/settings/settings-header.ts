import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "settingsHeader",
  title: "Header",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: 'Soft Union'
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'search',
          title: 'Search Link',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            })
          ]
        }),
        defineArrayMember({
          name: 'mainMenu',
          title: 'Main Menu Link',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            })
          ]
        }),
        defineArrayMember({
          name: 'bag',
          title: 'Bag Link',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            })
          ]
        }),
      ],
    })
  ],
});
