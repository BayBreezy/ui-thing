<template>
  <!--
    Split screen sign up with a customer quote
    Features: Form on the left, brand colored panel on the right with a testimonial, avatar, role and star rating, panel hides on mobile
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
            <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">Create your account</h1>
            <p class="text-muted-foreground">Free for 14 days. No credit card required.</p>
          </div>

          <form class="mt-8" @submit="submit">
            <fieldset :disabled="isSubmitting" class="grid gap-5">
              <div class="grid gap-5 sm:grid-cols-2">
                <UiVeeInput required label="First name" name="firstName" placeholder="Jane" />
                <UiVeeInput required label="Last name" name="lastName" placeholder="Doe" />
              </div>
              <UiVeeInput
                required
                label="Work email"
                type="email"
                name="email"
                placeholder="you@company.com"
              />
              <UiVeePasswordInput
                required
                label="Password"
                name="password"
                placeholder="Create a password"
                hint="Must be at least 8 characters."
              />
              <UiVeeCheckbox
                name="terms"
                label="I agree to the Terms of Service and Privacy Policy"
              />
              <UiButton class="w-full" type="submit" text="Create account" />
              <UiButton variant="outline" type="button" @click="signUpWithGoogle()">
                <Icon class="size-4" name="logos:google-icon" />
                Sign up with Google
              </UiButton>
            </fieldset>
          </form>

          <p class="text-muted-foreground mt-8 text-center text-sm">
            Already have an account?
            <NuxtLink
              class="text-foreground font-semibold underline-offset-4 hover:underline"
              to="#"
            >
              Log in
            </NuxtLink>
          </p>
        </div>
      </div>

      <p class="text-muted-foreground text-xs">&copy; UI Thing. All rights reserved.</p>
    </div>

    <div
      class="bg-primary text-primary-foreground relative hidden flex-col justify-end overflow-hidden p-12 lg:flex"
    >
      <div
        class="bg-primary-foreground/10 absolute -top-24 -right-24 size-96 rounded-full blur-3xl"
      />
      <div
        class="bg-primary-foreground/10 absolute -bottom-32 -left-16 size-80 rounded-full blur-3xl"
      />
      <div class="relative mb-6 flex gap-1">
        <Icon v-for="n in 5" :key="n" name="lucide:star" class="size-5 fill-current" />
      </div>
      <blockquote class="relative max-w-xl text-2xl leading-snug font-medium text-balance">
        {{ quote.text }}
      </blockquote>
      <figcaption class="relative mt-8 flex items-center gap-3">
        <UiAvatar class="size-11" :src="quote.avatar" :fallback="quote.initials" />
        <div>
          <p class="font-semibold">{{ quote.name }}</p>
          <p class="text-primary-foreground/70 text-sm">{{ quote.role }}</p>
        </div>
      </figcaption>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { boolean, object, string } from "yup";
  import type { InferType } from "yup";

  const quote = {
    text: "Setting up took ten minutes. The team was shipping real screens by the end of the first day.",
    name: "Liam Carter",
    role: "Engineering Lead, Northwind",
    initials: "LC",
    avatar: "https://i.pravatar.cc/120?img=12",
  };

  const Schema = object({
    firstName: string().required().label("First name"),
    lastName: string().required().label("Last name"),
    email: string().email().required().label("Work email"),
    password: string().required().label("Password").min(8),
    terms: boolean().oneOf([true], "You must accept the terms").label("Terms"),
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
      description: "Wire this up to your auth provider.",
    });
  };
</script>
