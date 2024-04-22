<template>
  <form class="mx-auto max-w-md" @submit="onSubmit">
    <p class="font-semibold">Terms of Service</p>
    <p class="mb-4 mt-2 text-sm text-muted-foreground">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit, perspiciatis sunt, quae
      architecto, dicta nobis corrupti commodi tempora asperiores eligendi id dolore dolores.
      Dolores quaerat architecto in sapiente expedita cum?
    </p>
    <fieldset :disabled="isSubmitting" class="space-y-5">
      <UiVeeCheckbox name="terms" label="I agree to the terms of service" />
      <UiButton type="submit"> Continue </UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { z } from "zod";

  const schema = z.object({
    terms: z.boolean({ required_error: "You must agree to the terms of service" }),
  });

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const onSubmit = handleSubmit(async (_) => {
    const promise = () => new Promise((resolve) => setTimeout(resolve, 3000));
    useSonner.promise(promise, {
      loading: "Starting the process...",
      success: (_) => `We will begin the process now`,
      error: (_) => "Error! Your information could not be sent to our servers!",
    });
  });
</script>
