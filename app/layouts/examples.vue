<template>
  <div>
    <Mainnav />
    <slot />
  </div>
</template>

<script lang="ts" setup>
  const { page } = useContent();
  defineOgImageComponent("UIThing", {
    title: page.value.title,
    description: page.value.description,
  });
</script>
