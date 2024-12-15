<template>
  <div class="flex justify-center gap-6">
    <UiVeeCheckbox
      v-for="framework in frameworks"
      :key="framework"
      class="[&_button]:border-border"
      :label="framework"
    />
  </div>
</template>

<script lang="ts" setup>
  const frameworks = ["Vue", "Nuxt", "Svelte"];
</script>
