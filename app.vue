<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtPage />
    <UIToastToaster />
    <UIVueSonner />
  </div>
</template>

<script lang="ts" setup>
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
