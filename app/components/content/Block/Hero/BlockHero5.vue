<template>
  <!--
    Centered hero on a dotted background with email capture and social proof
    Features: Radial dot pattern, headline, validated email form with success state, avatar stack with stars, soft glow
  -->
  <section class="relative overflow-hidden">
    <div
      class="absolute inset-0 bg-[radial-gradient(--alpha(var(--color-border)/90%)_1px,transparent_1px)] mask-[radial-gradient(ellipse_closest-side_at_50%_40%,#000_55%,transparent_100%)] bg-size-[22px_22px]"
      aria-hidden="true"
    />
    <UiContainer class="relative py-20 text-center lg:py-32">
      <Motion
        class="mx-auto max-w-3xl"
        :initial="{ opacity: 0, y: 16 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ type: 'spring', stiffness: 140, damping: 22 }"
      >
        <h1 class="text-4xl font-bold tracking-tight text-balance sm:text-6xl">
          {{ props.title }}
        </h1>
        <p class="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg text-balance">
          {{ props.description }}
        </p>

        <form
          v-if="!done"
          class="bg-background mx-auto mt-9 flex max-w-md items-center gap-1 rounded-full border p-1.5 pl-5 shadow-sm"
          novalidate
          @submit.prevent="submit"
        >
          <input
            v-model="email"
            type="email"
            placeholder="Enter your email"
            aria-label="Email address"
            class="placeholder:text-muted-foreground min-w-0 flex-1 bg-transparent text-sm outline-none"
          />
          <UiButton type="submit" class="rounded-full">Get started</UiButton>
        </form>
        <p
          v-else
          class="mt-9 flex items-center justify-center gap-2 font-medium text-green-600 dark:text-green-400"
        >
          <Icon name="lucide:circle-check" class="size-5" />
          Thanks! We've sent you a confirmation link.
        </p>
        <p v-if="error" class="text-destructive mt-2 text-sm">{{ error }}</p>
        <p v-else class="text-muted-foreground mt-3 text-xs">
          We care about your data. Read our privacy policy.
        </p>

        <div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <div class="flex -space-x-2.5">
            <UiAvatar
              v-for="avatar in avatars"
              :key="avatar"
              :src="avatar"
              class="ring-background size-10 ring-2"
            />
          </div>
          <div class="text-left">
            <div class="flex gap-0.5" aria-label="Rated 5 out of 5">
              <Icon
                v-for="n in 5"
                :key="n"
                name="lucide:star"
                class="size-4 fill-amber-400 text-amber-400"
              />
            </div>
            <p class="text-muted-foreground text-sm">from 1,000+ happy customers</p>
          </div>
        </div>
      </Motion>
    </UiContainer>
  </section>
</template>

<script lang="ts" setup>
  const props = withDefaults(defineProps<{ title?: string; description?: string }>(), {
    title: "Customer service software for customer-first teams",
    description:
      "The best customer service software for customer-first teams. Industry-leading email and live chat support.",
  });

  const avatars = [
    "https://i.pravatar.cc/80?img=47",
    "https://i.pravatar.cc/80?img=12",
    "https://i.pravatar.cc/80?img=45",
    "https://i.pravatar.cc/80?img=32",
    "https://i.pravatar.cc/80?img=15",
  ];

  const email = ref("");
  const error = ref("");
  const done = ref(false);

  function submit() {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      error.value = "Enter a valid email address.";
      return;
    }
    error.value = "";
    done.value = true;
  }
</script>
