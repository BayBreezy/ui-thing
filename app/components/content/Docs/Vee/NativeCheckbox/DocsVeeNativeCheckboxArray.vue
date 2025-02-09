<template>
  <form class="mx-auto w-full max-w-sm" @submit="submit">
    <fieldset :disabled="isSubmitting" class="flex flex-col gap-8">
      <UiVeeNativeCheckbox
        name="notifications"
        label="Email"
        description="Get notified via email"
        value="Email"
      />
      <UiVeeNativeCheckbox
        name="notifications"
        label="SMS"
        description="Get notified via SMS"
        value="SMS"
      />
      <UiButton type="submit" :loading="isSubmitting">Save</UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { array, object, string } from "yup";
  import type { InferType } from "yup";

  const schema = object({
    notifications: array(string().required().label("Notification type")).min(
      1,
      "At least one notification type is required"
    ),
  });
  const { handleSubmit, isSubmitting } = useForm<InferType<typeof schema>>({
    name: "checkbox-notification",
    validationSchema: schema,
    initialValues: {
      notifications: ["Email"],
    },
  });

  const submit = handleSubmit(async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      useSonner.success("Updated Successfully", {
        description: "Your notification settings have been updated",
      });
    } catch (error: any) {
      useSonner.error("An error occurred", {
        duration: 12000,
        description: error.message || "An error occurred",
      });
    }
  });
</script>
