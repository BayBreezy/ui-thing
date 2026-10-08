<template>
  <div class="mx-auto max-w-2xl space-y-6">
    <div v-for="v in variants" :key="v" class="space-y-2">
      <p class="text-muted-foreground text-xs font-medium tracking-wide uppercase">{{ v }}</p>
      <!-- `color` and `variant` set on the group are the defaults for every tag -->
      <UiTagGroup :aria-label="`${v} tags`" :variant="v">
        <UiTagGroupItem v-for="c in colors" :key="c" :value="c" :color="c">
          {{ c }}
        </UiTagGroupItem>
      </UiTagGroup>
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
  ] as const;
</script>
