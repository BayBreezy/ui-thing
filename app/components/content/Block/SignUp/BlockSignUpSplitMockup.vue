<template>
  <!--
    Split screen sign up with a product mockup
    Features: Form on the left, brand panel on the right with a partial app preview built from cards, headline and benefit list, panel hides on mobile
  -->
  <div class="grid min-h-screen lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
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
            <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">Sign up</h1>
            <p class="text-muted-foreground">Create your account in under a minute.</p>
          </div>

          <form class="mt-8" @submit="submit">
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
              <UiDivider label="or sign up with" />
              <div class="grid grid-cols-2 gap-3">
                <UiButton variant="outline" type="button" @click="social('Google')">
                  <Icon class="size-4" name="logos:google-icon" />
                  Google
                </UiButton>
                <UiButton variant="outline" type="button" @click="social('GitHub')">
                  <Icon class="size-4" name="mdi:github" />
                  GitHub
                </UiButton>
              </div>
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
      class="bg-primary text-primary-foreground relative hidden flex-col justify-between overflow-hidden pt-16 pl-14 lg:flex"
    >
      <div
        class="bg-primary-foreground/10 absolute -top-20 -left-20 size-80 rounded-full blur-3xl"
      />
      <div class="relative max-w-md pr-14">
        <h2 class="text-3xl font-bold tracking-tight text-balance">
          Start shipping in minutes, not weeks.
        </h2>
        <ul class="text-primary-foreground/80 mt-5 grid gap-2.5">
          <li v-for="item in benefits" :key="item" class="flex items-center gap-2.5">
            <Icon name="lucide:circle-check" class="size-5 shrink-0" />
            {{ item }}
          </li>
        </ul>
      </div>

      <div class="bg-background text-foreground relative mt-12 rounded-tl-2xl border shadow-2xl">
        <div class="flex items-center gap-1.5 border-b px-4 py-3">
          <span class="bg-muted-foreground/30 size-2.5 rounded-full" />
          <span class="bg-muted-foreground/30 size-2.5 rounded-full" />
          <span class="bg-muted-foreground/30 size-2.5 rounded-full" />
          <span class="text-muted-foreground ml-3 text-xs">Projects</span>
        </div>
        <div class="grid gap-3 p-5 pb-8">
          <div
            v-for="project in projects"
            :key="project.name"
            class="flex items-center gap-4 rounded-lg border p-4"
          >
            <span class="bg-muted flex size-10 items-center justify-center rounded-lg">
              <Icon :name="project.icon" class="size-5" />
            </span>
            <div class="min-w-0 flex-1">
              <p class="text-sm font-medium">{{ project.name }}</p>
              <div class="bg-muted mt-2 h-1.5 overflow-hidden rounded-full">
                <div
                  class="bg-primary h-full rounded-full"
                  :style="{ width: `${project.progress}%` }"
                />
              </div>
            </div>
            <span class="text-muted-foreground text-xs">{{ project.progress }}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { object, string } from "yup";
  import type { InferType } from "yup";

  const benefits = ["Free for 14 days", "No credit card required", "Cancel anytime"];
  const projects = [
    { name: "Website redesign", icon: "lucide:layout-template", progress: 82 },
    { name: "Mobile app", icon: "lucide:smartphone", progress: 54 },
    { name: "Design system", icon: "lucide:blocks", progress: 91 },
    { name: "Launch campaign", icon: "lucide:megaphone", progress: 33 },
  ];

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

  const social = (provider: string) => {
    useSonner(`Continue with ${provider}`, {
      description: "Wire this up to your auth provider.",
    });
  };
</script>
