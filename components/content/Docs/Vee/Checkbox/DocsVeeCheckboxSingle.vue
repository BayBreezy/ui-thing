<template>
  <form @submit="onSubmit" class="mx-auto max-w-md">
    <p class="font-semibold">Terms of Service</p>
    <p class="mb-4 mt-2 text-sm text-muted-foreground">
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit, perspiciatis sunt, quae
      architecto, dicta nobis corrupti commodi tempora asperiores eligendi id dolore dolores.
      Dolores quaerat architecto in sapiente expedita cum?
    </p>
    <fieldset :disabled="isSubmitting" class="space-y-5">
      <UIVeeCheckbox name="terms" label="I agree to the terms of service" />
      <UIButton type="submit"> Continue </UIButton>
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

  const onSubmit = handleSubmit(async (values) => {
    const promise = () => new Promise((resolve) => setTimeout(resolve, 3000));
    useSonner.promise(promise, {
      loading: "Starting the process...",
      success: (d) => `We will begin the process now`,
      error: (e) => "Error! Your information could not be sent to our servers!",
    });
  });
</script>
