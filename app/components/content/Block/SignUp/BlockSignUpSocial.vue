<template>
  <!--
    Sign up form with social sign in below the form
    Features: Name, email and password, divider, Google and GitHub buttons side by side, grid background, terms notice
  -->
  <div class="relative flex min-h-screen items-center justify-center px-5 py-12">
    <div
      class="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] mask-[radial-gradient(circle_at_center,white,transparent_85%)] bg-size-[80px_80px]"
    />
    <div class="relative w-full max-w-sm">
      <div class="space-y-1.5">
        <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">Create your account</h1>
        <p class="text-muted-foreground">Join thousands of teams already building with us.</p>
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
          <UiButton class="w-full" type="submit" text="Get started" />
          <UiDivider label="or sign up with" />
          <div class="grid grid-cols-2 gap-3">
            <UiButton variant="outline" type="button" @click="social('Google')">
              <Icon class="size-4" name="logos:google-icon" />
              Google
            </UiButton>
            <UiButton variant="outline" type="button" @click="social('GitHub')">
              <Icon class="size-4" name="mdi:github" />
              GitHub
            </UiButton>
          </div>
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

  const social = (provider: string) => {
    useSonner(`Continue with ${provider}`, {
      description: "Wire this up to your auth provider.",
    });
  };
</script>
