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

<!-- automd:file src="../../app/components/content/Docs/Textarea/DocsTextarea.vue" code lang="vue" -->

```vue [DocsTextarea.vue]
<template>
  <div>
    <UiTextarea placeholder="Bio" />
  </div>
</template>
```

<!-- /automd -->

::

### Label

::ShowCase

:DocsTextareaLabel

#code

<!-- automd:file src="../../app/components/content/Docs/Textarea/DocsTextareaLabel.vue" code lang="vue" -->

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

<!-- /automd -->

::

### Form

::ShowCase

:DocsTextareaForm

#code

<!-- automd:file src="../../app/components/content/Docs/Textarea/DocsTextareaForm.vue" code lang="vue" -->

```vue [DocsTextareaForm.vue]
<template>
  <form @submit="onSubmit">
    <Field v-slot="{ componentField }" name="bio">
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

<!-- /automd -->

::

### Max Length

Restrict the number of characters that can be entered into the textarea.

::ShowCase

:DocsTextareaMaxLength

#code

<!-- automd:file src="../../app/components/content/Docs/Textarea/DocsTextareaMaxLength.vue" code lang="vue" -->

```vue [DocsTextareaMaxLength.vue]
<template>
  <div class="mx-auto flex max-w-md flex-col gap-3">
    <UiTextarea :maxlength="5" placeholder="Quick chat..." />
    <p class="text-sm text-muted-foreground">No more than 5 letters</p>
  </div>
</template>
```

<!-- /automd -->

::

### Pattern

Restrict the type of characters that can be entered into the textarea.

You don't need to use `/` at the beginning and end of the pattern as the RegExp is being created internally with the `new RegExp()` constructor.

::ShowCase

:DocsTextareaPattern

#code

<!-- automd:file src="../../app/components/content/Docs/Textarea/DocsTextareaPattern.vue" code lang="vue" -->

```vue [DocsTextareaPattern.vue]
<template>
  <div class="mx-auto flex max-w-md flex-col gap-3">
    <UiTextarea pattern="^[a-z\s]" placeholder="Say something" />
    <p class="text-sm text-muted-foreground">Only lower case letters</p>
  </div>
</template>
```

<!-- /automd -->

::
