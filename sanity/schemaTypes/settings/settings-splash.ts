import { defineType, defineField, defineArrayMember } from "sanity";

export default defineType({
  name: "settingsSplash",
  title: "Splash Page Settings",
  type: "document",
  fields: [
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        { type: 'image' }
      ]
    })
  ],
  preview: {
    prepare: () => ({
      title: 'Splash Page Settings'
    })
  }
});
