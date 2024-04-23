---
title: Autocomplete
description: Choose from a list of suggested values with full keyboard support.
label: New
links:
  - title: Radix-Vue
    href: https://www.radix-vue.com/components/combobox.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://www.radix-vue.com/components/combobox.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Autocomplete"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add autocomplete
```

## Usage

::ShowCase{component="DocsAutoCompleteBasic"}

#code

```vue [DocsAutoCompleteBasic.vue]
<template>
  <div>
    <UiAutocomplete>
      <UiAutocompleteAnchor>
        <UiAutocompleteInput />
        <UiAutocompleteTrigger>
          <Icon name="lucide:chevron-down" class="size-4 text-muted-foreground" />
        </UiAutocompleteTrigger>
      </UiAutocompleteAnchor>

      <UiAutocompleteContent>
        <UiAutocompleteEmpty />
        <UiAutocompleteGroup>
          <UiAutocompleteLabel>Fruits</UiAutocompleteLabel>
          <template v-for="(f, i) in fruits" :key="f">
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
```

::
