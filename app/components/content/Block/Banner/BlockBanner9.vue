<template>
  <!--
    Scheduled maintenance banner with a live countdown
    Features: Warning tone, time until the window starts, affected area and duration metadata, remind me toggle with a bell, view status action, dismiss
  -->
  <div class="px-4 py-6">
    <AnimatePresence>
      <Motion
        v-if="visible"
        class="overflow-hidden"
        :initial="{ height: 0, opacity: 0 }"
        :animate="{ height: 'auto', opacity: 1 }"
        :exit="{ height: 0, opacity: 0 }"
        :transition="{ duration: 0.3, ease: 'easeInOut' }"
      >
        <div
          class="relative mx-auto flex max-w-4xl flex-col gap-4 rounded-xl border border-amber-500/40 bg-amber-500/5 p-4 pr-12 lg:flex-row lg:items-center lg:gap-6"
          role="status"
        >
          <span
            class="flex size-10 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400"
          >
            <Icon name="lucide:wrench" class="size-5" />
          </span>

          <div class="min-w-0 flex-1">
            <p class="font-semibold">{{ props.title }}</p>
            <p class="text-muted-foreground mt-0.5 text-sm">{{ props.description }}</p>
            <ul class="text-muted-foreground mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
              <li class="flex items-center gap-1.5">
                <Icon name="lucide:clock" class="size-3.5" />
                Starts in
                <span class="text-foreground font-semibold tabular-nums">{{ startsIn }}</span>
              </li>
              <li class="flex items-center gap-1.5">
                <Icon name="lucide:hourglass" class="size-3.5" />
                About {{ props.duration }}
              </li>
              <li class="flex items-center gap-1.5">
                <Icon name="lucide:users" class="size-3.5" />
                {{ props.affects }}
              </li>
            </ul>
          </div>

          <div class="flex shrink-0 flex-wrap gap-2">
            <slot>
              <UiButton
                variant="outline"
                size="sm"
                :aria-pressed="reminder"
                @click="toggleReminder"
              >
                <Icon :name="reminder ? 'lucide:bell-ring' : 'lucide:bell'" class="size-4" />
                {{ reminder ? "Reminder set" : "Remind me" }}
              </UiButton>
              <UiButton size="sm">View status page</UiButton>
            </slot>
          </div>

          <button
            type="button"
            class="text-muted-foreground hover:bg-foreground/10 hover:text-foreground absolute top-3 right-3 flex size-7 items-center justify-center rounded-md transition-colors"
            aria-label="Dismiss maintenance notice"
            @click="visible = false"
          >
            <Icon name="lucide:x" class="size-4" />
          </button>
        </div>
      </Motion>
    </AnimatePresence>
    <div v-if="!visible" class="text-center">
      <UiButton variant="ghost" size="sm" @click="visible = true">Show banner again</UiButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      duration?: string;
      affects?: string;
      /** Minutes from now until the maintenance window starts. */
      minutes?: number;
    }>(),
    {
      title: "Scheduled maintenance",
      description: "We're upgrading our database. Expect brief interruptions while it runs.",
      duration: "30 minutes",
      affects: "All users",
      minutes: 312,
    }
  );

  const visible = ref(true);
  const reminder = ref(false);
  const start = Date.now() + props.minutes * 60 * 1000;
  const remaining = ref(Math.max(0, start - Date.now()));

  let timer: ReturnType<typeof setInterval> | undefined;
  onMounted(() => {
    timer = setInterval(() => {
      remaining.value = Math.max(0, start - Date.now());
    }, 1000);
  });
  onBeforeUnmount(() => clearInterval(timer));

  const startsIn = computed(() => {
    const total = Math.floor(remaining.value / 1000);
    const h = Math.floor(total / 3600);
    const m = Math.floor((total % 3600) / 60);
    const s = total % 60;
    return `${h}h ${String(m).padStart(2, "0")}m ${String(s).padStart(2, "0")}s`;
  });

  function toggleReminder() {
    reminder.value = !reminder.value;
    useSonner(reminder.value ? "We'll remind you 15 minutes before" : "Reminder removed");
  }
</script>
