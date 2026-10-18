<template>
  <!--
    Horizontal newsletter bar with reader avatars
    Features: Heading and copy beside a validated form, avatar stack with reader count, success state that replaces the form
  -->
  <UiContainer class="py-12 lg:py-16">
    <div class="grid items-center gap-8 border-y py-10 lg:grid-cols-2 lg:gap-16">
      <div>
        <h2 class="text-3xl font-bold tracking-tight text-balance">{{ props.title }}</h2>
        <p class="text-muted-foreground mt-3 text-lg text-balance">{{ props.description }}</p>
      </div>
      <div>
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
        <div class="mt-4 flex items-center gap-3">
          <div class="flex -space-x-2">
            <UiAvatar
              v-for="avatar in avatars"
              :key="avatar"
              :src="avatar"
              class="ring-background size-8 ring-2"
            />
          </div>
          <p class="text-muted-foreground text-sm">
            Join <span class="text-foreground font-semibold">15,000+</span> readers. Unsubscribe
            anytime.
          </p>
        </div>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const props = withDefaults(defineProps<{ title?: string; description?: string }>(), {
    title: "Sign up for our newsletter",
    description: "Be the first to know about releases and industry news and insights.",
  });

  const avatars = [
    "https://i.pravatar.cc/80?img=47",
    "https://i.pravatar.cc/80?img=12",
    "https://i.pravatar.cc/80?img=45",
    "https://i.pravatar.cc/80?img=32",
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
