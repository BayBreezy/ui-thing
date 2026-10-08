<template>
  <div class="mx-auto max-w-md space-y-6">
    <UiVeeTagGroup
      v-for="v in variants"
      :key="v"
      :name="`variant-${v}`"
      :label="v"
      :variant="v"
      :options="options"
      color="violet"
    />
  </div>
</template>

<script lang="ts" setup>
  const variants = ["soft", "solid", "outline", "modern"] as const;
  const options = ["Alpha", "Beta", "Gamma", "Delta"];
</script>
