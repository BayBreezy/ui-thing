<template>
  <div class="mx-auto max-w-sm">
    <div class="space-y-4">
      <div class="flex items-center justify-between gap-2">
        <UiLabel class="leading-6">Dual range slider with output</UiLabel>
        <output class="text-sm font-medium tabular-nums"> {{ value[0] }} - {{ value[1] }} </output>
      </div>
      <UiSlider v-model="value" aria-label="Dual range slider with output" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  const value = ref([25, 75]);
</script>
