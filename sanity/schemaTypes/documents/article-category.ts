import { defineType, defineField } from "sanity";
import {FilterIcon} from '@sanity/icons'

export default defineType({
  name: "articleCategory",
  title: "Categories",
  type: "document",
  icon: FilterIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
  ],
});
