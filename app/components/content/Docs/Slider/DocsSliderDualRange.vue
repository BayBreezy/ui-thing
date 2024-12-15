<template>
  <div class="mx-auto max-w-sm">
    <div class="space-y-4">
      <UiLabel>Dual range slider</UiLabel>
      <UiSlider v-model="value" :step="10" aria-label="Dual range slider" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  const value = ref([25, 75]);
</script>
