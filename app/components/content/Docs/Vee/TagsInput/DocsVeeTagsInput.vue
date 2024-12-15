<template>
  <form class="mx-auto max-w-md" @submit="onSubmit">
    <fieldset :disabled="isSubmitting" class="space-y-5">
      <UiVeeTagsInput
        :max="5"
        placeholder="Type a brand and press enter..."
        label="Car brands"
        name="brands"
        hint="This will be displayed to the public"
      />
      <UiButton type="submit"> Submit </UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { z } from "zod";

  const schema = z.object({
    brands: z
      .array(z.string())
      .min(2, "Add at least 2 brands")
      .max(5, "You can add up to 5 brands"),
  });

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const onSubmit = handleSubmit(async (values) => {
    console.log(values);
    const promise = () => new Promise((resolve) => setTimeout(resolve, 3000));
    useSonner.promise(promise, {
      loading: "Saving brands...",
      success: (_) => "Success! Your information has been saved!",
      error: (_) => "Error! Your information could not be sent to our servers!",
    });
  });
</script>
