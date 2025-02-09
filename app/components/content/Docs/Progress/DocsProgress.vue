<template>
  <div class="mx-auto flex w-full max-w-sm flex-col gap-2">
    <div class="flex justify-between text-sm">
      <span>Progress</span>
      <span class="text-muted-foreground">{{ value }}%</span>
    </div>
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
