<template>
  <div class="relative flex h-screen items-center justify-center">
    <div
      class="absolute inset-0 z-[1] bg-[linear-gradient(to_right,theme(colors.border)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.border)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(circle,transparent_25%,theme(colors.border)_100%)]"
    />
    <div class="relative z-[2] w-full max-w-[340px] px-5">
      <div
        class="mx-auto mb-6 flex size-14 items-center justify-center rounded-lg border bg-background"
      >
        <Icon class="size-6" name="lucide:lock" />
      </div>

      <div class="flex flex-col items-center text-center">
        <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">{{ title }}</h1>
        <p class="mt-1 text-muted-foreground">{{ description }}</p>
      </div>

      <form class="mt-10" @submit="submit">
        <fieldset :disabled="isSubmitting" class="grid gap-5">
          <UiVeeInput label="Password" type="password" name="password" placeholder="••••••••" />
          <UiVeeInput
            label="Confirm password"
            type="password"
            name="confirmPassword"
            placeholder="••••••••"
          />
          <ul class="flex flex-col gap-4">
            <li class="flex items-center gap-3 text-sm text-muted-foreground">
              <Icon
                :class="[meta.valid ? 'text-green-500' : '']"
                class="size-4"
                name="lucide:check-circle-2"
              />
              <span>At least 8 characters</span>
            </li>
            <li class="flex items-center gap-3 text-sm text-muted-foreground">
              <Icon
                :class="[meta.valid ? 'text-green-500' : '']"
                class="size-4"
                name="lucide:check-circle-2"
              />
              <span>At least 1 number & special character</span>
            </li>
          </ul>
          <UiButton class="w-full" type="submit" text="Set new password" />
        </fieldset>
      </form>
      <p class="mt-8 text-center text-sm">
        <NuxtLink class="font-semibold text-primary underline-offset-2 hover:underline" to="#"
          >Back to Log in</NuxtLink
        >
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { object, string, ref as yupRef } from "yup";
  import type { InferType } from "yup";

  const title = "New Password";
  const description = "Enter your new password below.";

  useSeoMeta({ title, description });

  const LoginSchema = object({
    password: string()
      .required()
      .min(8)
      .label("Password")
      .test("password", "Password must contain at least 1 number & special character", (value) => {
        return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(value);
      }),
    confirmPassword: string()
      .required()
      .oneOf([yupRef("password")], "Passwords must match"),
  });

  const { handleSubmit, isSubmitting, meta } = useForm<InferType<typeof LoginSchema>>({
    validationSchema: LoginSchema,
  });

  const submit = handleSubmit(async (_) => {
    useSonner("Password updated", {
      description: "Your password has been updated successfully.",
    });
  });
</script>
