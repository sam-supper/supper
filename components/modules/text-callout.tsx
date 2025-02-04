import { type FC } from "react";

interface TextCalloutProps {
  text: string
}

export const TextCallout: FC<TextCalloutProps> = ({ text }) => {
  return <div className="font-serif text-serif-small py-80 text-center">{text}</div>
}