import type { ProjectPageQueryResult } from "@/sanity.types";

export const ProjectPage = (props: ProjectPageQueryResult) => {
  if (!props) return null

  const { title, content } = props

  return (
    <div className="site-container flex flex-col gap-20">
      <h1>{title}</h1>
    </div>
  );
};

