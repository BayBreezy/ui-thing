<template>
  <div class="bg-muted/50 flex h-screen items-center justify-center px-5">
    <div class="bg-card w-full max-w-[420px] rounded-lg border p-8 shadow-sm">
      <div class="mb-8 text-center">
        <div
          class="bg-primary/10 mx-auto mb-4 flex size-12 items-center justify-center rounded-full"
        >
          <Icon name="lucide:user-circle" class="text-primary size-6" />
        </div>
        <h1 class="text-2xl font-bold tracking-tight">Account Login</h1>
        <p class="text-muted-foreground mt-1 text-sm">Access your dashboard</p>
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
              class="text-primary text-sm font-medium underline-offset-2 hover:underline"
              to="#"
              >Forgot password?</NuxtLink
            >
          </div>
          <UiButton class="w-full" type="submit" text="Sign in" />
        </fieldset>
      </form>

      <div class="mt-6 text-center">
        <p class="text-muted-foreground text-sm">
          New user?
          <NuxtLink class="text-primary font-semibold underline-offset-2 hover:underline" to="#"
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
