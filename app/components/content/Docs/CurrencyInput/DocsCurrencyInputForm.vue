<template>
  <div class="mx-auto flex w-full max-w-lg items-center justify-center">
    <form class="w-full space-y-4" @submit="onSubmit">
      <Field v-slot="{ componentField }" name="total">
        <UiFormItem label="Grand total" description="This is what you came for, right?">
          <UiCurrencyInput v-bind="componentField" />
        </UiFormItem>
      </Field>
      <div>
        <UiButton type="submit">Pay It</UiButton>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
  import { z } from "zod";

  const { handleSubmit } = useForm({
    validationSchema: toTypedSchema(
      z.object({
        total: z
          .number({
            description: "Total amount to pay",
            invalid_type_error: "Please enter a valid number",
          })
          .nonnegative()
          .min(1000),
      })
    ),
  });

  const onSubmit = handleSubmit((values) => {
    useSonner("Thank you for paying", {
      description: `You have paid ${new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(values.total)}`,
    });
  });
</script>
