---
title: VeeCurrencyInput
description: A currency input component that uses the composition API provided by Vee-Validate to perform validation.
links:
  - title: Currency Input Source
    href: /components/currencyinput
    icon: lucide:circle-dollar-sign
---

## Source code

Click :SourceCodeLink{component="Vee/CurrencyInput.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add vee-currency-input"}

## Usage

### User form

In the form below, we are using the `useForm` composition function provided by Vee-Validate to handle the form submission and validation. The `useForm` composable accepts a `validationSchema` option that we can use to define our validation rules. We are using the `yup` library to define our validation rules. You can use any validation library you want as long as it is supported by Vee-Validate and can be passed to the `toTypedSchema` function.

::ShowCase

:DocsVeeCurrencyInput

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/CurrencyInput/DocsVeeCurrencyInput.vue" code lang="vue" -->

```vue [DocsVeeCurrencyInput.vue]
<template>
  <form class="mx-auto max-w-md" @submit="onSubmit">
    <fieldset :disabled="isSubmitting" class="space-y-5">
      <UiVeeCurrencyInput
        placeholder="234"
        label="Toys total"
        name="toys"
        hint="The cost for the baby toys"
      />
      <UiVeeCurrencyInput
        placeholder="567"
        label="Food total"
        name="food"
        hint="The cost for the baby food"
      />
      <UiButton :loading="isSubmitting" type="submit"> Pay now </UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { promiseTimeout } from "@vueuse/core";
  import { number, object } from "yup";

  const schema = object({
    toys: number().required().label("Toys total").min(50),
    food: number().required().label("Food total").min(150),
  });

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const onSubmit = handleSubmit(async (_) => {
    await promiseTimeout(2000);
    useSonner.success("Payment successful", {
      description: "Your payment was processed successfully! ",
    });
  });
</script>
```

<!-- /automd -->

::
