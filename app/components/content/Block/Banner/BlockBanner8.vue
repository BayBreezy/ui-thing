<template>
  <!--
    Alert banners in four tones
    Features: Info, success, warning and error variants with matching icons and colors, title and description, optional action link, each dismissible with a collapse animation
  -->
  <div class="mx-auto max-w-3xl px-4 py-6">
    <AnimatePresence>
      <Motion
        v-for="alert in visibleAlerts"
        :key="alert.id"
        class="overflow-hidden"
        :initial="{ height: 0, opacity: 0 }"
        :animate="{ height: 'auto', opacity: 1 }"
        :exit="{ height: 0, opacity: 0 }"
        :transition="{ duration: 0.25, ease: 'easeInOut' }"
      >
        <div class="pb-3">
          <div
            class="relative flex gap-3 rounded-xl border p-4 pr-10"
            :class="tones[alert.tone].box"
            role="alert"
          >
            <span
              class="flex size-8 shrink-0 items-center justify-center rounded-full"
              :class="tones[alert.tone].icon"
            >
              <Icon :name="tones[alert.tone].name" class="size-4" />
            </span>
            <div class="min-w-0 flex-1">
              <p class="text-sm font-semibold">{{ alert.title }}</p>
              <p class="text-muted-foreground mt-0.5 text-sm">{{ alert.description }}</p>
              <NuxtLink
                v-if="alert.action"
                to="#"
                class="mt-2 inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline"
                :class="tones[alert.tone].link"
              >
                {{ alert.action }}
                <Icon name="lucide:arrow-right" class="size-3.5" />
              </NuxtLink>
            </div>
            <button
              type="button"
              class="text-muted-foreground hover:bg-foreground/10 hover:text-foreground absolute top-3 right-3 flex size-6 items-center justify-center rounded-md transition-colors"
              :aria-label="`Dismiss ${alert.title}`"
              @click="dismiss(alert.id)"
            >
              <Icon name="lucide:x" class="size-4" />
            </button>
          </div>
        </div>
      </Motion>
    </AnimatePresence>
    <div v-if="!visibleAlerts.length" class="py-4 text-center">
      <UiButton variant="ghost" size="sm" @click="dismissed = []">Show banners again</UiButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
  type Tone = "info" | "success" | "warning" | "error";

  const props = withDefaults(
    defineProps<{
      alerts?: { id: number; tone: Tone; title: string; description: string; action?: string }[];
    }>(),
    {
      alerts: () => [
        {
          id: 1,
          tone: "info",
          title: "A new version is available",
          description: "Version 2.4 adds dark mode and faster exports.",
          action: "See what's new",
        },
        {
          id: 2,
          tone: "success",
          title: "Payment received",
          description: "Your invoice for October was paid in full. A receipt is on its way.",
        },
        {
          id: 3,
          tone: "warning",
          title: "Your trial ends in 3 days",
          description: "Add a payment method to keep access to your projects.",
          action: "Add payment method",
        },
        {
          id: 4,
          tone: "error",
          title: "We couldn't sync your data",
          description: "Check your connection and try again. Changes are saved locally.",
          action: "Try again",
        },
      ],
    }
  );

  const tones: Record<Tone, { name: string; box: string; icon: string; link: string }> = {
    info: {
      name: "lucide:info",
      box: "border-blue-500/30 bg-blue-500/5",
      icon: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
      link: "text-blue-600 dark:text-blue-400",
    },
    success: {
      name: "lucide:circle-check",
      box: "border-green-500/30 bg-green-500/5",
      icon: "bg-green-500/15 text-green-600 dark:text-green-400",
      link: "text-green-600 dark:text-green-400",
    },
    warning: {
      name: "lucide:triangle-alert",
      box: "border-amber-500/40 bg-amber-500/5",
      icon: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
      link: "text-amber-600 dark:text-amber-400",
    },
    error: {
      name: "lucide:circle-x",
      box: "border-red-500/30 bg-red-500/5",
      icon: "bg-red-500/15 text-red-600 dark:text-red-400",
      link: "text-red-600 dark:text-red-400",
    },
  };

  const dismissed = ref<number[]>([]);
  const visibleAlerts = computed(() =>
    props.alerts.filter((alert) => !dismissed.value.includes(alert.id))
  );

  function dismiss(id: number) {
    dismissed.value = [...dismissed.value, id];
  }
</script>
