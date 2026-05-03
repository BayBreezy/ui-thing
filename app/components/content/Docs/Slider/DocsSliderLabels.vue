<template>
  <div class="mx-auto max-w-sm">
    <div class="space-y-4">
      <UiLabel>Slider with labels</UiLabel>
      <div>
        <span
          class="text-muted-foreground mb-3 flex w-full items-center justify-between gap-2 text-xs font-medium"
          aria-hidden="true"
        >
          <span>Low</span>
          <span>High</span>
        </span>
        <UiSlider v-model="value" :step="10" aria-label="Slider with labels" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const value = ref([50]);
</script>
