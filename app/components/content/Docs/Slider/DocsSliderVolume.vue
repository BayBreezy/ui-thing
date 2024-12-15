<template>
  <div class="mx-auto max-w-sm">
    <div class="space-y-3">
      <div class="flex items-center justify-between gap-2">
        <UiLabel class="leading-6">Volume</UiLabel>
        <output class="text-sm font-medium tabular-nums">{{ value[0] }}</output>
      </div>
      <div class="flex items-center gap-2">
        <Icon name="lucide:volume-x" class="size-4 shrink-0 opacity-60" aria-hidden="true" />
        <UiSlider v-model="value" aria-label="Volume slider" />
        <Icon name="lucide:volume-2" class="size-4 shrink-0 opacity-60" aria-hidden="true" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const value = ref([25]);
</script>
