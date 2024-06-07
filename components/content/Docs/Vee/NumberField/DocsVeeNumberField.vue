<template>
  <div class="flex w-full items-center justify-center">
    <form @submit="submit">
      <fieldset class="grid gap-5">
        <UiVeeNumberField
          :min="0"
          label="Payment"
          name="payment"
          :format-options="{
            style: 'currency',
            currency: 'USD',
          }"
        >
          <UiNumberFieldInput placeholder="15" />
          <UiNumberFieldDecrement class="border-l" />
          <UiNumberFieldIncrement class="border-l" />
        </UiVeeNumberField>
        <div>
          <UiButton type="submit">Submit</UiButton>
        </div>
      </fieldset>
    </form>
  </div>
</template>
<script lang="ts" setup>
  import { number, object } from "yup";

  const { handleSubmit, resetForm } = useForm({
    validationSchema: object({
      payment: number().required().min(0).label("Payment").typeError("Payment is required."),
    }),
  });

  const submit = handleSubmit(async () => {
    const promise = () => new Promise((resolve) => setTimeout(resolve, 3000));
    useSonner.promise(promise, {
      loading: "Updating records...",
      success: (_) => {
        resetForm();
        return "We updated your information.";
      },
      error: (_) => "Error! Your information could not be sent to our servers!",
    });
  });
</script>
