---
title: Input
description: Displays a form input field or a component that looks like an input field.
links:
  - title: Input Docs
    href: https://www.w3schools.com/tags/tag_input.asp
    icon: "icon-park-solid:api"
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

<!-- automd:file src="../../app/components/content/Docs/Input/DocsInputEmail.vue" code lang="vue" -->

```vue [DocsInputEmail.vue]
<template>
  <div class="flex w-full items-center justify-center">
    <UiInput type="email" placeholder="Email" />
  </div>
</template>
```

<!-- /automd -->

::

### Label

::ShowCase

:DocsInputLabel

#code

<!-- automd:file src="../../app/components/content/Docs/Input/DocsInputLabel.vue" code lang="vue" -->

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

<!-- /automd -->

::

### Form

::ShowCase

:DocsInputForm

#code

<!-- automd:file src="../../app/components/content/Docs/Input/DocsInputForm.vue" code lang="vue" -->

```vue [DocsInputForm.vue]
<template>
  <div class="mx-auto flex w-full max-w-lg items-center justify-center">
    <form class="w-full space-y-4" @submit="onSubmit">
      <Field v-slot="{ componentField }" name="username">
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

<!-- /automd -->

::

### Max Length

Restrict the number of characters that can be entered into the input field.

::ShowCase

:DocsInputMaxLength

#code

<!-- automd:file src="../../app/components/content/Docs/Input/DocsInputMaxLength.vue" code lang="vue" -->

```vue [DocsInputMaxLength.vue]
<template>
  <div class="mx-auto max-w-md">
    <div class="flex w-full flex-col gap-3">
      <UiInput :maxlength="5" placeholder="Enter username" />
      <p class="text-sm text-muted-foreground">No more than 5 characters</p>
    </div>
  </div>
</template>
```

<!-- /automd -->

::

### Pattern

Restrict the type of characters that can be entered into the input field.

You don't need to use `/` at the beginning and end of the pattern as the RegExp is being created internally with the `new RegExp()` constructor.

::ShowCase

:DocsInputPattern

#code

<!-- automd:file src="../../app/components/content/Docs/Input/DocsInputPattern.vue" code lang="vue" -->

```vue [DocsInputPattern.vue]
<template>
  <div class="mx-auto max-w-md">
    <div class="flex w-full flex-col gap-3">
      <UiInput pattern="[^\s]" placeholder="Enter username" />
      <p class="text-sm text-muted-foreground">No spaces can be entered</p>
    </div>
  </div>
</template>
```

<!-- /automd -->

::
