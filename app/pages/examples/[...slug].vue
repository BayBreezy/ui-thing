<template>
  <div>
    <Mainnav />
    <ContentRenderer v-if="page" :value="page" />
  </div>
</template>

<script lang="ts" setup>
  definePageMeta({ layout: "blank" });
  const route = useRoute();
  const { data: page } = await useAsyncData(route.path, () => {
    return queryCollection("content").path(route.path).first();
  });

  if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: "Page not found", fatal: true });
  }

  useSeoMeta({
    title: page.value.title,
    titleTemplate: `%s | ${SITE_TITLE}`,
    description: page.value.description,
    keywords: SITE_KEYWORDS.join(", "),
    ogTitle: page.value.title,
    ogDescription: page.value.description,
    twitterTitle: page.value.title,
    twitterDescription: page.value.description,
    twitterCard: "summary_large_image",
  });
  defineOgImageComponent("UIThing", {
    title: page.value?.title,
    description: page.value?.description,
  });
</script>
