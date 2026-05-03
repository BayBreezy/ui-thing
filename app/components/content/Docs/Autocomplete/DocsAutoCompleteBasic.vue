<template>
  <div class="mx-auto max-w-sm">
    <UiAutocomplete>
      <UiAutocompleteAnchor>
        <UiAutocompleteInput placeholder="Select an item" />
        <UiAutocompleteTrigger>
          <Icon name="lucide:chevron-down" class="text-muted-foreground size-4" />
        </UiAutocompleteTrigger>
      </UiAutocompleteAnchor>

      <UiAutocompleteContent>
        <UiAutocompleteEmpty
          class="flex items-center justify-center p-4 text-center text-sm font-medium text-pretty"
        />
        <UiAutocompleteGroup>
          <UiAutocompleteLabel>Fruits</UiAutocompleteLabel>
          <template v-for="f in fruits" :key="f">
            <UiAutocompleteItem :value="f" icon="lucide:check">{{ f }}</UiAutocompleteItem>
          </template>
        </UiAutocompleteGroup>
      </UiAutocompleteContent>
    </UiAutocomplete>
  </div>
</template>

<script lang="ts" setup>
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
    "Ugli fruit",
    "Vanilla bean",
    "Watermelon",
    "Ximenia caffra",
    "Yellow passion fruit",
    "Zucchini",
  ];
</script>
