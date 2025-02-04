import { defineType, defineField } from "sanity";

export default defineType({
  name: 'popularEntriesList',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      initialValue: 'Popular Pieces'
    }),
    defineField({
      name: 'weeklyTitle',
      type: 'string',
      title: 'Weekly Title',
      initialValue: "This week's most read pieces"
    }),
    defineField({
      name: 'allTimeTitle',
      type: 'string',
      title: 'All Time Title',
      initialValue: "All time most read pieces"
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'link'
    })
  ],
})