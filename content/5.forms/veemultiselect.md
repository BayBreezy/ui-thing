---
title: VeeMultiSelect
description: Displays a list of options for the user to pick from.
links:
  - title: NPM Package
    href: https://www.npmjs.com/package/@vueform/multiselect#demo
    icon: lucide:form-input
  - title: API Reference
    href: https://www.npmjs.com/package/@vueform/multiselect#basic-props
    icon: icon-park-solid:api
---

## Source code

Click :SourceCodeLink{component="Vee/Multiselect.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add vee-multi-select
```

## Usage

You can visit the [VueForm Multiselect page](https://www.npmjs.com/package/@vueform/multiselect#demo) for more information on how to use this component.

### Objects

::ShowCase

:DocsVeeMultiselectObject

#code

```vue [DocsVeeMultiselectObject.vue]
<template>
  <form @submit="submit" class="mx-auto max-w-md">
    <UiVeeMultiSelect
      formLabel="Hero"
      valueProp="id"
      label="name"
      placeholder="Select a hero"
      :options="options"
      name="heroObject"
    />
    <UiButton type="submit" class="mt-5"> Submit </UiButton>
  </form>
</template>

<script setup lang="ts">
  import { z } from "zod";

  const options = [
    { name: "Batman", id: 1, disabled: true },
    { name: "Robin", id: 2 },
    { name: "Joker", id: 3 },
    { name: "Catwoman", id: 4 },
    { name: "Bane", id: 5 },
    { name: "Scarecrow", id: 6 },
    { name: "Riddler", id: 7 },
    { name: "Two-Face", id: 8 },
    { name: "Penguin", id: 9 },
    { name: "Poison Ivy", id: 10 },
    { name: "Harley Quinn", id: 11 },
  ];

  const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(
      z.object({
        heroObject: z.number({
          required_error: "Please select a hero",
          invalid_type_error: "Please select a hero",
        }),
      })
    ),
  });

  const submit = handleSubmit(
    async (values) => {
      useSonner.success("Awesome!", {
        description: `You selected ${options.find((o) => o.id === values.heroObject)?.name}`,
      });
    },
    ({ errors }) => {
      // This is how you would scroll to the first error in the form
      const firstError = Object.keys(errors)[0];
      const el: HTMLInputElement | null = document.querySelector(`[name="${firstError}"]`);
      el?.scrollIntoView({
        behavior: "smooth",
      });
      el?.focus();

      useSonner.error("No hero :(", {
        description: "Please select a hero",
      });
    }
  );
</script>
```

::

### Groups

::ShowCase

:DocsVeeMultiselectGroup

#code

```vue [DocsVeeMultiselectGroup.vue]
<template>
  <div class="mx-auto max-w-md">
    <form @submit="submit">
      <UiVeeMultiSelect
        name="hero"
        formLabel="Hero"
        groups
        placeholder="Select a hero"
        :options="options"
      />
      <UiButton type="submit" class="mt-4"> Submit </UiButton>
    </form>
  </div>
</template>

<script setup lang="ts">
  import { z } from "zod";

  const options = [
    {
      label: "DC",
      options: ["Batman", "Robin", "Joker"],
    },
    {
      label: "Marvel",
      options: ["Spiderman", "Iron Man", "Captain America"],
    },
  ];

  const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(
      z.object({
        hero: z.string({
          required_error: "Please select a hero",
          invalid_type_error: "Please select a hero",
        }),
      })
    ),
  });

  const submit = handleSubmit(
    async (values) => {
      useSonner.success("Awesome!", {
        description: `You selected ${values.hero}`,
      });
    },
    ({ errors }) => {
      // This is how you would scroll to the first error in the form
      const firstError = Object.keys(errors)[0];
      const el: HTMLInputElement | null = document.querySelector(`[name="${firstError}"]`);
      el?.scrollIntoView({
        behavior: "smooth",
      });
      el?.focus();

      useSonner.error("No hero :(", {
        description: "Please select a hero",
      });
    }
  );
</script>
```

::

### Search

::ShowCase

:DocsVeeMultiselectSearch

#code

```vue [DocsVeeMultiselectSearch.vue]
<template>
  <div class="mx-auto max-w-md">
    <UiVeeMultiSelect
      searchable
      formLabel="Hero"
      valueProp="id"
      label="name"
      placeholder="Search heroes..."
      :options="options"
    />
  </div>
</template>

<script setup lang="ts">
  const options = [
    { name: "Batman", id: 1, disabled: true },
    { name: "Robin", id: 2 },
    { name: "Joker", id: 3 },
    { name: "Catwoman", id: 4 },
    { name: "Bane", id: 5 },
    { name: "Scarecrow", id: 6 },
    { name: "Riddler", id: 7 },
    { name: "Two-Face", id: 8 },
    { name: "Penguin", id: 9 },
    { name: "Poison Ivy", id: 10 },
    { name: "Harley Quinn", id: 11 },
  ];
</script>
```

::
