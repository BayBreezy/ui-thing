<template>
  <div class="flex items-center justify-center gap-2">
    <UiButton v-for="s in sizes" :key="s" :size="s" variant="outline" class="capitalize"
      >Size {{ s }}</UiButton
    >
  </div>
</template>

<script lang="ts" setup>
  const sizes = ["xs", "sm", "default", "lg"] as const;
</script>
