import { defineQuery, groq } from "next-sanity";

export const settingsHeaderQuery = defineQuery(
  groq`*[_type == "settingsHeader"][0]`
)

export const settingsFooterQuery = defineQuery(
  groq`*[_type == "settingsFooter"][0] {
    siteInfo[] {
      _key,
      _type,
      _type == "textBlock" => {
        text[] {
          ...,
          markDefs[] {
            ...,
            _type == "internalLink" => {
              to->{
                "slug": slug.current
              },
              arrow
            },
            _type == "externalLink" => {
              url,
              arrow
            }
          }
        }
      },
      _type == "credit" => {
        title,
        credits[] {
          _key,
          label,
          url
        }
      }
    }
  }`
)

export const settingsQuery = defineQuery(
  groq`{
    "header": ${settingsHeaderQuery},
    "footer": ${settingsFooterQuery},
  }`
)