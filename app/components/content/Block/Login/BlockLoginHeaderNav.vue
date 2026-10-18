<template>
  <!--
    Login page with a header navigation bar
    Features: Top bar with logo, links and sign up button, centered form with social sign in, links collapse on mobile
  -->
  <div class="flex min-h-screen flex-col">
    <header class="border-b">
      <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <NuxtLink to="#" class="flex items-center gap-2 font-semibold">
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
        </NuxtLink>
        <nav class="text-muted-foreground hidden items-center gap-6 text-sm font-medium md:flex">
          <NuxtLink v-for="link in links" :key="link" to="#" class="hover:text-foreground">
            {{ link }}
          </NuxtLink>
        </nav>
        <UiButton variant="outline" size="sm">Sign up</UiButton>
      </div>
    </header>

    <main class="flex flex-1 items-center justify-center px-5 py-12">
      <div class="w-full max-w-sm">
        <div class="text-center">
          <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">Log in to your account</h1>
          <p class="text-muted-foreground mt-2">Welcome back. Please enter your details.</p>
        </div>

        <form class="mt-8" @submit="submit">
          <fieldset :disabled="isSubmitting" class="grid gap-5">
            <UiVeeInput label="Email" type="email" name="email" placeholder="you@example.com" />
            <UiVeePasswordInput
              label="Password"
              name="password"
              placeholder="Enter your password"
            />
            <div class="flex items-center justify-between">
              <UiVeeCheckbox label="Remember me" name="remember" />
              <NuxtLink
                class="text-muted-foreground hover:text-foreground text-sm underline-offset-4 hover:underline"
                to="#"
              >
                Forgot password?
              </NuxtLink>
            </div>
            <UiButton class="w-full" type="submit" text="Log in" />
            <UiButton variant="outline" type="button" @click="signInWithGoogle()">
              <Icon class="size-4" name="logos:google-icon" />
              Log in with Google
            </UiButton>
          </fieldset>
        </form>

        <p class="text-muted-foreground mt-8 text-center text-sm">
          Don't have an account?
          <NuxtLink class="text-foreground font-semibold underline-offset-4 hover:underline" to="#">
            Sign up
          </NuxtLink>
        </p>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
  import { boolean, object, string } from "yup";
  import type { InferType } from "yup";

  const links = ["Product", "Pricing", "Docs", "Support"];

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
    useSonner("Logged in successfully!", {
      description: "You have successfully logged in with Google.",
    });
  };
</script>
