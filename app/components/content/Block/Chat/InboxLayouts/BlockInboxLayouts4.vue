<template>
  <!--
    Mobile first stacked messenger
    Features: One screen at a time with a list view and a thread view, a back button with an accessible name, bottom tab bar with unread counts, thread opens full width and focus moves to the thread heading
  -->
  <div
    class="mx-auto flex h-[40rem] w-full max-w-sm flex-col overflow-hidden rounded-3xl border shadow-sm"
  >
    <template v-if="!open">
      <header class="px-4 pt-5 pb-3">
        <h1 class="text-2xl font-bold tracking-tight">{{ tab === "chats" ? "Chats" : "Calls" }}</h1>
        <div class="relative mt-3">
          <UiLabel for="inbox4-search" class="sr-only">Search</UiLabel>
          <Icon
            name="lucide:search"
            class="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
          />
          <UiInput
            id="inbox4-search"
            v-model="query"
            placeholder="Search"
            class="bg-muted h-9 rounded-full border-0 pl-9"
          />
        </div>
      </header>
      <ul v-if="tab === 'chats'" class="min-h-0 flex-1 overflow-y-auto" role="list">
        <li v-for="chat in filtered" :key="chat.id">
          <button
            type="button"
            class="hover:bg-muted/50 focus-visible:ring-ring/50 flex w-full items-center gap-3 px-4 py-3 text-left outline-none focus-visible:ring-[3px] focus-visible:ring-inset"
            @click="openChat(chat)"
          >
            <UiAvatar :src="chat.avatar" :fallback="chat.name[0]" class="size-12" />
            <span class="min-w-0 flex-1">
              <span class="flex items-baseline justify-between gap-2">
                <span class="truncate" :class="chat.unread ? 'font-semibold' : 'font-medium'">{{
                  chat.name
                }}</span>
                <span class="text-muted-foreground shrink-0 text-xs">{{ chat.time }}</span>
              </span>
              <span class="flex items-center gap-2">
                <span class="text-muted-foreground flex-1 truncate text-sm">{{
                  chat.messages[chat.messages.length - 1]!.text
                }}</span>
                <UiBadge v-if="chat.unread" shape="pill"
                  >{{ chat.unread }}<span class="sr-only"> unread</span></UiBadge
                >
              </span>
            </span>
          </button>
        </li>
        <li v-if="!filtered.length" class="text-muted-foreground px-4 py-12 text-center text-sm">
          No chats found.
        </li>
      </ul>
      <div
        v-else
        class="text-muted-foreground grid flex-1 place-items-center px-6 text-center text-sm"
      >
        <div>
          <Icon name="lucide:phone-off" class="mx-auto mb-2 size-8" />
          No recent calls.
        </div>
      </div>
    </template>

    <template v-else>
      <header class="flex items-center gap-2 border-b px-2 py-3">
        <UiButton variant="ghost" size="icon" aria-label="Back to chats" @click="open = undefined">
          <Icon name="lucide:chevron-left" class="size-5" />
        </UiButton>
        <UiAvatar :src="open.avatar" :fallback="open.name[0]" class="size-9" />
        <h1 ref="heading" tabindex="-1" class="font-semibold outline-none">{{ open.name }}</h1>
      </header>
      <div class="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
        <UiMessage
          v-for="(message, index) in open.messages"
          :key="index"
          :align="message.mine ? 'end' : 'start'"
        >
          <UiMessageContent>
            <UiBubble :variant="message.mine ? 'default' : 'muted'">
              <UiBubbleContent>{{ message.text }}</UiBubbleContent>
            </UiBubble>
          </UiMessageContent>
        </UiMessage>
      </div>
      <form class="flex items-center gap-2 border-t p-3" @submit.prevent="send">
        <UiLabel for="inbox4" class="sr-only">Message</UiLabel>
        <UiInput
          id="inbox4"
          v-model="draft"
          placeholder="Message"
          class="rounded-full"
          autocomplete="off"
        />
        <UiButton
          type="submit"
          size="icon"
          class="rounded-full"
          :disabled="!draft.trim()"
          aria-label="Send message"
        >
          <Icon name="lucide:arrow-up" class="size-4" />
        </UiButton>
      </form>
    </template>

    <nav v-if="!open" class="grid grid-cols-2 border-t" aria-label="Sections">
      <button
        v-for="item in tabs"
        :key="item.id"
        type="button"
        class="focus-visible:ring-ring/50 flex flex-col items-center gap-0.5 py-2.5 text-xs outline-none focus-visible:ring-[3px] focus-visible:ring-inset"
        :class="tab === item.id ? 'text-primary font-medium' : 'text-muted-foreground'"
        :aria-current="tab === item.id ? 'page' : undefined"
        @click="tab = item.id"
      >
        <Icon :name="item.icon" class="size-5" />
        {{ item.label }}
      </button>
    </nav>
  </div>
</template>

<script lang="ts" setup>
  type Message = { text: string; mine?: boolean };
  type Chat = {
    id: string;
    name: string;
    avatar: string;
    time: string;
    unread: number;
    messages: Message[];
  };

  const props = withDefaults(
    defineProps<{
      conversations?: Chat[];
    }>(),
    {
      conversations: () => [
        {
          id: "1",
          name: "Sofia Alvarez",
          avatar: "https://i.pravatar.cc/80?img=32",
          time: "9:41",
          unread: 2,
          messages: [
            { text: "Are you free for lunch?" },
            { text: "Can you review the mockups too?" },
          ],
        },
        {
          id: "2",
          name: "Liam Carter",
          avatar: "https://i.pravatar.cc/80?img=12",
          time: "9:12",
          unread: 0,
          messages: [{ text: "Deployed the fix." }, { text: "Nice, thanks!", mine: true }],
        },
        {
          id: "3",
          name: "Family",
          avatar: "https://i.pravatar.cc/80?img=47",
          time: "Yesterday",
          unread: 5,
          messages: [{ text: "Dinner at 7 on Sunday?" }],
        },
        {
          id: "4",
          name: "Noah Williams",
          avatar: "https://i.pravatar.cc/80?img=15",
          time: "Mon",
          unread: 0,
          messages: [{ text: "Talk tomorrow." }],
        },
      ],
    }
  );

  const tabs = [
    { id: "chats", label: "Chats", icon: "lucide:message-circle" },
    { id: "calls", label: "Calls", icon: "lucide:phone" },
  ];

  const chats = ref<Chat[]>(
    props.conversations.map((chat) => ({
      ...chat,
      messages: chat.messages.map((message) => ({ ...message })),
    }))
  );
  const tab = ref("chats");
  const query = ref("");
  const open = ref<Chat>();
  const draft = ref("");
  const heading = ref<HTMLElement>();

  const filtered = computed(() => {
    const term = query.value.trim().toLowerCase();
    return chats.value.filter((chat) => !term || chat.name.toLowerCase().includes(term));
  });

  function openChat(chat: Chat) {
    chat.unread = 0;
    open.value = chat;
    nextTick(() => heading.value?.focus());
  }

  function send() {
    const text = draft.value.trim();
    if (!text || !open.value) return;
    open.value.messages.push({ text, mine: true });
    draft.value = "";
  }
</script>
