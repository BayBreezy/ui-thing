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

::ShowCase{component="DocsSelect"}

#code

```vue [DocsSelect.vue]
<template>
  <div class="flex justify-center">
    <UISelect v-model="option">
      <UISelectTrigger placeholder="Select an option" />
      <UISelectContent>
        <UISelectLabel>Fruits</UISelectLabel>
        <UISelectSeparator />
        <UISelectGroup>
          <UISelectItem v-for="(fruit, i) in fruits" :key="i" :value="fruit" :text="fruit" />
        </UISelectGroup>
        <UISelectSeparator />
        <UISelectLabel>Vegetables</UISelectLabel>
        <UISelectSeparator />
        <UISelectGroup>
          <UISelectItem v-for="(veg, i) in vegetables" :key="i" :value="veg" :text="veg" />
        </UISelectGroup>
      </UISelectContent>
    </UISelect>
  </div>
</template>

<script lang="ts" setup>
  const option = ref();
  const fruits = ["Apple", "Banana", "Blueberry", "Grapes", "Pineapple"];
  const vegetables = ["Aubergine", "Broccoli", "Carrot", "Courgette", "Leek"];
</script>
```

::

### Form

::ShowCase{component="DocsSelectForm"}

#code

```vue [DocsSelectForm.vue]
<template>
  <div class="flex w-full justify-center">
    <form class="w-full" @submit="onSubmit">
      <Field name="email" v-slot="{ componentField }">
        <UIFormItem label="Primary email" description="This will be shown to the public">
          <UISelect v-bind="componentField">
            <UISelectTrigger placeholder="Select primary email" />
            <UISelectContent>
              <UISelectGroup>
                <UISelectItem v-for="(e, i) in emails" :key="i" :value="e" :text="e" />
              </UISelectGroup>
            </UISelectContent>
          </UISelect>
        </UIFormItem>
      </Field>
      <div class="mt-4">
        <UIButton type="submit"> Update profile </UIButton>
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
    alert(JSON.stringify(data, null, 2));
  });
</script>
```

::
