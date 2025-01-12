import type { HomePageQueryResult } from "@/sanity.types";

export const HomePage = (props: HomePageQueryResult) => {
  return <div>Title: {props?.title}</div>;
};
