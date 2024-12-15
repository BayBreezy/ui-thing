<template>
  <div class="flex items-center justify-center gap-2">
    <UiBadge v-for="s in sizes" :key="s" :size="s" variant="secondary">Label</UiBadge>
  </div>
</template>

<script lang="ts" setup>
  const sizes = ["sm", "md", "lg"] as const;
</script>
