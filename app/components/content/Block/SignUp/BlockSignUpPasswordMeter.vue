<template>
  <div class="relative flex h-screen items-center justify-center">
    <div
      class="absolute h-full w-full bg-[radial-gradient(--alpha(var(--color-border)/90%)_1px,transparent_1px)] mask-[radial-gradient(ellipse_closest-side_at_50%_50%,#000_60%,transparent_100%)] bg-size-[20px_20px]"
    />

    <div class="relative w-full max-w-[330px] px-5">
      <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">{{ title }}</h1>
      <p class="text-muted-foreground mt-1">{{ description }}</p>

      <form class="mt-10" @submit="submit">
        <fieldset :disabled="isSubmitting" class="grid gap-5">
          <UiVeeInput required label="Name" name="name" placeholder="John Doe" />
          <UiVeeInput
            required
            label="Email"
            type="email"
            name="email"
            placeholder="john@example.com"
          />
          <UiVeeInput required label="Password" type="password" name="password" />
          <ul class="flex flex-col gap-4">
            <li class="text-muted-foreground flex items-center gap-3 text-sm">
              <Icon
                :class="[meta.valid ? 'text-green-500' : '']"
                class="size-[18px]"
                name="lucide:check-circle-2"
              />
              <span>At least 8 characters</span>
            </li>
            <li class="text-muted-foreground flex items-center gap-3 text-sm">
              <Icon
                :class="[meta.valid ? 'text-green-500' : '']"
                class="size-[18px]"
                name="lucide:check-circle-2"
              />
              <span>At least 1 number & special character</span>
            </li>
          </ul>
          <UiButton class="w-full" type="submit" text="Create account" />
        </fieldset>
      </form>
      <p class="text-muted-foreground mt-8 text-sm">
        Already have an account?
        <NuxtLink class="text-primary font-semibold underline-offset-2 hover:underline" to="#"
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
    name: string().required().label("Name").min(3).max(50),
    email: string().email().required().label("Email"),
    password: string()
      .required()
      .min(8)
      .label("Password")
      .test("password", "Password must contain at least 1 number & special character", (value) => {
        return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(value);
      }),
  });

  const { handleSubmit, isSubmitting, meta } = useForm<InferType<typeof Schema>>({
    validationSchema: Schema,
  });

  const submit = handleSubmit(async (_) => {
    useSonner("Account created!", {
      description: "You have successfully created an account.",
    });
  });
</script>
