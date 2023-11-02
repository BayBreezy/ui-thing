---
title: VeeInput
description: An input component that uses the composition API provided by Vee-Validate to perform validation.
links:
  - title: Input Source
    href: /components/input
    icon: lucide:text-cursor-input
---

## Source code

Click :SourceCodeLink{component="Vee/Input.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add vee-input
```

## Usage

### User form

In the form below, we are using the `useForm` composition function provided by Vee-Validate to handle the form submission and validation. The `useForm` composable accepts a `validationSchema` option that we can use to define our validation rules. We are using the `zod` library to define our validation rules. You can use any validation library you want as long as it is supported by Vee-Validate and can be passed to the `toTypedSchema` function.

::ShowCase{component="DocsVeeInput"}

#code

```vue [DocsVeeInput.vue]
<template>
  <form @submit="onSubmit" class="mx-auto max-w-md">
    <fieldset :disabled="isSubmitting" class="space-y-5">
      <UIVeeInput label="Full name" name="name" hint="This will be displayed to the public" />
      <UIVeeInput label="Email" name="email" type="email" />
      <UIVeeInput label="Age" name="age" type="number" />
      <UIButton type="submit"> Submit </UIButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { z } from "zod";

  const schema = z.object({
    name: z.string({ required_error: "Required" }).min(3, { message: "Min 3 characters" }),
    age: z
      .number({
        coerce: true,
        required_error: "Required",
        invalid_type_error: "Please enter a number",
      })
      .int("Only numbers are allowed")
      .min(18, "You must be at least 18 years old")
      .max(120, "You must be less than 120 years old"),
    email: z.string({ required_error: "Required" }).email("Please enter a valid email"),
  });

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const onSubmit = handleSubmit(async (values) => {
    const promise = () => new Promise((resolve) => setTimeout(resolve, 3000));
    useSonner.promise(promise, {
      loading: "Sending information to our servers...",
      success: (d) => "We updated your information.",
      error: (e) => "Error! Your information could not be sent to our servers!",
    });
  });
</script>
```

::
