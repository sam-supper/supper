import { defineType, defineField, defineArrayMember } from "sanity";
import {HomeIcon} from '@sanity/icons'
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list'

import { VideoAspect } from '../../components/video-aspect'

const lastTenYears = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 10 }, (_, i) => (currentYear - i).toString());
};

export default defineType({
  name: "projectPage",
  title: "Projects",
  type: "document",
  icon: HomeIcon,
  orderings: [orderRankOrdering],
  groups: [
    { name: 'content', title: 'Content' },
    { name: 'media', title: 'Media' },
  ],
  fields: [
    orderRankField({
      type: 'projectPage',
    }),
    defineField({
      name: 'seo',
      title: 'SEO Meta',
      type: 'seo'
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: 'content',
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: 'content',
      options: {
        source: "title",
      },
    }),
    defineField({
      name: 'hideFromWorks',
      title: 'Hide from Works',
      description: 'When enabled, this project is hidden from the works grid and list (and the home page listing). It can still be opened via its direct link and shown as a related project.',
      type: 'boolean',
      initialValue: false,
      group: 'content',
    }),
    defineField({
      name: "client",
      title: "Client",
      type: 'reference',
      group: 'content',
      to: [{ type: 'client' }],
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'date',
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
    }),
    defineField({
      name: 'collaborators',
      title: 'Collaborators',
      type: 'array',
      group: 'content',
      of: [
        defineArrayMember({
          name: 'collaborator',
          title: 'Collaborator',
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
            }),
          ]
        })
      ]
    }),
    defineField({
      name: 'explanation',
      title: 'Explanation',
      type: 'richTextSimple',
      group: 'content',
    }),
    defineField({
      name: 'gridMedia',
      title: 'Grid Thumbnail',
      description: 'Optional. Shown in the works grid (desktop + mobile) instead of the first project photo. Leave empty to use the first photo.',
      type: 'image',
      group: 'media',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        })
      ],
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
      name: 'mobileMedia',
      title: 'Mobile Primary Image',
      description: 'Optional. Shown as the primary project image on mobile instead of the first media. Leave empty to use the first media.',
      type: 'image',
      group: 'media',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        })
      ],
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
      name: 'media',
      title: 'Media',
      type: 'array',
      group: 'media',
      of: [
        { 
          type: 'image',
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
            })
          ],
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
        },
        { 
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
        },
        defineArrayMember({
          name: 'mediaRow',
          title: 'Media Row',
          type: 'object',
          fields: [
            defineField({
              name: 'media',
              title: 'Media',
              type: 'array',
              of: [
                { 
                  type: 'image',
                  fields: [
                    defineField({
                      name: 'alt',
                      title: 'Alt Text',
                      type: 'string',
                    })
                  ],
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
                },
                { 
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
                },
              ],
            })
          ],
          preview: {
            select: {
              media: 'media',
              mediaOneFilename: 'media.0.asset.originalFilename',
              mediaTwoFilename: 'media.1.asset.originalFilename',
              mediaOne: 'media.0.asset',
              mediaTwo: 'media.1.asset',
            },
            prepare: ({ media, mediaOneFilename, mediaTwoFilename, mediaOne, mediaTwo }) => ({
              title: `${mediaOneFilename} & ${mediaTwoFilename}`,
              subtitle: media ? `${Object.keys(media).length} media` : 'No media',
              media: mediaOne ?? mediaTwo,
            }),
          }
        })
      ],
    }),
    defineField({
      name: 'related',
      title: 'Related Projects',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'projectPage' }] }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      hidden: 'hideFromWorks',
      media: 'media.0.asset',
    },
    prepare: ({ title, hidden, media }) => ({
      title,
      subtitle: hidden ? 'Hidden from Works' : undefined,
      media,
    }),
  },
});
