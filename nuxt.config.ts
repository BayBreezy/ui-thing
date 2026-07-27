import * as SEO from "./app/utils/seo";

export default defineNuxtConfig({
  extends: ["@baybreezy/docd"],
  devtools: { enabled: true },
  nitro: { experimental: { asyncContext: true } },
  modules: [
    "@yuta-inoue-ph/nuxt-vcalendar",
    "@vee-validate/nuxt",
    "@nuxt/eslint",
    "nuxt-swiper",
    "v-wave/nuxt",
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
          {
            title: "Get Changelog Entries",
            href: "/api/changelog",
            description:
              "Retrieve changelog entries sorted by date (newest first). Supports search, category, tag, breaking, limit, and offset query parameters.",
          },
          {
            title: "Get Changelog Entry by Slug",
            href: "/api/changelog/{slug}",
            description: "Retrieve a single changelog entry by its slug.",
          },
          {
            title: "Get Changelog Categories",
            href: "/api/changelog/categories",
            description: "Retrieve the list of changelog categories with entry counts.",
          },
        ],
      },
    ],
    full: {
      title: "Complete Documentation for UI Thing",
      description: "The complete documentation including all content",
    },
  },
  content: {
    experimental: {
      sqliteConnector: "native",
    },
  },

  vcalendar: {
    calendarOptions: {
      masks: {
        weekdays: "WW",
      },
    },
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

  routeRules: {
    "/getting-started": { redirect: "/getting-started/introduction" },
    "/getting-started/changelog": { redirect: "/changelog" },
    "/magic/**": { redirect: "https://inspira-ui.com" },
    "/prose/**": { redirect: "https://docd.uithing.com/prose/callout" },
    "/goodies": { redirect: "/goodies/border-beam" },
    "/examples": { redirect: "/examples/cards" },
    "/blocks": { redirect: "/blocks/app-empty-state" },
    "/block-renderer": { static: true },
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
  compatibilityDate: "latest",
});
