import { fontFamily } from "tailwindcss/defaultTheme";

/**@type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{vue,ts,js,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
        },
        screens: {
          "2xl": "1440px",
        },
      },
      fontFamily: {
        sans: [
          `Inter, ${fontFamily.sans.join(", ")}`,
          {
            fontFeatureSettings: '"cv02","cv03","cv04","cv11"',
          },
        ],
        mono: ["'Fira Code'", ...fontFamily.mono],
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        shine: {
          from: { backgroundPosition: "200% 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: 1 },
          "70%": { opacity: 1 },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: 0,
          },
        },
        grid: {
          "0%": { transform: "translateY(-50%)" },
          "100%": { transform: "translateY(0)" },
        },
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
        "accordion-down": {
          from: { height: "0px" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0px" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeOut: {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "collapse-down": {
          from: { height: "0px" },
          to: { height: "var(--radix-collapsible-content-height)" },
        },
        "collapse-up": {
          from: { height: "var(--radix-collapsible-content-height)" },
          to: { height: "0px" },
        },
      },
      animation: {
        shine: "shine 8s ease-in-out infinite",
        meteor: "meteor 5s linear infinite",
        grid: "grid 15s linear infinite",
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeIn: "fadeIn 0.2s ease-out",
        fadeOut: "fadeOut 0.2s ease-out",
        "collapse-down": "collapse-down 0.2s ease-out",
        "collapse-up": "collapse-up 0.2s ease-out",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
          input: "hsl(var(--sidebar-input))",
        },
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.foreground"),
            "--tw-prose-headings": theme("colors.foreground"),
            "--tw-prose-lead": theme("colors.muted.foreground"),
            "--tw-prose-links": theme("colors.foreground"),
            "--tw-prose-bold": theme("colors.foreground"),
            "--tw-prose-counters": theme("colors.muted.foreground"),
            "--tw-prose-bullets": theme("colors.primary.DEFAULT / 50%"),
            "--tw-prose-hr": theme("colors.border"),
            "--tw-prose-quotes": theme("colors.foreground"),
            "--tw-prose-quote-borders": theme("colors.border"),
            "--tw-prose-captions": theme("colors.muted.foreground"),
            "--tw-prose-kbd": theme("colors.foreground"),
            "--tw-prose-kbd-shadows": theme("colors.foreground"),
            "--tw-prose-code": theme("colors.foreground"),
            "--tw-prose-pre-code": theme("colors.background"),
            "--tw-prose-pre-bg": theme("colors.foreground / 90%"),
            "--tw-prose-th-borders": theme("colors.border"),
            "--tw-prose-td-borders": theme("colors.border"),
            "--tw-prose-invert-body": theme("colors.foreground"),
            "--tw-prose-invert-headings": theme("colors.foreground"),
            "--tw-prose-invert-lead": theme("colors.muted.foreground"),
            "--tw-prose-invert-links": theme("colors.foreground"),
            "--tw-prose-invert-bold": theme("colors.foreground"),
            "--tw-prose-invert-counters": theme("colors.muted.foreground"),
            "--tw-prose-invert-bullets": theme("colors.primary.DEFAULT / 50%"),
            "--tw-prose-invert-hr": theme("colors.border"),
            "--tw-prose-invert-quotes": theme("colors.foreground"),
            "--tw-prose-invert-quote-borders": theme("colors.border"),
            "--tw-prose-invert-captions": theme("colors.muted.foreground"),
            "--tw-prose-invert-kbd": theme("colors.foreground"),
            "--tw-prose-invert-kbd-shadows": theme("colors.foreground"),
            "--tw-prose-invert-code": theme("colors.foreground"),
            "--tw-prose-invert-pre-code": theme("colors.foreground"),
            "--tw-prose-invert-pre-bg": theme("colors.foreground / 10%"),
            "--tw-prose-invert-th-borders": theme("colors.border"),
            "--tw-prose-invert-td-borders": theme("colors.border"),
            "code::before": {
              content: "",
            },
            "code::after": {
              content: "",
            },
          },
        },
      }),
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms")({ strategy: "class" }),
  ],
};
