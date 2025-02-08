import { defineQuery, groq } from "next-sanity";

export const homePageQuery = defineQuery(
  groq`*[_type == "homePage"][0] {
    title,
  }`
)