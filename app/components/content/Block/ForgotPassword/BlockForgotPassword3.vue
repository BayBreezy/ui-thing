<template>
  <!--
    Split screen forgot password with a how it works panel
    Features: Email form on the left, brand panel on the right that explains the three recovery steps, panel hides on mobile
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
            <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">Forgot your password?</h1>
            <p class="text-muted-foreground">
              No worries. Enter your email and we'll send you a link to reset it.
            </p>
          </div>

          <form class="mt-8" @submit="submit">
            <fieldset :disabled="isSubmitting" class="grid gap-5">
              <UiVeeInput label="Email" type="email" name="email" placeholder="you@example.com" />
              <UiButton class="w-full" type="submit">
                <Icon name="lucide:send" class="size-4" />
                Send reset link
              </UiButton>
            </fieldset>
          </form>

          <p class="mt-8 text-center text-sm">
            <NuxtLink
              class="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 font-medium underline-offset-4 hover:underline"
              to="#"
            >
              <Icon name="lucide:arrow-left" class="size-4" />
              Back to log in
            </NuxtLink>
          </p>
        </div>
      </div>

      <p class="text-muted-foreground text-xs">&copy; UI Thing. All rights reserved.</p>
    </div>

    <div
      class="bg-primary text-primary-foreground relative hidden flex-col justify-center overflow-hidden p-14 lg:flex"
    >
      <div
        class="bg-primary-foreground/10 absolute -top-24 -right-24 size-96 rounded-full blur-3xl"
      />
      <div
        class="bg-primary-foreground/10 absolute -bottom-32 -left-16 size-80 rounded-full blur-3xl"
      />
      <div class="relative max-w-md">
        <h2 class="text-3xl font-bold tracking-tight text-balance">
          Back in your account in minutes
        </h2>
        <ol class="mt-10 grid gap-8">
          <li v-for="(item, i) in steps" :key="item.title" class="flex gap-4">
            <span
              class="bg-primary-foreground/15 flex size-10 shrink-0 items-center justify-center rounded-full"
            >
              <Icon :name="item.icon" class="size-5" />
            </span>
            <div>
              <p class="font-semibold">{{ i + 1 }}. {{ item.title }}</p>
              <p class="text-primary-foreground/70 mt-1 text-sm">{{ item.description }}</p>
            </div>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { object, string } from "yup";
  import type { InferType } from "yup";

  useSeoMeta({
    title: "Forgot your password?",
    description: "Enter your email and we'll send you a link to reset your password.",
  });

  const steps = [
    {
      icon: "lucide:mail",
      title: "Check your inbox",
      description: "We email you a secure link that works for 24 hours.",
    },
    {
      icon: "lucide:key-round",
      title: "Choose a new password",
      description: "Pick something strong that you don't use anywhere else.",
    },
    {
      icon: "lucide:log-in",
      title: "Log back in",
      description: "Sign in with your new password and carry on.",
    },
  ];

  const ForgotSchema = object({
    email: string().email().required().label("Email"),
  });

  const { handleSubmit, isSubmitting } = useForm<InferType<typeof ForgotSchema>>({
    validationSchema: ForgotSchema,
  });

  const submit = handleSubmit(async (_) => {
    useSonner("Check your email", {
      description: "We've sent password reset instructions.",
    });
  });
</script>
