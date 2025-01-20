import { defineType, defineField } from "sanity";
import {UserIcon} from '@sanity/icons'

export default defineType({
  name: "articleAuthor",
  title: "Authors",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    })
  ],
});

