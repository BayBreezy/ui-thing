<template>
  <div class="mx-auto max-w-sm">
    <UiAutocomplete v-model="value">
      <UiAutocompleteAnchor>
        <UiAutocompleteInput placeholder="Where are you travelling to?" />
        <UiAutocompleteCancel
          v-if="value"
          class="text-muted-foreground hover:text-foreground mr-1 inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-sm"
          aria-label="Clear"
        >
          <Icon name="lucide:x" class="size-4" />
        </UiAutocompleteCancel>
        <UiAutocompleteTrigger>
          <Icon name="lucide:chevron-down" class="text-muted-foreground size-4" />
        </UiAutocompleteTrigger>
      </UiAutocompleteAnchor>

      <UiAutocompleteContent>
        <UiAutocompleteEmpty class="p-4 text-center text-sm"
          >No destinations found</UiAutocompleteEmpty
        >
        <UiAutocompleteItem v-for="c in cities" :key="c" :value="c">
          {{ c }}
        </UiAutocompleteItem>
      </UiAutocompleteContent>
    </UiAutocomplete>
  </div>
</template>

<script lang="ts" setup>
  const value = ref("Berlin");

  const cities = [
    "Amsterdam",
    "Barcelona",
    "Berlin",
    "Copenhagen",
    "Dublin",
    "Lisbon",
    "London",
    "Madrid",
    "Paris",
    "Prague",
    "Rome",
    "Vienna",
  ];
</script>
