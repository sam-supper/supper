import { defineType, defineField } from "sanity";
import {BillIcon} from '@sanity/icons'
import { MediaIcon } from "@/sanity/components/media-icon";

export default defineType({
  name: 'creditRow',
  title: 'Credit Row',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string'
    }),
    defineField({
      name: 'credits',
      title: 'Credits',
      type: 'array',
      of: [{ type: 'externalLink' }]
    })
  ],
  preview: {
    select: {
      title: 'title',
      credits: 'credits'
    },
    prepare: ({ title, credits }) => {
      const creditString = credits?.map((credit: any, index: number) => {
        return `${credit.label}${index < credits.length - 1 ? ', ' : ''}`
      }).join('')

      return {
        title: `Credits – ${title}`,
        subtitle: creditString,
        media: <MediaIcon icon={<BillIcon />} />
      }
    }
  }
})