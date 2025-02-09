<template>
  <div class="flex flex-wrap justify-center gap-3">
    <UiVeeNativeCheckbox v-for="color in colors" :key="color" :color="color" indeterminate />
  </div>
</template>

<script lang="ts" setup>
  const colors = [
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
  ] as const;
</script>
