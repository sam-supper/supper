import { defineType, defineField } from "sanity";

export default defineType({
  name: "donateCta",
  title: "Donate CTA",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Info",
      type: "string",
      initialValue: 'Settings for this module are automatically pulled from the site settings.',
      readOnly: true
    })
  ],
  preview: {
    prepare: () => {
      return {
        title: 'Donate CTA',
      }
    }
  }
})