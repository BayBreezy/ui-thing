<template>
  <div class="flex flex-wrap items-center justify-center gap-5">
    <UiFancyIcon
      v-for="s in sizes"
      :key="s"
      :size="s"
      type="dark"
      color="primary"
      icon="lucide:mail"
    />
  </div>
</template>

<script lang="ts" setup>
  const sizes = ["sm", "md", "lg", "xl"] as const;
</script>
