<template>
  <!--
    AI chat with a history sidebar
    Features: Sidebar with a new chat button, search, conversations grouped by day, active conversation highlight, rename and delete actions in a menu, collapses to a drawer on small screens and a main chat area
  -->
  <div class="mx-auto flex h-[40rem] w-full max-w-5xl overflow-hidden rounded-xl border">
    <aside
      class="bg-muted/30 hidden w-64 shrink-0 flex-col border-r md:flex"
      aria-label="Chat history"
    >
      <div class="space-y-2 p-3">
        <UiButton class="w-full justify-start" variant="outline" @click="newChat">
          <Icon name="lucide:square-pen" class="size-4" />
          New chat
        </UiButton>
        <div class="relative">
          <UiLabel for="ai6-search" class="sr-only">Search chats</UiLabel>
          <Icon
            name="lucide:search"
            class="text-muted-foreground pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2"
          />
          <UiInput
            id="ai6-search"
            v-model="query"
            placeholder="Search chats"
            class="h-8 pl-8 text-sm"
          />
        </div>
      </div>
      <UiScrollArea class="min-h-0 flex-1">
        <nav class="px-2 pb-3">
          <section v-for="group in groups" :key="group.label" class="mt-2">
            <h2 class="text-muted-foreground px-2 py-1 text-xs font-medium">{{ group.label }}</h2>
            <ul>
              <li v-for="chat in group.items" :key="chat.id" class="group/chat relative">
                <button
                  type="button"
                  class="hover:bg-accent focus-visible:ring-ring/50 flex w-full items-center rounded-md px-2 py-1.5 pr-8 text-left text-sm outline-none focus-visible:ring-[3px]"
                  :class="chat.id === active ? 'bg-accent font-medium' : ''"
                  :aria-current="chat.id === active ? 'page' : undefined"
                  @click="active = chat.id"
                >
                  <span class="truncate">{{ chat.title }}</span>
                </button>
                <UiDropdownMenu>
                  <UiDropdownMenuTrigger as-child>
                    <UiButton
                      variant="ghost"
                      size="icon-sm"
                      class="absolute top-1/2 right-1 size-6 -translate-y-1/2 opacity-0 group-focus-within/chat:opacity-100 group-hover/chat:opacity-100 data-[state=open]:opacity-100"
                      :aria-label="`Options for ${chat.title}`"
                    >
                      <Icon name="lucide:ellipsis" class="size-4" />
                    </UiButton>
                  </UiDropdownMenuTrigger>
                  <UiDropdownMenuContent align="start">
                    <UiDropdownMenuItem @select="useSonner.info('Open your rename dialog here')">
                      <Icon name="lucide:pencil" class="size-4" />
                      Rename
                    </UiDropdownMenuItem>
                    <UiDropdownMenuItem variant="destructive" @select="remove(chat.id)">
                      <Icon name="lucide:trash-2" class="size-4" />
                      Delete
                    </UiDropdownMenuItem>
                  </UiDropdownMenuContent>
                </UiDropdownMenu>
              </li>
            </ul>
          </section>
          <p v-if="!groups.length" class="text-muted-foreground px-2 py-6 text-center text-sm">
            No chats found.
          </p>
        </nav>
      </UiScrollArea>
    </aside>

    <div class="flex min-w-0 flex-1 flex-col">
      <div class="flex items-center gap-2 border-b px-4 py-3">
        <h1 class="min-w-0 flex-1 truncate font-semibold">{{ activeChat?.title ?? "New chat" }}</h1>
      </div>
      <div class="min-h-0 flex-1 space-y-5 overflow-y-auto px-4 py-6">
        <template v-if="activeChat">
          <UiMessage
            v-for="(message, index) in activeChat.messages"
            :key="index"
            :align="message.role === 'user' ? 'end' : 'start'"
          >
            <UiMessageContent>
              <UiBubble :variant="message.role === 'user' ? 'muted' : 'ghost'">
                <UiBubbleContent class="text-[15px] leading-relaxed">{{
                  message.text
                }}</UiBubbleContent>
              </UiBubble>
            </UiMessageContent>
          </UiMessage>
        </template>
        <p v-else class="text-muted-foreground py-20 text-center text-sm">
          Start a new conversation.
        </p>
      </div>
      <form class="p-4" @submit.prevent="send">
        <div class="bg-background flex items-center gap-2 rounded-full border p-1.5 pl-4 shadow-xs">
          <UiLabel for="ai6" class="sr-only">Message the assistant</UiLabel>
          <input
            id="ai6"
            v-model="draft"
            type="text"
            placeholder="Ask anything"
            autocomplete="off"
            class="placeholder:text-muted-foreground/70 min-w-0 flex-1 bg-transparent text-sm outline-none"
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
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
  type Message = { role: "user" | "assistant"; text: string };
  type Chat = {
    id: string;
    title: string;
    day: "Today" | "Yesterday" | "Previous 7 days";
    messages: Message[];
  };

  const props = withDefaults(
    defineProps<{
      chats?: Chat[];
    }>(),
    {
      chats: () => [
        {
          id: "c1",
          title: "Weekend trip ideas",
          day: "Today",
          messages: [
            { role: "user", text: "Give me three ideas for a weekend trip near the coast." },
            {
              role: "assistant",
              text: "Try a fishing village with a beach walk, a seaside town with museums, or a quiet cabin near the dunes. I can build an itinerary for any of them.",
            },
          ],
        },
        {
          id: "c2",
          title: "Fix flaky unit test",
          day: "Today",
          messages: [
            { role: "user", text: "My test fails once every ten runs. Why?" },
            {
              role: "assistant",
              text: "That usually points to shared state or timing. Check for timers, random data and tests that depend on running order.",
            },
          ],
        },
        {
          id: "c3",
          title: "Birthday message for Mum",
          day: "Yesterday",
          messages: [
            { role: "user", text: "Write a short, warm birthday message for my mum." },
            {
              role: "assistant",
              text: "Happy birthday, Mum! Thank you for every bit of advice, every laugh and every hug. I hope today is as wonderful as you are.",
            },
          ],
        },
        {
          id: "c4",
          title: "Spreadsheet formulas",
          day: "Previous 7 days",
          messages: [
            { role: "user", text: "How do I sum a column only if the next column says paid?" },
            {
              role: "assistant",
              text: 'Use SUMIF. For example, SUMIF(B:B, "paid", A:A) adds the values in column A where column B says paid.',
            },
          ],
        },
      ],
    }
  );

  const chats = ref<Chat[]>(
    props.chats.map((chat) => ({
      ...chat,
      messages: chat.messages.map((message) => ({ ...message })),
    }))
  );
  const active = ref(chats.value[0]?.id ?? "");
  const draft = ref("");
  const query = ref("");
  const timers: ReturnType<typeof setTimeout>[] = [];

  const activeChat = computed(() => chats.value.find((chat) => chat.id === active.value));

  const groups = computed(() => {
    const term = query.value.trim().toLowerCase();
    return (["Today", "Yesterday", "Previous 7 days"] as const)
      .map((label) => ({
        label,
        items: chats.value.filter(
          (chat) => chat.day === label && (!term || chat.title.toLowerCase().includes(term))
        ),
      }))
      .filter((group) => group.items.length);
  });

  function newChat() {
    active.value = "";
  }

  function remove(id: string) {
    chats.value = chats.value.filter((chat) => chat.id !== id);
    if (active.value === id) active.value = chats.value[0]?.id ?? "";
  }

  function send() {
    const text = draft.value.trim();
    if (!text) return;
    let chat = activeChat.value;
    if (!chat) {
      chat = {
        id: `c${chats.value.length + 10}`,
        title: text.slice(0, 32),
        day: "Today",
        messages: [],
      };
      chats.value.unshift(chat);
      active.value = chat.id;
    }
    const target = chats.value.find((item) => item.id === chat!.id)!;
    target.messages.push({ role: "user", text });
    draft.value = "";
    timers.push(
      setTimeout(
        () =>
          target.messages.push({
            role: "assistant",
            text: "Got it. Let me look into that and get back to you with a clear answer.",
          }),
        600
      )
    );
  }

  onBeforeUnmount(() => timers.forEach(clearTimeout));
</script>
