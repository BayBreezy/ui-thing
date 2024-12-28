<template>
  <ClientOnly>
    <component :is="params.component" :class="[params.containerClass]" />
    <div class="fixed bottom-5 right-5 z-20 rounded-md border bg-background">
      <ThemePopover />
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
  definePageMeta({ layout: "blank" });
  const params = useUrlSearchParams();

  useSeoMeta({
    title: params?.component || "Blocks",
    titleTemplate: `%s | ${SITE_TITLE}`,
    description: "Copy and paste blocks of code into your project.",
    keywords: SITE_KEYWORDS.join(", "),
    ogTitle: params?.component || "Blocks",
    ogDescription: "Copy and paste blocks of code into your project.",
    twitterTitle: params?.component || "Blocks",
    twitterDescription: "Copy and paste blocks of code into your project.",
    twitterCard: "summary_large_image",
  });

  defineOgImageComponent("UIThing", {
    title: params?.component || "Blocks",
    description: "Copy and paste blocks of code into your project.",
  });
</script>
