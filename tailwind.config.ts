import type { Config } from 'tailwindcss'

import { blackA, grass, green, mauve } from '@radix-ui/colors'

export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ...blackA,
        ...green,
        ...grass,
        ...mauve,
      },
      keyframes: {
        slideDownAndFade: {
          from: { opacity: "0", transform: 'translateY(-2px)' },
          to: { opacity: "1", transform: 'translateY(0)' },
        },
        slideLeftAndFade: {
          from: { opacity: "0", transform: 'translateX(2px)' },
          to: { opacity: "1", transform: 'translateX(0)' },
        },
        slideUpAndFade: {
          from: { opacity: "0", transform: 'translateY(2px)' },
          to: { opacity: "1", transform: 'translateY(0)' },
        },
        slideRightAndFade: {
          from: { opacity: "0", transform: 'translateX(-2px)' },
          to: { opacity: "1", transform: 'translateX(0)' },
        },
      },
      animation: {
        slideDownAndFade: 'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideLeftAndFade: 'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideRightAndFade: 'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
} satisfies Config
