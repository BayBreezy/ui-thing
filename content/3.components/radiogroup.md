---
title: Radio Group
description: A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.
links:
  - title: Radix-Vue
    href: https://www.radix-vue.com/components/radio-group.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://www.radix-vue.com/components/radio-group.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="RadioGroup"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add radio-group
```

## Anatomy

```vue
<template>
  <UiRadioGroup>
    <UiRadioGroupItem value="default" />
    <UiLabel>Default</UiLabel>
  </UiRadioGroup>
</template>
```

## Usage

### Default value

::ShowCase{component="DocsRadioGroup"}

#code

```vue [DocsRadioGroup.vue]
<template>
  <div class="flex w-full justify-center">
    <UiRadioGroup defaultValue="comfortable">
      <div class="flex items-center space-x-2">
        <UiRadioGroupItem value="default" id="r1" />
        <UiLabel for="r1">Default</UiLabel>
      </div>
      <div class="flex items-center space-x-2">
        <UiRadioGroupItem value="comfortable" id="r2" />
        <UiLabel for="r2">Comfortable</UiLabel>
      </div>
      <div class="flex items-center space-x-2">
        <UiRadioGroupItem value="compact" id="r3" />
        <UiLabel for="r3">Compact</UiLabel>
      </div>
    </UiRadioGroup>
  </div>
</template>
```

::

### Form

::ShowCase{component="DocsRadioGroupForm"}

#code

```vue [DocsRadioGroupForm.vue]
<template>
  <div class="flex w-full justify-center">
    <form @submit="onSubmit">
      <Field name="type" v-slot="{ componentField }">
        <UiFormItem class="space-y-5">
          <p class="font-medium">What type of notifications should we send?</p>
          <UiRadioGroup v-bind="componentField">
            <UiFormItem
              hideMessage
              class="flex flex-row-reverse items-center justify-center gap-3 space-y-0"
              label="All notifications"
            >
              <UiRadioGroupItem value="all" />
            </UiFormItem>
            <UiFormItem
              hideMessage
              class="flex flex-row-reverse items-center justify-center gap-3 space-y-0"
              label="Only mentions"
            >
              <UiRadioGroupItem value="mentions" />
            </UiFormItem>
            <UiFormItem
              hideMessage
              class="flex flex-row-reverse items-center justify-center gap-3 space-y-0"
              label="Nothing"
            >
              <UiRadioGroupItem value="none" />
            </UiFormItem>
          </UiRadioGroup>
        </UiFormItem>
      </Field>
      <div class="mt-6">
        <UiButton type="submit">Update settings</UiButton>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
  import { z } from "zod";

  const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(
      z.object({
        type: z.enum(["all", "mentions", "none"], {
          required_error: "You need to select a notification type.",
        }),
      })
    ),
  });

  const onSubmit = handleSubmit((values) => {
    toast({
      title: "Settings updated",
      description: h("pre", { class: "p-2" }, JSON.stringify(values, null, 2)),
      variant: "success",
    });
  });
</script>
```

::
