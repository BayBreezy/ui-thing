<template>
  <!--
    Card newsletter with a subscriber count and perks
    Features: Split card, subscriber count badge, perk list with icons, validated form, decorative tiles that need no images
  -->
  <UiContainer class="py-14 lg:py-20">
    <div class="bg-card grid overflow-hidden rounded-3xl border shadow-sm lg:grid-cols-[1.2fr_1fr]">
      <div class="p-8 sm:p-12">
        <UiBadge variant="outline" class="gap-1.5 rounded-full py-1">
          <Icon name="lucide:users" class="size-3.5" />
          {{ props.count }} subscribers
        </UiBadge>
        <h2 class="mt-5 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          {{ props.title }}
        </h2>
        <p class="text-muted-foreground mt-4 text-balance">{{ props.description }}</p>
        <div class="mt-7">
          <form v-if="!done" class="max-w-md" novalidate @submit.prevent="submit">
            <div class="flex flex-col gap-2 sm:flex-row">
              <UiInput
                v-model="email"
                type="email"
                placeholder="Your email address"
                aria-label="Email address"
                class="h-11"
                :aria-invalid="!!error"
              />
              <UiButton type="submit" size="lg" :disabled="loading" class="shrink-0">
                <Icon v-if="loading" name="lucide:loader-circle" class="size-4 animate-spin" />
                Get started
              </UiButton>
            </div>
            <p v-if="error" class="text-destructive mt-2 text-sm">{{ error }}</p>
          </form>
          <div
            v-else
            class="flex max-w-md items-center gap-3 rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-left"
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
        <ul class="text-muted-foreground mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <li v-for="perk in perks" :key="perk.label" class="flex items-center gap-2">
            <Icon :name="perk.icon" class="text-primary size-4" />
            {{ perk.label }}
          </li>
        </ul>
      </div>
      <div
        class="from-primary/15 to-primary/5 relative hidden items-center justify-center bg-linear-to-br lg:flex"
        aria-hidden="true"
      >
        <div class="grid grid-cols-2 gap-4 p-10">
          <Motion
            v-for="(tile, i) in tiles"
            :key="tile"
            class="bg-card flex size-24 items-center justify-center rounded-2xl border shadow-lg"
            :animate="{ y: [0, i % 2 ? 8 : -8, 0] }"
            :transition="{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }"
          >
            <Icon :name="tile" class="text-primary size-8" />
          </Motion>
        </div>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{ title?: string; description?: string; count?: string }>(),
    {
      title: "Join 10,000+ subscribers",
      description:
        "Weekly insights, tips and exclusive content delivered to your inbox. No spam, ever.",
      count: "10,482",
    }
  );

  const perks = [
    { label: "Free forever", icon: "lucide:circle-check" },
    { label: "No spam", icon: "lucide:shield-check" },
    { label: "Unsubscribe anytime", icon: "lucide:mail-x" },
  ];
  const tiles = ["lucide:newspaper", "lucide:lightbulb", "lucide:chart-line", "lucide:gift"];

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
