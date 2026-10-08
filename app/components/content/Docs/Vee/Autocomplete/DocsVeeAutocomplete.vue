<template>
  <form class="mx-auto max-w-sm" @submit="onSubmit">
    <fieldset :disabled="isSubmitting" class="space-y-5">
      <UiVeeAutocomplete
        name="job"
        label="Job title"
        hint="Pick a suggestion or type your own."
        placeholder="e.g. Product designer"
        :options="jobs"
        required
      />
      <UiButton :loading="isSubmitting" type="submit">Save</UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { promiseTimeout } from "@vueuse/core";
  import { object, string } from "yup";

  const jobs = [
    "Backend engineer",
    "Frontend engineer",
    "Product designer",
    "Product manager",
    "Data analyst",
    "DevOps engineer",
    "Engineering manager",
    "QA engineer",
  ];

  const schema = object({
    job: string().label("Job title").required().min(3).max(50).trim(),
  });

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const onSubmit = handleSubmit(async (values) => {
    await promiseTimeout(1000); // Simulate a network request
    useSonner.success("Saved", { description: `Job title: ${values.job}` });
  });
</script>
