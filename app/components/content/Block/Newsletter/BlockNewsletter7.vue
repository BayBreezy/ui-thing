<template>
  <!--
    Premium centered newsletter card with social proof
    Features: Sparkles icon, subscriber count, rating and security notes, validated form with success state, soft corner decoration
  -->
  <UiContainer class="py-14 lg:py-20">
    <div
      class="bg-card relative mx-auto max-w-3xl overflow-hidden rounded-3xl border p-8 text-center shadow-sm sm:p-14"
    >
      <div
        class="bg-primary/10 absolute -top-16 -right-16 size-56 rounded-full blur-2xl"
        aria-hidden="true"
      />
      <div class="relative">
        <UiFancyIcon
          icon="lucide:sparkles"
          theme="gradient"
          color="primary"
          size="xl"
          class="mx-auto"
        />
        <h2 class="mt-6 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          {{ props.title }}
        </h2>
        <p class="text-muted-foreground mx-auto mt-3 max-w-xl text-lg text-balance">
          {{ props.description }}
        </p>
        <div class="mx-auto mt-8 max-w-md">
          <form v-if="!done" class="w-full" novalidate @submit.prevent="submit">
            <div class="flex flex-col gap-2 sm:flex-row">
              <UiInput
                v-model="email"
                type="email"
                placeholder="Enter your email address"
                aria-label="Email address"
                class="h-11"
                :aria-invalid="!!error"
              />
              <UiButton type="submit" size="lg" :disabled="loading" class="shrink-0">
                <Icon v-if="loading" name="lucide:loader-circle" class="size-4 animate-spin" />
                Join now
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
        <ul
          class="text-muted-foreground mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm"
        >
          <li class="flex items-center gap-1.5">
            <Icon name="lucide:users" class="size-4" /> 15K+ subscribers
          </li>
          <li class="flex items-center gap-1.5">
            <Icon name="lucide:star" class="size-4 fill-amber-400 text-amber-400" /> 4.9 rating
          </li>
          <li class="flex items-center gap-1.5">
            <Icon name="lucide:lock" class="size-4" /> 100% secure
          </li>
        </ul>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const props = withDefaults(defineProps<{ title?: string; description?: string }>(), {
    title: "Don't miss out on our updates",
    description:
      "Join our community and be the first to know about new features, updates and special offers.",
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
