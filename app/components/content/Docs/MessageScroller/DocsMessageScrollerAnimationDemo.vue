<template>
  <div class="relative flex flex-col gap-4">
    <UiCard class="mx-auto h-140 w-full max-w-sm gap-0">
      <UiCardHeader class="border-b">
        <UiCardTitle>Animation</UiCardTitle>
        <UiCardDescription>
          Choose how user messages are animated when they are added to the conversation.
        </UiCardDescription>
        <UiCardAction class="flex items-center gap-2">
          <UiButton
            type="button"
            variant="outline"
            size="icon"
            aria-label="Reset animated messages"
            :disabled="messages.length === 0 || isBusy"
            class="rounded-full"
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
            <UiEmptyTitle>No Messages Yet</UiEmptyTitle>
            <UiEmptyDescription>
              Click the button below to send the first message.
            </UiEmptyDescription>
          </UiEmptyHeader>
        </UiEmpty>
        <UiMessageScrollerProvider v-else>
          <UiMessageScroller>
            <UiMessageScrollerViewport>
              <UiMessageScrollerContent :aria-busy="isBusy" class="p-6">
                <DocsMessageScrollerAnimatedItem
                  v-for="message in messages"
                  :key="message.id"
                  :message="message"
                  :animation-preset="presetId"
                  user-variant="muted"
                  assistant-variant="ghost"
                />
              </UiMessageScrollerContent>
            </UiMessageScrollerViewport>
            <UiMessageScrollerButton />
          </UiMessageScroller>
        </UiMessageScrollerProvider>
      </UiCardContent>
      <UiCardFooter class="gap-2 border-t">
        <UiSelect v-model="presetId">
          <UiSelectTrigger class="rounded-full" aria-label="Animation preset">
            <UiSelectValue>{{ presetName }}</UiSelectValue>
          </UiSelectTrigger>
          <UiSelectContent align="start" side="top">
            <UiSelectGroup>
              <UiSelectItem
                v-for="animation in MESSAGE_ANIMATION_PRESETS"
                :key="animation.id"
                :value="animation.id"
              >
                {{ animation.name }}
              </UiSelectItem>
            </UiSelectGroup>
          </UiSelectContent>
        </UiSelect>
        <UiButton
          type="button"
          size="icon"
          class="ml-auto rounded-full"
          :disabled="!nextMessage || isBusy"
          @click="onSend"
        >
          <Icon name="lucide:arrow-up" />
          <span class="sr-only">Send Message</span>
        </UiButton>
      </UiCardFooter>
    </UiCard>
    <div class="text-muted-foreground mx-auto max-w-sm px-0.5 text-center text-xs text-balance">
      Select an animation then click send to see it in action.
    </div>
  </div>
</template>

<script lang="ts" setup>
  const chat = createDemoChat()
    .user("Can user messages pop in like iMessage without breaking anchoring?")
    .assistant(
      "Yes. Animate the user row with transform and opacity, and let the assistant response stream normally below it.\n\nThat keeps the row measurement predictable while still giving the newly sent bubble a more tactile entrance."
    )
    .user("What makes the animation feel more like iMessage?")
    .assistant(
      "Use a quick spring from the trailing edge: a little scale, a small upward move, and no layout animation.\n\nThe bubble feels tactile, but the measured row stays predictable, so anchoring and auto-scroll do not have to fight a changing layout."
    )
    .user("Can I switch between presets while testing the same thread?")
    .assistant(
      "Yes. Keep the conversation in place while you change the preset, then send the next message to compare the new entrance against the same context.\n\nThat makes it easier to judge the difference between a subtle fade, a snappy pop, and a more dramatic 3D tilt without rebuilding the scenario each time."
    );

  const { messages, status, nextMessage, send, reset } = useMessageScrollerDemoChat(chat, {
    chunkDelayMs: 15,
  });

  const presetId = ref<MessageAnimationId>("fade");
  const isBusy = computed(() => status.value === "streaming");
  const presetName = computed(
    () => MESSAGE_ANIMATION_PRESETS.find((preset) => preset.id === presetId.value)?.name
  );

  function onSend() {
    if (!nextMessage.value || isBusy.value) return;
    send();
  }
</script>
