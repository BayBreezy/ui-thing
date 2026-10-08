<template>
  <div class="mx-auto max-w-sm space-y-6">
    <UiVeeAutocomplete
      name="search"
      label="Search"
      icon="lucide:search"
      placeholder="Search for a component..."
      :options="components"
      empty-text="No components found"
      clearable
    />
    <UiVeeAutocomplete
      name="location"
      label="Location"
      icon="lucide:map-pin"
      placeholder="Where to?"
      :options="locations"
      show-trigger
    />
  </div>
</template>

<script lang="ts" setup>
  const components = [
    "Accordion",
    "Alert",
    "Autocomplete",
    "Avatar",
    "Badge",
    "Button",
    "Calendar",
    "Card",
    "Checkbox",
    "Dialog",
    "Input",
    "Select",
    "Tabs",
  ];

  const locations = ["Lisbon", "Madrid", "Paris", "Rome", "Vienna"];
</script>
