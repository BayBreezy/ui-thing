<template>
  <div class="flex h-screen items-center justify-center px-5">
    <div class="w-full max-w-[380px]">
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
        <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">Get started for free</h1>
        <p class="text-muted-foreground mt-2">
          No credit card required. Start building immediately.
        </p>
      </div>

      <div class="mt-10">
        <div class="grid gap-3">
          <UiButton variant="outline" type="button" @click="signUpWithGoogle()">
            <Icon class="size-5" name="logos:google-icon" />
            <span class="ml-2">Sign up with Google</span>
          </UiButton>
          <UiButton variant="outline" type="button" @click="signUpWithGithub()">
            <Icon class="size-5" name="mdi:github" />
            <span class="ml-2">Sign up with Github</span>
          </UiButton>
        </div>

        <UiDivider class="my-6" label="Or continue with email" />

        <form @submit="submit">
          <fieldset :disabled="isSubmitting" class="grid gap-5">
            <UiVeeInput required label="Full name" name="name" placeholder="John Doe" />
            <UiVeeInput
              required
              label="Work email"
              type="email"
              name="email"
              placeholder="you@company.com"
            />
            <UiVeeInput required label="Password" type="password" name="password" />
            <div class="flex items-start gap-3">
              <UiVeeCheckbox
                required
                name="marketing"
                label="Send me occasional product updates and announcements"
              />
            </div>
            <UiButton class="w-full" type="submit" text="Create account" />
          </fieldset>
        </form>

        <p class="text-muted-foreground mt-6 text-center text-sm">
          Already have an account?
          <NuxtLink class="text-primary font-semibold underline-offset-2 hover:underline" to="#"
            >Sign in</NuxtLink
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { boolean, object, string } from "yup";
  import type { InferType } from "yup";

  useSeoMeta({
    title: "Get started for free",
    description: "No credit card required. Start building immediately.",
  });

  const Schema = object({
    name: string().required().label("Full name").min(3),
    email: string().email().required().label("Work email"),
    password: string().required().label("Password").min(8),
    marketing: boolean().label("Marketing"),
  });

  const { handleSubmit, isSubmitting } = useForm<InferType<typeof Schema>>({
    validationSchema: Schema,
  });

  const submit = handleSubmit(async (_) => {
    useSonner("Account created!", {
      description: "You have successfully created an account.",
    });
  });

  const signUpWithGoogle = () => {
    useSonner("Sign up with Google", {
      description: "Redirecting to Google...",
    });
  };

  const signUpWithGithub = () => {
    useSonner("Sign up with Github", {
      description: "Redirecting to Github...",
    });
  };
</script>
