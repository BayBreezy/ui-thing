<template>
  <!--
    Split screen login with a customer quote
    Features: Form on the left, brand colored panel on the right with a testimonial, avatar and company, panel hides on mobile
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
            <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">Welcome back</h1>
            <p class="text-muted-foreground">Log in to your account to continue.</p>
          </div>

          <form class="mt-8" @submit="submit">
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
              <UiButton variant="outline" type="button" @click="signInWithGoogle()">
                <Icon class="size-4" name="logos:google-icon" />
                Log in with Google
              </UiButton>
            </fieldset>
          </form>

          <p class="text-muted-foreground mt-8 text-center text-sm">
            Don't have an account?
            <NuxtLink
              class="text-foreground font-semibold underline-offset-4 hover:underline"
              to="#"
            >
              Create account
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
      <Icon name="lucide:quote" class="text-primary-foreground/30 relative mb-6 size-10" />
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
    text: "We rebuilt our whole dashboard in a weekend. Every piece was already there and every piece was ours to change.",
    name: "Maya Chen",
    role: "Head of Product, Northwind",
    initials: "MC",
    avatar: "https://i.pravatar.cc/120?img=47",
  };

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

  const signInWithGoogle = () => {
    useSonner("Logged in successfully!", {
      description: "You have successfully logged in with Google.",
    });
  };
</script>
