import { ComponentProps, type FC } from "react";

interface VideoProps extends ComponentProps<'video'> {
  url: string
  className?: string
}

export const Video: FC<VideoProps> = (props) => {
  const { url, className } = props;

  return <video src={url} autoPlay muted loop playsInline className={className} />
}