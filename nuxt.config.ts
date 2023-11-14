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
  modules: [
    "@vueuse/nuxt",
    "@nuxtjs/tailwindcss",
    "radix-vue/nuxt",
    "nuxt-icon",
    "@samk-dev/nuxt-vcalendar",
    "@vee-validate/nuxt",
    "nuxt-lodash",
    "@nuxt/content",
    "@nuxtjs/color-mode",
    "@morev/vue-transitions/nuxt",
    "@kevinmarrec/nuxt-pwa",
    "@nuxtseo/module",
    "nuxt-simple-robots",
    "nuxt-simple-sitemap",
    "nuxt-og-image",
  ],
  build: {
    transpile: ["vue-sonner"],
  },
  typescript: {
    shim: false,
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
  tailwindcss: { exposeConfig: true },
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
        { src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/pdfmake.min.js" },
        { src: "https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/vfs_fonts.min.js" },
      ],
    },
  },
  content: {
    documentDriven: true,
    navigation: { fields: ["icon"] },
    markdown: {
      toc: { depth: 4, searchDepth: 4 },
    },
    highlight: {
      preload: [
        "diff",
        "json",
        "js",
        "ts",
        "css",
        "shell",
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
  colorMode: {
    classSuffix: "",
  },
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
      colorScheme: "dark",
      description,
      title,
    },
  },
});
