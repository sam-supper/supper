import { type FC } from "react";

import { FeaturedEntries } from "./featured-entries";
import { TextCallout } from "./text-callout";
import { DonateCta } from "../global/donate-cta";

interface ModulesProps {
  modules?: any[]
}

const compomentMap: any = {
  featuredEntries: FeaturedEntries,
  textCallout: TextCallout,
  donateCta: DonateCta
}

export const Modules: FC<ModulesProps> = ({ modules }) => {
  if (!modules) return null

  return (
    <div className="w-full flex flex-col gap-20">
      {modules.map((module: any) => {
        const Component = compomentMap[module._type]
        return <Component key={module._key} {...module} />
      })}
    </div>
  )
}