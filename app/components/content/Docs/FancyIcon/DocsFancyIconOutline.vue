<template>
  <div class="flex flex-col gap-6">
    <template v-for="c in colors" :key="c">
      <div class="flex items-start justify-center gap-8">
        <template v-for="s in sizes" :key="s">
          <UiFancyIcon theme="outline" :color="c" :size="s" :icon />
        </template>
      </div>
    </template>
  </div>
</template>
<script lang="ts" setup>
  const icon = "lucide:circle-check";
  const sizes = ["sm", "md", "lg", "xl"] as const;
  const colors = ["gray", "primary", "error", "warning", "success", "info"] as const;
</script>
