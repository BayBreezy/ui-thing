<template>
  <!--
    Notifications summary banner
    Features: Avatar stack of senders, unread count, latest message preview, mark as read that swaps to an all caught up state, view all action, dismiss
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
        <div class="bg-card relative mx-auto max-w-3xl rounded-xl border p-4 pr-12 shadow-sm">
          <Transition
            mode="out-in"
            enter-active-class="transition duration-200"
            enter-from-class="opacity-0 translate-y-1"
            leave-active-class="transition duration-150"
            leave-to-class="opacity-0 -translate-y-1"
          >
            <div
              v-if="unread > 0"
              key="unread"
              class="flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              <div class="flex -space-x-2">
                <UiAvatar
                  v-for="person in props.people"
                  :key="person.name"
                  :src="person.avatar"
                  :fallback="person.name[0]"
                  class="ring-card size-9 ring-2"
                />
              </div>
              <div class="min-w-0 flex-1">
                <p class="text-sm font-semibold">
                  You have {{ unread }} new {{ unread === 1 ? "notification" : "notifications" }}
                </p>
                <p class="text-muted-foreground truncate text-sm">
                  <span class="text-foreground font-medium">{{ props.people[0]?.name }}</span>
                  {{ props.preview }}
                </p>
              </div>
              <div class="flex shrink-0 gap-2">
                <UiButton size="sm">
                  <Icon name="lucide:inbox" class="size-4" />
                  View all
                </UiButton>
                <UiButton size="sm" variant="outline" @click="unread = 0">
                  <Icon name="lucide:check-check" class="size-4" />
                  Mark as read
                </UiButton>
              </div>
            </div>
            <div v-else key="caught-up" class="flex items-center gap-3 py-1">
              <span
                class="flex size-9 items-center justify-center rounded-full bg-green-500/15 text-green-600 dark:text-green-400"
              >
                <Icon name="lucide:check" class="size-5" />
              </span>
              <p class="flex-1 text-sm font-medium">You're all caught up</p>
              <UiButton variant="ghost" size="sm" @click="unread = props.count">Undo</UiButton>
            </div>
          </Transition>

          <button
            type="button"
            class="text-muted-foreground hover:bg-muted hover:text-foreground absolute top-3 right-3 flex size-7 items-center justify-center rounded-md transition-colors"
            aria-label="Dismiss notifications banner"
            @click="visible = false"
          >
            <Icon name="lucide:x" class="size-4" />
          </button>
        </div>
      </Motion>
    </AnimatePresence>
    <div v-if="!visible" class="text-center">
      <UiButton variant="ghost" size="sm" @click="show">Show banner again</UiButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      count?: number;
      preview?: string;
      people?: { name: string; avatar: string }[];
    }>(),
    {
      count: 3,
      preview: 'commented on your design review: "Can we move this to Friday?"',
      people: () => [
        { name: "Priya Nair", avatar: "https://i.pravatar.cc/80?img=45" },
        { name: "Liam Carter", avatar: "https://i.pravatar.cc/80?img=12" },
        { name: "Sam Okafor", avatar: "https://i.pravatar.cc/80?img=32" },
      ],
    }
  );

  const visible = ref(true);
  const unread = ref(props.count);

  function show() {
    unread.value = props.count;
    visible.value = true;
  }
</script>
