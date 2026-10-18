<template>
  <!--
    Split screen login with a product mockup
    Features: Form on the left, brand panel on the right with a partial dashboard preview built from cards, headline and supporting text, panel hides on mobile
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
            <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">Log in</h1>
            <p class="text-muted-foreground">Good to see you again.</p>
          </div>

          <form class="mt-8" @submit="submit">
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
              <UiDivider label="or continue with" />
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
            New here?
            <NuxtLink
              class="text-foreground font-semibold underline-offset-4 hover:underline"
              to="#"
            >
              Create an account
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
          Everything your team ships, in one place.
        </h2>
        <p class="text-primary-foreground/70 mt-3">
          Track progress, review activity and keep every project moving without the busywork.
        </p>
      </div>

      <div
        class="bg-background text-foreground relative mt-12 ml-0 rounded-tl-2xl border shadow-2xl"
      >
        <div class="flex items-center gap-1.5 border-b px-4 py-3">
          <span class="bg-muted-foreground/30 size-2.5 rounded-full" />
          <span class="bg-muted-foreground/30 size-2.5 rounded-full" />
          <span class="bg-muted-foreground/30 size-2.5 rounded-full" />
          <span class="text-muted-foreground ml-3 text-xs">Overview</span>
        </div>
        <div class="grid gap-4 p-5">
          <div class="grid grid-cols-3 gap-3">
            <div v-for="stat in stats" :key="stat.label" class="rounded-lg border p-3">
              <p class="text-muted-foreground text-xs">{{ stat.label }}</p>
              <p class="mt-1 text-lg font-semibold">{{ stat.value }}</p>
              <p class="text-xs" :class="stat.up ? 'text-green-600' : 'text-red-500'">
                {{ stat.change }}
              </p>
            </div>
          </div>
          <div class="rounded-lg border p-4">
            <div class="flex items-center justify-between">
              <p class="text-sm font-medium">Weekly activity</p>
              <span class="text-muted-foreground text-xs">Last 7 days</span>
            </div>
            <div class="mt-4 flex h-28 items-end gap-3">
              <div
                v-for="(bar, i) in bars"
                :key="i"
                class="bg-primary/80 flex-1 rounded-t"
                :style="{ height: `${bar}%` }"
              />
            </div>
          </div>
          <div class="grid gap-2 pb-6">
            <div v-for="row in rows" :key="row.name" class="flex items-center gap-3 text-sm">
              <span class="bg-muted flex size-7 items-center justify-center rounded-full text-xs">
                {{ row.name[0] }}
              </span>
              <span class="flex-1 font-medium">{{ row.name }}</span>
              <span class="text-muted-foreground text-xs">{{ row.when }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { object, string } from "yup";
  import type { InferType } from "yup";

  const stats = [
    { label: "Revenue", value: "$48.2k", change: "+12.4%", up: true },
    { label: "Active users", value: "2,840", change: "+8.1%", up: true },
    { label: "Churn", value: "1.9%", change: "-0.4%", up: false },
  ];
  const bars = [38, 55, 42, 70, 62, 88, 74];
  const rows = [
    { name: "Priya shipped v2.4", when: "2m ago" },
    { name: "Liam closed 6 issues", when: "1h ago" },
    { name: "Sam invited 3 teammates", when: "3h ago" },
  ];

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

  const social = (provider: string) => {
    useSonner(`Continue with ${provider}`, {
      description: "Wire this up to your auth provider.",
    });
  };
</script>
