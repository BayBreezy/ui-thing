<template>
  <div class="mx-auto max-w-sm">
    <div class="space-y-4">
      <UiLabel>Slider with solid thumb</UiLabel>
      <UiSlider
        v-model="value"
        class="[&>:first-child>span]:opacity-70 [&_div[role=slider]]:bg-primary"
        aria-label="Slider with solid thumb"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  const value = ref([50]);
</script>
