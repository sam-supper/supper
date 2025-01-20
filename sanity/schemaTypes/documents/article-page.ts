import { defineType, defineField } from "sanity";
import {HighlightIcon} from '@sanity/icons'

export default defineType({
  name: "articlePage",
  title: "Entries",
  type: "document",
  icon: HighlightIcon,
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
    defineField({
      name: 'published',
      title: 'Published Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'originalPublished',
      title: 'Original Published Date',
      description: 'Optional field for the original published date of the article',
      type: 'date'
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'articleCategory'}]
    }),
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'articleAuthor'}]}]
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt',
          type: 'string'
        })
      ]
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'richText'
    })
  ],
});
