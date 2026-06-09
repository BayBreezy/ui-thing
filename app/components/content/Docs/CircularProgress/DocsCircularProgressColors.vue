<template>
  <div class="flex flex-wrap items-center justify-center gap-6">
    <div v-for="c in colors" :key="c" class="flex flex-col items-center gap-2">
      <UiCircularProgress :color="c" :progress="0.65" size="lg" show-value />
      <span class="text-muted-foreground text-xs capitalize">{{ c }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { CircularProgressVariants } from "@/components/Ui/CircularProgress.vue";

  const colors: NonNullable<CircularProgressVariants["color"]>[] = [
    "default",
    "secondary",
    "success",
    "warning",
    "destructive",
  ];
</script>
