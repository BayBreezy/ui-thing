<template>
  <div class="grid min-h-screen lg:grid-cols-2">
    <!-- Left Side - Form -->
    <div class="flex items-center justify-center p-8">
      <div class="w-full max-w-md">
        <div class="mb-8">
          <h1 class="mb-2 text-3xl font-bold tracking-tight">{{ title }}</h1>
          <p class="text-muted-foreground">{{ description }}</p>
        </div>

        <form @submit="submit">
          <fieldset :disabled="isSubmitting" class="grid gap-5">
            <UiVeeInput
              label="Email address"
              type="email"
              name="email"
              placeholder="john@example.com"
            />

            <UiButton class="w-full" size="lg" type="submit">
              <Icon class="mr-2" name="lucide:send" />
              Send Reset Instructions
            </UiButton>
          </fieldset>
        </form>

        <div class="mt-8 text-center">
          <p class="text-muted-foreground text-sm">
            Remember your password?
            <NuxtLink class="text-primary font-semibold underline-offset-2 hover:underline" to="#">
              Sign in
            </NuxtLink>
          </p>
        </div>
      </div>
    </div>

    <!-- Right Side - Visual -->
    <div class="bg-muted/50 hidden items-center justify-center p-8 lg:flex">
      <div class="max-w-md text-center">
        <div class="mb-6 flex justify-center">
          <div class="bg-primary/10 flex size-24 items-center justify-center rounded-2xl">
            <Icon class="text-primary size-12" name="lucide:lock" />
          </div>
        </div>
        <h2 class="mb-4 text-2xl font-bold">Secure Password Recovery</h2>
        <p class="text-muted-foreground">
          We'll send you a secure link to reset your password. The link will expire in 24 hours for
          your security.
        </p>

        <div class="mt-8 grid gap-4">
          <div class="flex items-start gap-3 text-left">
            <div class="bg-primary/10 flex size-10 shrink-0 items-center justify-center rounded-lg">
              <Icon class="text-primary size-5" name="lucide:shield-check" />
            </div>
            <div>
              <p class="font-medium">Secure & Encrypted</p>
              <p class="text-muted-foreground text-sm">
                All reset links are encrypted and time-limited
              </p>
            </div>
          </div>

          <div class="flex items-start gap-3 text-left">
            <div class="bg-primary/10 flex size-10 shrink-0 items-center justify-center rounded-lg">
              <Icon class="text-primary size-5" name="lucide:clock" />
            </div>
            <div>
              <p class="font-medium">Quick Process</p>
              <p class="text-muted-foreground text-sm">
                Reset your password in less than 2 minutes
              </p>
            </div>
          </div>

          <div class="flex items-start gap-3 text-left">
            <div class="bg-primary/10 flex size-10 shrink-0 items-center justify-center rounded-lg">
              <Icon class="text-primary size-5" name="lucide:mail-check" />
            </div>
            <div>
              <p class="font-medium">Email Confirmation</p>
              <p class="text-muted-foreground text-sm">Check your inbox for the reset link</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { object, string } from "yup";
  import type { InferType } from "yup";

  const title = "Forgot your password?";
  const description = "No worries, we'll send you reset instructions.";

  useSeoMeta({ title, description });

  const ForgotPasswordSchema = object({
    email: string().email().required().label("Email address"),
  });

  const { handleSubmit, isSubmitting } = useForm<InferType<typeof ForgotPasswordSchema>>({
    validationSchema: ForgotPasswordSchema,
  });

  const submit = handleSubmit(async (values) => {
    console.log(values);
    useSonner.success("Email sent", {
      description: "Check your inbox for password reset instructions.",
    });
  });
</script>
