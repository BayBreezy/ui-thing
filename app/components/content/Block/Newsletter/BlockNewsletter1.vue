<template>
  <!--
    Split newsletter with a preview of the latest issue
    Features: Heading and validated email form with loading and success states, a CSS email mockup on the right that needs no image
  -->
  <UiContainer class="py-14 lg:py-20">
    <div
      class="bg-card grid items-center gap-10 overflow-hidden rounded-3xl border p-6 sm:p-10 lg:grid-cols-2 lg:gap-14 lg:p-14"
    >
      <div>
        <p class="text-primary text-sm font-semibold">{{ props.eyebrow }}</p>
        <h2 class="mt-2 text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          {{ props.title }}
        </h2>
        <p class="text-muted-foreground mt-4 text-lg text-balance">{{ props.description }}</p>
        <div class="mt-8">
          <form v-if="!done" class="max-w-md" novalidate @submit.prevent="submit">
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
        <p v-if="!done" class="text-muted-foreground mt-3 text-sm">
          We care about your data. Read our
          <NuxtLink to="#" class="text-foreground underline underline-offset-4"
            >privacy policy</NuxtLink
          >.
        </p>
      </div>

      <div
        class="bg-muted/50 relative mx-auto w-full max-w-md rounded-2xl border p-5"
        aria-hidden="true"
      >
        <div class="bg-card rounded-xl border p-5 shadow-lg">
          <div class="flex items-center gap-3">
            <span
              class="bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-lg"
            >
              <Icon name="lucide:mail" class="size-4" />
            </span>
            <div>
              <p class="text-sm font-semibold">The Weekly</p>
              <p class="text-muted-foreground text-xs">Issue 42 · 5 min read</p>
            </div>
          </div>
          <div class="mt-5 space-y-3">
            <p class="text-sm font-semibold">What we shipped, what we read</p>
            <div class="bg-muted h-2 rounded-full" />
            <div class="bg-muted h-2 w-11/12 rounded-full" />
            <div class="bg-muted h-2 w-4/5 rounded-full" />
          </div>
          <div class="from-primary/30 to-primary/5 mt-5 h-24 rounded-lg bg-linear-to-br" />
          <div class="mt-5 space-y-2">
            <div class="bg-muted h-2 rounded-full" />
            <div class="bg-muted h-2 w-3/4 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{ eyebrow?: string; title?: string; description?: string }>(),
    {
      eyebrow: "The Weekly",
      title: "Get one smart email every Friday",
      description:
        "Product news, hand picked reads and one idea worth stealing. Join 15,000 readers.",
    }
  );

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
