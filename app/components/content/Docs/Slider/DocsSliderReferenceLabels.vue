<template>
  <div class="mx-auto max-w-sm">
    <div class="space-y-4">
      <UiLabel>Slider with reference labels</UiLabel>
      <div>
        <UiSlider v-model="value" :min="5" :max="35" aria-label="Slider with reference labels" />
        <div
          class="mt-4 flex w-full items-center justify-between gap-1 text-xs font-medium text-muted-foreground"
          aria-hidden="true"
        >
          <span v-for="size in [5, 20, 35]" :key="size">{{ size }} GB</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const value = ref([15]);
</script>
