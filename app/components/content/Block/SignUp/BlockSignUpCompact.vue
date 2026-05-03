<template>
  <div class="flex h-screen items-center justify-center px-5">
    <div class="w-full max-w-[360px]">
      <div class="bg-card rounded-lg border p-6 shadow-sm">
        <div class="mb-6">
          <h1 class="text-xl font-bold tracking-tight">Create account</h1>
          <p class="text-muted-foreground mt-1 text-sm">Sign up to get started</p>
        </div>

        <form @submit="submit">
          <fieldset :disabled="isSubmitting" class="grid gap-4">
            <UiVeeInput type="text" name="name" placeholder="Full name" />
            <UiVeeInput type="email" name="email" placeholder="Email address" />
            <UiVeeInput type="password" name="password" placeholder="Password" />
            <UiButton class="w-full" type="submit" text="Sign up" />
          </fieldset>
        </form>

        <div class="mt-4 text-center text-sm">
          <NuxtLink class="text-primary font-medium underline-offset-2 hover:underline" to="#"
            >Already have an account?</NuxtLink
          >
        </div>
      </div>

      <p class="text-muted-foreground mt-6 text-center text-xs">
        By signing up, you agree to our
        <NuxtLink class="hover:text-foreground underline underline-offset-2" to="#">Terms</NuxtLink>
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
    title: "Create account",
    description: "Sign up to get started.",
  });

  const Schema = object({
    name: string().required().label("Full name").min(3),
    email: string().email().required().label("Email address"),
    password: string().required().label("Password").min(8),
  });

  const { handleSubmit, isSubmitting } = useForm<InferType<typeof Schema>>({
    validationSchema: Schema,
  });

  const submit = handleSubmit(async (_) => {
    useSonner("Account created!", {
      description: "You have successfully created an account.",
    });
  });
</script>
