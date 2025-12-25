<template>
  <div class="flex items-start justify-center gap-3">
    <template v-for="s in sizes" :key="s">
      <UiFancyIcon theme="modern-neue" :size="s" :icon />
    </template>
  </div>
</template>
<script lang="ts" setup>
  const icon = "lucide:circle-check";
  const sizes = ["sm", "md", "lg", "xl"] as const;
</script>
