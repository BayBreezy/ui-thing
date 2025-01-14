---
title: VeeDateField
description: A Date Field component that uses the composition API provided by Vee-Validate to perform validation.
links:
  - title: Date Field Source
    href: /components/datefield
    icon: lucide:calendar
---

## Source code

Click :SourceCodeLink{component="Vee/DateField.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add vee-date-field
```

## Usage

### DOB form

In the form below, we are using the `useForm` composition provided by Vee-Validate to handle the form submission and validation. The `useForm` composable accepts a `validationSchema` option that we can use to define our validation rules. We are using the `yup` library to define our validation rules. You can use any validation library you want as long as it is supported by Vee-Validate and can be passed to the `toTypedSchema` function.

::ShowCase

:DocsVeeDateField

#code

<!-- automd:file src="../../app/components/content/Docs/Vee/DateField/DocsVeeDateField.vue" code lang="vue" -->

```vue [DocsVeeDateField.vue]
<template>
  <form @submit="submit">
    <fieldset :disabled="isSubmitting" class="space-y-5">
      <UiVeeDateField name="dob" label="Enter your date of birth" />
      <UiButton type="submit">Submit</UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
  import { mixed, object } from "yup";
  import type { DateValue } from "@internationalized/date";
  import type { InferType } from "yup";

  const schema = object({
    dob: mixed<DateValue>().required().label("Date of birth"),
  });

  const { handleSubmit, isSubmitting } = useForm<InferType<typeof schema>>({
    validationSchema: schema,
    initialValues: {
      // use `parseDate` to convert a `Date` object to a `CalendarDate`
      dob: parseDate(today(getLocalTimeZone()).toString()),
    },
  });
  const submit = handleSubmit(async (values) => {
    useSonner.success("Awesome!", {
      description: `You were born on ${useDateFormat(values.dob.toString(), "dddd, MMM DD, YYYY").value}`,
    });
  });
</script>
```

<!-- /automd -->

::
