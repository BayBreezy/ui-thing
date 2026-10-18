<template>
  <!--
    Always dark newsletter with a glow
    Features: Stays dark on a light page, soft colored glow, headline with a pill form, validated email with success state
  -->
  <section class="px-4 py-10 sm:px-6">
    <div
      class="dark bg-background text-foreground relative mx-auto max-w-6xl overflow-hidden rounded-3xl border px-6 py-16 text-center sm:px-12 lg:py-24"
    >
      <div
        class="absolute -top-24 left-1/2 size-96 -translate-x-1/2 rounded-full bg-violet-600/40 blur-3xl"
        aria-hidden="true"
      />
      <div
        class="absolute -right-20 -bottom-32 size-80 rounded-full bg-sky-500/25 blur-3xl"
        aria-hidden="true"
      />
      <div class="relative mx-auto max-w-2xl">
        <h2 class="text-3xl font-bold tracking-tight text-balance sm:text-5xl">
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
                Join the list
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
        <p v-if="!done" class="text-muted-foreground mt-4 text-xs">
          Early access, product news and nothing else.
        </p>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
  const props = withDefaults(defineProps<{ title?: string; description?: string }>(), {
    title: "Be first to try what's next",
    description:
      "Get early access to new features and behind the scenes updates before anyone else.",
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
