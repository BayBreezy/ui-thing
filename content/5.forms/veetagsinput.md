---
title: VeeTagsInput
description: An tags input component that uses the composition API provided by Vee-Validate to perform validation.
links:
  - title: Tags Input Source
    href: /components/tagsinput
    icon: lucide:text-cursor-input
---

## Source code

Click :SourceCodeLink{component="Vee/TagsInput.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add vee-tags-input"}

## Usage

In the form below, we are using the `useForm` composition function provided by Vee-Validate to handle the form submission and validation. The `useForm` composable accepts a `validationSchema` option that we can use to define our validation rules. We are using the `zod` library to define our validation rules. You can use any validation library you want as long as it is supported by Vee-Validate and can be passed to the `toTypedSchema` function.

::ShowCase

:DocsVeeTagsInput

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/TagsInput/DocsVeeTagsInput.vue" code lang="vue" -->

```vue [DocsVeeTagsInput.vue]
<template>
  <form class="mx-auto w-full max-w-xs" @submit="onSubmit">
    <fieldset :disabled="isSubmitting" class="grid gap-5">
      <UiVeeTagsInput
        :max="5"
        placeholder="Type a brand and press enter..."
        label="Car brands"
        name="brands"
        hint="This will be displayed to the public"
      />
      <UiButton :loading="isSubmitting" type="submit"> Submit </UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { promiseTimeout } from "@vueuse/core";
  import { array, object, string } from "yup";

  const schema = object({
    brands: array(string().label("Brand")).label("Brands").min(2).max(5).required(),
  });

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const onSubmit = handleSubmit(async (values) => {
    await promiseTimeout(2000); // Simulate a network request
    useSonner.success("Brands Submitted", {
      description: h("pre", null, JSON.stringify(values.brands, null, 2)),
    });
  });
</script>
```

<!-- /automd -->

::
