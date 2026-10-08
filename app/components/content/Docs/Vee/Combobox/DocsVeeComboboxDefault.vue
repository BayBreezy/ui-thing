<template>
  <form class="mx-auto max-w-sm space-y-4">
    <UiVeeCombobox
      v-model="framework"
      name="framework"
      label="Favorite framework"
      label-hint="Optional"
      hint="Starts with a default value. Use the clear button to remove it."
      :options="frameworks"
      clearable
    />
    <p class="text-muted-foreground text-sm">
      Current value:
      <span class="text-foreground font-medium">{{ framework ?? "(empty)" }}</span>
    </p>
  </form>
</template>

<script lang="ts" setup>
  const framework = ref<string | undefined>("Nuxt");

  const frameworks = ["Nuxt", "Next.js", "SvelteKit", "Astro", "Remix", "SolidStart", "Angular"];
</script>
