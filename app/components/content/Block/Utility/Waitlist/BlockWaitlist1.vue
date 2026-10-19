<template>
  <!--
    Coming soon page
    Features: Centered launch badge, headline, short feature list, email field with validation, success state with the submitted address
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-2xl text-center">
      <UiBadge variant="soft" color="primary" shape="pill" class="gap-1.5">
        <span class="bg-primary size-1.5 rounded-full" aria-hidden="true" />{{ badge }}
      </UiBadge>
      <h1 class="mt-5 text-4xl font-bold tracking-tight lg:text-6xl">{{ title }}</h1>
      <p class="text-muted-foreground mx-auto mt-4 max-w-xl text-lg">{{ description }}</p>

      <ul class="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
        <li v-for="item in features" :key="item" class="flex items-center gap-2">
          <Icon name="lucide:circle-check" class="text-primary size-4" />{{ item }}
        </li>
      </ul>

      <div v-if="joined" class="mx-auto mt-10 max-w-md rounded-xl border p-6" role="status">
        <span
          class="mx-auto grid size-12 place-items-center rounded-full bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300"
          ><Icon name="lucide:check" class="size-6"
        /></span>
        <p class="mt-3 text-lg font-semibold">You are on the list</p>
        <p class="text-muted-foreground mt-1 text-sm">
          We will email <span class="text-foreground font-medium">{{ email.trim() }}</span> the
          moment we open the doors.
        </p>
        <UiButton variant="ghost" size="sm" class="mt-3" @click="reset">Use another email</UiButton>
      </div>

      <form v-else class="mx-auto mt-10 max-w-md" novalidate @submit.prevent="submit">
        <div class="flex flex-col gap-2 sm:flex-row">
          <UiLabel for="soon-email" class="sr-only">Email address</UiLabel>
          <UiInput
            id="soon-email"
            v-model="email"
            type="email"
            autocomplete="email"
            placeholder="you@example.com"
            class="h-10 flex-1"
            :aria-invalid="!!error"
            :aria-describedby="error ? 'soon-error' : undefined"
          />
          <UiButton type="submit" size="lg">Notify me</UiButton>
        </div>
        <p v-if="error" id="soon-error" class="text-destructive mt-2 text-left text-sm">
          {{ error }}
        </p>
        <p v-else class="text-muted-foreground mt-3 text-xs">
          One email at launch. No spam, unsubscribe any time.
        </p>
      </form>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  withDefaults(
    defineProps<{
      badge?: string;
      title?: string;
      description?: string;
      features?: string[];
    }>(),
    {
      badge: "Launching this winter",
      title: "Something new is almost here",
      description:
        "Orbit is a calmer way to plan work across teams. We are putting the finishing touches on it.",
      features: () => ["Shared planning boards", "Weekly digests", "Free for small teams"],
    }
  );

  const email = ref("");
  const error = ref("");
  const joined = ref(false);

  function submit() {
    if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) {
      error.value = "Enter a valid email address.";
      return;
    }
    error.value = "";
    joined.value = true;
  }

  function reset() {
    email.value = "";
    joined.value = false;
  }
</script>
