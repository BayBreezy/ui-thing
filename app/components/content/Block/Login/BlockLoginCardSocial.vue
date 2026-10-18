<template>
  <!--
    Login card with a row of social buttons
    Features: Card on a patterned background, three social buttons in a row, email divider, remember me, terms notice under the card
  -->
  <div
    class="bg-muted/40 relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-12"
  >
    <UiBgPatternGrid
      class="text-border pointer-events-none absolute top-0 left-1/2 -translate-x-1/2"
      aria-hidden="true"
    />
    <div class="relative w-full max-w-md">
      <UiCard class="shadow-sm">
        <UiCardHeader class="justify-items-center text-center">
          <div
            class="bg-primary text-primary-foreground mb-3 flex size-11 items-center justify-center rounded-xl"
          >
            <Icon name="lucide:log-in" class="size-5" />
          </div>
          <UiCardTitle class="text-2xl">Welcome back</UiCardTitle>
          <UiCardDescription>Choose how you'd like to log in.</UiCardDescription>
        </UiCardHeader>
        <UiCardContent class="grid gap-6">
          <div class="grid grid-cols-3 gap-3">
            <UiButton
              v-for="provider in providers"
              :key="provider.name"
              variant="outline"
              type="button"
              :aria-label="`Continue with ${provider.name}`"
              @click="social(provider.name)"
            >
              <Icon class="size-5" :name="provider.icon" />
            </UiButton>
          </div>

          <UiDivider label="or continue with email" />

          <form @submit="submit">
            <fieldset :disabled="isSubmitting" class="grid gap-5">
              <UiVeeInput label="Email" type="email" name="email" placeholder="you@example.com" />
              <UiVeePasswordInput
                label="Password"
                name="password"
                placeholder="Enter your password"
              />
              <div class="flex items-center justify-between">
                <UiVeeCheckbox label="Remember me" name="remember" />
                <NuxtLink
                  class="text-muted-foreground hover:text-foreground text-sm underline-offset-4 hover:underline"
                  to="#"
                >
                  Forgot password?
                </NuxtLink>
              </div>
              <UiButton class="w-full" type="submit" text="Log in" />
            </fieldset>
          </form>
        </UiCardContent>
        <UiCardFooter class="justify-center border-t">
          <p class="text-muted-foreground text-sm">
            Don't have an account?
            <NuxtLink
              class="text-foreground font-semibold underline-offset-4 hover:underline"
              to="#"
            >
              Sign up
            </NuxtLink>
          </p>
        </UiCardFooter>
      </UiCard>

      <p class="text-muted-foreground mt-6 text-center text-xs text-balance">
        By continuing you agree to our
        <NuxtLink class="hover:text-foreground underline underline-offset-4" to="#"
          >Terms of Service</NuxtLink
        >
        and
        <NuxtLink class="hover:text-foreground underline underline-offset-4" to="#"
          >Privacy Policy</NuxtLink
        >.
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { boolean, object, string } from "yup";
  import type { InferType } from "yup";

  const providers = [
    { name: "Google", icon: "logos:google-icon" },
    { name: "GitHub", icon: "mdi:github" },
    { name: "Apple", icon: "mdi:apple" },
  ];

  const LoginSchema = object({
    email: string().email().required().label("Email"),
    password: string().required().label("Password").min(8),
    remember: boolean().label("Remember me"),
  });

  const { handleSubmit, isSubmitting } = useForm<InferType<typeof LoginSchema>>({
    validationSchema: LoginSchema,
  });

  const submit = handleSubmit(async (_) => {
    useSonner("Logged in successfully!", {
      description: "You have successfully logged in.",
    });
  });

  const social = (provider: string) => {
    useSonner(`Continue with ${provider}`, {
      description: "Wire this up to your auth provider.",
    });
  };
</script>
