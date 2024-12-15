<template>
  <div class="flex h-screen items-center justify-center">
    <div
      class="w-full max-w-[380px] border border-border/60 bg-card px-8 py-5 shadow-sm dark:border-border min-[480px]:rounded-lg"
    >
      <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">Log in</h1>
      <p class="mt-1 text-muted-foreground">Enter your email & password to log in.</p>

      <form class="mt-10" @submit="submit">
        <fieldset :disabled="isSubmitting" class="grid gap-5">
          <div>
            <UiVeeInput label="Email" type="email" name="email" placeholder="john@example.com" />
          </div>
          <div>
            <UiVeeInput label="Password" type="password" name="password" />
          </div>
          <div>
            <UiButton class="w-full" type="submit" text="Log in" />
          </div>
        </fieldset>
      </form>
      <p class="mt-8 text-sm">
        <NuxtLink class="font-semibold text-primary underline-offset-2 hover:underline" to="#"
          >Forgot password?</NuxtLink
        >
      </p>
      <p class="mt-4 text-sm text-muted-foreground">
        Don't have an account?
        <NuxtLink class="font-semibold text-primary underline-offset-2 hover:underline" to="#"
          >Create account</NuxtLink
        >
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { object, string } from "yup";
  import type { InferType } from "yup";

  useSeoMeta({
    title: "Log in",
    description: "Enter your email & password to log in.",
  });

  const LoginSchema = object({
    email: string()
      .email()
      .required()
      .label("Email")
      .matches(/[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/gim, {
        message: "Invalid email address",
      }),
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
