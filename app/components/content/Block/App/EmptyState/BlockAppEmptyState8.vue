<template>
  <!--
    Setup checklist with a live progress ring
    Features: Progress ring that fills as steps complete, done, current and upcoming step states, action button on the current step, completed celebration state
  -->
  <div class="flex items-center justify-center px-4 py-12 sm:px-6">
    <div class="bg-card w-full max-w-md rounded-2xl border p-6 shadow-sm">
      <div class="flex items-center gap-4">
        <div class="relative size-16 shrink-0">
          <svg class="size-16 -rotate-90" viewBox="0 0 64 64" aria-hidden="true">
            <circle cx="32" cy="32" r="28" fill="none" stroke-width="6" class="stroke-muted" />
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke-width="6"
              stroke-linecap="round"
              class="stroke-primary transition-all duration-500"
              :stroke-dasharray="circumference"
              :stroke-dashoffset="circumference * (1 - progress)"
            />
          </svg>
          <span class="absolute inset-0 flex items-center justify-center text-sm font-bold">
            {{ doneCount }}/{{ steps.length }}
          </span>
        </div>
        <div>
          <slot name="title">
            <h2 class="text-lg font-bold tracking-tight">
              {{ complete ? "You're all set" : props.title }}
            </h2>
          </slot>
          <slot name="description">
            <p class="text-muted-foreground text-sm">
              {{ complete ? "Everything is connected and ready to go." : props.description }}
            </p>
          </slot>
        </div>
      </div>

      <ol class="mt-6 space-y-2">
        <li
          v-for="(step, i) in steps"
          :key="step.id"
          class="flex items-center gap-3 rounded-xl border p-3 transition-colors"
          :class="
            step.done
              ? 'bg-muted/40 border-transparent'
              : i === currentIndex
                ? 'border-primary/40 bg-primary/5'
                : 'opacity-60'
          "
        >
          <span
            class="flex size-8 shrink-0 items-center justify-center rounded-full border text-xs font-semibold transition-colors"
            :class="
              step.done
                ? 'bg-primary text-primary-foreground border-primary'
                : i === currentIndex
                  ? 'border-primary text-primary'
                  : 'text-muted-foreground'
            "
          >
            <Icon v-if="step.done" name="lucide:check" class="size-4" />
            <Icon
              v-else-if="loading === step.id"
              name="lucide:loader-circle"
              class="size-4 animate-spin"
            />
            <template v-else>{{ i + 1 }}</template>
          </span>
          <div class="min-w-0 flex-1">
            <p
              class="text-sm font-medium"
              :class="step.done && 'text-muted-foreground line-through'"
            >
              {{ step.title }}
            </p>
            <p v-if="!step.done" class="text-muted-foreground text-xs">{{ step.description }}</p>
          </div>
          <UiButton
            v-if="i === currentIndex && !step.done"
            size="sm"
            :disabled="loading === step.id"
            @click="run(step.id)"
          >
            {{ step.action }}
          </UiButton>
        </li>
      </ol>

      <div class="mt-6 flex items-center justify-between gap-3">
        <UiButton v-if="!complete" variant="ghost" size="sm" @click="reset">Skip for now</UiButton>
        <UiButton v-else variant="outline" size="sm" @click="reset">Start over</UiButton>
        <UiButton v-if="complete" size="sm">
          Go to dashboard
          <Icon name="lucide:arrow-right" class="size-4" />
        </UiButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
    }>(),
    {
      title: "Let's get you set up",
      description: "Three quick steps and you're ready to go.",
    }
  );

  const steps = reactive([
    {
      id: "account",
      title: "Connect your account",
      description: "Link the service you want to pull data from.",
      action: "Connect",
      done: true,
    },
    {
      id: "prefs",
      title: "Configure your preferences",
      description: "Choose your timezone and notification settings.",
      action: "Configure",
      done: false,
    },
    {
      id: "team",
      title: "Invite your team members",
      description: "Collaborate with the people you work with.",
      action: "Invite",
      done: false,
    },
  ]);

  const loading = ref<string>();
  const circumference = 2 * Math.PI * 28;

  const doneCount = computed(() => steps.filter((step) => step.done).length);
  const progress = computed(() => doneCount.value / steps.length);
  const currentIndex = computed(() => steps.findIndex((step) => !step.done));
  const complete = computed(() => doneCount.value === steps.length);

  async function run(id: string) {
    loading.value = id;
    await new Promise((resolve) => setTimeout(resolve, 700));
    const step = steps.find((item) => item.id === id);
    if (step) step.done = true;
    loading.value = undefined;
  }

  function reset() {
    steps.forEach((step, i) => {
      step.done = i === 0;
    });
  }
</script>
