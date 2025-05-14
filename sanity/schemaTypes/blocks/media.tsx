import { defineType, defineField } from "sanity";
import { VideoAspect } from '../../components/video-aspect'

export default defineType({
  name: 'media',
  title: 'Media',
  type: 'object',
  fields: [
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'image',
    }),
    defineField({
      title: 'Image',
      name: 'image',
      type: 'image',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        })
      ],
      hidden: ({ parent }) => parent?.mediaType !== 'image',
      preview: {
        select: {
          filename: 'asset.originalFilename',
          media: 'asset'
        },
        prepare: ({ filename, media }) => ({
          title: filename,
          media: media,
        }),
      },
    }),
    defineField({ 
      name: 'video',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      fields: [
        defineField({
          name: 'aspectRatio',
          title: 'Aspect Ratio',
          type: 'number',
          components: {
            input: VideoAspect,
          },
        })
      ],
      hidden: ({ parent }) => parent?.mediaType !== 'video',
      preview: {
        select: {
          filename: 'asset.originalFilename',
          aspectRatio: 'aspectRatio',
        },
        prepare: ({ filename, aspectRatio }) => ({
          title: filename,
          subtitle: `aspect: ${aspectRatio}`,
        }),
      },
    }),
  ]
})