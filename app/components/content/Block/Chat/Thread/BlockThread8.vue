<template>
  <!--
    Customer support conversation
    Features: Ticket header with status badge and assignee, customer and agent bubbles with an agent label, internal note style, quick reply buttons, resolve and reopen actions and a closed state that hides the composer
  -->
  <UiContainer class="py-12 lg:py-20">
    <UiCard class="mx-auto h-[44rem] w-full max-w-xl gap-0 py-0">
      <UiCardHeader class="border-b py-3">
        <div class="flex items-center gap-3">
          <UiAvatar :src="customer.avatar" :fallback="customer.name[0]" class="size-10" />
          <div class="min-w-0 flex-1">
            <UiCardTitle class="truncate text-base">{{ customer.name }}</UiCardTitle>
            <p class="text-muted-foreground truncate text-xs">
              {{ ticket }} · Assigned to {{ agent }}
            </p>
          </div>
          <UiBadge variant="soft" :color="resolved ? 'green' : 'amber'" shape="pill">
            {{ resolved ? "Resolved" : "Open" }}
          </UiBadge>
          <UiButton variant="outline" size="sm" @click="resolved = !resolved">
            {{ resolved ? "Reopen" : "Resolve" }}
          </UiButton>
        </div>
      </UiCardHeader>

      <UiCardContent class="min-h-0 flex-1 overflow-hidden p-0">
        <UiMessageScrollerProvider>
          <UiMessageScroller>
            <UiMessageScrollerViewport>
              <UiMessageScrollerContent class="gap-4 p-4">
                <UiMessageScrollerItem
                  v-for="message in items"
                  :key="message.id"
                  :message-id="message.id"
                  :scroll-anchor="message.from === 'agent'"
                >
                  <UiMessage :align="message.from === 'customer' ? 'start' : 'end'">
                    <UiMessageContent>
                      <UiMessageHeader v-if="message.from !== 'customer'">
                        {{ message.from === "note" ? "Internal note" : agent }}
                        <UiBadge v-if="message.from === 'agent'" variant="secondary" class="ml-1"
                          >Agent</UiBadge
                        >
                      </UiMessageHeader>
                      <UiBubble
                        :variant="
                          message.from === 'agent'
                            ? 'default'
                            : message.from === 'note'
                              ? 'outline'
                              : 'muted'
                        "
                        :align="message.from === 'customer' ? 'start' : 'end'"
                      >
                        <UiBubbleContent
                          :class="
                            message.from === 'note'
                              ? 'border-dashed bg-amber-50 dark:bg-amber-500/10'
                              : ''
                          "
                        >
                          {{ message.text }}
                        </UiBubbleContent>
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

      <UiCardFooter v-if="!resolved" class="flex-col items-stretch gap-2 border-t py-3">
        <div class="flex flex-wrap gap-2">
          <UiButton
            v-for="reply in quickReplies"
            :key="reply"
            variant="outline"
            size="sm"
            @click="draft = reply"
          >
            {{ reply }}
          </UiButton>
        </div>
        <form class="flex items-center gap-2" @submit.prevent="send">
          <UiLabel for="thread8-input" class="sr-only">Reply to customer</UiLabel>
          <UiInput
            id="thread8-input"
            v-model="draft"
            placeholder="Reply to the customer"
            autocomplete="off"
          />
          <UiButton type="submit" :disabled="!draft.trim()">Send</UiButton>
        </form>
      </UiCardFooter>
      <UiCardFooter
        v-else
        class="text-muted-foreground justify-center border-t py-4 text-sm"
        role="status"
      >
        This conversation is resolved. Reopen it to reply.
      </UiCardFooter>
    </UiCard>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Message = { id: string; from: "customer" | "agent" | "note"; text: string; time: string };

  const props = withDefaults(
    defineProps<{
      customer?: { name: string; avatar: string };
      ticket?: string;
      agent?: string;
      messages?: Message[];
    }>(),
    {
      customer: () => ({ name: "Hannah Lee", avatar: "https://i.pravatar.cc/80?img=47" }),
      ticket: "#4821",
      agent: "Liam",
      messages: () => [
        {
          id: "s1",
          from: "customer",
          text: "Hi, I was charged twice for my subscription this month.",
          time: "10:12 AM",
        },
        {
          id: "s2",
          from: "agent",
          text: "I am sorry about that, Hannah. Let me check your billing history.",
          time: "10:14 AM",
        },
        {
          id: "s3",
          from: "note",
          text: "Duplicate charge confirmed on Oct 3. Refund approved by finance.",
          time: "10:16 AM",
        },
        {
          id: "s4",
          from: "agent",
          text: "Found it. I have refunded the extra charge and it will show in 3 to 5 days.",
          time: "10:18 AM",
        },
      ],
    }
  );

  const quickReplies = [
    "Thanks for reaching out!",
    "Could you share a screenshot?",
    "Is there anything else I can help with?",
  ];

  const items = ref<Message[]>(props.messages.map((message) => ({ ...message })));
  const draft = ref("");
  const resolved = ref(false);

  function send() {
    const text = draft.value.trim();
    if (!text) return;
    items.value.push({
      id: `s${items.value.length + 1}`,
      from: "agent",
      text,
      time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
    });
    draft.value = "";
  }
</script>
