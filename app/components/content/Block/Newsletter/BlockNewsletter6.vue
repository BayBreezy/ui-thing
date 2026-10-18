<template>
  <!--
    Newsletter with benefit cards
    Features: Heading and form on the left, three benefit cards with fancy icons on the right, validated form with success state
  -->
  <UiContainer class="py-14 lg:py-20">
    <div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
      <div>
        <h2 class="text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          {{ props.title }}
        </h2>
        <p class="text-muted-foreground mt-4 text-lg text-balance">{{ props.description }}</p>
        <div class="mt-8">
          <form v-if="!done" class="w-full" novalidate @submit.prevent="submit">
            <div class="flex flex-col gap-2 sm:flex-row">
              <UiInput
                v-model="email"
                type="email"
                placeholder="you@example.com"
                aria-label="Email address"
                class="h-11"
                :aria-invalid="!!error"
              />
              <UiButton type="submit" size="lg" :disabled="loading" class="shrink-0">
                <Icon v-if="loading" name="lucide:loader-circle" class="size-4 animate-spin" />
                Subscribe
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
      </div>
      <ul class="grid gap-4">
        <li
          v-for="benefit in benefits"
          :key="benefit.title"
          class="bg-card hover:border-ring/50 flex gap-4 rounded-2xl border p-5 transition-colors"
        >
          <UiFancyIcon :icon="benefit.icon" theme="light" :color="benefit.color" />
          <div>
            <p class="font-semibold">{{ benefit.title }}</p>
            <p class="text-muted-foreground mt-0.5 text-sm">{{ benefit.text }}</p>
          </div>
        </li>
      </ul>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const props = withDefaults(defineProps<{ title?: string; description?: string }>(), {
    title: "Get our latest updates",
    description: "Join thousands of professionals who stay ahead with our weekly newsletter.",
  });

  type Color = "primary" | "gray" | "error" | "warning" | "success" | "info";
  const benefits: { title: string; text: string; icon: string; color: Color }[] = [
    {
      title: "Weekly digest",
      text: "Curated content every Monday morning.",
      icon: "lucide:mail",
      color: "info",
    },
    {
      title: "Instant updates",
      text: "Breaking news and product alerts.",
      icon: "lucide:bell",
      color: "warning",
    },
    {
      title: "Exclusive offers",
      text: "Subscriber only deals and early access.",
      icon: "lucide:gift",
      color: "success",
    },
  ];

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
