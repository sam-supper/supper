import './studio.css'
import localFont from 'next/font/local'

const timesNow = localFont({
  src: [
    {
      path: '../../fonts/TimesNow-SemiBold.woff',
      weight: '600',
      style: 'normal'
    }
  ],
  display: 'swap',
  variable: '--font-times-now'
})

const grotesqueMT = localFont({
  src: [
    {
      path: '../../fonts/GrotesqueMTStd.woff',
      weight: '400',
      style: 'normal'
    }
  ],
  display: 'swap',
  variable: '--font-grotesque-mt'
})

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${timesNow.variable} ${grotesqueMT.variable}`}>
        {children}
      </body>
    </html>
  );
}
