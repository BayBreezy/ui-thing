<template>
  <!--
    Conversation list grouped by date
    Features: Sticky group headings for today, yesterday and earlier, a pinned section at the top, pin and unpin buttons that appear on hover and focus, relative times and a scroll area
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-md overflow-hidden rounded-xl border">
      <div class="border-b px-4 py-3">
        <h1 class="text-lg font-semibold">Conversations</h1>
      </div>
      <UiScrollArea class="h-[28rem]">
        <section v-for="group in groups" :key="group.label" :aria-label="group.label">
          <h2
            class="bg-muted/60 text-muted-foreground sticky top-0 z-10 px-4 py-1.5 text-xs font-semibold tracking-wide uppercase backdrop-blur"
          >
            {{ group.label }}
          </h2>
          <ul class="divide-y" role="list">
            <li
              v-for="chat in group.items"
              :key="chat.id"
              class="group/row hover:bg-muted/50 relative flex items-center gap-3 px-4 py-3"
            >
              <UiAvatar :src="chat.avatar" :fallback="chat.name[0]" class="size-10" />
              <div class="min-w-0 flex-1">
                <div class="flex items-baseline justify-between gap-2">
                  <p class="truncate font-medium">{{ chat.name }}</p>
                  <p class="text-muted-foreground shrink-0 text-xs">{{ chat.time }}</p>
                </div>
                <p class="text-muted-foreground truncate text-sm">{{ chat.preview }}</p>
              </div>
              <UiButton
                variant="ghost"
                size="icon-sm"
                class="opacity-0 transition group-focus-within/row:opacity-100 group-hover/row:opacity-100"
                :aria-label="`${chat.pinned ? 'Unpin' : 'Pin'} ${chat.name}`"
                @click="chat.pinned = !chat.pinned"
              >
                <Icon :name="chat.pinned ? 'lucide:pin-off' : 'lucide:pin'" class="size-4" />
              </UiButton>
            </li>
          </ul>
        </section>
      </UiScrollArea>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Conversation = {
    id: string;
    name: string;
    avatar: string;
    preview: string;
    time: string;
    day: "Today" | "Yesterday" | "Earlier";
    pinned: boolean;
  };

  const props = withDefaults(
    defineProps<{
      conversations?: Conversation[];
    }>(),
    {
      conversations: () => [
        {
          id: "1",
          name: "Maya Chen",
          avatar: "https://i.pravatar.cc/80?img=45",
          preview: "Board deck is final.",
          time: "Fri",
          day: "Earlier",
          pinned: true,
        },
        {
          id: "2",
          name: "Sofia Alvarez",
          avatar: "https://i.pravatar.cc/80?img=32",
          preview: "Can you review the mockups?",
          time: "9:41 AM",
          day: "Today",
          pinned: false,
        },
        {
          id: "3",
          name: "Liam Carter",
          avatar: "https://i.pravatar.cc/80?img=12",
          preview: "Deployed to staging.",
          time: "9:12 AM",
          day: "Today",
          pinned: false,
        },
        {
          id: "4",
          name: "Design team",
          avatar: "https://i.pravatar.cc/80?img=47",
          preview: "Aisha: Moodboard is ready",
          time: "5:20 PM",
          day: "Yesterday",
          pinned: false,
        },
        {
          id: "5",
          name: "Noah Williams",
          avatar: "https://i.pravatar.cc/80?img=15",
          preview: "Invoice is on its way.",
          time: "2:05 PM",
          day: "Yesterday",
          pinned: false,
        },
        {
          id: "6",
          name: "Ethan Brooks",
          avatar: "https://i.pravatar.cc/80?img=33",
          preview: "Thursday works for me.",
          time: "Mon",
          day: "Earlier",
          pinned: false,
        },
        {
          id: "7",
          name: "Aisha Khan",
          avatar: "https://i.pravatar.cc/80?img=44",
          preview: "Campaign results look strong.",
          time: "Sun",
          day: "Earlier",
          pinned: false,
        },
      ],
    }
  );

  const items = ref<Conversation[]>(props.conversations.map((chat) => ({ ...chat })));

  const groups = computed(() => {
    const result: { label: string; items: Conversation[] }[] = [];
    const pinned = items.value.filter((chat) => chat.pinned);
    if (pinned.length) result.push({ label: "Pinned", items: pinned });
    for (const label of ["Today", "Yesterday", "Earlier"] as const) {
      const rows = items.value.filter((chat) => !chat.pinned && chat.day === label);
      if (rows.length) result.push({ label, items: rows });
    }
    return result;
  });
</script>
