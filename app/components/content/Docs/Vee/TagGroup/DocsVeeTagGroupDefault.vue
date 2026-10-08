<template>
  <form class="mx-auto max-w-md space-y-4">
    <UiVeeTagGroup
      v-model="selected"
      name="languages"
      label="Languages"
      label-hint="Optional"
      hint="Starts with two languages selected."
      :options="languages"
      variant="outline"
      color="teal"
    />
    <p class="text-muted-foreground text-sm">
      Current value:
      <span class="text-foreground font-medium">{{ selected.join(", ") || "(empty)" }}</span>
    </p>
  </form>
</template>

<script lang="ts" setup>
  const selected = ref(["TypeScript", "Go"]);

  const languages = ["TypeScript", "JavaScript", "Python", "Go", "Rust", "Ruby", "Kotlin"];
</script>
