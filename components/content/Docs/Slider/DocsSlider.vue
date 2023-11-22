<template>
  <div class="flex w-full flex-col gap-4">
    <p class="font-semibold">Value {{ sliderValue }}</p>
    <UiSlider v-model="sliderValue" />
  </div>
</template>

<script lang="ts" setup>
  const sliderValue = ref([50]);
</script>
