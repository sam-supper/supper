import type { Metadata } from 'next'
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { VisualEditing } from "next-sanity";
import { settingsFooterQuery, settingsQuery, settingsSeoQuery } from "@/sanity/queries/settings";
import { useMetadata } from "@/hooks/use-metadata";
import { draftMode } from "next/headers";
import localFont from "next/font/local";

import { LayoutTransition } from "@/components/global/layout-transition";
import { EnterAnimation } from "@/components/global/enter-animation";
import { ReactLenis } from "lenis/react";
import { Header } from "@/components/global/header";
import { SetVH } from "@/components/global/SetVH";

import "./globals.css";
import { InformationPage } from "@/components/information/information-page";
import { Footer } from '@/components/global/footer';
import { ThemeProvider } from '@/components/global/theme-provider';

// Google Analytics
import Script from 'next/script'
import GAListener from '@/app/ga-listener'

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
    <ThemeProvider>
      <body
        className={`${ArizonaText.variable} antialiased font-serif font-normal bg-grey-light text-black dark:bg-dark-black dark:text-grey-light transition-colors duration-[600ms] ease`}
      >
        {/* GA - load early */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HS3WKH1936"
          strategy="beforeInteractive"
        />
        <Script id="gtag-init" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HS3WKH1936', {
              send_page_view: true,
              page_path: window.location.pathname + window.location.search
            });
          `}
        </Script>

        <EnterAnimation />
        <Header {...settings?.header} />
        <SetVH />
        <InformationPage />
        <SanityLive />
        <LayoutTransition>
          <ReactLenis
            root
            options={{ lerp: 0.15 }}
          >
            {children}
            <Footer {...footerSettings} />
          </ReactLenis>
        </LayoutTransition>
        {(await draftMode()).isEnabled && <VisualEditing />}

        {/* GA - track client side route changes */}
        <GAListener />
      </body>
    </ThemeProvider>
  );
}
