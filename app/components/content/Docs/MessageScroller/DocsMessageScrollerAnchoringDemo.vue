<template>
  <div class="relative flex flex-col gap-4">
    <UiCard class="mx-auto h-140 w-full max-w-sm gap-0">
      <UiCardHeader class="border-b">
        <UiCardTitle>Anchoring Turns</UiCardTitle>
        <UiCardDescription> Choose which role settles near the top edge. </UiCardDescription>
        <UiCardAction>
          <UiButton
            type="button"
            variant="outline"
            size="icon"
            aria-label="Reset anchored turns"
            :disabled="messages.length === 0"
            @click="reset"
          >
            <Icon name="lucide:rotate-cw" />
          </UiButton>
        </UiCardAction>
      </UiCardHeader>
      <UiCardContent class="min-h-0 flex-1 overflow-hidden p-0">
        <UiEmpty v-if="messages.length === 0" class="h-full">
          <UiEmptyHeader>
            <UiEmptyMedia variant="icon">
              <Icon name="lucide:message-circle-dashed" />
            </UiEmptyMedia>
            <UiEmptyTitle>No anchored messages yet</UiEmptyTitle>
            <UiEmptyDescription>
              Send the first message to see the selected role anchor.
            </UiEmptyDescription>
          </UiEmptyHeader>
        </UiEmpty>
        <UiMessageScrollerProvider v-else>
          <UiMessageScroller>
            <UiMessageScrollerViewport>
              <UiMessageScrollerContent class="p-6">
                <DocsMessageScrollerAnimatedItem
                  v-for="message in messages"
                  :key="message.id"
                  :message="message"
                  :scroll-anchor="message.role === anchorRole"
                  user-variant="muted"
                  assistant-variant="ghost"
                />
              </UiMessageScrollerContent>
            </UiMessageScrollerViewport>
            <UiMessageScrollerButton />
          </UiMessageScroller>
        </UiMessageScrollerProvider>
      </UiCardContent>
      <UiCardFooter>
        <UiToggleGroup
          type="multiple"
          aria-label="Select scroll anchor role"
          :model-value="[anchorRole]"
          @update:model-value="onValueChange"
        >
          <UiToggleGroupItem value="user" aria-label="Anchor user messages">
            User
          </UiToggleGroupItem>
          <UiToggleGroupItem value="assistant" aria-label="Anchor assistant messages">
            Assistant
          </UiToggleGroupItem>
        </UiToggleGroup>
        <UiButton type="button" size="icon" class="ml-auto" :disabled="!nextMessage" @click="send">
          <Icon name="lucide:arrow-up" />
          <span class="sr-only">Send Message</span>
        </UiButton>
      </UiCardFooter>
    </UiCard>
    <div class="text-muted-foreground mx-auto max-w-xs px-0.5 text-center text-xs">
      Toggle the anchor role, then send messages to compare where turns settle.
    </div>
  </div>
</template>

<script lang="ts" setup>
  const scriptedMessages: DemoMessage[] = [
    {
      id: "anchor-1-user",
      role: "user",
      text: "Can you show me how anchoring behaves when a new prompt starts the turn?",
    },
    {
      id: "anchor-1-assistant",
      role: "assistant",
      text: "Append the user prompt first, then append the assistant response. With User selected, the prompt settles near the top and the assistant response fills in below it.",
    },
    {
      id: "anchor-2-user",
      role: "user",
      text: "What changes when assistant messages are the anchor?",
    },
    {
      id: "anchor-2-assistant",
      role: "assistant",
      text: "Now each assistant response is the item `MessageScroller` keeps in view. This is useful when the reply is the moment you want readers to land on after each turn.",
    },
    {
      id: "anchor-3-user",
      role: "user",
      text: "Can I switch roles and keep adding turns?",
    },
    {
      id: "anchor-3-assistant",
      role: "assistant",
      text: "Yes. The next appended message with the selected role becomes the anchor, so you can compare user and assistant anchoring without resetting the demo.",
    },
  ];

  const anchorRole = ref<DemoRole>("user");
  const messages = ref<DemoMessage[]>([]);
  const messageIndex = ref(0);
  const nextMessage = computed<DemoMessage | null>(
    () => scriptedMessages[messageIndex.value] ?? null
  );

  function reset() {
    messages.value = [];
    messageIndex.value = 0;
  }

  function onValueChange(value: unknown) {
    const nextValue = Array.isArray(value) ? value[0] : value;

    if (nextValue === "user" || nextValue === "assistant") {
      anchorRole.value = nextValue;
      reset();
    }
  }

  function send() {
    if (!nextMessage.value) return;

    messages.value = [...messages.value, nextMessage.value];
    messageIndex.value += 1;
  }
</script>
