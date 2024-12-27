---
title: VeeTextarea
description: An textarea component that uses the composition API provided by Vee-Validate to perform validation.
links:
  - title: Textarea Source
    href: /components/textarea
    icon: lucide:text-cursor-input
---

## Source code

Click :SourceCodeLink{component="Vee/Textarea.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add vee-textarea
```

## Usage

### Form

In the form below, we are using the `useForm` composition function provided by Vee-Validate to handle the form submission and validation. The `useForm` composable accepts a `validationSchema` option that we can use to define our validation rules. We are using the `zod` library to define our validation rules. You can use any validation library you want as long as it is supported by Vee-Validate and can be passed to the `toTypedSchema` function.

::ShowCase

:DocsVeeTextarea

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Textarea/DocsVeeTextarea.vue" code lang="vue" -->

```vue [DocsVeeTextarea.vue]
<template>
  <form class="mx-auto max-w-md" @submit="onSubmit">
    <fieldset :disabled="isSubmitting" class="space-y-5">
      <UiVeeTextarea label="First love" name="firstLove" hint="We will not share this" />
      <UiVeeTextarea
        label="First heartbreak"
        name="firstHeartbreak"
        hint="We will not share this"
      />
      <UiButton type="submit"> Save secrets </UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { z } from "zod";

  const schema = z.object({
    firstLove: z
      .string()
      .min(3, "Too short!")
      .max(50, "Too long!")
      .transform((v) => v?.trim()),
    firstHeartbreak: z.string().min(3, "Too short!").max(50, "Too long!"),
  });

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const onSubmit = handleSubmit(async (values) => {
    console.log(values);

    const promise = () => new Promise((resolve) => setTimeout(resolve, 3000));
    useSonner.promise(promise, {
      loading: "Storing your secrets...",
      success: (_) => "Your secrets are safe with us!",
      error: (_) => "Error! Your information could not be sent to our servers!",
    });
  });
</script>
```

<!-- /automd -->

::
