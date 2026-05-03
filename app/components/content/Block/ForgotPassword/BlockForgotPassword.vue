<template>
  <div class="relative flex h-screen items-center justify-center">
    <div
      class="absolute inset-0 z-1 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] mask-[radial-gradient(circle,transparent_25%,var(--color-border)_100%)] bg-size-[100px_100px]"
    />
    <div class="relative z-2 w-full max-w-[340px] px-5">
      <div
        class="bg-background mx-auto mb-6 flex size-14 items-center justify-center rounded-lg border"
      >
        <Icon class="size-6" name="lucide:key-round" />
      </div>

      <div class="flex flex-col items-center text-center">
        <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">{{ title }}</h1>
        <p class="text-muted-foreground mt-1">{{ description }}</p>
      </div>

      <form class="mt-10" @submit="submit">
        <fieldset :disabled="isSubmitting" class="grid gap-5">
          <UiVeeInput label="Email" type="email" name="email" placeholder="john@example.com" />
          <UiButton class="w-full" type="submit" text="Send instructions" />
        </fieldset>
      </form>
      <p class="mt-8 text-center text-sm">
        <NuxtLink class="text-primary font-semibold underline-offset-2 hover:underline" to="#"
          >Back to Log in</NuxtLink
        >
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { object, string } from "yup";
  import type { InferType } from "yup";

  const title = "Forgot Password";
  const description = "No worries, we'll send you reset instructions.";

  useSeoMeta({ title, description });

  const LoginSchema = object({
    email: string().email().required().label("Email"),
  });

  const { handleSubmit, isSubmitting } = useForm<InferType<typeof LoginSchema>>({
    validationSchema: LoginSchema,
  });

  const submit = handleSubmit(async (values) => {
    console.log(values);
    useSonner("Check your email", {
      description: "We've sent you an email with instructions to reset your password.",
    });
  });
</script>
