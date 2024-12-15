import * as SEO from "./app/utils/seo";

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/full-calendar.css", "~/assets/css/quill.css", "~/assets/css/theme.css"],
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
    "@nuxtjs/seo",
    "@vite-pwa/nuxt",
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
  icon: { clientBundle: { scan: true, sizeLimitKb: 0 }, fetchTimeout: 2000, serverBundle: "local" },
  tailwindcss: {
    exposeConfig: true,
    editorSupport: true,
    cssPath: ["~/assets/css/tailwind.css", { injectPosition: 2 }],
  },
  experimental: {
    defaults: {
      nuxtLink: {
        prefetch: false,
        prefetchOn: {
          visibility: false,
          interaction: true,
        },
      },
    },
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
    documentDriven: true,
    navigation: { fields: ["icon", "label"] },
    markdown: {
      toc: { depth: 4, searchDepth: 4 },
    },
    highlight: {
      preload: [
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

  routeRules: {
    "/": { redirect: "/getting-started/introduction", prerender: true },
  },
  colorMode: { classSuffix: "" },

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

  sitemap: { autoLastmod: true },
  schemaOrg: { enabled: false },

  ogImage: {
    defaults: { alt: SEO.SITE_NAME },
  },
  compatibilityDate: "2024-12-01",
});
