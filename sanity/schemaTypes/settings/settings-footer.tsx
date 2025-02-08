import { PortableTextBlock } from "next-sanity";
import { defineType, defineField, defineArrayMember } from "sanity";
import {TextIcon} from '@sanity/icons'
import { MediaIcon } from "@/sanity/components/media-icon";

export default defineType({
  name: "settingsFooter",
  title: "Footer",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      initialValue: 'Footer',
      readOnly: true,
      hidden: true
    }),
    defineField({
      name: 'siteInfo',
      title: 'Site Info',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'textBlock',
          title: 'Text Block',
          type: 'object',
          fields: [
            defineField({
              name: 'text',
              title: 'Text',
              type: 'richTextSimple'
            })
          ],
          preview: {
            select: {
              text: 'text'
            },
            prepare: ({ text }) => {
              const textString = text.reduce((acc: string, item: PortableTextBlock) => {
                const childText = item.children?.map((child) => {
                  return child.text;
                }).join(' ');
                return `${acc} ${childText}`;
              }, '');

              return {
                title: textString,
                subtitle: 'Text Block',
                media: <MediaIcon icon={<TextIcon />} />
              }
            }
          }
        })
      ]
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'search',
          title: 'Search Link',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            })
          ]
        }),
        defineArrayMember({
          name: 'mainMenu',
          title: 'Main Menu Link',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            })
          ]
        }),
        defineArrayMember({
          name: 'bag',
          title: 'Bag Link',
          type: 'object',
          fields: [
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
            })
          ]
        }),
      ],
    })
  ],
});
