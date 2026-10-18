<template>
  <!--
    Newsletter with recent issues
    Features: Signup form beside a list of the latest issues with dates and read times, hover states, validated form with a success message
  -->
  <UiContainer class="py-14 lg:py-20">
    <div class="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
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
        <p class="text-muted-foreground mt-3 text-sm">Join 12,400 readers. Free, always.</p>
      </div>
      <div>
        <p class="text-muted-foreground mb-3 text-sm font-semibold">Recent issues</p>
        <ul class="divide-y rounded-2xl border">
          <li v-for="issue in issues" :key="issue.title">
            <NuxtLink
              to="#"
              class="hover:bg-muted/50 group flex items-center gap-4 p-5 transition-colors"
            >
              <span class="text-muted-foreground w-10 shrink-0 text-sm tabular-nums"
                >#{{ issue.number }}</span
              >
              <span class="min-w-0 flex-1">
                <span class="block font-semibold">{{ issue.title }}</span>
                <span class="text-muted-foreground text-sm"
                  >{{ issue.date }} · {{ issue.read }} min read</span
                >
              </span>
              <Icon
                name="lucide:arrow-up-right"
                class="text-muted-foreground size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const props = withDefaults(defineProps<{ title?: string; description?: string }>(), {
    title: "The Friday Letter",
    description:
      "Five links, one essay and a thing we built this week. Read the best of the internet in five minutes.",
  });

  const issues = [
    { number: 42, title: "Why boring software wins", date: "Oct 10", read: 6 },
    { number: 41, title: "A field guide to design tokens", date: "Oct 3", read: 8 },
    { number: 40, title: "Shipping on Fridays, on purpose", date: "Sep 26", read: 5 },
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
