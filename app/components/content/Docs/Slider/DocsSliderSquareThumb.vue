<template>
  <div class="mx-auto max-w-sm">
    <div class="space-y-4">
      <UiLabel>Slider with square thumb</UiLabel>
      <UiSlider
        v-model="value"
        :step="10"
        :max="100"
        class="[&>div[role=slider]]:rounded"
        aria-label="Slider with square thumb"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  const value = ref([50]);
</script>
