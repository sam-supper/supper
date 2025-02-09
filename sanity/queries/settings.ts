import { defineQuery, groq } from "next-sanity";
import { linkFields } from "./fragments";

export const settingsHeaderQuery = defineQuery(
  groq`*[_type == "settingsHeader"][0] {
    links[] {
      ${linkFields}
    },
    contact {
      label,
      content[] {
        _key,
        _type,
        label,
        url
      }
    },
    information {
      label,
      content
    },
    "projectCount": count(*[_type == "projectPage"])
  }`
)

export const settingsFooterQuery = defineQuery(
  groq`*[_type == "settingsFooter"][0] {
    columns[] {
      _key,
      text
    },
    externalLinks[] {
      _key,
      label,
      url
    }
  }`
)

export const settingsQuery = defineQuery(
  groq`{
    "header": ${settingsHeaderQuery},
    "footer": ${settingsFooterQuery},
  }`
)