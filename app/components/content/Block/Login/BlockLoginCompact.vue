<template>
  <div class="flex h-screen items-center justify-center px-5">
    <div class="w-full max-w-[360px]">
      <div class="bg-card rounded-lg border p-6 shadow-sm">
        <div class="mb-6">
          <h1 class="text-xl font-bold tracking-tight">Welcome back</h1>
          <p class="text-muted-foreground mt-1 text-sm">Sign in to continue</p>
        </div>

        <form @submit="submit">
          <fieldset :disabled="isSubmitting" class="grid gap-4">
            <UiVeeInput type="email" name="email" placeholder="Email address" />
            <UiVeeInput type="password" name="password" placeholder="Password" />
            <UiButton class="w-full" type="submit" text="Sign in" />
          </fieldset>
        </form>

        <div class="mt-4 flex items-center justify-between text-sm">
          <NuxtLink class="text-muted-foreground underline-offset-2 hover:underline" to="#"
            >Forgot password?</NuxtLink
          >
          <NuxtLink class="text-primary font-medium underline-offset-2 hover:underline" to="#"
            >Sign up</NuxtLink
          >
        </div>
      </div>

      <p class="text-muted-foreground mt-6 text-center text-xs">
        By continuing, you agree to our
        <NuxtLink class="hover:text-foreground underline underline-offset-2" to="#"
          >Terms of Service</NuxtLink
        >
        and
        <NuxtLink class="hover:text-foreground underline underline-offset-2" to="#"
          >Privacy Policy</NuxtLink
        >
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { object, string } from "yup";
  import type { InferType } from "yup";

  useSeoMeta({
    title: "Welcome back - Sign in",
    description: "Sign in to continue to your account.",
  });

  const LoginSchema = object({
    email: string().email().required().label("Email address"),
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
