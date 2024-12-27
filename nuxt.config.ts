import { createResolver } from "@nuxt/kit";

import * as SEO from "./app/utils/seo";

const { resolve } = createResolver(import.meta.url);

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    "~/assets/css/full-calendar.css",
    "~/assets/css/quill.css",
    "~/assets/css/theme.css",
    "~/assets/css/tippy.css",
  ],
  future: { compatibilityVersion: 4 },
  vite: {
    optimizeDeps: {
      include: [
        "vue-use-active-scroll",
        "date-fns",
        "@unovis/ts",
        "vee-validate",
        "@vee-validate/zod",
        "zod",
        "v-calendar",
      ],
    },
  },

  modules: [
    "@vueuse/nuxt",
    "@nuxtjs/tailwindcss",
    "radix-vue/nuxt",
    "@samk-dev/nuxt-vcalendar",
    "@vee-validate/nuxt",
    "@nuxt/content",
    "@nuxtjs/color-mode",
    "@morev/vue-transitions/nuxt",
    "@nuxt/eslint",
    "nuxt-swiper",
    "v-wave/nuxt",
    "@nuxt/image",
    "@nuxt/icon",
    "@nuxt/fonts",
    "@vite-pwa/nuxt",
    "nuxt-og-image",
    (_, nuxt) => {
      nuxt.hook("components:dirs", (dirs) => {
        dirs.unshift({
          path: resolve("./app/components/content"),
          pathPrefix: false,
          prefix: "",
          global: true,
        });
      });
    },
  ],

  build: { transpile: ["vue-sonner", "shiki"] },

  typescript: {
    tsConfig: {
      compilerOptions: {
        allowSyntheticDefaultImports: true,
      },
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
    fetchTimeout: 2000,
    serverBundle: "local",
  },
  tailwindcss: {
    exposeConfig: true,
    editorSupport: true,
    cssPath: ["~/assets/css/tailwind.css", { injectPosition: 2 }],
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
      "vaul-drawer-wrapper": "",
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

  content: {
    build: {
      pathMeta: {},
      markdown: {
        toc: { depth: 4, searchDepth: 4 },
        highlight: {
          langs: [
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
            "typescript",
            "javascript",
          ],
          theme: {
            default: "material-theme-palenight",
            dark: "one-dark-pro",
          },
        },
      },
    },
  },

  routeRules: {
    "/": { redirect: "/getting-started/introduction" },
    "/getting-started": { redirect: "/getting-started/introduction" },
    "/components": { redirect: "/components/accordion" },
    "/examples": { redirect: "/examples/cards" },
    "/blocks": { redirect: "/blocks/app-empty-state" },
  },
  colorMode: { classSuffix: "", fallback: "dark", preference: "system" },

  pwa: {
    client: { installPrompt: "" },
    includeAssets: ["favicon.ico", "robots.txt"],
    registerType: "autoUpdate",
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
      width: 1380,
      height: 700,
      screenshot: {
        colorScheme: "dark",
        height: 880,
        width: 1400,
      },
    },
  },
  compatibilityDate: "2024-12-01",
});
