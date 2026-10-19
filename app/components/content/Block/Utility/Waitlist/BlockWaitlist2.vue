<template>
  <!--
    Launch countdown
    Features: Live days, hours, minutes and seconds countdown to a launch date, launched state when it ends, email reminder form with confirmation
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-3xl text-center">
      <p class="text-primary text-sm font-semibold tracking-wide uppercase">{{ eyebrow }}</p>
      <h1 class="mt-3 text-4xl font-bold tracking-tight lg:text-5xl">{{ title }}</h1>

      <div v-if="remaining > 0" class="mt-10" role="timer" :aria-label="spoken">
        <div class="grid grid-cols-4 gap-2 sm:gap-4" aria-hidden="true">
          <div v-for="unit in units" :key="unit.label" class="rounded-xl border p-3 sm:p-6">
            <p class="text-3xl font-bold tabular-nums sm:text-5xl">
              {{ String(unit.value).padStart(2, "0") }}
            </p>
            <p class="text-muted-foreground mt-1 text-xs tracking-wide uppercase sm:text-sm">
              {{ unit.label }}
            </p>
          </div>
        </div>
        <p class="text-muted-foreground mt-4 text-sm">Opening {{ launchLabel }}</p>
      </div>

      <div v-else class="mt-10 rounded-xl border p-8" role="status">
        <Icon name="lucide:party-popper" class="text-primary mx-auto size-10" />
        <p class="mt-3 text-2xl font-semibold">We are live</p>
        <UiButton size="lg" class="mt-4">Open the app</UiButton>
      </div>

      <form v-if="remaining > 0" class="mx-auto mt-10 max-w-md" novalidate @submit.prevent="submit">
        <div v-if="done" class="rounded-lg border p-4 text-sm" role="status">
          <Icon name="lucide:bell-ring" class="text-primary mr-1 inline size-4" />
          Reminder set. We will email {{ email.trim() }} when the countdown ends.
        </div>
        <template v-else>
          <div class="flex flex-col gap-2 sm:flex-row">
            <UiLabel for="count-email" class="sr-only">Email address</UiLabel>
            <UiInput
              id="count-email"
              v-model="email"
              type="email"
              autocomplete="email"
              placeholder="you@example.com"
              class="h-10 flex-1"
              :aria-invalid="!!error"
            />
            <UiButton type="submit" size="lg">Remind me</UiButton>
          </div>
          <p v-if="error" class="text-destructive mt-2 text-left text-sm">{{ error }}</p>
        </template>
      </form>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      eyebrow?: string;
      title?: string;
      launch?: string;
      now?: string;
    }>(),
    {
      eyebrow: "Launch day",
      title: "The doors open soon",
      launch: "2026-11-12T16:00:00Z",
      now: "2026-10-18T09:00:00Z",
    }
  );

  // Time is counted from the `now` prop so the demo is stable. Pass the current time in real use.
  const started = Date.now();
  const clock = useNow({ interval: 1000 });
  const elapsed = computed(() => Math.floor((clock.value.getTime() - started) / 1000));

  const remaining = computed(() =>
    Math.max(
      0,
      Math.floor((Date.parse(props.launch) - Date.parse(props.now)) / 1000) - elapsed.value
    )
  );

  const units = computed(() => [
    { label: "Days", value: Math.floor(remaining.value / 86400) },
    { label: "Hours", value: Math.floor((remaining.value % 86400) / 3600) },
    { label: "Minutes", value: Math.floor((remaining.value % 3600) / 60) },
    { label: "Seconds", value: remaining.value % 60 },
  ]);

  const spoken = computed(
    () =>
      `${units.value[0]!.value} days, ${units.value[1]!.value} hours and ${units.value[2]!.value} minutes left`
  );

  const launchLabel = computed(
    () =>
      new Intl.DateTimeFormat("en-US", {
        dateStyle: "long",
        timeStyle: "short",
        timeZone: "UTC",
      }).format(new Date(props.launch)) + " UTC"
  );

  const email = ref("");
  const error = ref("");
  const done = ref(false);

  function submit() {
    if (!/^\S+@\S+\.\S+$/.test(email.value.trim())) {
      error.value = "Enter a valid email address.";
      return;
    }
    error.value = "";
    done.value = true;
  }
</script>
