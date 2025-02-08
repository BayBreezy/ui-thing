<template>
  <div class="flex justify-center gap-3">
    <UiLoader v-for="variant in variants" :key="variant" :icon="variant" />
  </div>
</template>

<script lang="ts" setup>
  const variants = [
    "svg-spinners:dot-revolve",
    "svg-spinners:gooey-balls-2",
    "svg-spinners:bars-scale-fade",
    "svg-spinners:270-ring-with-bg",
  ];
</script>
