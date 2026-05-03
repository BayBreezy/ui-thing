<template>
  <div class="relative flex h-screen items-center justify-center">
    <div
      class="absolute h-full w-full bg-[radial-gradient(var(--color-border)_1px,transparent_1px)] mask-[radial-gradient(ellipse_closest-side_at_50%_50%,#000_80%,transparent_100%)] bg-size-[20px_20px]"
    />

    <div
      class="border-border/60 bg-card dark:border-border relative w-full max-w-[380px] px-8 py-5 shadow-xs min-[480px]:rounded-lg min-[480px]:border"
    >
      <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">{{ title }}</h1>
      <p class="text-muted-foreground mt-1">{{ description }}</p>

      <form class="mt-10" @submit="submit">
        <fieldset :disabled="isSubmitting" class="grid gap-5">
          <UiVeeInput required label="Name" name="name" placeholder="John Doe" />
          <UiVeeInput
            required
            label="Email"
            type="email"
            name="email"
            placeholder="john@example.com"
          />
          <UiVeeInput required label="Password" type="password" name="password" />
          <UiButton class="w-full" type="submit" text="Create account" />
        </fieldset>
      </form>
      <p class="text-muted-foreground mt-8 text-sm">
        Already have an account?
        <NuxtLink class="text-primary font-semibold underline-offset-2 hover:underline" to="#"
          >Log in</NuxtLink
        >
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { object, string } from "yup";
  import type { InferType } from "yup";

  const title = "Sign Up";
  const description = "Create an account to get started.";

  useSeoMeta({ title, description });

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
