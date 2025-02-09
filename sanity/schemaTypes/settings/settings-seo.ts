import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "settingsSeo",
  title: "Global SEO",
  type: "document",
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      rows: 2,
      type: 'text'
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image'
    }),
    defineField({
      name: 'ogImage',
      title: 'OG Image',
      type: 'image'
    })
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
      media: 'favicon'
    },
    prepare: ({ title, description, media }) => ({
      title: title || 'Global SEO',
      subtitle: description,
      media: media
    })
  }
});
