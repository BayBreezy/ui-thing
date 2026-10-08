<template>
  <div class="mx-auto max-w-sm">
    <UiAutocomplete v-model="query">
      <UiAutocompleteAnchor>
        <Icon name="lucide:search" class="text-muted-foreground mr-2 size-4 shrink-0" />
        <UiAutocompleteInput placeholder="Search the docs..." />
        <UiAutocompleteCancel
          v-if="query"
          class="text-muted-foreground hover:text-foreground inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-sm"
          aria-label="Clear search"
        >
          <Icon name="lucide:x" class="size-4" />
        </UiAutocompleteCancel>
      </UiAutocompleteAnchor>

      <!-- With `hide-when-empty` the popup stays hidden until there is at least one match. -->
      <UiAutocompleteContent hide-when-empty>
        <UiAutocompleteEmpty />
        <UiAutocompleteItem v-for="p in pages" :key="p" :value="p">
          {{ p }}
        </UiAutocompleteItem>
      </UiAutocompleteContent>
    </UiAutocomplete>
  </div>
</template>

<script lang="ts" setup>
  const query = ref("");

  const pages = [
    "Installation",
    "Introduction",
    "Theming",
    "Dark mode",
    "Accordion",
    "Alert dialog",
    "Autocomplete",
    "Button",
    "Calendar",
    "Checkbox",
    "Dialog",
    "Dropdown menu",
    "Form validation",
    "Input",
    "Select",
    "Tabs",
  ];
</script>
