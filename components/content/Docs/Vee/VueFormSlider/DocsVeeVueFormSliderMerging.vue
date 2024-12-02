<template>
  <div class="mx-auto max-w-md">
    <UiVeeVueFormSlider v-model="value" :merge="10" />
  </div>
</template>

<script lang="ts" setup>
  const value = ref([20, 30, 40]);
</script>
