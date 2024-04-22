<template>
  <form class="mx-auto max-w-md" @submit="onSubmit">
    <fieldset :disabled="isSubmitting" class="space-y-5">
      <UiVeeTextarea label="First love" name="firstLove" hint="We will not share this" />
      <UiVeeTextarea
        label="First heartbreak"
        name="firstHeartbreak"
        hint="We will not share this"
      />
      <UiButton type="submit"> Save secrets </UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { z } from "zod";

  const schema = z.object({
    firstLove: z
      .string()
      .min(3, "Too short!")
      .max(50, "Too long!")
      .transform((v) => v?.trim()),
    firstHeartbreak: z.string().min(3, "Too short!").max(50, "Too long!"),
  });

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const onSubmit = handleSubmit(async (values) => {
    console.log(values);

    const promise = () => new Promise((resolve) => setTimeout(resolve, 3000));
    useSonner.promise(promise, {
      loading: "Storing your secrets...",
      success: (_) => "Your secrets are safe with us!",
      error: (_) => "Error! Your information could not be sent to our servers!",
    });
  });
</script>
