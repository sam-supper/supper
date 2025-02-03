import { defineType, defineField } from "sanity";

export default defineType({
  name: "featuredEntries",
  title: "Featured Entries",
  type: "object",
  fields: [
    defineField({
      name: "entries",
      title: "Entries",
      type: "array",
      of: [{ type: "reference", to: [{ type: "articlePage" }] }],
      validation: (Rule) => Rule.required().min(5).max(5)
    })
  ],
  preview: {
    select: {
      articleTitle: "entries.0.title",
      articleMedia: "entries.0.featuredImage",
      category: "entries.0.category.title",
      entries: "entries"
    },
    prepare: ({ articleTitle, articleMedia, category, entries }) => {
      const entriesCount = Object.keys(entries).length
      return {
        title: `Featured Entries (${entriesCount} total)`,
        subtitle: `First: ${category} — ${articleTitle}`,
        media: articleMedia
      }
    }
  }
})