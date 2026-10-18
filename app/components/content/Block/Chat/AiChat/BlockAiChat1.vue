<template>
  <!--
    AI chat in a centered column
    Features: User messages in muted bubbles, assistant replies as plain text with copy and feedback actions, prompt box with send and stop buttons, simulated streaming reply and a polite live region
  -->
  <div class="mx-auto flex h-[40rem] w-full max-w-2xl flex-col">
    <div class="min-h-0 flex-1">
      <UiMessageScrollerProvider>
        <UiMessageScroller>
          <UiMessageScrollerViewport>
            <UiMessageScrollerContent class="gap-6 px-4 py-6">
              <UiMessageScrollerItem
                v-for="message in items"
                :key="message.id"
                :message-id="message.id"
                :scroll-anchor="message.role === 'user'"
              >
                <UiMessage :align="message.role === 'user' ? 'end' : 'start'">
                  <UiMessageContent>
                    <UiBubble :variant="message.role === 'user' ? 'muted' : 'ghost'">
                      <UiBubbleContent class="space-y-3 text-[15px] leading-relaxed">
                        <p v-for="(paragraph, index) in paragraphs(message.text)" :key="index">
                          {{ paragraph }}
                        </p>
                        <span
                          v-if="message.streaming"
                          class="bg-foreground inline-block h-4 w-0.5 animate-pulse align-middle motion-reduce:animate-none"
                        />
                      </UiBubbleContent>
                    </UiBubble>
                    <UiMessageFooter
                      v-if="message.role === 'assistant' && !message.streaming"
                      class="gap-1"
                    >
                      <UiButton
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Copy"
                        @click="copyText(message.text)"
                      >
                        <Icon :name="copied ? 'lucide:check' : 'lucide:copy'" class="size-4" />
                      </UiButton>
                      <UiButton
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Good response"
                        @click="useSonner.info('Thanks for the feedback')"
                      >
                        <Icon name="lucide:thumbs-up" class="size-4" />
                      </UiButton>
                      <UiButton
                        variant="ghost"
                        size="icon-sm"
                        aria-label="Bad response"
                        @click="useSonner.info('Thanks for the feedback')"
                      >
                        <Icon name="lucide:thumbs-down" class="size-4" />
                      </UiButton>
                    </UiMessageFooter>
                  </UiMessageContent>
                </UiMessage>
              </UiMessageScrollerItem>
            </UiMessageScrollerContent>
          </UiMessageScrollerViewport>
          <UiMessageScrollerButton />
        </UiMessageScroller>
      </UiMessageScrollerProvider>
    </div>

    <form class="px-4 pb-4" @submit.prevent="send">
      <div
        class="bg-background focus-within:ring-ring/30 flex items-end gap-2 rounded-3xl border p-2 pl-4 shadow-xs focus-within:ring-[3px]"
      >
        <UiLabel for="ai1" class="sr-only">Message the assistant</UiLabel>
        <UiTextarea
          id="ai1"
          v-model="draft"
          :rows="1"
          placeholder="Ask anything"
          class="max-h-32 min-h-9 flex-1 resize-none border-0 bg-transparent px-0 py-2 shadow-none focus-visible:ring-0 dark:bg-transparent"
          @keydown.enter.exact.prevent="send"
        />
        <UiButton
          v-if="streaming"
          type="button"
          size="icon"
          class="rounded-full"
          aria-label="Stop generating"
          @click="stop"
        >
          <Icon name="lucide:square" class="size-4" />
        </UiButton>
        <UiButton
          v-else
          type="submit"
          size="icon"
          class="rounded-full"
          :disabled="!draft.trim()"
          aria-label="Send message"
        >
          <Icon name="lucide:arrow-up" class="size-4" />
        </UiButton>
      </div>
      <p class="text-muted-foreground mt-2 text-center text-xs">
        The assistant can make mistakes. Check important info.
      </p>
    </form>
  </div>
</template>

<script lang="ts" setup>
  type Message = { id: string; role: "user" | "assistant"; text: string; streaming?: boolean };

  const props = withDefaults(
    defineProps<{
      messages?: Message[];
      answer?: string;
    }>(),
    {
      messages: () => [
        { id: "a1", role: "user", text: "Can you explain what a content delivery network does?" },
        {
          id: "a2",
          role: "assistant",
          text: "A content delivery network, or CDN, is a group of servers spread around the world that store copies of your files.\n\nWhen someone visits your site, the CDN serves files from the server closest to them. That makes pages load faster and takes pressure off your main server.",
        },
      ],
      answer:
        "Great question. Here is a short version.\n\nStart by writing down the goal in one sentence, then break it into the smallest steps you can finish today. Share the plan with one other person so there is a little accountability.\n\nIf you tell me more about your situation, I can make this much more specific.",
    }
  );

  const items = ref<Message[]>(props.messages.map((message) => ({ ...message })));
  const draft = ref("");
  const streaming = ref(false);
  let timer: ReturnType<typeof setInterval> | undefined;

  const { copy, copied } = useClipboard({ copiedDuring: 1500 });

  const paragraphs = (text: string) => text.split(/\n\s*\n/).filter(Boolean);
  const copyText = (text: string) => copy(text);

  function send() {
    const text = draft.value.trim();
    if (!text || streaming.value) return;
    items.value.push({ id: `u${items.value.length}`, role: "user", text });
    draft.value = "";
    const reply: Message = {
      id: `r${items.value.length}`,
      role: "assistant",
      text: "",
      streaming: true,
    };
    items.value.push(reply);
    const target = items.value[items.value.length - 1]!;
    streaming.value = true;
    let index = 0;
    timer = setInterval(() => {
      index += 3;
      target.text = props.answer.slice(0, index);
      if (index >= props.answer.length) stop();
    }, 30);
  }

  function stop() {
    clearInterval(timer);
    streaming.value = false;
    const last = items.value[items.value.length - 1];
    if (last) last.streaming = false;
  }

  onBeforeUnmount(() => clearInterval(timer));
</script>
