<template>
  <form @submit="onSubmit" class="mx-auto max-w-md">
    <fieldset :disabled="isSubmitting" class="space-y-5">
      <UIVeeDatepicker
        :date-picker-props="{
          mode: 'dateTime',
        }"
        readonly
        placeholder="MM/DD/YYYY HH:MM AM/PM"
        label="Start date"
        name="startDate"
        hint="This will be displayed to the public"
      />
      <UIButton type="submit"> Submit </UIButton>
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
      success: (d) => "We updated your information.",
      error: (e) => "Error! Your information could not be sent to our servers!",
    });
  });
</script>
