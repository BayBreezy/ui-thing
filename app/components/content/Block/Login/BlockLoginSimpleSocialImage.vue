<template>
  <!--
    Split screen login with a full height image
    Features: Form on the left with logo and footer, image with caption on the right that hides on mobile, social sign in, password toggle
  -->
  <div class="grid min-h-screen lg:grid-cols-2">
    <div class="flex flex-col px-6 py-8 sm:px-10">
      <div class="flex items-center gap-2 font-semibold">
        <svg
          class="fill-primary h-6"
          viewBox="0 0 53 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.2997 0L52.0461 28.6301V44H38.6311V34.1553L17.7522 13.3607L13.415 13.3607L13.415 44H0L0 0L23.2997 0ZM38.6311 15.2694V0L52.0461 0V15.2694L38.6311 15.2694Z"
          />
        </svg>
        UI Thing
      </div>

      <div class="flex flex-1 items-center justify-center py-10">
        <div class="w-full max-w-sm">
          <div class="space-y-1.5">
            <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">Welcome back</h1>
            <p class="text-muted-foreground">Log in to pick up where you left off.</p>
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
              <UiDivider label="OR" />
              <UiButton variant="outline" type="button" @click="signInWithGoogle()">
                <Icon class="size-4" name="logos:google-icon" />
                Continue with Google
              </UiButton>
            </fieldset>
          </form>

          <p class="text-muted-foreground mt-8 text-center text-sm">
            Don't have an account?
            <NuxtLink
              class="text-foreground font-semibold underline-offset-4 hover:underline"
              to="#"
            >
              Create account
            </NuxtLink>
          </p>
        </div>
      </div>

      <p class="text-muted-foreground text-xs">&copy; UI Thing. All rights reserved.</p>
    </div>

    <div class="relative hidden lg:block">
      <img
        src="https://images.unsplash.com/photo-1512551980832-13df02babc9e?q=60&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Abstract light lines on a dark ceiling"
        class="absolute inset-0 size-full object-cover"
      />
      <div class="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent" />
      <div class="absolute inset-x-0 bottom-0 p-10 text-white">
        <p class="max-w-md text-lg font-medium">Build the interface once, own the code forever.</p>
        <p class="mt-2 text-sm text-white/70">Copy, paste and make it yours.</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { object, string } from "yup";
  import type { InferType } from "yup";

  useSeoMeta({
    title: "Log in",
    description: "Enter your email and password to log in.",
  });

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

  const signInWithGoogle = () => {
    useSonner("Logged in successfully!", {
      description: "You have successfully logged in with Google.",
    });
  };
</script>
