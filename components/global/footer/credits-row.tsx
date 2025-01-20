import { type FC } from "react";

import { Link } from "../link";
import { Label } from "../label";

interface Credit {
  _key: string
  label: string
  url?: string
}

interface CreditsRowProps {
  _key: string
  title: string
  credits: Credit[]
}

export const CreditsRow: FC<CreditsRowProps> = (props) => {
  const { title, credits } = props

  return (
    <div className="flex flex-col items-start">
      <Label element="h3" tone="dark">{title}</Label>
      <ul>
        {credits?.map((credit: Credit) => (
          <li key={credit._key}>
            {credit.url ? (
              <Link href={credit.url} target="_blank" rel="noopener noreferrer">{credit.label}</Link>
            ) : (
              <span>{credit.label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}