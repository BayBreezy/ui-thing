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

```bash
npx ui-thing@latest add vee-pin-input
```

## Usage

### User form

In the form below, we are using the `useForm` composition function provided by Vee-Validate to handle the form submission and validation. The `useForm` composable accepts a `validationSchema` option that we can use to define our validation rules. We are using the `zod` library to define our validation rules. You can use any validation library you want as long as it is supported by Vee-Validate and can be passed to the `toTypedSchema` function.

::ShowCase

:DocsVeePinInput

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/PinInput/DocsVeePinInput.vue" code lang="vue" -->

```vue [DocsVeePinInput.vue]
<template>
  <form class="mx-auto max-w-md" @submit="onSubmit">
    <fieldset :disabled="isSubmitting" class="space-y-5">
      <UiVeePinInput :input-count="6" name="otp" label="Enter your 2FA code below" otp />
      <UiButton type="submit"> Submit </UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { z } from "zod";

  const schema = z.object({
    otp: z
      .array(z.string({ required_error: "Required" }).min(1, "Enter all values"))
      .length(6, "Code must be 6 characters long")
      .transform((v) => v.join("")),
  });

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const onSubmit = handleSubmit(async (values) => {
    const promise = () => new Promise((resolve) => setTimeout(resolve, 4000));
    const { id, update } = toast({
      title: "Verifying code...",
      description: "Please wait while we verify " + values.otp,
      duration: Infinity,
      icon: "svg-spinners:12-dots-scale-rotate",
    });
    await promise();
    update({
      id,
      title: "Code verified",
      description: "Your code has been verified successfully",
      variant: "success",
      duration: 3000,
      icon: "solar:check-circle-line-duotone",
    });
  });
</script>
```

<!-- /automd -->

::
