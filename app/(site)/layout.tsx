import type { Metadata } from 'next'
import { settingsQuery, settingsSeoQuery } from "@/sanity/queries/settings";
import { useMetadata } from "@/hooks/use-metadata";
import { draftMode } from "next/headers";
import localFont from "next/font/local";

import { LayoutTransition } from "@/components/global/layout-transition";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { VisualEditing } from "next-sanity";
import { Header } from "@/components/global/header";
import { ThemeSwitcher } from "@/components/global/theme-switcher";
import { ReactLenis } from "lenis/react";

import "./globals.css";
import { InformationPage } from "@/components/information/information-page";

const ArizonaText = localFont({
  src: [
    {
      path: '../fonts/ABCArizonaText-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../fonts/ABCArizonaText-RegularItalic.woff2',
      weight: '400',
      style: 'italic'
    }
  ],
  display: 'swap',
  variable: '--font-arizona-text'
})

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({ query: settingsSeoQuery })

  return useMetadata({ data, useTitleTemplate: false })
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: settings } = await sanityFetch({ query: settingsQuery });

  return (
    <html lang="en">
      <body
        className={`${ArizonaText.variable} antialiased font-serif font-normal bg-grey-light text-black dark:text-white transition-colors duration-500 ease`}
      >
        <Header {...settings?.header} />
        <InformationPage />
        <SanityLive />
        <ThemeSwitcher />
        <LayoutTransition>
          <ReactLenis
            root
          >
            {children}
            {/* <Footer /> */}
          </ReactLenis>
        </LayoutTransition>
        {(await draftMode()).isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}
