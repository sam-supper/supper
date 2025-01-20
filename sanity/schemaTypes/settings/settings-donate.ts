import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "settingsDonate",
  title: "Donate CTA",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 2
    }),
    defineField({
      name: 'linkText',
      title: 'Link Text',
      type: 'string',
    })
  ],
});
