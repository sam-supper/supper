import { ComponentProps, type FC } from "react";

interface VideoProps extends ComponentProps<'video'> {
  src: string
  className?: string
}

export const Video: FC<VideoProps> = (props) => {
  const { src, className } = props;

  return <video src={src} autoPlay muted loop playsInline className={className} />
}