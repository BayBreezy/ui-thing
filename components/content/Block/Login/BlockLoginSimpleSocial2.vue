<template>
  <div class="flex h-screen items-center justify-center">
    <div class="w-full max-w-[330px] px-5">
      <svg
        class="mx-auto my-6 h-8 fill-primary"
        viewBox="0 0 53 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M23.2997 0L52.0461 28.6301V44H38.6311V34.1553L17.7522 13.3607L13.415 13.3607L13.415 44H0L0 0L23.2997 0ZM38.6311 15.2694V0L52.0461 0V15.2694L38.6311 15.2694Z"
          class="ccustom"
        />
      </svg>

      <div class="flex flex-col items-center">
        <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">Log in</h1>
        <p class="mt-1 text-muted-foreground">Enter your email & password to log in.</p>
      </div>

      <form class="mt-10" @submit="submit">
        <fieldset :disabled="isSubmitting" class="grid gap-4">
          <UiVeeInput label="Email" type="email" name="email" placeholder="john@example.com" />
          <UiButton class="w-full" type="submit" text="Log in" />

          <UiDivider label="OR" />
          <UiButton variant="outline" type="button" @click="signInWithGoogle()">
            <Icon class="size-4" name="logos:google-icon" />
            <span class="ml-2">Continue with Google</span>
          </UiButton>
          <UiButton variant="outline" type="button" @click="signInWithFacebook()">
            <Icon class="size-4" name="logos:facebook" />
            <span class="ml-2">Continue with Facebook</span>
          </UiButton>
          <UiButton variant="outline" type="button" @click="signInWithGithub()">
            <Icon class="size-4" name="mdi:github" />
            <span class="ml-2">Continue with Github</span>
          </UiButton>
        </fieldset>
      </form>
      <p class="mt-8 text-center text-sm text-muted-foreground">
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
    description: "Log in with your email or continue with Google, Facebook, or Github.",
  });

  const LoginSchema = object({
    email: string().email().required().label("Email"),
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

  const signInWithFacebook = () => {
    useSonner("Logged in successfully!", {
      description: "You have successfully logged in with Facebook.",
    });
  };

  const signInWithGithub = () => {
    useSonner("Logged in successfully!", {
      description: "You have successfully logged in with Github.",
    });
  };
</script>
