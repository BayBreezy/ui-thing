<template>
  <!--
    Reset password form inside a card
    Features: New and confirm password with show and hide toggle, requirements checklist, match validation, back to log in link
  -->
  <div class="bg-muted/30 relative flex min-h-screen items-center justify-center p-4">
    <UiCard class="w-full max-w-md shadow-sm">
      <div class="p-6 lg:p-8">
        <div class="mb-6 flex justify-center">
          <div class="bg-primary/10 flex size-14 items-center justify-center rounded-full">
            <Icon class="text-primary size-7" name="lucide:shield-check" />
          </div>
        </div>

        <div class="mb-8 text-center">
          <h1 class="mb-2 text-2xl font-bold tracking-tight">Create new password</h1>
          <p class="text-muted-foreground text-sm">
            Choose a strong password you haven't used before.
          </p>
        </div>

        <form @submit="submit">
          <fieldset :disabled="isSubmitting" class="grid gap-5">
            <UiVeePasswordInput
              show-requirements
              label="New password"
              name="password"
              placeholder="Enter a new password"
              :requirements="['length', 'number', 'special']"
            />
            <UiVeePasswordInput
              label="Confirm password"
              name="confirmPassword"
              placeholder="Repeat your new password"
            />
            <UiButton class="w-full" size="lg" type="submit">Reset password</UiButton>
          </fieldset>
        </form>

        <p class="mt-6 text-center text-sm">
          <NuxtLink
            class="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 font-medium underline-offset-4 hover:underline"
            to="#"
          >
            <Icon name="lucide:arrow-left" class="size-4" />
            Back to log in
          </NuxtLink>
        </p>
      </div>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
  import { object, string, ref as yupRef } from "yup";
  import type { InferType } from "yup";

  // Keep the schema in step with the `requirements` shown in the checklist.
  const ResetSchema = object({
    password: string()
      .required()
      .label("Password")
      .min(8)
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
