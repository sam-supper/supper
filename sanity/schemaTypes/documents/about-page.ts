import { defineType, defineField } from "sanity";
import {InfoOutlineIcon} from '@sanity/icons'

export default defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
  ],
});
