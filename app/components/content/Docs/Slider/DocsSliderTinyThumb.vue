<template>
  <div class="mx-auto max-w-sm">
    <div class="space-y-4">
      <UiLabel>Slider with tiny thumb</UiLabel>
      <UiSlider
        v-model="value"
        class="[&_div[role=slider]]:h-6 [&_div[role=slider]]:w-2.5 [&_div[role=slider]]:border-[3px] [&_div[role=slider]]:border-background [&_div[role=slider]]:bg-primary [&_div[role=slider]]:ring-offset-0"
        aria-label="Slider with tiny thumb"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  const value = ref([50]);
</script>
