<template>
  <div class="flex h-screen items-center justify-center px-5">
    <div class="w-full max-w-[480px]">
      <div class="text-center">
        <svg
          class="fill-primary mx-auto mb-6 h-10"
          viewBox="0 0 53 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.2997 0L52.0461 28.6301V44H38.6311V34.1553L17.7522 13.3607L13.415 13.3607L13.415 44H0L0 0L23.2997 0ZM38.6311 15.2694V0L52.0461 0V15.2694L38.6311 15.2694Z"
            class="ccustom"
          />
        </svg>
        <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">Sign in to your account</h1>
        <p class="text-muted-foreground mt-2">
          Or
          <NuxtLink class="text-primary font-semibold underline-offset-2 hover:underline" to="#"
            >start your free trial</NuxtLink
          >
        </p>
      </div>

      <div class="mt-10">
        <div class="grid gap-3">
          <UiButton variant="outline" type="button" @click="signInWithGoogle()">
            <Icon class="size-5" name="logos:google-icon" />
            <span class="ml-2">Sign in with Google</span>
          </UiButton>
          <UiButton variant="outline" type="button" @click="signInWithGithub()">
            <Icon class="size-5" name="mdi:github" />
            <span class="ml-2">Sign in with Github</span>
          </UiButton>
        </div>

        <UiDivider class="my-6" label="Or continue with" />

        <form @submit="submit">
          <fieldset :disabled="isSubmitting" class="grid gap-5">
            <UiVeeInput
              label="Email address"
              type="email"
              name="email"
              placeholder="you@example.com"
            />
            <UiVeeInput label="Password" type="password" name="password" />
            <div class="flex items-center justify-between">
              <UiVeeCheckbox label="Remember me" name="remember" />
              <NuxtLink
                class="text-primary text-sm font-medium underline-offset-2 hover:underline"
                to="#"
                >Forgot password?</NuxtLink
              >
            </div>
            <UiButton class="w-full" type="submit" text="Sign in" />
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { boolean, object, string } from "yup";
  import type { InferType } from "yup";

  useSeoMeta({
    title: "Sign in to your account",
    description: "Sign in to your account or start your free trial.",
  });

  const LoginSchema = object({
    email: string().email().required().label("Email address"),
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
