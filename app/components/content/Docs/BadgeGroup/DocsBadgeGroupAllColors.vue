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
  import { badgeColors } from "~/utils/badge-colors";

  // The semantic aliases (`error`, `warning` and `success`) have their own example below
  const colors = badgeColors.filter((c) => !["error", "warning", "success"].includes(c));
</script>
