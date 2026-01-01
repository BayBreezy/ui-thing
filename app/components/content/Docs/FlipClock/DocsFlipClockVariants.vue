<template>
  <div class="flex flex-col gap-6">
    <div class="grid gap-4 md:grid-cols-2">
      <div v-for="variant in variants" :key="variant" class="space-y-2">
        <p class="text-sm text-muted-foreground">Variant: {{ variant }}</p>
        <UiFlipClock size="sm" :variant="variant" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const variants = [
    "default",
    "secondary",
    "destructive",
    "outline",
    "muted",
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
  ] as const;
</script>
