import { defineType, defineField } from "sanity";
import {HomeIcon} from '@sanity/icons'

export default defineType({
  name: "projectPage",
  title: "Projects",
  type: "document",
  icon: HomeIcon,
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
        slugify: (input) => input.toLowerCase().replace(/\s+/g, '-'),
      },
    })
  ],
});
