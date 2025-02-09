import { type FC } from "react";
import { sanityFetch } from "@/sanity/lib/live";
import { infoPageQuery } from "@/sanity/queries/info";
import { settingsFooterQuery } from "@/sanity/queries/settings";

import { InformationOverlay } from "./information-overlay";

interface InformationPageProps {}

export const InformationPage: FC<InformationPageProps> = async (props) => {
  const { data: information } = await sanityFetch({ query: infoPageQuery });
  const { data: footer } = await sanityFetch({ query: settingsFooterQuery });

  return <InformationOverlay footer={footer} {...information} />
}