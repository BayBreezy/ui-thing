import { existsSync, readFileSync } from "node:fs";

export default defineNuxtConfig({
  devtools: { enabled: true },
  vite: {
    vue: {
      script: {
        fs: {
          fileExists(file: string) {
            return existsSync(file);
          },
          readFile(file: string) {
            return readFileSync(file, "utf-8");
          },
        },
      },
    },
  },
  modules: [
    "@vueuse/nuxt",
    "@nuxtjs/tailwindcss",
    "radix-vue/nuxt",
    "nuxt-icon",
    "@samk-dev/nuxt-vcalendar",
  ],
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
