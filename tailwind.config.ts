import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  future: {
    hoverOnlyWhenSupported: true
  },
  darkMode: 'class',
  theme: {
    colors: {
      'current': 'currentColor',
      'transparent': 'transparent',
      'white': '#F9F9F9',
      'grey-light': '#F0F0F0',
      'grey': '#9C9C9C',
      'black': '#1E1E1E',
      'translucent': 'rgba(217, 217, 217, 0.1)',
      'overlay': 'rgba(249, 249, 249, 0.97)',
    },
    screens: {
      'md': '900px'
    },
    fontFamily: {
      'serif': ['var(--font-arizona-text)', 'serif']
    },
    fontSize: {
      'title-lg': ['36px', {
        lineHeight: '42px',
        letterSpacing: '-0.03em'
      }],
      'title': ['32px', {
        lineHeight: '32px',
        letterSpacing: '-0.03em'
      }],
      'subtitle': ['20px', {
        lineHeight: '24px',
        letterSpacing: '-0.03em'
      }],
      'nav': ['15px', {
        lineHeight: '18px',
        letterSpacing: '-0.03em'
      }],
      'list-title': ['16px', {
        lineHeight: '20px',
        letterSpacing: '-0.05em'
      }],
      'eyebrow': ['12px', {
        lineHeight: '12px',
        letterSpacing: '-0.03em'
      }],
      'footer': ['13px', {
        lineHeight: '16px',
        letterSpacing: '0em'
      }]
    },
    fontWeight: {
      'normal': '400',
      'medium': '500',
      'semibold': '600'
    },
    spacing: {
      ...Object.fromEntries(
        Array.from({ length: 999 }, (_, i) => [i, `${i/16}rem`])
      ),
      'site-x': 'var(--site-x)',
      'site-y': 'var(--site-y)',
    },
    lineHeight: {
      '100': '100%',
      '110': '110%',
      '115': '115%',
      '120': '120%',
      '130': '130%',
      '140': '140%'
    },
    backdropBlur: {
      'nav': '30px'
    },
    extend: {
      transitionDuration: {
        '400': '400ms'
      }
    },
  },
  plugins: [
    function({ addVariant }: any) {
      addVariant('light', 'body.light &');
    },
  ],
} satisfies Config;
