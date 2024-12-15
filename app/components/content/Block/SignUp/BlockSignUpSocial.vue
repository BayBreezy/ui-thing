<template>
  <div class="relative flex h-screen items-center justify-center">
    <div
      class="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.border/80%)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.border/80%)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"
    />

    <div class="relative w-full max-w-[330px] px-5">
      <div class="flex flex-col items-center">
        <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">{{ title }}</h1>
        <p class="mt-1 text-muted-foreground">{{ description }}</p>
      </div>

      <form class="mt-10" @submit="submit">
        <fieldset :disabled="isSubmitting" class="grid gap-5">
          <UiVeeInput
            required
            label="Email"
            type="email"
            name="email"
            placeholder="john@example.com"
          />
          <UiButton class="w-full" type="submit" text="Get Started" />
          <UiDivider label="OR" />
          <UiButton variant="outline" type="button" @click="signInWithGoogle()">
            <Icon class="size-4" name="logos:google-icon" />
            <span class="ml-2">Sign up with Google</span>
          </UiButton>
          <UiButton variant="outline" type="button" @click="signInWithFacebook()">
            <Icon class="size-4" name="logos:facebook" />
            <span class="ml-2">Sign up with Facebook</span>
          </UiButton>
          <UiButton variant="outline" type="button" @click="signInWithGithub()">
            <Icon class="size-4" name="mdi:github" />
            <span class="ml-2">Sign up with Github</span>
          </UiButton>
        </fieldset>
      </form>
      <p class="mt-8 text-center text-sm text-muted-foreground">
        Already have an account?
        <NuxtLink class="font-semibold text-primary underline-offset-2 hover:underline" to="#"
          >Log in</NuxtLink
        >
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { object, string } from "yup";
  import type { InferType } from "yup";

  const title = "Sign Up";
  const description = "Create an account to get started.";

  useSeoMeta({ title, description });

  const Schema = object({
    email: string().email().required().label("Email"),
  });

  const { handleSubmit, isSubmitting } = useForm<InferType<typeof Schema>>({
    validationSchema: Schema,
  });

  const submit = handleSubmit(async (_) => {
    useSonner("Account created!", {
      description: "You have successfully created an account.",
    });
  });

  const signInWithGoogle = () => {
    useSonner("Getting started!", {
      description: "Redirecting to Google...",
    });
  };

  const signInWithFacebook = () => {
    useSonner("Getting started!", {
      description: "Redirecting to Facebook...",
    });
  };

  const signInWithGithub = () => {
    useSonner("Getting started!", {
      description: "Redirecting to Github...",
    });
  };
</script>
