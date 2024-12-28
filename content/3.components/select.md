---
title: Select
description: Displays a list of options for the user to pick from—triggered by a button.
links:
  - title: Radix-Vue
    href: https://www.radix-vue.com/components/select.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://www.radix-vue.com/components/select.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Select"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add select
```

## Usage

### Basic example

::ShowCase

:DocsSelect

#code

<!-- automd:file src="../../app/components/content/Docs/Select/DocsSelect.vue" code lang="vue" -->

```vue [DocsSelect.vue]
<template>
  <div class="flex justify-center">
    <UiSelect v-model="option">
      <UiSelectTrigger placeholder="Select an option" />
      <UiSelectContent>
        <UiSelectLabel>Fruits</UiSelectLabel>
        <UiSelectSeparator />
        <UiSelectGroup>
          <UiSelectItem v-for="(fruit, i) in fruits" :key="i" :value="fruit" :text="fruit" />
        </UiSelectGroup>
        <UiSelectSeparator />
        <UiSelectLabel>Vegetables</UiSelectLabel>
        <UiSelectSeparator />
        <UiSelectGroup>
          <UiSelectItem v-for="(veg, i) in vegetables" :key="i" :value="veg" :text="veg" />
        </UiSelectGroup>
      </UiSelectContent>
    </UiSelect>
  </div>
</template>

<script lang="ts" setup>
  const option = ref();
  const fruits = ["Apple", "Banana", "Blueberry", "Grapes", "Pineapple"];
  const vegetables = ["Aubergine", "Broccoli", "Carrot", "Courgette", "Leek"];
</script>
```

<!-- /automd -->

::

### Form

::ShowCase

:DocsSelectForm

#code

<!-- automd:file src="../../app/components/content/Docs/Select/DocsSelectForm.vue" code lang="vue" -->

```vue [DocsSelectForm.vue]
<template>
  <div class="flex w-full justify-center">
    <form class="w-full" @submit="onSubmit">
      <Field v-slot="{ componentField }" name="email">
        <UiFormItem label="Primary email" description="This will be shown to the public">
          <UiSelect v-bind="componentField">
            <UiSelectTrigger placeholder="Select primary email" />
            <UiSelectContent>
              <UiSelectGroup>
                <UiSelectItem v-for="(e, i) in emails" :key="i" :value="e" :text="e" />
              </UiSelectGroup>
            </UiSelectContent>
          </UiSelect>
        </UiFormItem>
      </Field>
      <div class="mt-4">
        <UiButton type="submit"> Update profile </UiButton>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
  import { z } from "zod";

  const emails = ["m@support.com", "m@google.com", "m@example.com"];

  const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(
      z.object({
        email: z
          .string({
            required_error: "Please select an email",
          })
          .email(),
      })
    ),
  });

  const onSubmit = handleSubmit((data) => {
    toast({
      title: "Profile updated",
      description: h("pre", { class: "p-2" }, JSON.stringify(data, null, 2)),
      variant: "success",
    });
  });
</script>
```

<!-- /automd -->

::
