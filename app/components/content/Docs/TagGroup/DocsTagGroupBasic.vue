<template>
  <div class="mx-auto max-w-md space-y-4">
    <!-- The group needs an accessible name. Removing only works when `@remove` is listened to. -->
    <UiTagGroup aria-label="Skills" color="indigo" @remove="remove">
      <UiTagGroupItem v-for="tag in tags" :key="tag" :value="tag" removable>
        {{ tag }}
      </UiTagGroupItem>
    </UiTagGroup>

    <div class="flex items-center gap-3">
      <UiButton size="sm" variant="outline" :disabled="tags.length === all.length" @click="reset">
        Reset
      </UiButton>
      <p class="text-muted-foreground text-sm">
        Click the x, or focus a tag and press Delete or Backspace.
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const all = ["Vue", "Nuxt", "TypeScript", "Tailwind", "Reka UI"];
  const tags = ref([...all]);

  // The group does not remove tags itself, update your own list
  const remove = (values: unknown[]) => {
    tags.value = tags.value.filter((t) => !values.includes(t));
  };

  const reset = () => (tags.value = [...all]);
</script>
