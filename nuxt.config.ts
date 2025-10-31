import tailwindcss from "@tailwindcss/vite";
import type { BuiltinTheme, BundledLanguage } from "shiki";

import * as SEO from "./app/utils/seo";

const langs: BundledLanguage[] = [
  "json",
  "js",
  "ts",
  "css",
  "html",
  "md",
  "yaml",
  "vue",
  "vue-html",
  "bash",
  "sh",
  "typescript",
  "javascript",
  "svelte",
  "tsx",
  "jsx",
  "prisma",
  "sql",
  "docker",
  "dockerfile",
  "python",
];

const theme = {
  default: "github-light" as BuiltinTheme,
  dark: "github-dark" as BuiltinTheme,
};

export default defineNuxtConfig({
  devtools: { enabled: true },
  vite: {
    plugins: [tailwindcss()],
    build: { sourcemap: false },
    optimizeDeps: {
      include: [
        "vue-use-active-scroll",
        "date-fns",
        "@unovis/ts",
        "vee-validate",
        "@vee-validate/yup",
        "zod",
        "v-calendar",
        "lodash-es",
        "vaul-vue",
        "tailwind-merge",
        "tailwind-variants",
        "vue-tippy",
        "motion-v",
        "@tanstack/vue-table",
        "vue-sonner",
        "reka-ui",
        "@faker-js/faker",
        "mermaid",
        "@baybreezy/file-extension-icon",
        "@iconify/utils",
      ],
    },
  },
  experimental: { payloadExtraction: true },
  modules: [
    "@nuxtjs/mdc",
    "@vueuse/nuxt",
    "reka-ui/nuxt",
    "@yuta-inoue-ph/nuxt-vcalendar",
    "@vee-validate/nuxt",
    "nuxt-llms",
    "@nuxtjs/color-mode",
    "@nuxt/eslint",
    "nuxt-swiper",
    "v-wave/nuxt",
    "@nuxt/image",
    "@nuxt/icon",
    "@nuxt/fonts",
    "@vite-pwa/nuxt",
    "nuxt-og-image",
    "vue-sonner/nuxt",
    "motion-v/nuxt",
    "@nuxt/content",
    "@morev/vue-transitions/nuxt",
    "nuxt-gtag",
  ],
  gtag: {
    id: process.env.GA_ID,
  },

  css: [
    "~/assets/css/tippy.css",
    "~/assets/css/theme.css",
    "~/assets/css/quill.css",
    "~/assets/css/full-calendar.css",
    "~/assets/css/tailwind.css",
  ],
  llms: {
    domain: process.env.PUBLIC_URL || "https://uithing.com",
    description: SEO.SITE_DESCRIPTION,
    title: SEO.SITE_TITLE,
    full: {
      title: "Complete Documentation for UI Thing",
      description: "The complete documentation including all content",
    },
  },

  vcalendar: {
    calendarOptions: {
      masks: {
        weekdays: "WW",
      },
    },
  },
  icon: {
    clientBundle: { scan: true, sizeLimitKb: 0 },
    mode: "svg",
    class: "shrink-0",
    fetchTimeout: 2000,
    serverBundle: "local",
  },

  imports: {
    // Add tv and VariantProps to the set of auto imported modules
    imports: [
      { from: "tailwind-variants", name: "tv" },
      { from: "tailwind-variants", name: "VariantProps", type: true },
      { from: "vue-sonner", name: "toast", as: "useSonner" },
    ],
  },

  app: {
    rootAttrs: {
      class: "bg-background",
    },
    head: {
      title: SEO.SITE_TITLE,
      titleTemplate: `%s | ${SEO.SITE_NAME}`,
      script: [
        // Add pdfmake scripts for DataTables.net export buttons
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.12/pdfmake.min.js",
          defer: true,
        },
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.12/vfs_fonts.min.js",
          defer: true,
        },
      ],
    },
  },

  mdc: {
    highlight: { langs, theme },
  },
  content: {
    build: {
      markdown: {
        toc: { depth: 4, searchDepth: 4 },
        highlight: { langs, theme },
      },
    },
  },

  routeRules: {
    "/getting-started": { redirect: "/getting-started/introduction" },
    "/magic/**": { redirect: "https://inspira-ui.com" },
    "/goodies": { redirect: "/goodies/border-beam" },
    "/components": { redirect: "/components/accordion" },
    "/examples": { redirect: "/examples/cards" },
    "/blocks": { redirect: "/blocks/app-empty-state" },
    "/block-renderer": { static: true },
  },
  colorMode: { classSuffix: "", fallback: "dark", preference: "system" },

  pwa: {
    includeAssets: ["favicon.ico", "robots.txt", "icons/apple-touch-icon.png"],
    manifest: {
      background_color: "#ffffff",
      description: SEO.SITE_DESCRIPTION,
      icons: [
        {
          src: "/icons/pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/icons/pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/icons/pwa-maskable-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable",
        },
        {
          src: "/icons/pwa-maskable-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
      lang: SEO.SITE_LANG,
      name: SEO.SITE_NAME,
      short_name: SEO.SITE_NAME,
      theme_color: SEO.SITE_THEME_COLOR,
      display: "standalone",
    },
  },

  site: {
    url: SEO.SITE_URL,
    name: SEO.SITE_NAME,
    description: SEO.SITE_DESCRIPTION,
    defaultLocale: SEO.SITE_LANG,
    identity: { type: "Person" },
    indexable: true,
    twitter: SEO.SITE_TWITTER_CREATOR,
  },

  ogImage: {
    defaults: {
      alt: SEO.SITE_NAME,
      height: 800,
      width: 1440,
      screenshot: { colorScheme: "dark", height: 800, width: 1440, delay: 2000 },
    },
  },
  compatibilityDate: "latest",
});
