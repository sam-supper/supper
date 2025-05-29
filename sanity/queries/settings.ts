import { defineQuery, groq } from "next-sanity";
import { linkFields, imageFields } from "./fragments";

export const settingsHeaderQuery = defineQuery(
  groq`*[_type == "settingsHeader"][0] {
    links[] {
      type,
      url,
      ${linkFields},
    },
    contact {
      label,
      url,
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

export const settingsSeoQuery = defineQuery(
  groq`*[_type == "settingsSeo"][0] {
    title,
    description,
    favicon {
      ${imageFields}
    },
    ogImage {
      ${imageFields}
    }
  }`
)

export const settingsQuery = defineQuery(
  groq`{
    "header": ${settingsHeaderQuery},
    "footer": ${settingsFooterQuery},
  }`
)

export const settingsSplashQuery = defineQuery(
  groq`*[_type == "settingsSplash"][0] {
    images[] {
      ${imageFields}
    }
  }`
)