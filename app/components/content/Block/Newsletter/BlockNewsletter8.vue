<template>
  <!--
    Full width gradient newsletter band
    Features: Vivid gradient with blurred shapes, headline with a pill email form, success state with a check, readable text on any theme
  -->
  <section class="px-4 py-10 sm:px-6">
    <div
      class="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 px-6 py-14 text-center text-white sm:px-12 lg:py-20"
    >
      <div
        class="absolute -top-20 -left-10 size-72 rounded-full bg-white/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        class="absolute -right-10 -bottom-24 size-72 rounded-full bg-fuchsia-300/30 blur-3xl"
        aria-hidden="true"
      />
      <div class="relative mx-auto max-w-2xl">
        <h2 class="text-3xl font-bold tracking-tight text-balance sm:text-5xl">
          {{ props.title }}
        </h2>
        <p class="mx-auto mt-4 max-w-xl text-lg text-balance text-white/80">
          {{ props.description }}
        </p>
        <div class="text-foreground mx-auto mt-8 max-w-md">
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
        <p v-if="!done" class="mt-4 text-xs text-white/70">One email a week. No spam, ever.</p>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
  const props = withDefaults(defineProps<{ title?: string; description?: string }>(), {
    title: "Ideas worth your inbox",
    description:
      "Short, useful and occasionally funny. Join the readers who start Friday with our newsletter.",
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
