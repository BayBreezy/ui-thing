<template>
  <!--
    Inbox zero notifications
    Features: A queue of notifications you clear one at a time with a done button, a progress count, a friendly empty state when the queue is empty and a restore button to bring everything back
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-xl">
      <div class="flex items-center justify-between gap-3">
        <h1 class="text-2xl font-bold tracking-tight">Inbox</h1>
        <p class="text-muted-foreground text-sm tabular-nums" aria-live="polite">
          {{ cleared }} of {{ total }} cleared
        </p>
      </div>
      <UiProgress
        :model-value="total ? (cleared / total) * 100 : 0"
        class="mt-3 h-1.5"
        aria-label="Cleared"
      />

      <ul v-if="queue.length" class="mt-6 space-y-3" aria-live="polite">
        <li
          v-for="item in queue"
          :key="item.id"
          class="flex items-center gap-3 rounded-xl border p-4"
        >
          <span class="bg-muted grid size-10 shrink-0 place-items-center rounded-full"
            ><Icon :name="item.icon" class="size-5"
          /></span>
          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-medium">{{ item.title }}</p>
            <p class="text-muted-foreground truncate text-sm">{{ item.body }}</p>
          </div>
          <UiButton
            variant="outline"
            size="sm"
            :aria-label="`Mark done: ${item.title}`"
            @click="done(item.id)"
            ><Icon name="lucide:check" class="size-4" />Done</UiButton
          >
        </li>
      </ul>
      <div v-else class="mt-6 rounded-xl border border-dashed px-6 py-14 text-center" role="status">
        <span
          class="mx-auto grid size-14 place-items-center rounded-full bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300"
          ><Icon name="lucide:party-popper" class="size-7"
        /></span>
        <h2 class="mt-4 text-lg font-semibold">You are all caught up</h2>
        <p class="text-muted-foreground mt-1 text-sm">No new notifications. Enjoy the quiet.</p>
        <UiButton variant="outline" size="sm" class="mt-5" @click="restore"
          >Restore notifications</UiButton
        >
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Item = { id: string; icon: string; title: string; body: string };

  const props = withDefaults(
    defineProps<{
      notifications?: Item[];
    }>(),
    {
      notifications: () => [
        {
          id: "q1",
          icon: "lucide:message-square",
          title: "Maya commented on Homepage redesign",
          body: "Can we try a larger hero image on mobile?",
        },
        {
          id: "q2",
          icon: "lucide:at-sign",
          title: "Leo mentioned you in API rate limits",
          body: "Can you confirm the limit for the free plan?",
        },
        {
          id: "q3",
          icon: "lucide:calendar-plus",
          title: "Sofia invited you to Q4 planning",
          body: "Tuesday, 10:00 AM in Meeting room 1.",
        },
      ],
    }
  );

  const queue = ref<Item[]>(props.notifications.map((item) => ({ ...item })));
  const total = props.notifications.length;
  const cleared = computed(() => total - queue.value.length);

  function done(id: string) {
    queue.value = queue.value.filter((item) => item.id !== id);
  }

  function restore() {
    queue.value = props.notifications.map((item) => ({ ...item }));
  }
</script>
