<template>
  <div class="mx-auto max-w-sm">
    <UiAutocomplete v-model="value">
      <UiAutocompleteAnchor>
        <UiAutocompleteInput placeholder="Search for a technology" />
        <UiAutocompleteTrigger>
          <Icon name="lucide:chevron-down" class="text-muted-foreground size-4" />
        </UiAutocompleteTrigger>
      </UiAutocompleteAnchor>

      <UiAutocompleteContent>
        <UiAutocompleteEmpty class="p-4 text-center text-sm">Nothing found</UiAutocompleteEmpty>
        <UiAutocompleteGroup v-for="group in groups" :key="group.label">
          <UiAutocompleteLabel>{{ group.label }}</UiAutocompleteLabel>
          <UiAutocompleteItem
            v-for="item in group.items"
            :key="item.name"
            :value="item.name"
            :disabled="item.disabled"
          >
            {{ item.name }}
            <span v-if="item.disabled" class="text-muted-foreground ml-auto text-xs">Soon</span>
          </UiAutocompleteItem>
        </UiAutocompleteGroup>
      </UiAutocompleteContent>
    </UiAutocomplete>
  </div>
</template>

<script lang="ts" setup>
  const value = ref("");

  const groups = [
    {
      label: "Frameworks",
      items: [{ name: "Nuxt" }, { name: "Next.js" }, { name: "SvelteKit" }, { name: "Astro" }],
    },
    {
      label: "Libraries",
      items: [
        { name: "Vue" },
        { name: "React" },
        { name: "Svelte" },
        { name: "Solid", disabled: true },
      ],
    },
    {
      label: "Tooling",
      items: [
        { name: "Vite" },
        { name: "Vitest" },
        { name: "Bun" },
        { name: "Turbopack", disabled: true },
      ],
    },
  ];
</script>
