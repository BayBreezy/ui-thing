<template>
  <!--
    Offline page
    Features: Connection status that follows the browser, retry button with attempt count, recovered state, list of pages available offline, tips for reconnecting
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-xl text-center">
      <span
        class="mx-auto grid size-16 place-items-center rounded-2xl"
        :class="
          connected
            ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300'
            : 'bg-muted text-muted-foreground'
        "
      >
        <Icon :name="connected ? 'lucide:wifi' : 'lucide:wifi-off'" class="size-8" />
      </span>

      <div role="status" aria-live="polite">
        <h1 class="mt-6 text-3xl font-bold tracking-tight lg:text-4xl">
          {{ connected ? "You are back online" : "You are offline" }}
        </h1>
        <p class="text-muted-foreground mt-3 text-lg">
          {{
            connected
              ? "Your changes are syncing now. Nothing was lost."
              : "Check your connection. Changes you make are saved on this device and sync when you reconnect."
          }}
        </p>
        <p v-if="!connected && attempts" class="text-muted-foreground mt-2 text-sm">
          Still offline after {{ attempts }} {{ attempts === 1 ? "try" : "tries" }}.
        </p>
      </div>

      <div class="mt-6 flex flex-wrap justify-center gap-2">
        <UiButton v-if="!connected" :disabled="retrying" @click="retry">
          <Icon
            name="lucide:refresh-cw"
            class="size-4"
            :class="retrying ? 'motion-safe:animate-spin' : ''"
          />{{ retrying ? "Trying" : "Try again" }}
        </UiButton>
        <UiButton v-else @click="reset">Continue</UiButton>
      </div>

      <div class="mt-10 text-left">
        <h2 class="text-sm font-medium">Available offline</h2>
        <ul class="mt-3 divide-y rounded-xl border">
          <li v-for="page in pages" :key="page.title" class="flex items-center gap-3 p-3">
            <span class="bg-muted grid size-9 shrink-0 place-items-center rounded-lg"
              ><Icon :name="page.icon" class="size-4"
            /></span>
            <span class="min-w-0 flex-1 text-sm">
              <span class="block truncate font-medium">{{ page.title }}</span>
              <span class="text-muted-foreground block text-xs">{{ page.saved }}</span>
            </span>
            <UiButton variant="ghost" size="sm">Open</UiButton>
          </li>
        </ul>
      </div>

      <ul v-if="!connected" class="text-muted-foreground mt-8 space-y-2 text-left text-sm">
        <li v-for="tip in tips" :key="tip" class="flex gap-2">
          <Icon name="lucide:lightbulb" class="mt-0.5 size-4 shrink-0" />{{ tip }}
        </li>
      </ul>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Page = { icon: string; title: string; saved: string };

  const props = withDefaults(
    defineProps<{
      succeedAfter?: number;
      pages?: Page[];
      tips?: string[];
    }>(),
    {
      succeedAfter: 3,
      pages: () => [
        { icon: "lucide:layout-dashboard", title: "Dashboard", saved: "Saved 4 minutes ago" },
        { icon: "lucide:file-text", title: "Q4 planning notes", saved: "Saved 12 minutes ago" },
        { icon: "lucide:users", title: "Team directory", saved: "Saved yesterday" },
      ],
      tips: () => [
        "Turn airplane mode off and check your Wi-Fi.",
        "Move closer to your router or switch networks.",
        "Reload the page once the connection returns.",
      ],
    }
  );

  // The page starts offline. It recovers when the browser reports a connection after a retry, or
  // after `succeedAfter` retries, which stands in for a real connectivity check in demos.
  const online = useOnline();
  const attempts = ref(0);
  const retrying = ref(false);
  const recovered = ref(false);

  const connected = computed(() => recovered.value);

  watch(online, (value) => {
    if (value && attempts.value > 0) recovered.value = true;
  });

  function retry() {
    retrying.value = true;
    setTimeout(() => {
      attempts.value += 1;
      retrying.value = false;
      if (attempts.value >= props.succeedAfter) recovered.value = true;
    }, 700);
  }

  function reset() {
    recovered.value = false;
    attempts.value = 0;
  }
</script>
