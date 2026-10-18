<template>
  <!--
    One to one chat thread
    Features: Header with avatar and online status, message bubbles on both sides, timestamps, scroll area that stays at the latest message, working composer that sends on enter and a simulated reply
  -->
  <UiContainer class="py-12 lg:py-20">
    <UiCard class="mx-auto h-[36rem] w-full max-w-lg gap-0 py-0">
      <div class="flex items-center gap-3 border-b px-6 py-3">
        <UiAvatar :src="contact.avatar" :fallback="contact.name[0]" class="size-10" />
        <div class="min-w-0 flex-1">
          <UiCardTitle class="truncate text-base">{{ contact.name }}</UiCardTitle>
          <p class="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400">
            <span class="size-1.5 rounded-full bg-current" />
            Online
          </p>
        </div>
        <UiButton
          variant="ghost"
          size="icon-sm"
          aria-label="Call"
          @click="useSonner.info('Calling...')"
        >
          <Icon name="lucide:phone" class="size-4" />
        </UiButton>
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
                      <UiMessageFooter>{{ message.time }}</UiMessageFooter>
                    </UiMessageContent>
                  </UiMessage>
                </UiMessageScrollerItem>
              </UiMessageScrollerContent>
            </UiMessageScrollerViewport>
            <UiMessageScrollerButton />
          </UiMessageScroller>
        </UiMessageScrollerProvider>
      </UiCardContent>

      <UiCardFooter class="border-t py-3">
        <form class="flex w-full items-center gap-2" @submit.prevent="send">
          <UiLabel for="thread1-input" class="sr-only">Message</UiLabel>
          <UiInput
            id="thread1-input"
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
  type Message = { id: string; text: string; mine: boolean; time: string };

  const props = withDefaults(
    defineProps<{
      contact?: { name: string; avatar: string };
      messages?: Message[];
    }>(),
    {
      contact: () => ({ name: "Sofia Alvarez", avatar: "https://i.pravatar.cc/80?img=32" }),
      messages: () => [
        {
          id: "m1",
          text: "Hey! Did you get a chance to look at the new onboarding mockups?",
          mine: false,
          time: "9:38 AM",
        },
        {
          id: "m2",
          text: "Just opened them. The checklist idea is great.",
          mine: true,
          time: "9:39 AM",
        },
        {
          id: "m3",
          text: "Glad you like it. I was worried it felt a bit long.",
          mine: false,
          time: "9:40 AM",
        },
        {
          id: "m4",
          text: "Not at all. Maybe drop the tour step on mobile?",
          mine: true,
          time: "9:41 AM",
        },
      ],
    }
  );

  const items = ref<Message[]>(props.messages.map((message) => ({ ...message })));
  const draft = ref("");

  const replies = [
    "Makes sense, I will update it.",
    "Good call, thanks!",
    "Perfect. Let me know if anything else comes up.",
  ];

  function now() {
    return new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  }

  function send() {
    const text = draft.value.trim();
    if (!text) return;
    items.value.push({ id: `m${items.value.length + 1}`, text, mine: true, time: now() });
    draft.value = "";
    setTimeout(() => {
      items.value.push({
        id: `m${items.value.length + 1}`,
        text: replies[items.value.length % replies.length]!,
        mine: false,
        time: now(),
      });
    }, 900);
  }
</script>
