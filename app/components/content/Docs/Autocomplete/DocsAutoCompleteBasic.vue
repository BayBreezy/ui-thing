<template>
  <div class="mx-auto max-w-sm space-y-3">
    <UiAutocomplete v-model="value">
      <UiAutocompleteAnchor>
        <UiAutocompleteInput placeholder="Search for a fruit" />
        <UiAutocompleteTrigger>
          <Icon name="lucide:chevron-down" class="text-muted-foreground size-4" />
        </UiAutocompleteTrigger>
      </UiAutocompleteAnchor>

      <UiAutocompleteContent>
        <UiAutocompleteEmpty
          class="flex items-center justify-center p-4 text-center text-sm font-medium text-pretty"
        >
          No suggestions. Keep typing, any text is fine.
        </UiAutocompleteEmpty>
        <UiAutocompleteGroup>
          <UiAutocompleteLabel>Fruits</UiAutocompleteLabel>
          <UiAutocompleteItem v-for="f in fruits" :key="f" :value="f">
            {{ f }}
          </UiAutocompleteItem>
        </UiAutocompleteGroup>
      </UiAutocompleteContent>
    </UiAutocomplete>

    <p class="text-muted-foreground text-sm">
      Value: <span class="text-foreground font-medium">{{ value || "(empty)" }}</span>
    </p>
  </div>
</template>

<script lang="ts" setup>
  const value = ref("");

  const fruits = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Elderberry",
    "Fig",
    "Grape",
    "Honeydew",
    "Kiwi",
    "Lemon",
    "Mango",
    "Nectarine",
    "Orange",
    "Papaya",
    "Quince",
    "Raspberry",
    "Strawberry",
    "Tangerine",
    "Watermelon",
  ];
</script>
