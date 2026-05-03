<template>
  <div class="flex flex-wrap items-center justify-center gap-6">
    <div
      v-for="size in sizes"
      :key="size"
      class="bg-background relative flex items-center justify-center overflow-hidden rounded-lg border"
      :class="{
        'size-[180px]': size === 'sm',
        'size-[240px]': size === 'md',
        'size-[300px]': size === 'lg',
      }"
    >
      <span
        class="text-muted-foreground pointer-events-none relative z-10 text-sm font-semibold tracking-widest uppercase"
      >
        {{ size }}
      </span>
      <UiBgPatternGrid :size="size" class="absolute inset-0 m-auto" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  const sizes = ["sm", "md", "lg"] as const;
</script>
