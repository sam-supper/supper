import { type FC } from "react";

import { PopularEntriesList } from "./popular-entries-list";
import { FeaturedEntries } from "./featured-entries";
import { TextCallout } from "./text-callout";
import { DonateCta } from "../global/donate-cta";

interface ModulesProps {
  modules?: any[]
}

const compomentMap: any = {
  featuredEntries: FeaturedEntries,
  textCallout: TextCallout,
  donateCta: DonateCta,
  popularEntriesList: PopularEntriesList
}

export const Modules: FC<ModulesProps> = ({ modules }) => {
  if (!modules) return null

  return (
    <div className="w-full flex flex-col gap-20">
      {modules.map((module: any, index: number) => {
        const Component = compomentMap[module._type]
        return (
          <div className={`${index === 0 ? 'pb-60' : 'py-60'}`} key={module._key}>
            <Component {...module} />
          </div>
        )
      })}
    </div>
  )
}