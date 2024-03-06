<template>
  <div>
    <ConfigProvider :use-id="useIdFunction">
      <NuxtLoadingIndicator />
      <NuxtPage />
    </ConfigProvider>
    <UiToastToaster />
    <UiVueSonner />
  </div>
</template>

<script lang="ts" setup>
  // Used to provide id's to radix components in nuxt until Vue releases a useId
  import { ConfigProvider } from "radix-vue";

  const useIdFunction = () => useId();

  useSeoMeta({
    ogImage: "/cover.png",
    twitterTitle: "UI Thing",
    twitterDescription: "UI Thing is a collection of UI components for Nuxt 3.",
    twitterImage: "/cover.png",
    twitterCard: "summary_large_image",
  });

  useHead({
    htmlAttrs: {
      lang: "en",
    },
    link: [
      {
        rel: "icon",
        type: "image/png",
        href: "/icon.png",
      },
    ],
  });
</script>
