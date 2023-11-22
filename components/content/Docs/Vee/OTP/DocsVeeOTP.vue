<template>
  <form @submit="onSubmit" class="mx-auto max-w-md">
    <fieldset :disabled="isSubmitting" class="space-y-5">
      <UiVeeOtp :numInputs="6" name="otp" label="Enter your 2FA code below" />
      <UiButton type="submit"> Submit </UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { z } from "zod";

  const schema = z.object({
    otp: z.string().length(6, "Code must be 6 characters long"),
  });

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const onSubmit = handleSubmit(async (values) => {
    const promise = () => new Promise((resolve) => setTimeout(resolve, 3000));
    const { id, update } = toast({
      title: "Verifying code",
      description: "Please wait while we verify your code",
      duration: Infinity,
      icon: "svg-spinners:12-dots-scale-rotate",
    });
    await promise();
    update({
      id,
      title: "Code verified",
      description: "Your code has been verified successfully",
      variant: "success",
      icon: "solar:check-circle-line-duotone",
    });
  });
</script>
