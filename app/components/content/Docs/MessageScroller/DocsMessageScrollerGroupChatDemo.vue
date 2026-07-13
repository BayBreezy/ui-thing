<template>
  <UiMessageScrollerProvider>
    <div class="relative flex flex-col gap-4">
      <UiCard class="mx-auto h-140 w-full max-w-sm gap-0">
        <UiCardHeader class="gap-1 border-b">
          <UiCardTitle>Group Chat</UiCardTitle>
          <UiCardDescription>
            A group chat with several participants and an assistant. The Marker is marked as a turn.
          </UiCardDescription>
          <UiCardAction>
            <UiTooltip>
              <UiTooltipTrigger as-child>
                <UiButton
                  type="button"
                  variant="outline"
                  size="icon"
                  aria-label="Reset conversation"
                  :disabled="rockyTurn === 'idle'"
                  @click="reset"
                >
                  <Icon name="lucide:rotate-cw" />
                </UiButton>
              </UiTooltipTrigger>
              <UiTooltipContent>
                <p>Reset</p>
              </UiTooltipContent>
            </UiTooltip>
          </UiCardAction>
        </UiCardHeader>
        <UiCardContent class="min-h-0 flex-1 p-0">
          <UiMessageScrollerProvider>
            <UiMessageScroller :key="demoKey">
              <UiMessageScrollerViewport>
                <UiMessageScrollerContent class="p-6">
                  <template v-for="item in items" :key="item.id">
                    <UiMessageScrollerItem
                      v-if="item.type === 'message'"
                      :message-id="item.id"
                      :scroll-anchor="item.scrollAnchor"
                    >
                      <UiMessage :align="item.sender === currentUser ? 'end' : 'start'">
                        <UiMessageContent>
                          <UiMessageHeader v-if="item.sender !== currentUser">
                            {{ item.sender }}
                          </UiMessageHeader>
                          <UiBubble :variant="messageVariant(item)">
                            <UiBubbleContent>{{ item.text }}</UiBubbleContent>
                          </UiBubble>
                        </UiMessageContent>
                      </UiMessage>
                    </UiMessageScrollerItem>
                    <UiMessageScrollerItem v-else :scroll-anchor="item.scrollAnchor">
                      <UiMarker variant="separator">
                        <UiMarkerContent>{{ item.text }}</UiMarkerContent>
                      </UiMarker>
                    </UiMessageScrollerItem>
                  </template>
                </UiMessageScrollerContent>
              </UiMessageScrollerViewport>
              <UiMessageScrollerButton />
            </UiMessageScroller>
          </UiMessageScrollerProvider>
        </UiCardContent>
        <UiCardFooter class="flex flex-col items-center gap-2 border-t">
          <UiButton
            type="button"
            :disabled="isComplete"
            class="w-full"
            variant="secondary"
            @click="advance"
          >
            {{ buttonLabel }}
          </UiButton>
          <p class="text-muted-foreground text-xs">
            {{
              rockyTurn === "idle"
                ? "This will create a marker and make it the anchor"
                : "Now send Rocky's reply into the conversation"
            }}
          </p>
        </UiCardFooter>
      </UiCard>
      <div class="text-muted-foreground mx-auto max-w-sm px-0.5 text-center text-xs text-balance">
        When a user joins, a marker is created. scrollAnchor on the marker marks it as the next turn
      </div>
    </div>
  </UiMessageScrollerProvider>
</template>

<script lang="ts" setup>
  type GroupChatItem =
    | {
        id: string;
        type: "event";
        text: string;
        scrollAnchor?: boolean;
      }
    | {
        id: string;
        type: "message";
        sender: string;
        role: "assistant" | "participant";
        text: string;
        scrollAnchor?: boolean;
      };

  const currentUser = "Grace";

  const initialItems: GroupChatItem[] = [
    {
      id: "group-1",
      type: "message",
      sender: "Grace",
      role: "participant",
      text: "@mary, the astrophage line keeps matching Venus energy output. Can you check my math?",
    },
    {
      id: "group-2",
      type: "message",
      sender: "Mary (Agent)",
      role: "assistant",
      text: "Yes. Confirmed. The curve points to a microorganism harvesting stellar energy and breeding near carbon dioxide. If @rocky agrees, this is the clue we need.",
    },
    {
      id: "group-3",
      type: "message",
      sender: "Grace",
      role: "participant",
      text: "ping @rocky",
      scrollAnchor: true,
    },
  ];

  const rockyMarker: GroupChatItem = {
    id: "group-4",
    type: "event",
    text: "Rocky has joined the chat",
    scrollAnchor: true,
  };

  const rockyMessage: GroupChatItem = {
    id: "group-5",
    type: "message",
    sender: "Rocky",
    role: "participant",
    text: "Amaze. Astrophage eats light, makes heat, goes to carbon dioxide. Rocky has fuel model. Grace is smart.",
  };

  const demoKey = ref(0);
  const rockyTurn = ref<"idle" | "marker" | "message">("idle");

  const items = computed(() => {
    if (rockyTurn.value === "message") return [...initialItems, rockyMarker, rockyMessage];
    if (rockyTurn.value === "marker") return [...initialItems, rockyMarker];
    return initialItems;
  });
  const buttonLabel = computed(() =>
    rockyTurn.value === "idle" ? "Add Rocky" : "Send Message as Rocky"
  );
  const isComplete = computed(() => rockyTurn.value === "message");

  function advance() {
    rockyTurn.value = rockyTurn.value === "idle" ? "marker" : "message";
  }

  function reset() {
    rockyTurn.value = "idle";
    demoKey.value += 1;
  }

  function messageVariant(item: Extract<GroupChatItem, { type: "message" }>) {
    if (item.sender === currentUser) return "muted";
    return item.role === "assistant" ? "ghost" : "tinted";
  }
</script>
