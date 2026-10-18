<template>
  <!--
    Sign up form inside a card
    Features: Centered card on a dot pattern, logo header, password toggle, terms notice, log in footer
  -->
  <div class="bg-muted/40 relative flex min-h-screen items-center justify-center px-5 py-12">
    <div
      class="absolute h-full w-full bg-[radial-gradient(--alpha(var(--color-border)/90%)_1px,transparent_1px)] mask-[radial-gradient(ellipse_closest-side_at_50%_50%,#000_60%,transparent_100%)] bg-size-[20px_20px]"
    />
    <div class="relative w-full max-w-md">
      <UiCard class="shadow-sm">
        <UiCardHeader class="justify-items-center text-center">
          <svg
            class="fill-primary mb-3 h-8"
            viewBox="0 0 53 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.2997 0L52.0461 28.6301V44H38.6311V34.1553L17.7522 13.3607L13.415 13.3607L13.415 44H0L0 0L23.2997 0ZM38.6311 15.2694V0L52.0461 0V15.2694L38.6311 15.2694Z"
            />
          </svg>
          <UiCardTitle class="text-2xl">Create your account</UiCardTitle>
          <UiCardDescription>Start building in minutes. No credit card needed.</UiCardDescription>
        </UiCardHeader>
        <UiCardContent>
          <form @submit="submit">
            <fieldset :disabled="isSubmitting" class="grid gap-5">
              <UiVeeInput required label="Name" name="name" placeholder="Jane Doe" />
              <UiVeeInput
                required
                label="Email"
                type="email"
                name="email"
                placeholder="you@example.com"
              />
              <UiVeePasswordInput
                required
                label="Password"
                name="password"
                placeholder="Create a password"
                hint="Must be at least 8 characters."
              />
              <UiButton class="w-full" type="submit" text="Create account" />
            </fieldset>
          </form>
        </UiCardContent>
        <UiCardFooter class="justify-center border-t">
          <p class="text-muted-foreground text-sm">
            Already have an account?
            <NuxtLink
              class="text-foreground font-semibold underline-offset-4 hover:underline"
              to="#"
            >
              Log in
            </NuxtLink>
          </p>
        </UiCardFooter>
      </UiCard>
      <p class="text-muted-foreground mt-6 text-center text-xs text-balance">
        By signing up you agree to our
        <NuxtLink class="hover:text-foreground underline underline-offset-4" to="#">
          Terms of Service
        </NuxtLink>
        and
        <NuxtLink class="hover:text-foreground underline underline-offset-4" to="#">
          Privacy Policy
        </NuxtLink>
        .
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { object, string } from "yup";
  import type { InferType } from "yup";

  const Schema = object({
    name: string().required().label("Name").min(3).max(50),
    email: string().email().required().label("Email"),
    password: string().required().label("Password").min(8),
  });

  const { handleSubmit, isSubmitting } = useForm<InferType<typeof Schema>>({
    validationSchema: Schema,
  });

  const submit = handleSubmit(async (_) => {
    useSonner("Account created!", {
      description: "You have successfully created an account.",
    });
  });
</script>
