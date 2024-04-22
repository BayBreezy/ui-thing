<template>
  <form class="mx-auto max-w-md" @submit="onSubmit">
    <fieldset :disabled="isSubmitting" class="space-y-5">
      <UiVeePinInput :input-count="6" name="otp" label="Enter your 2FA code below" otp />
      <UiButton type="submit"> Submit </UiButton>
    </fieldset>
  </form>
</template>

<script lang="ts" setup>
  import { z } from "zod";

  const schema = z.object({
    otp: z
      .array(z.string({ required_error: "Required" }).min(1, "Enter all values"))
      .length(6, "Code must be 6 characters long")
      .transform((v) => v.join("")),
  });

  const { handleSubmit, isSubmitting } = useForm({
    validationSchema: toTypedSchema(schema),
  });

  const onSubmit = handleSubmit(async (values) => {
    const promise = () => new Promise((resolve) => setTimeout(resolve, 4000));
    const { id, update } = toast({
      title: "Verifying code...",
      description: "Please wait while we verify " + values.otp,
      duration: Infinity,
      icon: "svg-spinners:12-dots-scale-rotate",
    });
    await promise();
    update({
      id,
      title: "Code verified",
      description: "Your code has been verified successfully",
      variant: "success",
      duration: 3000,
      icon: "solar:check-circle-line-duotone",
    });
  });
</script>
