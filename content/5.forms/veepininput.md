---
title: VeePinInput
description: A Pin Input component that uses the composition API provided by Vee-Validate to perform validation.
links:
  - title: Pin Input Source
    href: /components/pininput
    icon: lucide:text-cursor-input
---

## Source code

Click :SourceCodeLink{component="Vee/PinInput.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add vee-pin-input"}

## Usage

### User form

In the form below, we are using the `useForm` composition function provided by Vee-Validate to handle the form submission and validation. The `useForm` composable accepts a `validationSchema` option that we can use to define our validation rules. We are using the `zod` library to define our validation rules. You can use any validation library you want as long as it is supported by Vee-Validate and can be passed to the `toTypedSchema` function.

::ShowCase

:DocsVeePinInput

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/PinInput/DocsVeePinInput.vue" code lang="vue" -->

```vue [DocsVeePinInput.vue]
<template>
  <form @submit="onSubmit">
    <fieldset :disabled="isSubmitting" class="mx-auto grid w-fit max-w-xs grid-cols-1 gap-5">
      <UiVeePinInput :input-count="6" name="otp" label="Enter your 2FA code below" otp />
      <UiButton :loading="isSubmitting" type="submit"> Submit </UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { promiseTimeout } from "@vueuse/core";
  import { array, object, string } from "yup";

  const schema = object({
    otp: array()
      .label("OTP")
      .typeError("Please enter a valid code")
      .min(1, "Please enter a valid code")
      .length(6, "Code must be exactly 6 characters long")
      .required()
      .of(string().label("Code").required()),
  });

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const onSubmit = handleSubmit(async (values) => {
    await promiseTimeout(2000); // Simulate a network request
    useSonner.success(`Verifying Code`, {
      description: `Code ${values.otp?.join("")} verified! You may now continue`,
    });
  });
</script>
```

<!-- /automd -->

::
