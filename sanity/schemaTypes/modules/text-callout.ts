import { defineType, defineField } from "sanity";

export default defineType({
  name: "textCallout",
  title: "Text Callout",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Text",
      type: "string",
    })
  ]
})