---
title: Textarea
description: Displays a form textarea or a component that looks like a textarea.
links:
  - title: Textarea Docs
    href: https://www.w3schools.com/tags/tag_textarea.asp
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Textarea.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add textarea
```

## Usage

### Basic example

::ShowCase

:DocsTextarea

#code

```vue [DocsTextarea.vue]
<template>
  <div>
    <UiTextarea placeholder="Bio" />
  </div>
</template>
```

::

### Label

::ShowCase

:DocsTextareaLabel

#code

```vue [DocsTextareaLabel.vue]
<template>
  <div>
    <div class="mt-7 grid w-full items-center gap-2.5">
      <UiLabel for="contact-message">Why are you here today?</UiLabel>
      <UiTextarea id="contact-message" />
    </div>
  </div>
</template>
```

::

### Form

::ShowCase

:DocsTextareaForm

#code

```vue [DocsTextareaForm.vue]
<template>
  <form @submit="onSubmit">
    <Field name="bio" v-slot="{ componentField }">
      <UiFormItem label="Tell us about yourself" description="Feel free to @mention others">
        <UiTextarea v-bind="componentField" />
      </UiFormItem>
    </Field>
    <div class="mt-5">
      <UiButton type="submit">Submit</UiButton>
    </div>
  </form>
</template>

<script lang="ts" setup>
  import { z } from "zod";

  const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(
      z.object({
        bio: z
          .string({
            required_error: "Please tell us about yourself",
          })
          .min(10, "At least 10 characters please")
          .max(1000),
      })
    ),
  });

  const onSubmit = handleSubmit((values) => {
    toast({
      title: "Success!",
      description: h("pre", null, JSON.stringify(values, null, 2)),
      variant: "success",
      duration: 5000,
    });
  });
</script>
```

::
