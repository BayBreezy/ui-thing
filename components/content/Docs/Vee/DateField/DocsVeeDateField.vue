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
