<template>
  <div class="flex w-full flex-wrap justify-center gap-4">
    <UiChip v-for="s in sizes" :key="s" :size="s">
      <UiButton size="icon-sm" variant="outline">
        <Icon name="lucide:inbox" class="size-5" />
      </UiButton>
    </UiChip>
  </div>
</template>

<script lang="ts" setup>
  const sizes = ["3xs", "2xs", "xs", "sm", "md", "lg", "xl", "2xl", "3xl"] as const;
</script>
