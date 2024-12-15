<template>
  <div>
    <UiAutocomplete>
      <UiAutocompleteAnchor>
        <UiAutocompleteInput placeholder="Select an item" />
        <UiAutocompleteTrigger>
          <Icon name="lucide:chevron-down" class="size-4 text-muted-foreground" />
        </UiAutocompleteTrigger>
      </UiAutocompleteAnchor>

      <UiAutocompleteContent>
        <UiAutocompleteEmpty />
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
