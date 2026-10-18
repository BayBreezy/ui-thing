<template>
  <!--
    Notification bell with a popover list
    Features: Bell button with an unread count, a popover with the latest notifications, unread dots, a mark all as read action, click a row to mark it read, relative times and a view all link
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-3xl">
      <header class="flex items-center justify-between rounded-xl border px-4 py-3">
        <span class="flex items-center gap-2 font-semibold"
          ><Icon name="lucide:layout-dashboard" class="size-5" />Acme</span
        >
        <div class="flex items-center gap-2">
          <UiPopover>
            <UiPopoverTrigger as-child>
              <UiButton
                variant="ghost"
                size="icon"
                class="relative"
                :aria-label="`Notifications, ${unread} unread`"
              >
                <Icon name="lucide:bell" class="size-5" />
                <span
                  v-if="unread"
                  class="bg-primary text-primary-foreground absolute -top-0.5 -right-0.5 grid min-w-4 place-items-center rounded-full px-1 text-[10px] leading-4 font-semibold"
                  aria-hidden="true"
                  >{{ unread }}</span
                >
              </UiButton>
            </UiPopoverTrigger>
            <UiPopoverContent align="end" class="w-[22rem] p-0">
              <div class="flex items-center justify-between border-b px-4 py-3">
                <p class="text-sm font-semibold">Notifications</p>
                <UiButton
                  variant="ghost"
                  size="sm"
                  class="h-7 px-2"
                  :disabled="!unread"
                  @click="markAll"
                  >Mark all as read</UiButton
                >
              </div>
              <ul v-if="items.length" class="max-h-80 divide-y overflow-y-auto">
                <li v-for="item in items" :key="item.id">
                  <button
                    type="button"
                    class="hover:bg-accent focus-visible:bg-accent flex w-full items-start gap-3 px-4 py-3 text-left outline-none"
                    @click="item.read = true"
                  >
                    <UiAvatar
                      :src="`https://i.pravatar.cc/80?img=${item.avatar}`"
                      :fallback="item.actor.slice(0, 1)"
                      class="size-8"
                    />
                    <span class="min-w-0 flex-1 text-sm">
                      <span class="block leading-snug">
                        <span class="font-medium">{{ item.actor }}</span> {{ item.text }}
                        <span class="font-medium">{{ item.target }}</span>
                      </span>
                      <span class="text-muted-foreground mt-0.5 block text-xs">{{
                        ago(item.at)
                      }}</span>
                    </span>
                    <span
                      v-if="!item.read"
                      class="bg-primary mt-1.5 size-2 shrink-0 rounded-full"
                      aria-label="Unread"
                    />
                  </button>
                </li>
              </ul>
              <p v-else class="text-muted-foreground px-4 py-10 text-center text-sm">
                No notifications yet.
              </p>
              <div class="border-t p-2">
                <UiButton
                  variant="ghost"
                  size="sm"
                  class="w-full"
                  @click="useSonner.info('Open your notifications page here')"
                  >View all notifications</UiButton
                >
              </div>
            </UiPopoverContent>
          </UiPopover>
          <UiAvatar src="https://i.pravatar.cc/80?img=32" fallback="A" class="size-8" />
        </div>
      </header>
      <p class="text-muted-foreground mt-6 text-center text-sm">
        Select the bell to open the popover.
      </p>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Notification = {
    id: string;
    actor: string;
    avatar: number;
    text: string;
    target: string;
    /** When it happened, as `YYYY-MM-DDTHH:mm`. */
    at: string;
    read: boolean;
  };

  const props = withDefaults(
    defineProps<{
      /** The current moment as `YYYY-MM-DDTHH:mm`. */
      now?: string;
      notifications?: Notification[];
    }>(),
    {
      now: "2026-10-18T10:20",
      notifications: () => [
        {
          id: "n1",
          actor: "Maya Patel",
          avatar: 32,
          text: "commented on",
          target: "Homepage redesign",
          at: "2026-10-18T10:05",
          read: false,
        },
        {
          id: "n2",
          actor: "Leo Fischer",
          avatar: 12,
          text: "mentioned you in",
          target: "API rate limits",
          at: "2026-10-18T09:40",
          read: false,
        },
        {
          id: "n3",
          actor: "Sofia Alvarez",
          avatar: 45,
          text: "invited you to",
          target: "Q4 planning",
          at: "2026-10-18T08:15",
          read: false,
        },
        {
          id: "n4",
          actor: "Noah Kim",
          avatar: 15,
          text: "approved",
          target: "Release 2.4",
          at: "2026-10-17T16:30",
          read: true,
        },
        {
          id: "n5",
          actor: "Priya Nair",
          avatar: 44,
          text: "assigned you to",
          target: "Fix invoice rounding",
          at: "2026-10-16T11:00",
          read: true,
        },
      ],
    }
  );

  const items = ref<Notification[]>(props.notifications.map((item) => ({ ...item })));
  const unread = computed(() => items.value.filter((item) => !item.read).length);

  function ago(iso: string) {
    const diff = Math.round(
      (new Date(`${props.now}:00Z`).getTime() - new Date(`${iso}:00Z`).getTime()) / 60000
    );
    if (diff < 1) return "Just now";
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    const days = Math.floor(diff / 1440);
    return days === 1 ? "Yesterday" : `${days}d ago`;
  }

  function markAll() {
    items.value.forEach((item) => (item.read = true));
  }
</script>
