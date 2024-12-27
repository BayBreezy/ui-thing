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

```bash
npx ui-thing@latest add vee-number-field
```

## Usage

### User form

In the form below, we are using the `useForm` composition function provided by Vee-Validate to handle the form submission and validation. The `useForm` composable accepts a `validationSchema` option that we can use to define our validation rules. We are using the `yup` library to define our validation rules. You can use any validation library you want as long as it is supported by Vee-Validate.

::ShowCase

:DocsVeeNumberField

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/NumberField/DocsVeeNumberField.vue" code lang="vue" -->

```vue [DocsVeeNumberField.vue]
<template>
  <div class="flex w-full items-center justify-center">
    <form @submit="submit">
      <fieldset class="grid gap-5">
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
        <div>
          <UiButton type="submit">Submit</UiButton>
        </div>
      </fieldset>
    </form>
  </div>
</template>
<script lang="ts" setup>
  import { number, object } from "yup";

  const { handleSubmit, resetForm } = useForm({
    validationSchema: object({
      payment: number().required().min(0).label("Payment").typeError("Payment is required."),
    }),
  });

  const submit = handleSubmit(async () => {
    const promise = () => new Promise((resolve) => setTimeout(resolve, 3000));
    useSonner.promise(promise, {
      loading: "Updating records...",
      success: (_) => {
        resetForm();
        return "We updated your information.";
      },
      error: (_) => "Error! Your information could not be sent to our servers!",
    });
  });
</script>
```

<!-- /automd -->

::
