<template>
  <div class="flex w-full flex-col gap-4">
    <p class="font-semibold">Range {{ rangeValue }}</p>
    <UiSlider v-model="rangeValue" :max="250" />
  </div>
</template>

<script lang="ts" setup>
  const rangeValue = ref([25, 75, 150]);
</script>
