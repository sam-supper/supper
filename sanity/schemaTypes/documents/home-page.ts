import { defineType, defineField } from "sanity";
import {HomeIcon} from '@sanity/icons'

export default defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'featuredEntries' },
        { type: 'textCallout' },
        { type: 'donateCta' }
      ]
    })
  ],
});
