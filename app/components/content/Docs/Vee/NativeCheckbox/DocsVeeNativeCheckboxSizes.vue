<template>
  <div class="flex flex-wrap justify-center gap-3">
    <UiVeeNativeCheckbox v-for="size in sizes" :key="size" :size="size" indeterminate />
  </div>
</template>

<script lang="ts" setup>
  const sizes = ["sm", "md"] as const;
</script>
