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

:prose-pm-x{command="ui-thing@latest add vee-datepicker"}

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
      <UiButton :loading="isSubmitting" type="submit"> Submit </UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { promiseTimeout } from "@vueuse/core";
  import dayjs from "dayjs";
  import { date, object } from "yup";

  const schema = object({
    startDate: date()
      .label("Start date")
      .required()
      .test({
        message: "Select a date after today",
        test(v) {
          const selectedDate = dayjs(v);
          const today = dayjs().startOf("day");
          return selectedDate.isAfter(today);
        },
      }),
  });

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const onSubmit = handleSubmit(async () => {
    await promiseTimeout(2500);
    useSonner.success("Start Date Set", {
      description: "Your start date is set!",
    });
  });
</script>
```

<!-- /automd -->

::
