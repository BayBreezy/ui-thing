<template>
  <!--
    Centered newsletter with a pill form
    Features: Badge, headline, pill shaped email field with validation, success state with a party icon, soft glow, staggered entrance
  -->
  <section class="relative overflow-hidden">
    <div
      class="from-primary/10 pointer-events-none absolute inset-x-0 top-0 h-72 bg-linear-to-b to-transparent"
      aria-hidden="true"
    />
    <UiContainer class="relative py-16 text-center lg:py-24">
      <Motion
        class="mx-auto max-w-2xl"
        :initial="{ opacity: 0, y: 16 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ type: 'spring', stiffness: 140, damping: 22 }"
      >
        <UiBadge variant="secondary" class="rounded-full px-3 py-1">Newsletter</UiBadge>
        <h2 class="mt-5 text-4xl font-bold tracking-tight text-balance sm:text-5xl">
          {{ props.title }}
        </h2>
        <p class="text-muted-foreground mx-auto mt-4 max-w-xl text-lg text-balance">
          {{ props.description }}
        </p>
        <div class="mx-auto mt-8 max-w-md">
          <form v-if="!done" class="w-full" novalidate @submit.prevent="submit">
            <div
              class="bg-background flex items-center gap-1 rounded-full border p-1.5 pl-5 shadow-sm"
            >
              <input
                v-model="email"
                type="email"
                placeholder="you@example.com"
                aria-label="Email address"
                class="placeholder:text-muted-foreground min-w-0 flex-1 bg-transparent text-sm outline-none"
              />
              <UiButton type="submit" :disabled="loading" class="shrink-0 rounded-full">
                <Icon v-if="loading" name="lucide:loader-circle" class="size-4 animate-spin" />
                Subscribe now
              </UiButton>
            </div>
            <p v-if="error" class="text-destructive mt-2 text-sm">{{ error }}</p>
          </form>
          <div
            v-else
            class="flex w-full items-center gap-3 rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-left"
            role="status"
          >
            <Icon
              name="lucide:circle-check"
              class="size-6 shrink-0 text-green-600 dark:text-green-400"
            />
            <div>
              <p class="font-semibold">You're subscribed</p>
              <p class="text-muted-foreground text-sm">Check your inbox to confirm your email.</p>
            </div>
            <UiButton variant="ghost" size="sm" class="ml-auto" @click="reset">Undo</UiButton>
          </div>
        </div>
        <p v-if="!done" class="text-muted-foreground mt-3 text-xs">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </Motion>
    </UiContainer>
  </section>
</template>

<script lang="ts" setup>
  const props = withDefaults(defineProps<{ title?: string; description?: string }>(), {
    title: "Stay in the loop",
    description:
      "Join our newsletter for the latest updates, exclusive content and special offers delivered to your inbox.",
  });

  const email = ref("");
  const error = ref("");
  const loading = ref(false);
  const done = ref(false);

  async function submit() {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      error.value = "Enter a valid email address.";
      return;
    }
    error.value = "";
    loading.value = true;
    await new Promise((resolve) => setTimeout(resolve, 700));
    loading.value = false;
    done.value = true;
  }

  function reset() {
    done.value = false;
    email.value = "";
  }
</script>
