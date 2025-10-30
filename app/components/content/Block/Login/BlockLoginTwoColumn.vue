<template>
  <div class="grid h-screen lg:grid-cols-2">
    <div class="flex items-center justify-center px-5">
      <div class="w-full max-w-[400px]">
        <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">Welcome back</h1>
        <p class="mt-1 text-muted-foreground">Log in to your account to continue.</p>

        <form class="mt-8" @submit="submit">
          <fieldset :disabled="isSubmitting" class="grid gap-5">
            <UiVeeInput label="Email" type="email" name="email" placeholder="john@example.com" />
            <UiVeeInput label="Password" type="password" name="password" />
            <div class="flex items-center justify-between">
              <UiVeeCheckbox label="Remember me" name="remember" />
              <NuxtLink
                class="text-sm font-medium text-primary underline-offset-2 hover:underline"
                to="#"
                >Forgot password?</NuxtLink
              >
            </div>
            <UiButton class="w-full" type="submit" text="Log in" />
          </fieldset>
        </form>

        <UiDivider class="my-6" label="OR" />

        <div class="grid gap-3">
          <UiButton variant="outline" type="button" @click="signInWithGoogle()">
            <Icon class="size-4" name="logos:google-icon" />
            <span class="ml-2">Continue with Google</span>
          </UiButton>
          <UiButton variant="outline" type="button" @click="signInWithGithub()">
            <Icon class="size-4" name="mdi:github" />
            <span class="ml-2">Continue with Github</span>
          </UiButton>
        </div>

        <p class="mt-6 text-sm text-muted-foreground">
          Don't have an account?
          <NuxtLink class="font-semibold text-primary underline-offset-2 hover:underline" to="#"
            >Create account</NuxtLink
          >
        </p>
      </div>
    </div>
    <div class="hidden bg-muted lg:block">
      <div class="flex h-full flex-col items-center justify-center p-8">
        <div class="max-w-md text-center">
          <Icon name="lucide:lock-keyhole" class="mx-auto mb-6 size-16 text-primary" />
          <h2 class="mb-4 text-2xl font-bold">Secure & Private</h2>
          <p class="text-muted-foreground">
            Your data is encrypted and secure. We never share your information with third parties.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { boolean, object, string } from "yup";
  import type { InferType } from "yup";

  useSeoMeta({
    title: "Welcome back - Log in",
    description: "Log in to your account to continue.",
  });

  const LoginSchema = object({
    email: string().email().required().label("Email"),
    password: string().required().label("Password").min(8),
    remember: boolean().label("Remember me"),
  });

  const { handleSubmit, isSubmitting } = useForm<InferType<typeof LoginSchema>>({
    validationSchema: LoginSchema,
  });

  const submit = handleSubmit(async (_) => {
    useSonner("Logged in successfully!", {
      description: "You have successfully logged in.",
    });
  });

  const signInWithGoogle = () => {
    useSonner("Continue with Google", {
      description: "Redirecting to Google...",
    });
  };

  const signInWithGithub = () => {
    useSonner("Continue with Github", {
      description: "Redirecting to Github...",
    });
  };
</script>
