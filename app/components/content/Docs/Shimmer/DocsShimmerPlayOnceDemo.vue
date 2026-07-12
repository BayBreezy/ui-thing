<script setup lang="ts">
  import { ref } from "vue";

  const key = ref(0);
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <p :key="key" class="shimmer text-muted-foreground shimmer-duration-1100 shimmer-once text-sm">
      Generating response&hellip;
    </p>
    <UiButton variant="outline" size="sm" @click="key++"> Replay </UiButton>
  </div>
</template>
