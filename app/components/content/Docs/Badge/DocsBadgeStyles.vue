<template>
  <div class="mx-auto max-w-2xl space-y-6">
    <div v-for="v in variants" :key="v" class="space-y-2">
      <p class="text-muted-foreground text-xs font-medium tracking-wide uppercase">{{ v }}</p>
      <div class="flex flex-wrap gap-2">
        <UiBadge v-for="c in colors" :key="c" :variant="v" :color="c" size="md">{{ c }}</UiBadge>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const variants = ["soft", "solid", "outline", "modern"] as const;
  const colors = [
    "gray",
    "primary",
    "red",
    "orange",
    "yellow",
    "green",
    "teal",
    "blue",
    "indigo",
    "purple",
    "pink",
    "mauve",
    "olive",
  ] as const;
</script>
