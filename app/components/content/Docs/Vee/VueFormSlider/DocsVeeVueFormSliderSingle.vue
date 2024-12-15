<template>
  <div class="mx-auto max-w-md">
    <UiVeeVueFormSlider v-model="value" />
  </div>
</template>

<script lang="ts" setup>
  const value = ref(20);
</script>
