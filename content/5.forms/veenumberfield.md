---
title: VeeNumberField
description: An number field component that uses the composition API provided by Vee-Validate to perform validation.
links:
  - title: Number Field Source
    href: /components/number-field
    icon: lucide:text-cursor-input
---

## Source code

Click :SourceCodeLink{component="Vee/NumberField.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add vee-number-field"}

## Usage

### User form

In the form below, we are using the `useForm` composition function provided by Vee-Validate to handle the form submission and validation. The `useForm` composable accepts a `validationSchema` option that we can use to define our validation rules. We are using the `yup` library to define our validation rules. You can use any validation library you want as long as it is supported by Vee-Validate.

::prose-show-case

:DocsVeeNumberField

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/NumberField/DocsVeeNumberField.vue" code lang="vue" -->

```vue [DocsVeeNumberField.vue]
<template>
  <form class="mx-auto w-full max-w-xs" @submit="submit">
    <fieldset :disabled="isSubmitting" class="grid grid-cols-1 gap-5">
      <UiVeeNumberField
        :min="0"
        label="Payment"
        name="payment"
        :format-options="{
          style: 'currency',
          currency: 'USD',
        }"
      >
        <UiNumberFieldInput placeholder="15" />
        <UiNumberFieldDecrement class="border-l" />
        <UiNumberFieldIncrement class="border-l" />
      </UiVeeNumberField>
      <UiButton :loading="isSubmitting" type="submit">Submit</UiButton>
    </fieldset>
  </form>
</template>
<script lang="ts" setup>
  import { promiseTimeout } from "@vueuse/core";
  import { number, object } from "yup";

  const { handleSubmit, resetForm, isSubmitting } = useForm({
    validationSchema: object({
      payment: number().required().min(0).label("Payment").typeError("Payment is required."),
    }),
  });

  const submit = handleSubmit(async () => {
    await promiseTimeout(2000);
    useSonner.success("Record updated", {
      description: "Your payment has been successfully updated.",
    });
    resetForm();
  });
</script>
```

<!-- /automd -->

::
