<template>
  <div class="flex flex-col items-start gap-4">
    <UiBadgeGroup
      v-for="s in sizes"
      :key="s"
      :size="s"
      addon-text="New feature"
      theme="light"
      align="leading"
    >
      We've just released a new feature
    </UiBadgeGroup>
  </div>
</template>

<script lang="ts" setup>
  const sizes = ["md", "lg"] as const;
</script>
