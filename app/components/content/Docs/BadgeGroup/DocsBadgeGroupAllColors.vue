<template>
  <div class="flex flex-wrap gap-3">
    <UiBadgeGroup
      v-for="c in colors"
      :key="c"
      :color="c"
      :addon-text="`${c?.[0]?.toUpperCase()}${c.slice(1)} Color`"
      theme="light"
      align="leading"
      size="md"
    >
      Check out the {{ c }} color!
    </UiBadgeGroup>
  </div>
</template>

<script lang="ts" setup>
  const colors = [
    "primary",
    "gray",
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
