<template>
  <div class="flex flex-wrap items-end justify-center gap-6">
    <div v-for="s in sizes" :key="s" class="flex flex-col items-center gap-2">
      <UiCircularProgress :size="s" indeterminate />
      <span class="text-muted-foreground text-xs">{{ s }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { CircularProgressVariants } from "@/components/Ui/CircularProgress.vue";

  const sizes: NonNullable<CircularProgressVariants["size"]>[] = [
    "xs",
    "sm",
    "default",
    "lg",
    "xl",
  ];
</script>
