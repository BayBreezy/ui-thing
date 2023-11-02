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
    "@formkit/auto-animate/nuxt",
    "@morev/vue-transitions/nuxt",
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
      title: "UI Thing",
      titleTemplate: "%s - UI Thing",
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
});
