<template>
  <!--
    Login form with social sign in below the form
    Features: Email and password, divider, Google and GitHub buttons side by side, forgot password link beside the field
  -->
  <div class="flex min-h-screen items-center justify-center px-5 py-12">
    <div class="w-full max-w-sm">
      <div class="space-y-1.5">
        <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">Log in</h1>
        <p class="text-muted-foreground">Welcome back. Enter your details below.</p>
      </div>

      <form class="mt-8" @submit="submit">
        <fieldset :disabled="isSubmitting" class="grid gap-5">
          <UiVeeInput label="Email" type="email" name="email" placeholder="you@example.com" />
          <div class="grid gap-2">
            <UiVeePasswordInput
              label="Password"
              name="password"
              placeholder="Enter your password"
            />
            <NuxtLink
              class="text-muted-foreground hover:text-foreground justify-self-end text-sm underline-offset-4 hover:underline"
              to="#"
            >
              Forgot password?
            </NuxtLink>
          </div>
          <UiButton class="w-full" type="submit" text="Log in" />
          <UiDivider label="or continue with" />
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
        Don't have an account?
        <NuxtLink class="text-foreground font-semibold underline-offset-4 hover:underline" to="#">
          Create account
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { object, string } from "yup";
  import type { InferType } from "yup";

  const LoginSchema = object({
    email: string().email().required().label("Email"),
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

  const social = (provider: string) => {
    useSonner(`Continue with ${provider}`, {
      description: "Wire this up to your auth provider.",
    });
  };
</script>
