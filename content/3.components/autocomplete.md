---
title: Autocomplete
description: Choose from a list of suggested values with full keyboard support.
links:
  - title: Reka UI
    href: https://reka-ui.com/docs/components/combobox.html
    icon: "simple-icons:rekaui"
  - title: API Reference
    href: https://reka-ui.com/docs/components/combobox.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Autocomplete"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add autocomplete"}

## Usage

### Basic

::prose-show-case

:DocsAutoCompleteBasic

#code

<!-- automd:file src="../../app/components/content/Docs/Autocomplete/DocsAutoCompleteBasic.vue" code lang="vue" -->

```vue [DocsAutoCompleteBasic.vue]
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
```

<!-- /automd -->

::

### Objects

::prose-show-case

:DocsAutoCompleteObjects

#code

<!-- automd:file src="../../app/components/content/Docs/Autocomplete/DocsAutoCompleteObjects.vue" code lang="vue" -->

```vue [DocsAutoCompleteObjects.vue]
<template>
  <div class="mx-auto max-w-sm">
    <UiAutocomplete v-model="selected">
      <UiAutocompleteAnchor>
        <UiAutocompleteInput :display-value="displaySelected" placeholder="Select a car..." />
        <UiAutocompleteTrigger>
          <Icon name="lucide:chevron-down" class="text-muted-foreground size-4" />
        </UiAutocompleteTrigger>
      </UiAutocompleteAnchor>

      <UiAutocompleteContent>
        <UiAutocompleteEmpty
          class="flex items-center justify-center p-4 text-center text-sm font-medium text-pretty"
        />
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

::prose-show-case

:DocsAutoCompleteMultiple

#code

<!-- automd:file src="../../app/components/content/Docs/Autocomplete/DocsAutoCompleteMultiple.vue" code lang="vue" -->

```vue [DocsAutoCompleteMultiple.vue]
<template>
  <div class="mx-auto max-w-sm">
    <UiAutocomplete v-model="selectedPeople" multiple>
      <UiAutocompleteAnchor>
        <UiAutocompleteInput :display-value="displaySelected" placeholder="Select people..." />
        <UiAutocompleteTrigger>
          <Icon name="lucide:chevron-down" class="text-muted-foreground size-4" />
        </UiAutocompleteTrigger>
      </UiAutocompleteAnchor>

      <UiAutocompleteContent>
        <UiAutocompleteEmpty
          class="flex items-center justify-center p-4 text-center text-sm font-medium text-pretty"
        />
        <UiAutocompleteGroup>
          <UiAutocompleteLabel>People</UiAutocompleteLabel>
          <template v-for="(p, i) in people" :key="i">
            <UiAutocompleteItem class="mb-1 last:mb-0" :value="p" icon="lucide:check">{{
              p.name
            }}</UiAutocompleteItem>
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

  type Person = (typeof people)[number];

  const displaySelected = (p: any) => {
    if (!p) return;
    if (p && p.length == 1) return p[0]?.name;
    return p.map((i: Person) => i.name).join(", ");
  };
</script>
```

<!-- /automd -->

::

### Async

This example shows how you can search for a value and make a call to your API for the results.

::prose-show-case

:DocsAutoCompleteAsync

#code

<!-- automd:file src="../../app/components/content/Docs/Autocomplete/DocsAutoCompleteAsync.vue" code lang="vue" -->

```vue [DocsAutoCompleteAsync.vue]
<template>
  <div class="mx-auto max-w-sm">
    <UiAutocomplete v-model="selectedUser" ignore-filter>
      <UiAutocompleteAnchor>
        <UiAutocompleteInput
          v-model="search"
          :display-value="displaySelected"
          placeholder="Search for user..."
        />
        <UiAutocompleteTrigger :disabled="loading">
          <Icon v-if="!loading" name="lucide:chevron-down" class="text-muted-foreground size-4" />
          <Icon
            v-else
            name="lucide:loader-circle"
            class="text-muted-foreground size-4 animate-spin"
          />
        </UiAutocompleteTrigger>
      </UiAutocompleteAnchor>

      <UiAutocompleteContent>
        <UiAutocompleteEmpty
          v-if="!users.length"
          class="flex items-center justify-center p-4 text-center text-sm font-medium text-pretty"
        >
          <p v-if="search && loading">Please wait while we get your users</p>
          <p v-else>Please enter the name of a user to start searching</p>
        </UiAutocompleteEmpty>
        <UiAutocompleteGroup v-else>
          <UiAutocompleteLabel>Results</UiAutocompleteLabel>
          <template v-for="(p, i) in users" :key="i">
            <UiAutocompleteItem
              class="mb-1 last:mb-0"
              :disabled="p.disabled"
              :value="p"
              icon="lucide:check"
            >
              <div class="flex items-center gap-3">
                <UiAvatar class="size-7" :src="p.image" />
                <p :class="[p.disabled ? 'line-through' : '']">{{ p.name }}</p>
              </div>
            </UiAutocompleteItem>
          </template>
        </UiAutocompleteGroup>
      </UiAutocompleteContent>
    </UiAutocomplete>
  </div>
</template>

<script lang="ts" setup>
  import { faker } from "@faker-js/faker";
  import { promiseTimeout } from "@vueuse/core";

  type Person = {
    id: number;
    name: string;
    image: string;
    disabled?: boolean;
  };

  const loading = ref(false);
  const search = ref<string>();
  const selectedUser = ref<Person>();
  const users = ref<Person[]>([]);

  const getUsers = async () => {
    // if user list is empty, make API call
    if (users.value.length) return;
    // simulate making an api call
    await promiseTimeout(2000);
    //  create 6 random users. Acts as response from API call
    users.value = Array.from({ length: 6 }, (_, i) => ({
      id: i + 1,
      name: faker.person.fullName(),
      image: faker.image.avatar(),
      disabled: faker.datatype.boolean(0.5),
    }));
  };

  watchDebounced(
    search,
    async () => {
      loading.value = true;
      await getUsers();
      loading.value = false;
    },
    { debounce: 300 }
  );

  const displaySelected = (p: Person) => {
    return p?.name;
  };
</script>
```

<!-- /automd -->

::
