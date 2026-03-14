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
    optimizeDeps: {
      include: [
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
        "@vue/devtools-core",
        "@vue/devtools-kit",
        "maska/vue",
        "@vueuse/integrations/useFuse",
      ],
    },
  },
  nitro: { experimental: { asyncContext: true } },
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
    "@nuxtjs/mcp-toolkit",
    "nuxt-email-renderer",
  ],
  mcp: {
    name: "UI Thing MCP",
    version: "0.0.1",
  },
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
    sections: [
      {
        title: "API Endpoints",
        description: "Documentation for all API endpoints",
        links: [
          {
            title: "Get Components",
            href: "/api/components",
            description:
              "Retrieve a list of UI components. A search query parameter can be provided to filter components by name, value, or docsPath.",
          },
          {
            title: "Get Component by Name",
            href: "/api/components/{name}",
            description:
              "Retrieve detailed information about a specific UI component by its name. The name parameter is required and should match the component's name or value. To get the list of available components, use the /api/components endpoint.",
          },
          {
            title: "Get Prose",
            href: "/api/prose",
            description:
              "Retrieve a list of prose elements. A search query parameter can be provided to filter prose elements by name or value.",
          },
          {
            title: "Get Prose by Name",
            href: "/api/prose/{name}",
            description:
              "Retrieve detailed information about a specific prose element by its name. The name parameter is required and should match the prose element's name or value. To get the list of available prose elements, use the /api/prose endpoint.",
          },
          {
            title: "Get Blocks",
            href: "/api/blocks",
            description:
              "Retrieve a list of UI blocks. A search query parameter can be provided to filter blocks by name, fileName, category, or path.",
          },
          {
            title: "Get Block by Name",
            href: "/api/blocks/{name}",
            description:
              "Retrieve detailed information about a specific UI block by its name. The name parameter is required and should match the block's name or fileName. To get the list of available blocks, use the /api/blocks endpoint.",
          },
          {
            title: "Get Block Categories",
            href: "/api/blocks/categories",
            description: "Retrieve a list of unique block categories available in the system.",
          },
          {
            title: "Get Blocks by Category",
            href: "/api/blocks/categories/{name}",
            description:
              "Retrieve a list of UI blocks that belong to a specific category. The name parameter is required and should match the desired block category. To get the list of available categories, use the /api/blocks/categories endpoint.",
          },
        ],
      },
    ],
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
    highlight: { langs, theme, noApiRoute: false },
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
    "/examples": { redirect: "/examples/cards" },
    "/blocks": { redirect: "/blocks/app-empty-state" },
    "/block-renderer": { static: true },
  },
  colorMode: { fallback: "dark", preference: "system" },

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
    workbox: {
      globIgnores: ["**/_payload.json", "**/node_modules/**"],
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
