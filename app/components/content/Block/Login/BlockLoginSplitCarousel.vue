<template>
  <!--
    Split screen login with a rotating feature panel
    Features: Form on the left, brand panel on the right that cycles through highlights every few seconds with clickable dots, pauses on hover, hides on mobile
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
            <p class="text-muted-foreground">Enter your details to access your account.</p>
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
      class="bg-primary text-primary-foreground relative hidden flex-col items-center justify-center overflow-hidden p-12 lg:flex"
      @mouseenter="paused = true"
      @mouseleave="paused = false"
    >
      <div
        class="bg-primary-foreground/10 absolute -top-24 -right-24 size-96 rounded-full blur-3xl"
      />
      <div
        class="bg-primary-foreground/10 absolute -bottom-32 -left-16 size-80 rounded-full blur-3xl"
      />

      <div class="relative h-64 w-full max-w-md">
        <div
          v-for="(slide, i) in slides"
          :key="slide.title"
          class="absolute inset-0 flex flex-col items-center text-center transition-all duration-700"
          :class="
            i === active
              ? 'translate-y-0 opacity-100'
              : 'pointer-events-none translate-y-3 opacity-0'
          "
          :aria-hidden="i !== active"
        >
          <div
            class="bg-primary-foreground/15 mb-6 flex size-16 items-center justify-center rounded-2xl"
          >
            <Icon :name="slide.icon" class="size-8" />
          </div>
          <h2 class="text-2xl font-bold tracking-tight text-balance">{{ slide.title }}</h2>
          <p class="text-primary-foreground/70 mt-3 text-balance">{{ slide.description }}</p>
        </div>
      </div>

      <div class="relative mt-6 flex items-center gap-2">
        <button
          v-for="(slide, i) in slides"
          :key="slide.title"
          type="button"
          class="h-2 rounded-full transition-all"
          :class="i === active ? 'bg-primary-foreground w-6' : 'bg-primary-foreground/30 w-2'"
          :aria-label="`Show ${slide.title}`"
          :aria-current="i === active"
          @click="active = i"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { boolean, object, string } from "yup";
  import type { InferType } from "yup";

  const slides = [
    {
      icon: "lucide:blocks",
      title: "Components you own",
      description: "Copy the code into your project and change anything. No black boxes.",
    },
    {
      icon: "lucide:shield-check",
      title: "Accessible by default",
      description: "Built on Reka UI, so keyboard and screen reader support comes included.",
    },
    {
      icon: "lucide:palette",
      title: "Themeable in minutes",
      description: "Swap a few design tokens and the whole interface follows, light or dark.",
    },
  ];

  const active = ref(0);
  const paused = ref(false);

  let timer: ReturnType<typeof setInterval> | undefined;
  onMounted(() => {
    timer = setInterval(() => {
      if (!paused.value) active.value = (active.value + 1) % slides.length;
    }, 4500);
  });
  onBeforeUnmount(() => clearInterval(timer));

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
</script>
