<template>
  <!--
    Sign up form with a live password strength meter
    Features: Strength bar and requirements checklist driven by the password field, name and email, validation that matches the checklist
  -->
  <div class="relative flex min-h-screen items-center justify-center px-5 py-12">
    <div
      class="absolute h-full w-full bg-[radial-gradient(--alpha(var(--color-border)/90%)_1px,transparent_1px)] mask-[radial-gradient(ellipse_closest-side_at_50%_50%,#000_60%,transparent_100%)] bg-size-[20px_20px]"
    />

    <div class="relative w-full max-w-sm">
      <div class="space-y-1.5">
        <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">Sign up</h1>
        <p class="text-muted-foreground">Pick a strong password to protect your account.</p>
      </div>

      <form class="mt-8" @submit="submit">
        <fieldset :disabled="isSubmitting" class="grid gap-5">
          <UiVeeInput required label="Name" name="name" placeholder="Jane Doe" />
          <UiVeeInput
            required
            label="Email"
            type="email"
            name="email"
            placeholder="you@example.com"
          />
          <UiVeePasswordInput
            required
            show-strength
            show-requirements
            label="Password"
            name="password"
            placeholder="Create a password"
            :requirements="['length', 'uppercase', 'number', 'special']"
          />
          <UiButton class="w-full" type="submit" text="Create account" />
        </fieldset>
      </form>

      <p class="text-muted-foreground mt-8 text-center text-sm">
        Already have an account?
        <NuxtLink class="text-foreground font-semibold underline-offset-4 hover:underline" to="#">
          Log in
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { object, string } from "yup";
  import type { InferType } from "yup";

  useSeoMeta({ title: "Sign up", description: "Pick a strong password to protect your account." });

  // Keep the schema in step with the `requirements` shown in the checklist.
  const Schema = object({
    name: string().required().label("Name").min(3).max(50),
    email: string().email().required().label("Email"),
    password: string()
      .required()
      .label("Password")
      .min(8)
      .matches(/[A-Z]/, "Password needs an uppercase letter")
      .matches(/[0-9]/, "Password needs a number")
      .matches(/[^A-Za-z0-9]/, "Password needs a special character"),
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
