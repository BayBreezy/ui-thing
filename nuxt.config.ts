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
  ],
  typescript: {
    shim: false,
    tsConfig: {
      compilerOptions: {
        allowSyntheticDefaultImports: true,
      },
    },
  },
  tailwindcss: { exposeConfig: true },
  imports: {
    // Add tv and VariantProps to the set of auto imported modules
    imports: [
      { from: "tailwind-variants", name: "tv" },
      { from: "tailwind-variants", name: "VariantProps", type: true },
    ],
  },
  app: {
    head: {
      title: "UI Thing",
      link: [
        // Inter font
        { rel: "stylesheet", href: "https://rsms.me/inter/inter.css" },
        { rel: "preconnect", href: "https://rsms.me/" },
      ],
    },
  },
});
