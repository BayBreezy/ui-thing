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
  <UIRadioGroup>
    <UIRadioGroupItem value="default" />
    <UILabel>Default</UILabel>
  </UIRadioGroup>
</template>
```

## Usage

### Default value

::ShowCase{component="DocsRadioGroup"}

#code

```vue [DocsRadioGroup.vue]
<template>
  <div class="flex w-full justify-center">
    <UIRadioGroup defaultValue="comfortable">
      <div class="flex items-center space-x-2">
        <UIRadioGroupItem value="default" id="r1" />
        <UILabel for="r1">Default</UILabel>
      </div>
      <div class="flex items-center space-x-2">
        <UIRadioGroupItem value="comfortable" id="r2" />
        <UILabel for="r2">Comfortable</UILabel>
      </div>
      <div class="flex items-center space-x-2">
        <UIRadioGroupItem value="compact" id="r3" />
        <UILabel for="r3">Compact</UILabel>
      </div>
    </UIRadioGroup>
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
        <UIFormItem class="space-y-5">
          <p class="font-medium">What type of notifications should we send?</p>
          <UIRadioGroup v-bind="componentField">
            <UIFormItem
              hideMessage
              class="flex flex-row-reverse items-center justify-center gap-3 space-y-0"
              label="All notifications"
            >
              <UIRadioGroupItem value="all" />
            </UIFormItem>
            <UIFormItem
              hideMessage
              class="flex flex-row-reverse items-center justify-center gap-3 space-y-0"
              label="Only mentions"
            >
              <UIRadioGroupItem value="mentions" />
            </UIFormItem>
            <UIFormItem
              hideMessage
              class="flex flex-row-reverse items-center justify-center gap-3 space-y-0"
              label="Nothing"
            >
              <UIRadioGroupItem value="none" />
            </UIFormItem>
          </UIRadioGroup>
        </UIFormItem>
      </Field>
      <div class="mt-6">
        <UIButton type="submit">Update settings</UIButton>
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
    alert(JSON.stringify(values, null, 2));
  });
</script>
```

::
