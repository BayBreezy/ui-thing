<template>
  <div>
    <Heading
      title="Slider"
      subtext="An input where the user selects a value from within a given range."
      radix-link="https://www.radix-vue.com/components/slider.html"
    />

    <p class="mb-4 font-semibold">Value {{ sliderValue }}</p>
    <UISlider v-model="sliderValue" />
    <p class="my-4 font-semibold">Range {{ rangeValue }}</p>
    <UISlider v-model="rangeValue" />
  </div>
</template>

<script lang="ts" setup>
  const sliderValue = ref([50]);
  const rangeValue = ref([25, 75]);
</script>
