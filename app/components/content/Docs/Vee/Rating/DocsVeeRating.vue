<template>
  <form class="mx-auto max-w-md" @submit="onSubmit">
    <fieldset :disabled="isSubmitting" class="space-y-5">
      <UiVeeRating
        name="rating"
        label="How was your experience?"
        hint="Tap a star to rate us."
        required
      />
      <UiButton :loading="isSubmitting" type="submit"> Submit rating </UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { promiseTimeout } from "@vueuse/core";
  import { number, object } from "yup";

  const schema = object({
    rating: number()
      .label("Rating")
      .required("Please select a rating")
      .min(1, "Please select a rating")
      .max(5),
  });

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const onSubmit = handleSubmit(async (values) => {
    await promiseTimeout(1000); // Simulate a network request
    useSonner.success("Thanks for your feedback", {
      description: `You rated us ${values.rating} out of 5.`,
    });
  });
</script>
