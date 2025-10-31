<template>
  <div class="flex h-screen items-center justify-center bg-muted/50 px-5">
    <div class="w-full max-w-[420px] rounded-lg border bg-card p-8 shadow-sm">
      <div class="mb-8 text-center">
        <div
          class="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10"
        >
          <Icon name="lucide:user-plus" class="size-6 text-primary" />
        </div>
        <h1 class="text-2xl font-bold tracking-tight">Join us today</h1>
        <p class="mt-1 text-sm text-muted-foreground">Create your account in seconds</p>
      </div>

      <form @submit="submit">
        <fieldset :disabled="isSubmitting" class="grid gap-4">
          <UiVeeInput required label="Full name" name="name" placeholder="John Doe" />
          <UiVeeInput
            required
            label="Email address"
            type="email"
            name="email"
            placeholder="you@example.com"
          />
          <UiVeeInput
            required
            label="Password"
            type="password"
            name="password"
            placeholder="••••••••"
          />
          <UiVeeInput
            required
            label="Confirm password"
            type="password"
            name="confirmPassword"
            placeholder="••••••••"
          />
          <UiButton class="w-full" type="submit" text="Create account" />
        </fieldset>
      </form>

      <div class="mt-6 text-center">
        <p class="text-sm text-muted-foreground">
          Already have an account?
          <NuxtLink class="font-semibold text-primary underline-offset-2 hover:underline" to="#"
            >Sign in</NuxtLink
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { object, string, ref as yupRef } from "yup";
  import type { InferType } from "yup";

  useSeoMeta({
    title: "Join us today",
    description: "Create your account in seconds.",
  });

  const Schema = object({
    name: string().required().label("Full name").min(3),
    email: string().email().required().label("Email address"),
    password: string().required().label("Password").min(8),
    confirmPassword: string()
      .required()
      .label("Confirm password")
      .oneOf([yupRef("password")], "Passwords must match"),
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
