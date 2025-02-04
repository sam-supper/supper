import { defineType, defineField } from "sanity";
import {CaseIcon} from '@sanity/icons'

export default defineType({
  name: "libraryPage",
  title: "Library Page",
  type: "document",
  icon: CaseIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    })
  ],
});
