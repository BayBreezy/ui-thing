---
title: Autocomplete
description: Choose from a list of suggested values with full keyboard support.
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

### Basic

::ShowCase

:DocsAutoCompleteBasic

#code

<!-- automd:file src="../../app/components/content/Docs/Autocomplete/DocsAutoCompleteBasic.vue" code lang="vue" -->

```vue [DocsAutoCompleteBasic.vue]
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
```

<!-- /automd -->

::

### Objects

::ShowCase

:DocsAutoCompleteObjects

#code

<!-- automd:file src="../../app/components/content/Docs/Autocomplete/DocsAutoCompleteObjects.vue" code lang="vue" -->

```vue [DocsAutoCompleteObjects.vue]
<template>
  <div>
    <UiAutocomplete v-model="selected" :display-value="displaySelected">
      <UiAutocompleteAnchor>
        <UiAutocompleteInput placeholder="Select a car..." />
        <UiAutocompleteTrigger>
          <Icon name="lucide:chevron-down" class="size-4 text-muted-foreground" />
        </UiAutocompleteTrigger>
      </UiAutocompleteAnchor>

      <UiAutocompleteContent>
        <UiAutocompleteEmpty />
        <UiAutocompleteGroup>
          <UiAutocompleteLabel>Cars</UiAutocompleteLabel>
          <template v-for="(c, i) in cars" :key="i">
            <UiAutocompleteItem :value="c" icon="lucide:check">{{ c.name }}</UiAutocompleteItem>
          </template>
        </UiAutocompleteGroup>
      </UiAutocompleteContent>
    </UiAutocomplete>
  </div>
</template>

<script lang="ts" setup>
  const cars = [
    { name: "Audi", value: "audi" },
    { name: "BMW", value: "bmw" },
    { name: "Chevrolet", value: "chevrolet" },
    { name: "Dodge", value: "dodge" },
    { name: "Ford", value: "ford" },
    { name: "GMC", value: "gmc" },
    { name: "Honda", value: "honda" },
    { name: "Infiniti", value: "infiniti" },
    { name: "Jeep", value: "jeep" },
    { name: "Kia", value: "kia" },
    { name: "Lexus", value: "lexus" },
  ];

  const selected = ref(cars[2]);

  const displaySelected = (car: any) => car.name;
</script>
```

<!-- /automd -->

::

### Multiple

::ShowCase

:DocsAutoCompleteMultiple

#code

<!-- automd:file src="../../app/components/content/Docs/Autocomplete/DocsAutoCompleteMultiple.vue" code lang="vue" -->

```vue [DocsAutoCompleteMultiple.vue]
<template>
  <div>
    <UiAutocomplete
      v-model="selectedPeople"
      multiple
      :display-value="displaySelected"
      :filter-function="filtered"
    >
      <UiAutocompleteAnchor>
        <UiAutocompleteInput placeholder="Select people..." />
        <UiAutocompleteTrigger>
          <Icon name="lucide:chevron-down" class="size-4 text-muted-foreground" />
        </UiAutocompleteTrigger>
      </UiAutocompleteAnchor>

      <UiAutocompleteContent>
        <UiAutocompleteEmpty />
        <UiAutocompleteGroup>
          <UiAutocompleteLabel>People</UiAutocompleteLabel>
          <template v-for="(p, i) in people" :key="i">
            <UiAutocompleteItem :value="p" icon="lucide:check">{{ p.name }}</UiAutocompleteItem>
          </template>
        </UiAutocompleteGroup>
      </UiAutocompleteContent>
    </UiAutocomplete>
  </div>
</template>

<script lang="ts" setup>
  const people = [
    { id: 1, name: "Durward Reynolds" },
    { id: 2, name: "Kenton Towne" },
    { id: 3, name: "Therese Wunsch" },
    { id: 4, name: "Benedict Kessler" },
    { id: 5, name: "Katelyn Rohan" },
  ];
  const selectedPeople = ref([people[0], people[1]]);

  const displaySelected = (p: any) => {
    console.log(p);
    return p;
  };

  function filtered(list: any[], searchTerm: string) {
    return list.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }
</script>
```

<!-- /automd -->

::
