<template>
  <div class="flex h-screen items-center justify-center">
    <div class="w-full max-w-[360px] px-5">
      <svg
        class="my-6 h-8 fill-primary"
        viewBox="0 0 53 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M23.2997 0L52.0461 28.6301V44H38.6311V34.1553L17.7522 13.3607L13.415 13.3607L13.415 44H0L0 0L23.2997 0ZM38.6311 15.2694V0L52.0461 0V15.2694L38.6311 15.2694Z"
          class="ccustom"
        />
      </svg>

      <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">Log in</h1>
      <p class="mt-1 text-muted-foreground">Enter your email & password to log in.</p>

      <form class="mt-10" @submit="submit">
        <fieldset :disabled="isSubmitting" class="grid gap-5">
          <UiVeeInput label="Email" type="email" name="email" placeholder="john@example.com" />
          <UiVeeInput label="Password" type="password" name="password" />
          <div class="flex items-start justify-between">
            <UiVeeCheckbox label="Remember me" name="remember" />
            <NuxtLink class="text-sm font-medium text-primary underline underline-offset-2" to="#"
              >Forgot password?</NuxtLink
            >
          </div>
          <UiButton class="w-full" type="submit" text="Log in" />
        </fieldset>
      </form>

      <p class="mt-6 text-sm text-muted-foreground">
        Don't have an account?
        <NuxtLink class="font-semibold text-primary underline-offset-2 hover:underline" to="#"
          >Create account</NuxtLink
        >
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { boolean, object, string } from "yup";
  import type { InferType } from "yup";

  useSeoMeta({
    title: "Log in",
    description: "Enter your email & password to log in.",
  });

  const LoginSchema = object({
    email: string().email().required().label("Email"),
    password: string().required().label("Password").min(8),
    remember: boolean()
      .label("Remember me")
      .test("remember", "Must be checked", (value) => value === true),
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
