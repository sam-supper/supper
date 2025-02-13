import type { Metadata } from 'next'
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { VisualEditing } from "next-sanity";
import { settingsFooterQuery, settingsQuery, settingsSeoQuery } from "@/sanity/queries/settings";
import { useMetadata } from "@/hooks/use-metadata";
import { draftMode } from "next/headers";
import localFont from "next/font/local";

import { LayoutTransition } from "@/components/global/layout-transition";
import { EnterAnimation } from "@/components/global/enter-animation";
import { ThemeSwitcher } from "@/components/global/theme-switcher";
import { ReactLenis } from "lenis/react";
import { Header } from "@/components/global/header";
import { SetVH } from "@/components/global/SetVH";

import "./globals.css";
import { InformationPage } from "@/components/information/information-page";
import { Footer } from '@/components/global/footer';

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
  const [{ data: settings }, { data: footerSettings }] = await Promise.all([
    sanityFetch({ query: settingsQuery }),
    sanityFetch({ query: settingsFooterQuery })
  ])

  return (
    <html lang="en">
      <body
        className={`${ArizonaText.variable} antialiased font-serif font-normal bg-grey-light text-black`}
      >
        <EnterAnimation />
        <Header {...settings?.header} />
        <SetVH />
        <InformationPage />
        <SanityLive />
        <ThemeSwitcher />
        <LayoutTransition>
          <ReactLenis
            root
          >
            {children}
            <Footer {...footerSettings} />
          </ReactLenis>
        </LayoutTransition>
        {(await draftMode()).isEnabled && <VisualEditing />}
      </body>
    </html>
  );
}
