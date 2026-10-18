<template>
  <!--
    Reset password form on a grid background
    Features: New and confirm password with show and hide toggle, live strength meter and requirements checklist, match validation
  -->
  <div class="relative flex min-h-screen items-center justify-center px-5 py-12">
    <div
      class="absolute inset-0 z-1 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] mask-[radial-gradient(circle,transparent_25%,var(--color-border)_100%)] bg-size-[100px_100px]"
    />
    <div class="relative z-2 w-full max-w-sm">
      <div
        class="bg-background mx-auto mb-6 flex size-14 items-center justify-center rounded-lg border"
      >
        <Icon class="size-6" name="lucide:lock" />
      </div>

      <div class="flex flex-col items-center text-center">
        <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">Set a new password</h1>
        <p class="text-muted-foreground mt-1">Your new password must be different from before.</p>
      </div>

      <form class="mt-8" @submit="submit">
        <fieldset :disabled="isSubmitting" class="grid gap-5">
          <UiVeePasswordInput
            show-strength
            show-requirements
            label="New password"
            name="password"
            placeholder="Enter a new password"
            :requirements="['length', 'uppercase', 'number', 'special']"
          />
          <UiVeePasswordInput
            label="Confirm password"
            name="confirmPassword"
            placeholder="Repeat your new password"
          />
          <UiButton class="w-full" type="submit" text="Reset password" />
        </fieldset>
      </form>
      <p class="mt-8 text-center text-sm">
        <NuxtLink
          class="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 font-medium underline-offset-4 hover:underline"
          to="#"
        >
          <Icon name="lucide:arrow-left" class="size-4" />
          Back to log in
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { object, string, ref as yupRef } from "yup";
  import type { InferType } from "yup";

  useSeoMeta({
    title: "Set a new password",
    description: "Your new password must be different from before.",
  });

  // Keep the schema in step with the `requirements` shown in the checklist.
  const ResetSchema = object({
    password: string()
      .required()
      .label("Password")
      .min(8)
      .matches(/[A-Z]/, "Password needs an uppercase letter")
      .matches(/[0-9]/, "Password needs a number")
      .matches(/[^A-Za-z0-9]/, "Password needs a special character"),
    confirmPassword: string()
      .required()
      .label("Confirmation")
      .oneOf([yupRef("password")], "Passwords must match"),
  });

  const { handleSubmit, isSubmitting } = useForm<InferType<typeof ResetSchema>>({
    validationSchema: ResetSchema,
  });

  const submit = handleSubmit(async (_) => {
    useSonner("Password updated", {
      description: "Your password has been updated successfully.",
    });
  });
</script>
