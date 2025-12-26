/**
 * Tailwind CSS Configuration
 * Swiss/Neo-Brutalist Design System
 *
 * Key Features:
 * - Electric blue (#0066FF) accent color via CSS variables
 * - Pure monochrome color scale
 * - Zero border radius for brutalist aesthetic
 * - Class-based dark mode support
 */

import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /**
       * Font Family: Two-Tier Typography System
       *
       * Sans: Manrope (rounded) for body text and UI
       * Mono: Geist Mono for technical elements and code
       */
      fontFamily: {
        sans: ['var(--font-manrope)'],
        mono: ['var(--font-geist-mono)'],
      },

      // Color system: All colors defined via CSS variables in app/globals.css
      // Primary = Electric Blue (#0066FF), used as single accent color
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',        // Electric blue #0066FF
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',         // Darker blue for hovers
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',            // Dark borders
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',                // Blue focus ring
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      /**
       * Border Radius: Brutalist - Sharp Corners Only
       * All values set to 0px (no rounding)
       * Overrides shadcn/ui default rounded corners
       */
      borderRadius: {
        lg: '0px',    // Large radius = none
        md: '0px',    // Medium radius = none
        sm: '0px',    // Small radius = none
        none: '0px'   // Explicitly none
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
