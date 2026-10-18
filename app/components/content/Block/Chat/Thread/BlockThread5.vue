<template>
  <!--
    Chat thread with replies and quoted messages
    Features: Reply button on every message, a quoted preview inside the replying bubble, a reply banner above the composer with a cancel button and sending a reply that quotes the original
  -->
  <UiContainer class="py-12 lg:py-20">
    <UiCard class="mx-auto h-[36rem] w-full max-w-lg gap-0 py-0">
      <UiCardHeader class="border-b py-3">
        <UiCardTitle class="text-base">Roadmap discussion</UiCardTitle>
      </UiCardHeader>

      <UiCardContent class="min-h-0 flex-1 overflow-hidden p-0">
        <UiMessageScrollerProvider>
          <UiMessageScroller>
            <UiMessageScrollerViewport>
              <UiMessageScrollerContent class="gap-5 p-4">
                <UiMessageScrollerItem
                  v-for="message in items"
                  :key="message.id"
                  :message-id="message.id"
                  :scroll-anchor="message.mine"
                >
                  <UiMessage :align="message.mine ? 'end' : 'start'" class="group/msg">
                    <UiMessageContent>
                      <UiMessageHeader v-if="!message.mine">{{ message.author }}</UiMessageHeader>
                      <UiBubble
                        :variant="message.mine ? 'default' : 'muted'"
                        :align="message.mine ? 'end' : 'start'"
                      >
                        <UiBubbleContent>
                          <div
                            v-if="message.quote"
                            class="mb-2 rounded-md border-l-2 border-current/40 bg-black/5 py-1 pr-2 pl-2 text-xs dark:bg-white/10"
                          >
                            <p class="font-semibold">{{ message.quote.author }}</p>
                            <p class="line-clamp-2 opacity-80">{{ message.quote.text }}</p>
                          </div>
                          {{ message.text }}
                        </UiBubbleContent>
                      </UiBubble>
                      <UiMessageFooter class="gap-2">
                        {{ message.time }}
                        <UiButton
                          variant="ghost"
                          size="icon-sm"
                          class="size-6 opacity-0 transition group-focus-within/msg:opacity-100 group-hover/msg:opacity-100"
                          :aria-label="`Reply to ${message.author}`"
                          @click="replyTo = message"
                        >
                          <Icon name="lucide:reply" class="size-3.5" />
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
      </UiCardContent>

      <UiCardFooter class="flex-col items-stretch gap-2 border-t py-3">
        <div
          v-if="replyTo"
          class="bg-muted border-primary flex items-center gap-2 rounded-md border-l-2 px-3 py-1.5 text-sm"
          role="status"
        >
          <Icon name="lucide:reply" class="text-muted-foreground size-4 shrink-0" />
          <div class="min-w-0 flex-1">
            <p class="text-xs font-semibold">Replying to {{ replyTo.author }}</p>
            <p class="text-muted-foreground truncate text-xs">{{ replyTo.text }}</p>
          </div>
          <UiButton
            variant="ghost"
            size="icon-sm"
            class="size-6"
            aria-label="Cancel reply"
            @click="replyTo = undefined"
          >
            <Icon name="lucide:x" class="size-3.5" />
          </UiButton>
        </div>
        <form class="flex items-center gap-2" @submit.prevent="send">
          <UiLabel for="thread5-input" class="sr-only">Message</UiLabel>
          <UiInput
            id="thread5-input"
            v-model="draft"
            placeholder="Write a message"
            autocomplete="off"
          />
          <UiButton type="submit" size="icon" :disabled="!draft.trim()" aria-label="Send message">
            <Icon name="lucide:arrow-up" class="size-4" />
          </UiButton>
        </form>
      </UiCardFooter>
    </UiCard>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Message = {
    id: string;
    author: string;
    text: string;
    time: string;
    mine?: boolean;
    quote?: { author: string; text: string };
  };

  const props = withDefaults(
    defineProps<{
      messages?: Message[];
    }>(),
    {
      messages: () => [
        {
          id: "q1",
          author: "Sofia",
          text: "Should we ship the dark mode update before the pricing redesign?",
          time: "10:02 AM",
        },
        {
          id: "q2",
          author: "Liam",
          text: "I would do pricing first. It affects revenue.",
          time: "10:04 AM",
        },
        {
          id: "q3",
          author: "You",
          mine: true,
          text: "Agreed. Dark mode can follow next sprint.",
          time: "10:05 AM",
          quote: { author: "Liam", text: "I would do pricing first. It affects revenue." },
        },
      ],
    }
  );

  const items = ref<Message[]>(props.messages.map((message) => ({ ...message })));
  const draft = ref("");
  const replyTo = ref<Message>();

  function send() {
    const text = draft.value.trim();
    if (!text) return;
    items.value.push({
      id: `q${items.value.length + 1}`,
      author: "You",
      mine: true,
      text,
      time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      quote: replyTo.value ? { author: replyTo.value.author, text: replyTo.value.text } : undefined,
    });
    draft.value = "";
    replyTo.value = undefined;
  }
</script>
