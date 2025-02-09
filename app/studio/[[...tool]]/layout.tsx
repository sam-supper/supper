import './studio.css'
import localFont from 'next/font/local'

const ArizonaText = localFont({
  src: [
    {
      path: '../../fonts/ABCArizonaText-Regular.woff2',
      weight: '400',
      style: 'normal'
    },
    {
      path: '../../fonts/ABCArizonaText-RegularItalic.woff2',
      weight: '400',
      style: 'italic'
    }
  ],
  display: 'swap',
  variable: '--font-arizona-text'
})

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${ArizonaText.variable}`}>
        {children}
      </body>
    </html>
  );
}
