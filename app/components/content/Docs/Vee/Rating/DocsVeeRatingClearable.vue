<template>
  <form class="mx-auto max-w-md" @submit="onSubmit">
    <fieldset class="space-y-5">
      <UiVeeRating
        name="satisfaction"
        label="Support satisfaction"
        label-hint="Optional"
        hint="Click the selected star again to clear your rating."
        icon="lucide:heart"
        filled-icon-class-name="fill-red-500 text-red-500"
        empty-icon-class-name="text-red-500/30"
        size="lg"
        clearable
      />
      <UiButton type="submit"> Save </UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { number, object } from "yup";

  const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(
      object({
        // Optional: clearing the rating sets the value back to 0.
        satisfaction: number().label("Satisfaction").min(0).max(5),
      })
    ),
    initialValues: {
      satisfaction: 4,
    },
  });

  const onSubmit = handleSubmit((values) => {
    useSonner.success("Saved", {
      description: values.satisfaction
        ? `Satisfaction set to ${values.satisfaction} out of 5.`
        : "No rating provided.",
    });
  });
</script>
