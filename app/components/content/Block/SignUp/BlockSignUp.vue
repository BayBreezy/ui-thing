<template>
  <div class="relative flex h-screen items-center justify-center">
    <div
      class="absolute h-full w-full bg-[radial-gradient(theme(colors.border/90%)_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"
    />

    <div class="relative w-full max-w-[330px] px-5">
      <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">{{ title }}</h1>
      <p class="mt-1 text-muted-foreground">{{ description }}</p>

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
      <p class="mt-8 text-sm text-muted-foreground">
        Already have an account?
        <NuxtLink class="font-semibold text-primary underline-offset-2 hover:underline" to="#"
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
