import { type ReactNode, type FC } from "react";

interface MediaIconProps {
  icon: ReactNode
}

export const MediaIcon: FC<MediaIconProps> = ({ icon }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {icon}
    </div>
  )
}