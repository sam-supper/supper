import type { HomePageQueryResult } from "@/sanity.types";
import { Modules } from "../modules";
import { HomeGreeting } from "./home-greeting";

export const HomePage = (props: HomePageQueryResult) => {
  if (!props) return null

  const { title, content } = props

  return (
    <div className="site-container flex flex-col gap-20">
      <h1 className="sr-only">{title}</h1>
      <HomeGreeting />
      {content ? <Modules modules={content} /> : null}
    </div>
  );
};

