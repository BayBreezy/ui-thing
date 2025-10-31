<template>
  <div class="grid h-screen lg:grid-cols-2">
    <div class="flex items-center justify-center px-5">
      <div class="w-full max-w-[400px]">
        <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">Create your account</h1>
        <p class="mt-1 text-muted-foreground">Get started with your free account today.</p>

        <form class="mt-8" @submit="submit">
          <fieldset :disabled="isSubmitting" class="grid gap-5">
            <div class="grid grid-cols-2 gap-3">
              <UiVeeInput required label="First name" name="firstName" placeholder="John" />
              <UiVeeInput required label="Last name" name="lastName" placeholder="Doe" />
            </div>
            <UiVeeInput
              required
              label="Email"
              type="email"
              name="email"
              placeholder="john@example.com"
            />
            <UiVeeInput required label="Password" type="password" name="password" />
            <UiVeeCheckbox
              required
              name="terms"
              label="I agree to the Terms of Service and Privacy Policy"
            />
            <UiButton class="w-full" type="submit" text="Create account" />
          </fieldset>
        </form>

        <UiDivider class="my-6" label="OR" />

        <div class="grid gap-3">
          <UiButton variant="outline" type="button" @click="signUpWithGoogle()">
            <Icon class="size-4" name="logos:google-icon" />
            <span class="ml-2">Sign up with Google</span>
          </UiButton>
          <UiButton variant="outline" type="button" @click="signUpWithGithub()">
            <Icon class="size-4" name="mdi:github" />
            <span class="ml-2">Sign up with Github</span>
          </UiButton>
        </div>

        <p class="mt-6 text-sm text-muted-foreground">
          Already have an account?
          <NuxtLink class="font-semibold text-primary underline-offset-2 hover:underline" to="#"
            >Log in</NuxtLink
          >
        </p>
      </div>
    </div>
    <div class="hidden bg-muted lg:block">
      <div class="flex h-full flex-col items-center justify-center p-8">
        <div class="max-w-md text-center">
          <Icon name="lucide:rocket" class="mx-auto mb-6 size-16 text-primary" />
          <h2 class="mb-4 text-2xl font-bold">Start building today</h2>
          <p class="text-muted-foreground">
            Join thousands of developers and teams using our platform to build amazing products.
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
    title: "Create your account",
    description: "Get started with your free account today.",
  });

  const Schema = object({
    firstName: string().required().label("First name").min(2),
    lastName: string().required().label("Last name").min(2),
    email: string().email().required().label("Email"),
    password: string().required().label("Password").min(8),
    terms: boolean()
      .required()
      .label("Terms")
      .test("terms", "You must accept the terms", (value) => value === true),
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
