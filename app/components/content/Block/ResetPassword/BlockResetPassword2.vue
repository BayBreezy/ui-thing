<template>
  <div class="bg-muted/30 relative flex min-h-screen items-center justify-center p-4">
    <UiCard class="w-full max-w-md">
      <div class="p-6 lg:p-8">
        <div class="mb-8 text-center">
          <h1 class="mb-2 text-2xl font-bold tracking-tight">{{ title }}</h1>
          <p class="text-muted-foreground text-sm">{{ description }}</p>
        </div>

        <form @submit="submit">
          <fieldset :disabled="isSubmitting" class="grid gap-5">
            <UiVeeInput
              label="New password"
              type="password"
              name="password"
              placeholder="••••••••"
            />

            <UiVeeInput
              label="Confirm password"
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
            />

            <div class="bg-muted/50 rounded-lg p-4">
              <p class="text-muted-foreground mb-2 text-xs font-medium">Password must contain:</p>
              <ul class="text-muted-foreground space-y-1 text-xs">
                <li class="flex items-center gap-2">
                  <Icon
                    :class="['size-4', meta.valid ? 'text-green-600' : 'text-muted-foreground/40']"
                    name="lucide:check-circle"
                  />
                  At least 8 characters
                </li>
                <li class="flex items-center gap-2">
                  <Icon
                    :class="['size-4', meta.valid ? 'text-green-600' : 'text-muted-foreground/40']"
                    name="lucide:check-circle"
                  />
                  One number and one special character
                </li>
              </ul>
            </div>

            <UiButton class="w-full" size="lg" type="submit"> Reset Password </UiButton>
          </fieldset>
        </form>
      </div>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
  import { object, string, ref as yupRef } from "yup";
  import type { InferType } from "yup";

  const title = "Create new password";
  const description = "Enter a new password for your account.";

  useSeoMeta({ title, description });

  const ResetPasswordSchema = object({
    password: string()
      .required()
      .min(8)
      .matches(
        /^(?=.*\d)(?=.*[!@#$%^&*])/,
        "Password must contain at least one number and one special character"
      )
      .label("Password"),
    confirmPassword: string()
      .required()
      .oneOf([yupRef("password")], "Passwords must match")
      .label("Confirm password"),
  });

  const { handleSubmit, isSubmitting, meta } = useForm<InferType<typeof ResetPasswordSchema>>({
    validationSchema: ResetPasswordSchema,
  });

  const submit = handleSubmit(async (values) => {
    console.log(values);
    useSonner.success("Password reset", {
      description: "Your password has been successfully reset.",
    });
  });
</script>
