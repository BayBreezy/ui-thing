<template>
  <div class="mx-auto max-w-sm">
    <div class="space-y-4">
      <UiLabel class="justify-center">Vertical slider</UiLabel>
      <div class="flex h-40 justify-center">
        <UiSlider v-model="value" :max="10" orientation="vertical" aria-label="Vertical slider" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const value = ref([5]);
</script>
