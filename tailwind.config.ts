import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'md': '900px'
    },
    fontFamily: {
      'sans': ['var(--font-grotesque-mt)', 'sans-serif'],
      'serif': ['var(--font-times-now)', 'serif']
    },
    fontSize: {
      'sans-small': ['13px', {
        lineHeight: '140%'
      }],
      'sans-medium': ['24px', {
        lineHeight: '116%'
      }],
      'sans-large': ['48px', {
        lineHeight: '116%'
      }],
      'serif-small': ['14px', {
        lineHeight: '120%',
        fontWeight: '600'
      }],
      'serif-medium': ['26px', {
        lineHeight: '120%',
        fontWeight: '600'
      }],
      'serif-large': ['49px', {
        lineHeight: '120%',
        fontWeight: '600'
      }],
      'reading-small': ['14px', {
        fontWeight: '600',
        lineHeight: '130%'
      }],
      'reading-medium': ['20px', {
        fontWeight: '600',
        lineHeight: '120%'
      }],
      'reading-large': ['26px', {
        fontWeight: '600',
        lineHeight: '115%'
      }]
    },
    fontWeight: {
      'normal': '400',
      'medium': '500',
      'semibold': '600'
    },
    extend: {
      colors: {
        'current': 'currentColor',
        'off-white': '#FCFCFA',
        'grey-light': '#F6F6F2',
        'grey': '#979797',
        'grey-dark': '#7F7F7F',
        'black': '#272727',
        'article-black': '#191919',
        'royal-blue': '#0036D5',
        'royal-blue-dark': '#0057FF',
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
      aspectRatio: {
        'article-hero': '1.68',
        'footer': '2.25'
      },
      transitionDuration: {
        '400': '400ms'
      }
    },
  },
  plugins: [],
} satisfies Config;
