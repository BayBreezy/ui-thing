<template>
  <!--
    Login form inside a card
    Features: Centered card on a soft background, logo header, password toggle, forgot password link beside the field, create account footer
  -->
  <div class="bg-muted/40 flex min-h-screen items-center justify-center px-5 py-12">
    <UiCard class="w-full max-w-md shadow-sm">
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
        <UiCardTitle class="text-2xl">Welcome back</UiCardTitle>
        <UiCardDescription>Log in to your account to continue.</UiCardDescription>
      </UiCardHeader>
      <UiCardContent>
        <form @submit="submit">
          <fieldset :disabled="isSubmitting" class="grid gap-5">
            <UiVeeInput label="Email" type="email" name="email" placeholder="you@example.com" />
            <div class="grid gap-2">
              <UiVeePasswordInput
                label="Password"
                name="password"
                placeholder="Enter your password"
              />
              <NuxtLink
                class="text-muted-foreground hover:text-foreground justify-self-end text-sm underline-offset-4 hover:underline"
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
          <NuxtLink class="text-foreground font-semibold underline-offset-4 hover:underline" to="#">
            Create account
          </NuxtLink>
        </p>
      </UiCardFooter>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
  import { object, string } from "yup";
  import type { InferType } from "yup";

  const LoginSchema = object({
    email: string().email().required().label("Email"),
    password: string().required().label("Password").min(8),
  });

  const { handleSubmit, isSubmitting } = useForm<InferType<typeof LoginSchema>>({
    validationSchema: LoginSchema,
  });

  const submit = handleSubmit(async (_) => {
    useSonner("Logged in successfully!", {
      description: "You have successfully logged in.",
    });
  });
</script>
