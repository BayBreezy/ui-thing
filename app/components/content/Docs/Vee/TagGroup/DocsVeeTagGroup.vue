<template>
  <form class="mx-auto max-w-md" @submit="onSubmit">
    <fieldset :disabled="isSubmitting" class="space-y-5">
      <UiVeeTagGroup
        name="interests"
        label="Interests"
        hint="Pick the topics you want to hear about."
        :options="interests"
        color="indigo"
        required
      />
      <UiButton :loading="isSubmitting" type="submit">Save</UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { promiseTimeout } from "@vueuse/core";
  import { array, object, string } from "yup";

  const interests = ["Design", "Engineering", "Marketing", "Product", "Sales", "Support"];

  const schema = object({
    interests: array(string().required()).label("Interests").min(1, "Pick at least one interest"),
  });

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const onSubmit = handleSubmit(async (values) => {
    await promiseTimeout(1000); // Simulate a network request
    useSonner.success("Saved", { description: (values.interests ?? []).join(", ") });
  });
</script>
