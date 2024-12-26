<template>
  <div>
    <Mainnav />
    <ContentRenderer v-if="page" :value="page" />
  </div>
</template>

<script lang="ts" setup>
  const route = useRoute();
  const { data: page } = await useAsyncData(route.path, () => {
    return queryCollection("content").path(route.path).first();
  });
  defineOgImageComponent("UIThing", {
    title: page.value?.title,
    description: page.value?.description,
  });
</script>
