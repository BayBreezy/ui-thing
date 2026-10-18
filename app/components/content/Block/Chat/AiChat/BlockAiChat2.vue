<template>
  <!--
    AI chat welcome screen with suggestion cards
    Features: Greeting heading, four suggestion cards that start a conversation when clicked, a prompt box that stays at the bottom, a new chat button that returns to the welcome screen and keyboard friendly cards
  -->
  <div class="mx-auto flex h-[40rem] w-full max-w-2xl flex-col">
    <div class="flex items-center justify-between px-4 py-3">
      <span class="font-semibold">{{ name }}</span>
      <UiButton variant="ghost" size="sm" :disabled="!started" @click="reset">
        <Icon name="lucide:square-pen" class="size-4" />
        New chat
      </UiButton>
    </div>

    <div v-if="!started" class="flex flex-1 flex-col items-center justify-center px-4 text-center">
      <span class="bg-primary text-primary-foreground grid size-12 place-items-center rounded-2xl">
        <Icon name="lucide:sparkles" class="size-6" />
      </span>
      <h1 class="mt-5 text-2xl font-bold tracking-tight text-balance">How can I help you today?</h1>
      <ul class="mt-8 grid w-full gap-3 sm:grid-cols-2">
        <li v-for="item in suggestions" :key="item.title">
          <button
            type="button"
            class="hover:bg-muted/60 focus-visible:ring-ring/50 flex h-full w-full flex-col items-start gap-1 rounded-xl border p-4 text-left transition outline-none focus-visible:ring-[3px]"
            @click="ask(item.prompt)"
          >
            <Icon :name="item.icon" class="text-muted-foreground size-4" />
            <span class="text-sm font-medium">{{ item.title }}</span>
            <span class="text-muted-foreground line-clamp-2 text-xs">{{ item.prompt }}</span>
          </button>
        </li>
      </ul>
    </div>

    <div v-else class="min-h-0 flex-1">
      <UiMessageScrollerProvider>
        <UiMessageScroller>
          <UiMessageScrollerViewport>
            <UiMessageScrollerContent class="gap-6 px-4 py-4">
              <UiMessageScrollerItem
                v-for="message in items"
                :key="message.id"
                :message-id="message.id"
                :scroll-anchor="message.role === 'user'"
              >
                <UiMessage :align="message.role === 'user' ? 'end' : 'start'">
                  <UiMessageContent>
                    <UiBubble :variant="message.role === 'user' ? 'muted' : 'ghost'">
                      <UiBubbleContent class="text-[15px] leading-relaxed">{{
                        message.text
                      }}</UiBubbleContent>
                    </UiBubble>
                  </UiMessageContent>
                </UiMessage>
              </UiMessageScrollerItem>
            </UiMessageScrollerContent>
          </UiMessageScrollerViewport>
        </UiMessageScroller>
      </UiMessageScrollerProvider>
    </div>

    <form class="px-4 pb-4" @submit.prevent="ask(draft)">
      <div class="bg-background flex items-center gap-2 rounded-full border p-1.5 pl-4 shadow-xs">
        <UiLabel for="ai2" class="sr-only">Message the assistant</UiLabel>
        <input
          id="ai2"
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
</template>

<script lang="ts" setup>
  type Suggestion = { title: string; prompt: string; icon: string };
  type Message = { id: string; role: "user" | "assistant"; text: string };

  withDefaults(
    defineProps<{
      name?: string;
      suggestions?: Suggestion[];
    }>(),
    {
      name: "Assistant",
      suggestions: () => [
        {
          title: "Plan a trip",
          prompt: "Plan a relaxed 3 day trip to Lisbon with great food",
          icon: "lucide:plane",
        },
        {
          title: "Write an email",
          prompt: "Write a friendly email asking a client for feedback",
          icon: "lucide:mail",
        },
        {
          title: "Learn something",
          prompt: "Explain how vaccines train the immune system",
          icon: "lucide:graduation-cap",
        },
        {
          title: "Debug code",
          prompt: "Why does my loop skip the last item in this array?",
          icon: "lucide:bug",
        },
      ],
    }
  );

  const draft = ref("");
  const items = ref<Message[]>([]);
  const started = computed(() => items.value.length > 0);
  const timers: ReturnType<typeof setTimeout>[] = [];

  function ask(prompt: string) {
    const text = prompt.trim();
    if (!text) return;
    items.value.push({ id: `u${items.value.length}`, role: "user", text });
    draft.value = "";
    timers.push(
      setTimeout(() => {
        items.value.push({
          id: `a${items.value.length}`,
          role: "assistant",
          text: "Happy to help with that. Here is a good starting point, and we can refine it together as you share more details.",
        });
      }, 700)
    );
  }

  function reset() {
    items.value = [];
  }

  onBeforeUnmount(() => timers.forEach(clearTimeout));
</script>
