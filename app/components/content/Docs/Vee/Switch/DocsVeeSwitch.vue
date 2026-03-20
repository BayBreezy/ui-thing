<template>
  <form class="mx-auto max-w-md" @submit="onSubmit">
    <fieldset :disabled="isSubmitting" class="space-y-5">
      <UiVeeSwitch
        name="productUpdates"
        label="Product updates"
        hint="Receive product announcements and release notes by email."
      />
      <UiButton :loading="isSubmitting" type="submit"> Save preferences </UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { boolean, object } from "yup";

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(
      object({
        productUpdates: boolean().label("Product updates"),
      })
    ),
  });

  const onSubmit = handleSubmit((values) => {
    useSonner.success("Preferences updated", {
      description: values.productUpdates
        ? "You will receive product updates."
        : "You will not receive product updates.",
    });
  });
</script>
