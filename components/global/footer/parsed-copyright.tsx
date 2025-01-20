import { type FC } from "react";

interface ParsedCopyrightProps {
  value: string
}

export const ParsedCopyright: FC<ParsedCopyrightProps> = (props) => {
  const { value } = props

  if (!value) return null;

  return <div>{value.replaceAll("{{ year }}", new Date().getFullYear().toString())}</div>
}