<template>
  <!--
    Conversation list with unread badges and tabs
    Features: All and unread tabs with counts, bold names and a badge for unread conversations, opening a conversation marks it read, mark all as read action and an empty state
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-md overflow-hidden rounded-xl border">
      <div class="flex items-center justify-between px-4 pt-3">
        <h1 class="text-lg font-semibold">Inbox</h1>
        <UiButton variant="ghost" size="sm" :disabled="!unread" @click="markAll"
          >Mark all read</UiButton
        >
      </div>
      <UiTabs v-model="tab" class="px-4 pt-2 pb-3">
        <UiTabsList class="w-full">
          <UiTabsTrigger value="all" class="flex-1">All</UiTabsTrigger>
          <UiTabsTrigger value="unread" class="flex-1">
            Unread
            <UiBadge v-if="unread" class="ml-1.5">{{ unread }}</UiBadge>
          </UiTabsTrigger>
        </UiTabsList>
      </UiTabs>
      <ul class="divide-y border-t" role="list">
        <li v-for="chat in rows" :key="chat.id">
          <button
            type="button"
            class="hover:bg-muted/50 focus-visible:ring-ring/50 flex w-full items-center gap-3 px-4 py-3 text-left outline-none focus-visible:ring-[3px] focus-visible:ring-inset"
            @click="open(chat)"
          >
            <UiAvatar :src="chat.avatar" :fallback="chat.name[0]" class="size-10" />
            <span class="min-w-0 flex-1">
              <span class="flex items-baseline justify-between gap-2">
                <span class="truncate" :class="chat.unread ? 'font-semibold' : 'font-medium'">{{
                  chat.name
                }}</span>
                <span class="text-muted-foreground shrink-0 text-xs">{{ chat.time }}</span>
              </span>
              <span class="flex items-center gap-2">
                <span
                  class="block flex-1 truncate text-sm"
                  :class="chat.unread ? 'text-foreground' : 'text-muted-foreground'"
                >
                  {{ chat.preview }}
                </span>
                <UiBadge v-if="chat.unread" shape="pill" class="min-w-5 justify-center">
                  {{ chat.unread }}
                  <span class="sr-only">unread messages</span>
                </UiBadge>
              </span>
            </span>
          </button>
        </li>
        <li
          v-if="!rows.length"
          class="text-muted-foreground flex flex-col items-center gap-2 px-4 py-12 text-sm"
        >
          <Icon name="lucide:inbox" class="size-6" />
          You are all caught up.
        </li>
      </ul>
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
    unread: number;
  };

  const props = withDefaults(
    defineProps<{
      conversations?: Conversation[];
    }>(),
    {
      conversations: () => [
        {
          id: "1",
          name: "Sofia Alvarez",
          avatar: "https://i.pravatar.cc/80?img=32",
          preview: "Can you review the new mockups?",
          time: "9:41 AM",
          unread: 3,
        },
        {
          id: "2",
          name: "Liam Carter",
          avatar: "https://i.pravatar.cc/80?img=12",
          preview: "Deployed the fix to staging.",
          time: "9:12 AM",
          unread: 1,
        },
        {
          id: "3",
          name: "Design team",
          avatar: "https://i.pravatar.cc/80?img=47",
          preview: "Aisha: Moodboard is ready",
          time: "Yesterday",
          unread: 0,
        },
        {
          id: "4",
          name: "Noah Williams",
          avatar: "https://i.pravatar.cc/80?img=15",
          preview: "I will send the invoice tomorrow.",
          time: "Yesterday",
          unread: 0,
        },
        {
          id: "5",
          name: "Ethan Brooks",
          avatar: "https://i.pravatar.cc/80?img=33",
          preview: "Are we still on for Thursday?",
          time: "Mon",
          unread: 2,
        },
      ],
    }
  );

  const items = ref<Conversation[]>(props.conversations.map((chat) => ({ ...chat })));
  const tab = ref("all");

  const unread = computed(() => items.value.filter((chat) => chat.unread).length);
  const rows = computed(() =>
    tab.value === "unread" ? items.value.filter((chat) => chat.unread) : items.value
  );

  function open(chat: Conversation) {
    chat.unread = 0;
  }

  function markAll() {
    items.value.forEach((chat) => (chat.unread = 0));
  }
</script>
