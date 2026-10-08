<template>
  <div class="mx-auto max-w-md space-y-4">
    <form class="flex gap-2" @submit.prevent="add">
      <UiInput v-model="draft" placeholder="Add a tag and press Enter" aria-label="New tag" />
      <UiButton type="submit" variant="outline">Add</UiButton>
    </form>

    <!-- Selectable and removable: Delete removes every selected tag when the focused one is selected -->
    <UiTagGroup
      v-model="selected"
      aria-label="Tags"
      selection-mode="multiple"
      variant="solid"
      @remove="remove"
    >
      <UiTagGroupItem v-for="t in tags" :key="t.name" :value="t.name" :color="t.color" removable>
        {{ t.name }}
      </UiTagGroupItem>
    </UiTagGroup>

    <p v-if="!tags.length" class="text-muted-foreground text-sm">No tags left.</p>
    <p v-else class="text-muted-foreground text-sm">
      Select several tags, then press Delete or Backspace to remove them together.
    </p>
  </div>
</template>

<script lang="ts" setup>
  const palette = [
    "red",
    "orange",
    "amber",
    "green",
    "teal",
    "blue",
    "indigo",
    "purple",
    "pink",
  ] as const;

  const tags = ref<{ name: string; color: (typeof palette)[number] }[]>([
    { name: "urgent", color: "red" },
    { name: "frontend", color: "blue" },
    { name: "bug", color: "orange" },
    { name: "docs", color: "teal" },
  ]);
  const selected = ref<string[]>([]);
  const draft = ref("");

  const add = () => {
    const name = draft.value.trim();
    if (!name || tags.value.some((t) => t.name === name)) return;
    tags.value.push({ name, color: palette[tags.value.length % palette.length]! });
    draft.value = "";
  };

  const remove = (values: unknown[]) => {
    tags.value = tags.value.filter((t) => !values.includes(t.name));
  };
</script>
