<template>
  <UiTagGroup aria-label="Colors" class="mx-auto max-w-2xl justify-center">
    <UiTagGroupItem v-for="c in colors" :key="c" :value="c" :color="c" dot>
      {{ c }}
    </UiTagGroupItem>
  </UiTagGroup>
</template>

<script lang="ts" setup>
  const colors = [
    "primary",
    "red",
    "orange",
    "amber",
    "yellow",
    "lime",
    "green",
    "emerald",
    "teal",
    "cyan",
    "sky",
    "blue",
    "indigo",
    "violet",
    "purple",
    "fuchsia",
    "pink",
    "rose",
    "slate",
    "gray",
    "zinc",
    "neutral",
    "stone",
    "error",
    "warning",
    "success",
  ] as const;
</script>
