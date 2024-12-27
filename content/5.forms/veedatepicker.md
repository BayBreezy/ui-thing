---
title: VeeDatepicker
description: An input component that allows the user to select a date.
links:
  - title: Datepicker
    href: /components/datepicker
    icon: lucide:calendar
---

## Source code

Click :SourceCodeLink{component="Vee/Datepicker.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add vee-datepicker
```

## Usage

::ShowCase

:DocsVeeDatepicker

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/Datepicker/DocsVeeDatepicker.vue" code lang="vue" -->

```vue [DocsVeeDatepicker.vue]
<template>
  <form class="mx-auto max-w-md" @submit="onSubmit">
    <fieldset :disabled="isSubmitting" class="space-y-5">
      <UiVeeDatepicker
        :date-picker-props="{
          mode: 'dateTime',
        }"
        readonly
        placeholder="MM/DD/YYYY HH:MM AM/PM"
        label="Start date"
        name="startDate"
        hint="This will be displayed to the public"
      />
      <UiButton type="submit"> Submit </UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { z } from "zod";

  const schema = z.object({
    startDate: z.date({
      invalid_type_error: "Please enter a valid date",
      required_error: "Please enter a date",
    }),
  });

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const onSubmit = handleSubmit(async (values) => {
    const promise = () => new Promise((resolve) => setTimeout(resolve, 3000));
    useSonner.promise(promise, {
      loading: `Updating to ${values.startDate}`,
      success: (_) => "We updated your information.",
      error: (_) => "Error! Your information could not be sent to our servers!",
    });
  });
</script>
```

<!-- /automd -->

::
