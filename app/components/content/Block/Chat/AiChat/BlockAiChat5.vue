<template>
  <!--
    AI chat with a model picker
    Features: Dropdown in the header with radio items, model badges for speed and capability, selected model shown on each answer and in the prompt box and a switch that changes the next reply
  -->
  <div class="mx-auto flex h-[38rem] w-full max-w-2xl flex-col">
    <div class="flex items-center justify-between border-b px-4 py-3">
      <UiDropdownMenu>
        <UiDropdownMenuTrigger as-child>
          <UiButton variant="ghost" class="gap-2 font-semibold">
            {{ current.name }}
            <Icon name="lucide:chevron-down" class="size-4" />
          </UiButton>
        </UiDropdownMenuTrigger>
        <UiDropdownMenuContent align="start" class="w-72">
          <UiDropdownMenuLabel>Choose a model</UiDropdownMenuLabel>
          <UiDropdownMenuRadioGroup v-model="selected">
            <UiDropdownMenuRadioItem
              v-for="model in models"
              :key="model.id"
              :value="model.id"
              class="items-start py-2"
            >
              <span class="flex flex-col">
                <span class="flex items-center gap-2 font-medium">
                  {{ model.name }}
                  <UiBadge variant="soft" :color="model.color" shape="pill">{{
                    model.tag
                  }}</UiBadge>
                </span>
                <span class="text-muted-foreground text-xs">{{ model.description }}</span>
              </span>
            </UiDropdownMenuRadioItem>
          </UiDropdownMenuRadioGroup>
        </UiDropdownMenuContent>
      </UiDropdownMenu>
      <UiButton variant="ghost" size="icon-sm" aria-label="Clear chat" @click="items = []">
        <Icon name="lucide:trash-2" class="size-4" />
      </UiButton>
    </div>

    <div class="min-h-0 flex-1">
      <UiMessageScrollerProvider>
        <UiMessageScroller>
          <UiMessageScrollerViewport>
            <UiMessageScrollerContent class="gap-6 px-4 py-6">
              <p v-if="!items.length" class="text-muted-foreground py-16 text-center text-sm">
                Pick a model and send a message. Each answer is labelled with the model that wrote
                it.
              </p>
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
                    <UiMessageFooter v-if="message.model">{{ message.model }}</UiMessageFooter>
                  </UiMessageContent>
                </UiMessage>
              </UiMessageScrollerItem>
            </UiMessageScrollerContent>
          </UiMessageScrollerViewport>
        </UiMessageScroller>
      </UiMessageScrollerProvider>
    </div>

    <form class="px-4 pb-4" @submit.prevent="send">
      <div class="bg-background flex items-center gap-2 rounded-full border p-1.5 pl-3 shadow-xs">
        <UiBadge variant="secondary" class="shrink-0">{{ current.name }}</UiBadge>
        <UiLabel for="ai5" class="sr-only">Message the assistant</UiLabel>
        <input
          id="ai5"
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
  type Model = {
    id: string;
    name: string;
    tag: string;
    color: "green" | "blue" | "purple";
    description: string;
    reply: string;
  };
  type Message = { id: string; role: "user" | "assistant"; text: string; model?: string };

  const props = withDefaults(
    defineProps<{
      models?: Model[];
    }>(),
    {
      models: () => [
        {
          id: "swift",
          name: "Swift",
          tag: "Fast",
          color: "green",
          description: "Quick answers for everyday questions.",
          reply: "Here is a quick answer: keep it simple and start small.",
        },
        {
          id: "balanced",
          name: "Balanced",
          tag: "Default",
          color: "blue",
          description: "Great mix of speed and quality.",
          reply:
            "Here is a balanced take. Start small, measure what happens and adjust based on what you learn.",
        },
        {
          id: "deep",
          name: "Deep",
          tag: "Smartest",
          color: "purple",
          description: "Best for complex, multi step problems.",
          reply:
            "Let me think this through carefully. There are three factors to weigh: effort, risk and reversibility. Start with the option that scores best on reversibility, because it keeps your choices open while you gather evidence.",
        },
      ],
    }
  );

  const selected = ref("balanced");
  const draft = ref("");
  const items = ref<Message[]>([]);
  const timers: ReturnType<typeof setTimeout>[] = [];

  const current = computed(
    () => props.models.find((model) => model.id === selected.value) ?? props.models[0]!
  );

  function send() {
    const text = draft.value.trim();
    if (!text) return;
    const model = current.value;
    items.value.push({ id: `u${items.value.length}`, role: "user", text });
    draft.value = "";
    timers.push(
      setTimeout(() => {
        items.value.push({
          id: `a${items.value.length}`,
          role: "assistant",
          text: model.reply,
          model: model.name,
        });
      }, 600)
    );
  }

  onBeforeUnmount(() => timers.forEach(clearTimeout));
</script>
