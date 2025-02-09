<template>
  <div class="mx-auto flex w-full max-w-sm flex-col gap-2">
    <div class="flex justify-between text-sm">
      <span>{{ counter == 100 ? "Complete" : "Loading..." }}</span>
      <span class="text-muted-foreground">{{ counter }}%</span>
    </div>
    <UiProgress class="h-2 [&>div]:bg-blue-500" :model-value="counter" />
  </div>
</template>

<script lang="ts" setup>
  const { pause, counter } = useInterval(100, {
    controls: true,
  });
  watch(counter, (v) => {
    if (v === 100) pause();
  });
</script>
