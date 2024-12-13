<template>
  <div class="flex justify-center">
    <UiDialog v-model:open="open">
      <UiDialogTrigger as-child>
        <UiButton variant="outline">Sign in</UiButton>
      </UiDialogTrigger>
      <UiDialogContent class="max-w-[400px] gap-4">
        <div class="flex flex-col items-center gap-4">
          <UiFancyIcon circle>
            <Icon name="lucide:user" mode="svg" />
          </UiFancyIcon>
          <UiDialogHeader class="mb-6">
            <UiDialogTitle class="sm:text-center">Welcome back</UiDialogTitle>
            <UiDialogDescription class="sm:text-center"
              >Enter your credentials to login to your account.</UiDialogDescription
            >
          </UiDialogHeader>
        </div>

        <form @submit="submit">
          <fieldset :disabled="isSubmitting" class="grid grid-cols-1 gap-4">
            <UiVeeInput
              label="Email"
              placeholder="hi@mycompany.com"
              name="email"
              type="email"
              required
            />
            <UiVeeInput
              label="Password"
              placeholder="Enter your password"
              name="password"
              type="password"
              required
            />
            <div class="flex items-center justify-between py-2">
              <UiVeeCheckbox name="rememberMe" label="Remember me" />
              <NuxtLink class="text-sm underline underline-offset-2" to="#"
                >Forgot password?</NuxtLink
              >
            </div>
            <UiButton type="submit" class="w-full" text="Sign in" />
            <UiDivider label="Or" />
            <UiButton variant="outline" type="button" class="w-full"
              ><Icon name="logos:google-icon" /> Sign in with Google</UiButton
            >
          </fieldset>
        </form>
        <p class="text-center text-xs text-muted-foreground">
          By logging in, you agree to our
          <a class="underline hover:no-underline" href="#">Terms</a>.
        </p>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script lang="ts" setup>
  import { z } from "zod";

  const { handleSubmit, isSubmitting } = useForm({
    name: "dialog-sign-in",
    validationSchema: toTypedSchema(
      z.object({
        email: z.string().email(),
        password: z.string().min(8).max(50),
        rememberMe: z.boolean().optional().default(true),
      })
    ),
  });

  const open = defineModel<boolean>({ default: false });

  const submit = handleSubmit(async () => {
    try {
      useSonner.success("You have successfully signed in", {
        description: `Welcome back!`,
      });
      open.value = false;
    } catch (error: any) {
      useSonner.error("An error occurred while signing in", {
        description: error.message,
      });
    }
  });
</script>
