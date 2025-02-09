import { defineQuery, groq } from "next-sanity";

export const infoPageQuery = defineQuery(
  groq`*[_type == "infoPage"][0] {
    "title": "The Info Page",
    content[] {
      _key,
      _type,
      _type == "textRow" => {
        text
      },
      _type == "splitTextRow" => {
        columnOne,
        columnTwo
      }
    }
  }`
)