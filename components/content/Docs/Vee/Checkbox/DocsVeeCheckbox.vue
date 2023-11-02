<template>
  <form @submit="onSubmit" class="mx-auto max-w-md">
    <fieldset :disabled="isSubmitting" class="space-y-5">
      <UIVeeCheckbox name="drinks" value="coffee" label="Coffee" hint="I love coffee" />
      <UIVeeCheckbox name="drinks" value="tea" label="Tea" hint="I love tea" />
      <UIVeeCheckbox name="drinks" value="water" label="Water" hint="I love water" />
      <UIButton type="submit"> Order now </UIButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { z } from "zod";

  const required_error = "Please select at least one drink";

  const schema = z.object({
    drinks: z.array(z.string({ required_error }), { required_error }).min(1, required_error),
  });

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const onSubmit = handleSubmit(async (values) => {
    const promise = () => new Promise((resolve) => setTimeout(resolve, 3000));
    useSonner.promise(promise, {
      loading: "Sending order details...",
      success: (d) => `We will be sending you ${values.drinks.join(", ")} soon!`,
      error: (e) => "Error! Your information could not be sent to our servers!",
    });
  });
</script>
