---
title: Input
description: Displays a form input field or a component that looks like an input field.
---

## Source code

Click :SourceCodeLink{component="Input.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add input
```

## Usage

### Email

::ShowCase

:DocsInputEmail

#code

```vue [DocsInputEmail.vue]
<template>
  <div class="flex w-full items-center justify-center">
    <UiInput type="email" placeholder="Email" />
  </div>
</template>
```

::

### Label

::ShowCase

:DocsInputLabel

#code

```vue [DocsInputLabel.vue]
<template>
  <div class="flex w-full items-center justify-center">
    <div>
      <UiLabel for="picture">Picture</UiLabel>
      <UiInput id="picture" type="file" />
    </div>
  </div>
</template>
```

::

### Form

::ShowCase

:DocsInputForm

#code

```vue [DocsInputForm.vue]
<template>
  <div class="mx-auto flex w-full max-w-lg items-center justify-center">
    <form @submit="onSubmit" class="w-full space-y-4">
      <Field name="username" v-slot="{ componentField }">
        <UiFormItem label="Username" description="Others will be able to see this">
          <UiInput v-bind="componentField" />
        </UiFormItem>
      </Field>
      <div>
        <UiButton type="submit">Update</UiButton>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
  import { z } from "zod";

  const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(
      z.object({
        username: z
          .string({
            required_error: "Username is required",
          })
          .min(3, "Username must be at least 3 characters long")
          .max(20, "Username must be at most 20 characters long"),
      })
    ),
  });

  const onSubmit = handleSubmit((values) => {
    alert(JSON.stringify(values, null, 2));
  });
</script>
```

::
