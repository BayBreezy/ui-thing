<template>
  <div class="flex items-center justify-center">
    <UiCircularProgress :progress="progress" show-value size="lg" />
  </div>
</template>

<script lang="ts" setup>
  const progress = ref(0.3);

  useIntervalFn(() => {
    progress.value = parseFloat(Math.random().toFixed(2));
  }, 2000);
</script>
