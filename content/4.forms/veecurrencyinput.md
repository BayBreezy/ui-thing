---
title: VeeCurrencyInput
description: A currency input component that uses the composition API provided by Vee-Validate to perform validation.
label: New
links:
  - title: Currency Input Source
    href: /components/currencyinput
    icon: lucide:circle-dollar-sign
---

## Source code

Click :SourceCodeLink{component="Vee/CurrencyInput.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add vee-currency-input
```

## Usage

### User form

In the form below, we are using the `useForm` composition function provided by Vee-Validate to handle the form submission and validation. The `useForm` composable accepts a `validationSchema` option that we can use to define our validation rules. We are using the `zod` library to define our validation rules. You can use any validation library you want as long as it is supported by Vee-Validate and can be passed to the `toTypedSchema` function.

::ShowCase{component="DocsVeeCurrencyInput"}

#code

```vue [DocsVeeCurrencyInput.vue]
<template>
  <form @submit="onSubmit" class="mx-auto max-w-md">
    <fieldset :disabled="isSubmitting" class="space-y-5">
      <UiVeeCurrencyInput label="Toys total" name="toys" hint="The cost for the baby toys" />
      <UiVeeCurrencyInput label="Food total" name="food" hint="The cost for the baby food" />
      <UiButton type="submit"> Pay now </UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { z } from "zod";

  const schema = z.object({
    toys: z
      .number({
        invalid_type_error: "The toys total must be a number",
        required_error: "The toys total is required",
      })
      .nonnegative()
      .min(50),
    food: z
      .number({
        invalid_type_error: "The food total must be a number",
        required_error: "The food total is required",
      })
      .nonnegative()
      .min(150),
  });

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const onSubmit = handleSubmit(async (values) => {
    const promise = () => new Promise((resolve) => setTimeout(resolve, 3000));
    useSonner.promise(promise, {
      loading: "Making payment...",
      success: (d) => "Payment successful!",
      error: (e) => "Error! Your information could not be sent to our servers!",
    });
  });
</script>
```

::
