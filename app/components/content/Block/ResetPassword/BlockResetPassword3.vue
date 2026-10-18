<template>
  <!--
    Split screen reset password with a strength meter
    Features: New and confirm password with show and hide toggle, a live strength bar with a label, a requirements checklist, match validation, a panel with password tips that hides on mobile and a success state after saving
  -->
  <div class="grid min-h-screen lg:grid-cols-2">
    <div class="flex flex-col px-6 py-8 sm:px-10">
      <div class="flex items-center gap-2 font-semibold">
        <Icon name="lucide:shield" class="size-6" />
        UI Thing
      </div>

      <div class="flex flex-1 items-center justify-center py-10">
        <div v-if="!saved" class="w-full max-w-sm">
          <div class="space-y-1.5">
            <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">Set a new password</h1>
            <p class="text-muted-foreground">
              Your new password must be different from the ones you used before.
            </p>
          </div>
          <form class="mt-8" @submit="submit">
            <fieldset :disabled="isSubmitting" class="grid gap-5">
              <UiVeePasswordInput
                show-strength
                show-requirements
                label="New password"
                name="password"
                placeholder="Enter a new password"
                :requirements="['length', 'number', 'uppercase', 'special']"
              />
              <UiVeePasswordInput
                label="Confirm password"
                name="confirmPassword"
                placeholder="Repeat your new password"
              />
              <UiButton class="w-full" type="submit">Save password</UiButton>
            </fieldset>
          </form>
        </div>
        <div v-else class="w-full max-w-sm text-center" role="status">
          <div
            class="mx-auto mb-6 flex size-14 items-center justify-center rounded-full bg-green-500/10"
          >
            <Icon class="size-7 text-green-600" name="lucide:circle-check" />
          </div>
          <h1 class="text-2xl font-bold tracking-tight">Password saved</h1>
          <p class="text-muted-foreground mt-2 text-sm">
            You can now log in with your new password.
          </p>
          <UiButton class="mt-8 w-full" size="lg" to="#">Continue to log in</UiButton>
        </div>
      </div>

      <p class="text-muted-foreground text-xs">&copy; UI Thing. All rights reserved.</p>
    </div>

    <div class="bg-muted/50 hidden flex-col justify-center border-l p-14 lg:flex">
      <div class="max-w-md">
        <h2 class="text-2xl font-bold tracking-tight">Tips for a strong password</h2>
        <ul class="mt-8 grid gap-6">
          <li v-for="tip in tips" :key="tip.title" class="flex gap-4">
            <span
              class="bg-background flex size-10 shrink-0 items-center justify-center rounded-lg border"
              ><Icon :name="tip.icon" class="size-5"
            /></span>
            <div>
              <p class="font-medium">{{ tip.title }}</p>
              <p class="text-muted-foreground mt-1 text-sm">{{ tip.description }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { object, string, ref as yupRef } from "yup";
  import type { InferType } from "yup";

  useSeoMeta({
    title: "Set a new password",
    description: "Choose a strong password for your account.",
  });

  const tips = [
    {
      icon: "lucide:ruler",
      title: "Make it long",
      description: "Twelve characters or more is much harder to guess than eight.",
    },
    {
      icon: "lucide:shuffle",
      title: "Mix it up",
      description: "Use upper and lower case letters, numbers and symbols.",
    },
    {
      icon: "lucide:key-round",
      title: "Use a password manager",
      description: "Let it create and remember a different password for every site.",
    },
  ];

  const saved = ref(false);

  // Keep the schema in step with the `requirements` shown in the checklist.
  const ResetSchema = object({
    password: string()
      .required()
      .label("Password")
      .min(8)
      .matches(/[0-9]/, "Password needs a number")
      .matches(/[A-Z]/, "Password needs an uppercase letter")
      .matches(/[^A-Za-z0-9]/, "Password needs a special character"),
    confirmPassword: string()
      .required()
      .label("Confirmation")
      .oneOf([yupRef("password")], "Passwords must match"),
  });

  const { handleSubmit, isSubmitting } = useForm<InferType<typeof ResetSchema>>({
    validationSchema: ResetSchema,
  });

  const submit = handleSubmit(async () => {
    saved.value = true;
  });
</script>
