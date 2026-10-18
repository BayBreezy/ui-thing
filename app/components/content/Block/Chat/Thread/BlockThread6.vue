<template>
  <!--
    Chat thread with a typing indicator
    Features: Animated three dot typing bubble that respects reduced motion, a typing label for screen readers, simulated typing before each reply and a send button that is disabled while empty
  -->
  <UiContainer class="py-12 lg:py-20">
    <UiCard class="mx-auto h-[34rem] w-full max-w-lg gap-0 py-0">
      <div class="flex items-center gap-3 border-b px-6 py-3">
        <UiAvatar :src="contact.avatar" :fallback="contact.name[0]" class="size-10" />
        <div>
          <UiCardTitle class="text-base">{{ contact.name }}</UiCardTitle>
          <p class="text-muted-foreground text-xs" aria-live="polite">
            {{ typing ? "typing…" : "Online" }}
          </p>
        </div>
      </div>

      <UiCardContent class="min-h-0 flex-1 overflow-hidden p-0">
        <UiMessageScrollerProvider>
          <UiMessageScroller>
            <UiMessageScrollerViewport>
              <UiMessageScrollerContent class="gap-4 p-4">
                <UiMessageScrollerItem
                  v-for="message in items"
                  :key="message.id"
                  :message-id="message.id"
                  :scroll-anchor="message.mine"
                >
                  <UiMessage :align="message.mine ? 'end' : 'start'">
                    <UiMessageContent>
                      <UiBubble :variant="message.mine ? 'default' : 'muted'">
                        <UiBubbleContent>{{ message.text }}</UiBubbleContent>
                      </UiBubble>
                    </UiMessageContent>
                  </UiMessage>
                </UiMessageScrollerItem>
                <UiMessageScrollerItem v-if="typing" message-id="typing">
                  <UiMessage>
                    <UiMessageContent>
                      <UiBubble variant="muted">
                        <UiBubbleContent
                          class="flex items-center gap-1 py-3"
                          role="status"
                          aria-label="Sofia is typing"
                        >
                          <span
                            v-for="dot in 3"
                            :key="dot"
                            class="typing-dot bg-muted-foreground size-1.5 rounded-full"
                            :style="{ animationDelay: `${(dot - 1) * 150}ms` }"
                          />
                        </UiBubbleContent>
                      </UiBubble>
                    </UiMessageContent>
                  </UiMessage>
                </UiMessageScrollerItem>
              </UiMessageScrollerContent>
            </UiMessageScrollerViewport>
          </UiMessageScroller>
        </UiMessageScrollerProvider>
      </UiCardContent>

      <UiCardFooter class="border-t py-3">
        <form class="flex w-full items-center gap-2" @submit.prevent="send">
          <UiLabel for="thread6-input" class="sr-only">Message</UiLabel>
          <UiInput
            id="thread6-input"
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
  type Message = { id: string; text: string; mine?: boolean };

  const props = withDefaults(
    defineProps<{
      contact?: { name: string; avatar: string };
      messages?: Message[];
    }>(),
    {
      contact: () => ({ name: "Sofia Alvarez", avatar: "https://i.pravatar.cc/80?img=32" }),
      messages: () => [
        { id: "t1", text: "Are you around for a quick call?" },
        { id: "t2", text: "Give me five minutes.", mine: true },
      ],
    }
  );

  const items = ref<Message[]>(props.messages.map((message) => ({ ...message })));
  const draft = ref("");
  const typing = ref(false);

  const replies = ["Sure, no rush.", "Sounds good, talk soon!", "Great, I will send the invite."];
  const timers: ReturnType<typeof setTimeout>[] = [];

  function send() {
    const text = draft.value.trim();
    if (!text) return;
    items.value.push({ id: `t${items.value.length + 1}`, text, mine: true });
    draft.value = "";
    typing.value = true;
    timers.push(
      setTimeout(() => {
        typing.value = false;
        items.value.push({
          id: `t${items.value.length + 1}`,
          text: replies[items.value.length % replies.length]!,
        });
      }, 1600)
    );
  }

  onBeforeUnmount(() => timers.forEach(clearTimeout));
</script>

<style scoped>
  @keyframes typing-bounce {
    0%,
    60%,
    100% {
      transform: translateY(0);
      opacity: 0.4;
    }
    30% {
      transform: translateY(-4px);
      opacity: 1;
    }
  }

  .typing-dot {
    animation: typing-bounce 1.1s infinite ease-in-out;
  }

  @media (prefers-reduced-motion: reduce) {
    .typing-dot {
      animation: none;
      opacity: 0.6;
    }
  }
</style>
