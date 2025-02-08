<template>
  <div class="flex justify-center gap-3">
    <UiLoader v-for="color in colors" :key="color" :class="[color, 'size-6']" />
  </div>
</template>

<script lang="ts" setup>
  const colors = [
    "text-primary",
    "text-destructive",
    "text-emerald-500",
    "text-rose-500",
    "text-sky-500",
    "text-violet-500",
    "text-amber-500",
  ];
</script>
