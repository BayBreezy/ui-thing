<template>
  <!--
    Simple sign up form on a dotted background
    Features: Name, email and password with show and hide toggle, soft radial dot pattern, log in link, validation
  -->
  <div class="relative flex min-h-screen items-center justify-center px-5 py-12">
    <div
      class="absolute h-full w-full bg-[radial-gradient(--alpha(var(--color-border)/90%)_1px,transparent_1px)] mask-[radial-gradient(ellipse_closest-side_at_50%_50%,#000_60%,transparent_100%)] bg-size-[20px_20px]"
    />

    <div class="relative w-full max-w-sm">
      <div class="space-y-1.5">
        <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">Sign up</h1>
        <p class="text-muted-foreground">Create an account to get started.</p>
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
            label="Password"
            name="password"
            placeholder="Create a password"
            hint="Must be at least 8 characters."
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

  useSeoMeta({ title: "Sign up", description: "Create an account to get started." });

  const Schema = object({
    name: string().required().label("Name").min(3).max(50),
    email: string().email().required().label("Email"),
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
