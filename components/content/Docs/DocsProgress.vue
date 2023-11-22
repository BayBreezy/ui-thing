<template>
  <div class="flex w-full justify-center">
    <UiProgress v-model="value" />
  </div>
</template>

<script lang="ts" setup>
  const value = ref(10);

  useIntervalFn(() => {
    // set value to a random number between 0 and 100
    value.value = Math.floor(Math.random() * 100);
  }, 3000);
</script>
