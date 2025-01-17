<template>
  <div>
    <NuxtPwaManifest />
    <NuxtLoadingIndicator color="hsl(var(--primary))" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UiToastToaster />
    <UiVueSonner />
  </div>
</template>

<script lang="ts" setup>
  useServerSeoMeta({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    keywords: SITE_KEYWORDS.join(", "),
    ogTitle: SITE_TITLE,
    ogDescription: SITE_DESCRIPTION,
    twitterTitle: SITE_TITLE,
    twitterDescription: SITE_DESCRIPTION,
    twitterCard: "summary_large_image",
  });

  useHead({
    htmlAttrs: { lang: "en" },
    link: [{ rel: "icon", type: "image/png", href: "/icon.png" }],
  });
</script>
