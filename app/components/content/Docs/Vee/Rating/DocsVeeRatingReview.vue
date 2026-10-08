<template>
  <div class="flex justify-center">
    <form class="w-full max-w-md" @submit="onSubmit">
      <UiCard class="">
        <UiCardHeader>
          <UiCardTitle>Write a review</UiCardTitle>
          <UiCardDescription>Tell others what you think about this product.</UiCardDescription>
        </UiCardHeader>

        <UiCardContent class="space-y-5">
          <UiVeeRating name="rating" label="Overall rating" size="lg" :step="0.5" required />
          <UiVeeInput name="title" label="Review title" placeholder="Sum it up in a few words" />
          <UiVeeTextarea
            name="comment"
            label="Your review"
            hint="Minimum 20 characters."
            placeholder="What did you like or dislike?"
          />
        </UiCardContent>

        <UiCardFooter>
          <UiButton type="button" variant="ghost" @click="resetForm()">Reset</UiButton>
          <UiButton :loading="isSubmitting" type="submit">Post review</UiButton>
        </UiCardFooter>
      </UiCard>
    </form>
  </div>
</template>

<script lang="ts" setup>
  import { promiseTimeout } from "@vueuse/core";
  import { number, object, string } from "yup";

  const schema = object({
    rating: number()
      .label("Rating")
      .required("Please select a rating")
      .min(0.5, "Please select a rating")
      .max(5),
    title: string().label("Title").required().min(3).max(60).trim(),
    comment: string().label("Review").required().min(20).max(500).trim(),
  });

  const { handleSubmit, isSubmitting, resetForm } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const onSubmit = handleSubmit(async (values) => {
    await promiseTimeout(1000); // Simulate a network request
    useSonner.success("Review posted", {
      description: `"${values.title}" - ${values.rating} out of 5 stars.`,
    });
    resetForm();
  });
</script>
