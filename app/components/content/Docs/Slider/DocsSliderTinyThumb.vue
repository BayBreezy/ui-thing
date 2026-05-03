<template>
  <div class="mx-auto max-w-sm">
    <div class="space-y-4">
      <UiLabel>Slider with tiny thumb</UiLabel>
      <UiSlider
        v-model="value"
        class="[&_[data-slot=slider-thumb]]:border-background [&_[data-slot=slider-thumb]]:bg-primary [&_[data-slot=slider-thumb]]:h-6 [&_[data-slot=slider-thumb]]:w-2.5 [&_[data-slot=slider-thumb]]:border-[3px] [&_[data-slot=slider-thumb]]:ring-offset-0"
        aria-label="Slider with tiny thumb"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  const value = ref([50]);
</script>
