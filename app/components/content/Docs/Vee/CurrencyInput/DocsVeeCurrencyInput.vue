<template>
  <form class="mx-auto max-w-md" @submit="onSubmit">
    <fieldset :disabled="isSubmitting" class="space-y-5">
      <UiVeeCurrencyInput label="Toys total" name="toys" hint="The cost for the baby toys" />
      <UiVeeCurrencyInput label="Food total" name="food" hint="The cost for the baby food" />
      <UiButton type="submit"> Pay now </UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { z } from "zod";

  const schema = z.object({
    toys: z
      .number({
        invalid_type_error: "The toys total must be a number",
        required_error: "The toys total is required",
      })
      .nonnegative()
      .min(50),
    food: z
      .number({
        invalid_type_error: "The food total must be a number",
        required_error: "The food total is required",
      })
      .nonnegative()
      .min(150),
  });

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const onSubmit = handleSubmit(async (_) => {
    const promise = () => new Promise((resolve) => setTimeout(resolve, 3000));
    useSonner.promise(promise, {
      loading: "Making payment...",
      success: (_) => "Payment successful!",
      error: (_) => "Error! Your information could not be sent to our servers!",
    });
  });
</script>
