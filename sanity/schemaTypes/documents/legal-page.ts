import { defineType, defineField } from "sanity";
import {CaseIcon} from '@sanity/icons'

export default defineType({
  name: "legalPage",
  title: "Legal Pages",
  type: "document",
  icon: CaseIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
  ],
});
