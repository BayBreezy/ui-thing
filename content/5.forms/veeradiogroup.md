---
title: VeeRadioGroup
description: Radio group component that uses the composition API provided by Vee-Validate to perform validation.
links:
  - title: Radio Group Source
    href: /components/radiogroup
    icon: formkit:radio
---

## Source code

Click :SourceCodeLink{component="Vee/RadioGroup.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add vee-radio-group
```

## Usage

### Notification type

In the form below, we are using the `<UiVeeRadioGroup/>` component to create a radio group that allows the user to select how they want to be notified. The component uses the composition API provided by Vee-Validate to perform validation. Notice that we pass the different `RadioItems` into the default slot of the component.

::ShowCase

:DocsVeeRadioGroup

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Radio/DocsVeeRadioGroup.vue" code lang="vue" -->

```vue [DocsVeeRadioGroup.vue]
<template>
  <form class="mx-auto max-w-md" @submit="onSubmit">
    <fieldset :disabled="isSubmitting" class="space-y-5">
      <UiVeeRadioGroup name="notify" label="Select how you want to be notified">
        <template v-for="(opt, i) in options" :key="i">
          <div class="mb-2 flex items-center gap-3">
            <UiRadioGroupItem :id="opt.value" :value="opt.value" />
            <UiLabel :for="opt.value">{{ opt.text }}</UiLabel>
          </div>
        </template>
      </UiVeeRadioGroup>
      <UiButton type="submit"> Update settings </UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { z } from "zod";

  const options = [
    { text: "Send me emails only", value: "email" },
    { text: "Send me SMS only", value: "sms" },
    { text: "Call me", value: "call" },
    { text: "Don't notify me", value: "none" },
  ] as const;

  const schema = z.object({
    notify: z.enum(["email", "sms", "call", "none"], {
      required_error: "Please select a notification method",
    }),
  });

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const onSubmit = handleSubmit(async (values) => {
    const promise = () => new Promise((resolve) => setTimeout(resolve, 3000));
    await new Promise<void>((res, rej) => {
      useSonner.promise(promise, {
        loading: "Updating your settings...",
        success: (_) => {
          res();
          return values.notify === "none"
            ? "You will no longer receive notifications"
            : `You will be notified by ${values.notify}`;
        },
        error: (e) => {
          rej(e);
          return "Error! Your information could not be sent to our servers!";
        },
      });
    });
  });
</script>
```

<!-- /automd -->

::
