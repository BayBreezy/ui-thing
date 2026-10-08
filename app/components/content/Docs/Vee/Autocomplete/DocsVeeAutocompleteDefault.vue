<template>
  <form class="mx-auto max-w-sm space-y-4">
    <UiVeeAutocomplete
      v-model="framework"
      name="framework"
      label="Favorite framework"
      label-hint="Optional"
      hint="Starts with a default value. Clear it or type something else."
      :options="frameworks"
      open-on-focus
      clearable
    />
    <p class="text-muted-foreground text-sm">
      Current value:
      <span class="text-foreground font-medium">{{ framework || "(empty)" }}</span>
    </p>
  </form>
</template>

<script lang="ts" setup>
  const framework = ref("Nuxt");

  const frameworks = ["Nuxt", "Next.js", "SvelteKit", "Astro", "Remix", "SolidStart", "Angular"];
</script>
