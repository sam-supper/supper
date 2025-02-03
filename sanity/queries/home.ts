import { defineQuery, groq } from "next-sanity";
import { modulesFields } from "./fragments";

export const homePageQuery = defineQuery(
  groq`*[_type == "homePage"][0] {
    title,
    content[] {
      ${modulesFields}
    }
  }`
)