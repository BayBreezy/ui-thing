<template>
  <div class="flex h-screen items-center justify-center bg-muted/50 px-5">
    <div class="w-full max-w-[420px] rounded-lg border bg-card p-8 shadow-sm">
      <div class="mb-8 text-center">
        <div
          class="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10"
        >
          <Icon name="lucide:user-circle" class="size-6 text-primary" />
        </div>
        <h1 class="text-2xl font-bold tracking-tight">Account Login</h1>
        <p class="mt-1 text-sm text-muted-foreground">Access your dashboard</p>
      </div>

      <form @submit="submit">
        <fieldset :disabled="isSubmitting" class="grid gap-4">
          <UiVeeInput
            label="Email Address"
            type="email"
            name="email"
            placeholder="you@example.com"
          />
          <UiVeeInput label="Password" type="password" name="password" placeholder="••••••••" />
          <div class="text-right">
            <NuxtLink
              class="text-sm font-medium text-primary underline-offset-2 hover:underline"
              to="#"
              >Forgot password?</NuxtLink
            >
          </div>
          <UiButton class="w-full" type="submit" text="Sign in" />
        </fieldset>
      </form>

      <div class="mt-6 text-center">
        <p class="text-sm text-muted-foreground">
          New user?
          <NuxtLink class="font-semibold text-primary underline-offset-2 hover:underline" to="#"
            >Create an account</NuxtLink
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { object, string } from "yup";
  import type { InferType } from "yup";

  useSeoMeta({
    title: "Account Login",
    description: "Access your dashboard by logging in to your account.",
  });

  const LoginSchema = object({
    email: string().email().required().label("Email Address"),
    password: string().required().label("Password").min(8),
  });

  const { handleSubmit, isSubmitting } = useForm<InferType<typeof LoginSchema>>({
    validationSchema: LoginSchema,
  });

  const submit = handleSubmit(async (_) => {
    useSonner("Logged in successfully!", {
      description: "You have successfully logged in.",
    });
  });
</script>
