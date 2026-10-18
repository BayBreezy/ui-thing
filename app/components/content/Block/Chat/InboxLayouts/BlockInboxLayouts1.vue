<template>
  <!--
    Two pane chat app
    Features: Conversation list on the left, the selected thread on the right, unread dots that clear when opened, working composer, active conversation highlight and a stacked layout on small screens
  -->
  <div
    class="mx-auto grid h-[40rem] w-full max-w-5xl overflow-hidden rounded-xl border md:grid-cols-[18rem_1fr]"
  >
    <aside
      class="flex min-h-0 flex-col border-b md:border-r md:border-b-0"
      aria-label="Conversations"
    >
      <div class="border-b px-4 py-3 font-semibold">Chats</div>
      <ul class="min-h-0 flex-1 divide-y overflow-y-auto" role="list">
        <li v-for="chat in chats" :key="chat.id">
          <button
            type="button"
            class="hover:bg-muted/50 focus-visible:ring-ring/50 flex w-full items-center gap-3 px-4 py-3 text-left outline-none focus-visible:ring-[3px] focus-visible:ring-inset"
            :class="chat.id === activeId ? 'bg-muted' : ''"
            :aria-current="chat.id === activeId ? 'true' : undefined"
            @click="open(chat)"
          >
            <UiAvatar :src="chat.avatar" :fallback="chat.name[0]" />
            <span class="min-w-0 flex-1">
              <span
                class="block truncate text-sm"
                :class="chat.unread ? 'font-semibold' : 'font-medium'"
                >{{ chat.name }}</span
              >
              <span class="text-muted-foreground block truncate text-xs">{{
                last(chat).text
              }}</span>
            </span>
            <span
              v-if="chat.unread"
              class="bg-primary size-2 shrink-0 rounded-full"
              aria-hidden="true"
            />
            <span v-if="chat.unread" class="sr-only">Unread</span>
          </button>
        </li>
      </ul>
    </aside>

    <section class="flex min-h-0 flex-col" aria-label="Conversation">
      <template v-if="active">
        <div class="flex items-center gap-3 border-b px-4 py-3">
          <UiAvatar :src="active.avatar" :fallback="active.name[0]" class="size-8" />
          <h1 class="font-semibold">{{ active.name }}</h1>
        </div>
        <div class="min-h-0 flex-1 space-y-3 overflow-y-auto p-4">
          <UiMessage
            v-for="(message, index) in active.messages"
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
          <UiLabel for="inbox1" class="sr-only">Message</UiLabel>
          <UiInput id="inbox1" v-model="draft" placeholder="Write a message" autocomplete="off" />
          <UiButton type="submit" size="icon" :disabled="!draft.trim()" aria-label="Send message">
            <Icon name="lucide:arrow-up" class="size-4" />
          </UiButton>
        </form>
      </template>
    </section>
  </div>
</template>

<script lang="ts" setup>
  type Message = { text: string; mine?: boolean };
  type Chat = { id: string; name: string; avatar: string; unread: boolean; messages: Message[] };

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
          unread: false,
          messages: [
            { text: "Can you review the mockups?" },
            { text: "Sure, sending notes now.", mine: true },
            { text: "Thanks, you are the best!" },
          ],
        },
        {
          id: "2",
          name: "Liam Carter",
          avatar: "https://i.pravatar.cc/80?img=12",
          unread: true,
          messages: [{ text: "Deployed the fix to staging." }, { text: "Looks good on my end." }],
        },
        {
          id: "3",
          name: "Design team",
          avatar: "https://i.pravatar.cc/80?img=47",
          unread: true,
          messages: [{ text: "Moodboard is ready for feedback." }],
        },
        {
          id: "4",
          name: "Noah Williams",
          avatar: "https://i.pravatar.cc/80?img=15",
          unread: false,
          messages: [{ text: "Invoice is on its way." }],
        },
      ],
    }
  );

  const chats = ref<Chat[]>(
    props.conversations.map((chat) => ({
      ...chat,
      messages: chat.messages.map((message) => ({ ...message })),
    }))
  );
  const activeId = ref(chats.value[0]?.id ?? "");
  const draft = ref("");

  const active = computed(() => chats.value.find((chat) => chat.id === activeId.value));
  const last = (chat: Chat) => chat.messages[chat.messages.length - 1]!;

  function open(chat: Chat) {
    activeId.value = chat.id;
    chat.unread = false;
  }

  function send() {
    const text = draft.value.trim();
    if (!text || !active.value) return;
    active.value.messages.push({ text, mine: true });
    draft.value = "";
  }
</script>
