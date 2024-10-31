<template>
  <div class="flex items-center justify-center gap-3">
    <UiButton v-for="s in sizes" :key="s" :size="s" variant="outline">
      <Icon name="lucide:activity" class="size-4" />
    </UiButton>
  </div>
</template>

<script lang="ts" setup>
  const sizes = ["icon-xs", "icon-sm", "icon"] as const;
</script>
