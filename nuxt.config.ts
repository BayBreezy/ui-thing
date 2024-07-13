const author = "Behon Baker";
const description = "UI Thing is a collection of UI components for Nuxt 3.";
const lang = "en";
const title = "UI Thing";
const themeColor = "#111827";
const twitterCard = "summary_large_image";
const twitterCreator = "@iAm_BayBreezy";
const url = process.env.PUBLIC_URL;

export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/full-calendar.css", "~/assets/css/quill.css"],

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
    "@kevinmarrec/nuxt-pwa",
    "@nuxtjs/seo",
    "@nuxt/eslint",
    "nuxt-swiper",
    "v-wave/nuxt",
    "@nuxt/image",
    "@nuxt/icon",
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

  tailwindcss: {
    exposeConfig: true,
    editorSupport: true,
    cssPath: ["~/assets/css/tailwind.css", { injectPosition: "last" }],
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
      title,
      titleTemplate: "%s - UI Thing",
      script: [
        // Add pdfmake scripts for DataTables.net export buttons
        { src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/pdfmake.min.js", defer: true },
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.9/vfs_fonts.min.js",
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
    "/": { redirect: "/getting-started/introduction" },
  },

  colorMode: { classSuffix: "" },

  pwa: {
    meta: {
      author,
      description,
      lang,
      name: title,
      ogDescription: description,
      ogSiteName: title,
      ogTitle: title,
      ogType: "website",
      ogUrl: url,
      theme_color: themeColor,
      ogImage: "/cover.png",
      title,
      twitterCard,
      twitterCreator,
    },
  },

  site: {
    url,
    name: title,
    description,
    defaultLocale: lang,
    identity: { type: "Person" },
    indexable: true,
    twitter: twitterCreator,
  },

  sitemap: { autoLastmod: true },

  ogImage: {
    defaults: {
      alt: title,
    },
  },

  compatibilityDate: "2024-07-09",
});
