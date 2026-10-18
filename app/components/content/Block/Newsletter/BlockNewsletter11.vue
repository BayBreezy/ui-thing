<template>
  <!--
    Compact newsletter card for sidebars and posts
    Features: Small card with an icon, short copy, validated form that stacks, success state, fits narrow columns
  -->
  <div class="mx-auto max-w-sm px-4 py-10">
    <div class="bg-card rounded-2xl border p-6 shadow-sm">
      <UiFancyIcon icon="lucide:mail" theme="modern" color="gray" />
      <h3 class="mt-4 text-lg font-semibold">{{ props.title }}</h3>
      <p class="text-muted-foreground mt-1 text-sm">{{ props.description }}</p>
      <form v-if="!done" class="mt-5 space-y-3" novalidate @submit.prevent="submit">
        <UiInput
          v-model="email"
          type="email"
          placeholder="you@example.com"
          aria-label="Email address"
          :aria-invalid="!!error"
        />
        <p v-if="error" class="text-destructive text-sm">{{ error }}</p>
        <UiButton type="submit" class="w-full" :disabled="loading">
          <Icon v-if="loading" name="lucide:loader-circle" class="size-4 animate-spin" />
          Subscribe
        </UiButton>
      </form>
      <div
        v-else
        class="mt-5 flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-400"
        role="status"
      >
        <Icon name="lucide:circle-check" class="size-5" />
        You're in. Check your inbox.
        <button
          type="button"
          class="text-muted-foreground hover:text-foreground ml-auto text-xs font-normal underline underline-offset-4"
          @click="reset"
        >
          Undo
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = withDefaults(defineProps<{ title?: string; description?: string }>(), {
    title: "Subscribe",
    description: "New posts straight to your inbox. No spam.",
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
