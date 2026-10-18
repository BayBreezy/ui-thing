<template>
  <!--
    Notifications grouped by day
    Features: Sections for today, yesterday and earlier, a sticky style heading with the unread count, an icon for each kind of notification, hover actions to mark a row read or dismiss it and a mark all as read button
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-2xl">
      <div class="flex items-center justify-between gap-3">
        <h1 class="text-2xl font-bold tracking-tight">Activity</h1>
        <UiButton variant="outline" size="sm" :disabled="!unread" @click="markAll"
          ><Icon name="lucide:check-check" class="size-4" />Mark all as read</UiButton
        >
      </div>

      <div v-if="groups.length" class="mt-6 space-y-8" aria-live="polite">
        <section v-for="group in groups" :key="group.label" :aria-label="group.label">
          <h2
            class="text-muted-foreground mb-2 flex items-center gap-2 text-xs font-semibold tracking-wide uppercase"
          >
            {{ group.label }}
            <UiBadge v-if="group.unread" variant="soft" color="blue" shape="pill"
              >{{ group.unread }} new</UiBadge
            >
          </h2>
          <ul class="divide-y rounded-xl border">
            <li
              v-for="item in group.items"
              :key="item.id"
              class="group relative flex items-start gap-3 px-4 py-3"
            >
              <span
                class="grid size-9 shrink-0 place-items-center rounded-full"
                :class="icons[item.kind].tint"
              >
                <Icon :name="icons[item.kind].name" class="size-4" />
              </span>
              <div class="min-w-0 flex-1">
                <p class="text-sm" :class="item.read ? 'text-muted-foreground' : ''">
                  <span class="text-foreground font-medium">{{ item.title }}</span>
                  {{ item.body }}
                </p>
                <p class="text-muted-foreground mt-0.5 text-xs">{{ time(item.at) }}</p>
              </div>
              <span
                v-if="!item.read"
                class="bg-primary order-last mt-2 size-2 shrink-0 rounded-full"
                aria-label="Unread"
              />
              <div
                class="flex shrink-0 gap-1 opacity-100 transition-opacity md:opacity-0 md:group-focus-within:opacity-100 md:group-hover:opacity-100"
              >
                <UiButton
                  v-if="!item.read"
                  variant="ghost"
                  size="icon-sm"
                  :aria-label="`Mark ${item.title} as read`"
                  @click="item.read = true"
                  ><Icon name="lucide:check" class="size-4"
                /></UiButton>
                <UiButton
                  variant="ghost"
                  size="icon-sm"
                  :aria-label="`Dismiss ${item.title}`"
                  @click="dismiss(item.id)"
                  ><Icon name="lucide:x" class="size-4"
                /></UiButton>
              </div>
            </li>
          </ul>
        </section>
      </div>
      <div
        v-else
        class="text-muted-foreground mt-6 rounded-xl border border-dashed py-14 text-center text-sm"
        aria-live="polite"
      >
        You are all caught up.
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Kind = "comment" | "deploy" | "billing" | "security";
  type Notification = {
    id: string;
    kind: Kind;
    title: string;
    body: string;
    at: string;
    read: boolean;
  };

  const props = withDefaults(
    defineProps<{
      now?: string;
      notifications?: Notification[];
    }>(),
    {
      now: "2026-10-18T10:20",
      notifications: () => [
        {
          id: "g1",
          kind: "comment",
          title: "Maya Patel",
          body: "left 3 comments on Homepage redesign.",
          at: "2026-10-18T10:05",
          read: false,
        },
        {
          id: "g2",
          kind: "deploy",
          title: "Production deploy",
          body: "finished in 2m 14s with no errors.",
          at: "2026-10-18T09:12",
          read: false,
        },
        {
          id: "g3",
          kind: "billing",
          title: "Invoice 1042",
          body: "was paid by Northwind Traders.",
          at: "2026-10-17T17:45",
          read: false,
        },
        {
          id: "g4",
          kind: "security",
          title: "New sign in",
          body: "from Berlin on a Mac. Was this you?",
          at: "2026-10-17T08:30",
          read: true,
        },
        {
          id: "g5",
          kind: "comment",
          title: "Leo Fischer",
          body: "mentioned you in API rate limits.",
          at: "2026-10-15T14:10",
          read: true,
        },
        {
          id: "g6",
          kind: "deploy",
          title: "Staging deploy",
          body: "failed at the build step.",
          at: "2026-10-14T11:00",
          read: true,
        },
      ],
    }
  );

  const icons: Record<Kind, { name: string; tint: string }> = {
    comment: {
      name: "lucide:message-square",
      tint: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300",
    },
    deploy: {
      name: "lucide:rocket",
      tint: "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300",
    },
    billing: {
      name: "lucide:receipt",
      tint: "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300",
    },
    security: {
      name: "lucide:shield-alert",
      tint: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300",
    },
  };

  const items = ref<Notification[]>(props.notifications.map((item) => ({ ...item })));
  const unread = computed(() => items.value.filter((item) => !item.read).length);

  const dayDiff = (iso: string) =>
    Math.round(
      (new Date(`${props.now.slice(0, 10)}T00:00:00Z`).getTime() -
        new Date(`${iso.slice(0, 10)}T00:00:00Z`).getTime()) /
        86_400_000
    );

  const groups = computed(() => {
    const buckets: Record<string, Notification[]> = { Today: [], Yesterday: [], Earlier: [] };
    for (const item of items.value) {
      const diff = dayDiff(item.at);
      buckets[diff === 0 ? "Today" : diff === 1 ? "Yesterday" : "Earlier"]!.push(item);
    }
    return Object.entries(buckets)
      .filter(([, list]) => list.length)
      .map(([label, list]) => ({
        label,
        items: list,
        unread: list.filter((item) => !item.read).length,
      }));
  });

  const time = (iso: string) =>
    new Date(`${iso}:00Z`).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      timeZone: "UTC",
    });

  function markAll() {
    items.value.forEach((item) => (item.read = true));
  }

  function dismiss(id: string) {
    items.value = items.value.filter((item) => item.id !== id);
  }
</script>
