<template>
  <!--
    Split screen sign up with a rotating testimonial panel
    Features: Form on the left, brand panel on the right that cycles through customer quotes every few seconds with clickable dots, pauses on hover, hides on mobile
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
            <h1 class="text-2xl font-bold tracking-tight lg:text-3xl">Get started</h1>
            <p class="text-muted-foreground">Create your account to continue.</p>
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

      <div class="relative h-72 w-full max-w-md">
        <figure
          v-for="(item, i) in quotes"
          :key="item.name"
          class="absolute inset-0 flex flex-col justify-center transition-all duration-700"
          :class="
            i === active
              ? 'translate-y-0 opacity-100'
              : 'pointer-events-none translate-y-3 opacity-0'
          "
          :aria-hidden="i !== active"
        >
          <Icon name="lucide:quote" class="text-primary-foreground/30 mb-5 size-9" />
          <blockquote class="text-xl leading-snug font-medium text-balance">
            {{ item.text }}
          </blockquote>
          <figcaption class="mt-6 flex items-center gap-3">
            <UiAvatar class="size-11" :src="item.avatar" :fallback="item.initials" />
            <div>
              <p class="font-semibold">{{ item.name }}</p>
              <p class="text-primary-foreground/70 text-sm">{{ item.role }}</p>
            </div>
          </figcaption>
        </figure>
      </div>

      <div class="relative mt-6 flex items-center gap-2">
        <button
          v-for="(item, i) in quotes"
          :key="item.name"
          type="button"
          class="h-2 rounded-full transition-all"
          :class="i === active ? 'bg-primary-foreground w-6' : 'bg-primary-foreground/30 w-2'"
          :aria-label="`Show quote from ${item.name}`"
          :aria-current="i === active"
          @click="active = i"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { object, string } from "yup";
  import type { InferType } from "yup";

  const quotes = [
    {
      text: "We rebuilt our whole dashboard in a weekend. Every piece was already there and every piece was ours to change.",
      name: "Maya Chen",
      role: "Head of Product, Northwind",
      initials: "MC",
      avatar: "https://i.pravatar.cc/120?img=47",
    },
    {
      text: "The accessibility work alone saved us weeks. Keyboard support and focus handling just work.",
      name: "Priya Nair",
      role: "Frontend Engineer, Lumen",
      initials: "PN",
      avatar: "https://i.pravatar.cc/120?img=45",
    },
    {
      text: "Themeing was a handful of tokens. Our brand was live across every screen the same afternoon.",
      name: "Sam Okafor",
      role: "Design Lead, Fieldwork",
      initials: "SO",
      avatar: "https://i.pravatar.cc/120?img=32",
    },
  ];

  const active = ref(0);
  const paused = ref(false);

  let timer: ReturnType<typeof setInterval> | undefined;
  onMounted(() => {
    timer = setInterval(() => {
      if (!paused.value) active.value = (active.value + 1) % quotes.length;
    }, 5000);
  });
  onBeforeUnmount(() => clearInterval(timer));

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
