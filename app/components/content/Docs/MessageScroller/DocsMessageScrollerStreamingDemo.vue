<template>
  <UiMessageScrollerProvider auto-scroll>
    <div class="relative flex flex-col gap-4">
      <UiCard class="mx-auto h-140 w-full max-w-sm gap-0">
        <UiCardHeader class="gap-1 border-b">
          <UiCardTitle>Streaming Messages</UiCardTitle>
          <UiCardDescription>
            Auto-scroll follows the live edge of the conversation.
          </UiCardDescription>
          <UiCardAction>
            <UiTooltip>
              <UiTooltipTrigger as-child>
                <UiButton
                  variant="outline"
                  size="icon"
                  aria-label="Reset stream"
                  :disabled="messages.length === 0 || isBusy"
                  class="rounded-full"
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
        <UiCardContent class="flex-1 overflow-hidden p-0">
          <UiEmpty v-if="messages.length === 0" class="h-full">
            <UiEmptyHeader>
              <UiEmptyMedia variant="icon">
                <Icon name="lucide:message-circle-dashed" />
              </UiEmptyMedia>
              <UiEmptyTitle>Ready to Stream</UiEmptyTitle>
              <UiEmptyDescription>
                Press send to stream a scripted launch summary.
              </UiEmptyDescription>
            </UiEmptyHeader>
          </UiEmpty>
          <UiMessageScroller v-else>
            <UiMessageScrollerViewport>
              <UiMessageScrollerContent :aria-busy="isBusy" class="p-6">
                <DocsMessageScrollerAnimatedItem
                  v-for="message in messages"
                  :key="message.id"
                  :message="message"
                  :scroll-anchor="message.role === 'user'"
                />
              </UiMessageScrollerContent>
            </UiMessageScrollerViewport>
            <UiMessageScrollerButton />
          </UiMessageScroller>
        </UiCardContent>
        <UiCardFooter class="flex-col gap-2">
          <form class="w-full" @submit.prevent="onSubmit">
            <UiInputGroup>
              <div class="h-14 w-full px-3 py-2.5">
                <span
                  class="line-clamp-2 text-sm opacity-60 data-[status=ready]:opacity-100"
                  :data-status="status"
                >
                  <template v-if="nextMessage">{{ nextMessage.text }}</template>
                  <span v-else class="text-muted-foreground">
                    No messages queued. Reset the stream.
                  </span>
                </span>
              </div>
              <UiInputGroupAddon align="block-end" class="pt-1">
                <UiDropdownMenu>
                  <UiDropdownMenuTrigger as-child>
                    <UiInputGroupButton
                      aria-label="Add files"
                      type="button"
                      size="icon-sm"
                      variant="outline"
                      class="rounded-full"
                    >
                      <Icon name="lucide:plus" />
                    </UiInputGroupButton>
                  </UiDropdownMenuTrigger>
                  <UiDropdownMenuContent align="start" side="top" class="w-44">
                    <UiDropdownMenuItem>
                      <Icon name="lucide:paperclip" />
                      Add Photos &amp; Files
                    </UiDropdownMenuItem>
                    <UiDropdownMenuSeparator />
                    <UiDropdownMenuItem>
                      <Icon name="lucide:image" />
                      Create Image
                    </UiDropdownMenuItem>
                    <UiDropdownMenuItem>
                      <Icon name="lucide:telescope" />
                      Deep Research
                    </UiDropdownMenuItem>
                    <UiDropdownMenuItem>
                      <Icon name="lucide:globe" />
                      Web Search
                    </UiDropdownMenuItem>
                  </UiDropdownMenuContent>
                </UiDropdownMenu>
                <UiInputGroupButton
                  type="submit"
                  variant="default"
                  size="icon-sm"
                  class="ml-auto rounded-full"
                  :disabled="!nextMessage || isBusy"
                >
                  <Icon name="lucide:arrow-up" />
                  <span class="sr-only">Send</span>
                </UiInputGroupButton>
              </UiInputGroupAddon>
            </UiInputGroup>
          </form>
        </UiCardFooter>
      </UiCard>
      <div class="text-muted-foreground px-0.5 text-center text-xs">
        Streaming is simulated. `autoScroll` is enabled.
      </div>
    </div>
  </UiMessageScrollerProvider>
</template>

<script lang="ts" setup>
  const chat = createDemoChat()
    .user(
      "I'm building a chat for our app and the scroll behavior is driving me nuts. Every time the AI streams a reply, the whole thread jumps around."
    )
    .assistant(
      "That's the classic streaming scroll problem. Wrap your message list in `MessageScroller` and turn on `autoScroll` — the viewport pins to the bottom as tokens arrive, so users always see the latest text land in place.\n\nThe important part: it only auto-scrolls while the reader is already at the bottom. The moment they scroll up to read something earlier, auto-scroll backs off and their position is preserved. You get smooth streaming without fighting the user's intent."
    )
    .user(
      "Okay, but when someone sends a new message the view still feels jarring — like the whole conversation reloads from the top."
    )
    .assistant(
      "MessageScrollerItem fixes that with turn anchoring. Set `scrollAnchor` on the turn that should settle near the top instead of blindly snapping to the document bottom.\n\nIt also leaves a small peek of the previous exchange visible above the anchor, so context isn't lost. The reply starts in view without that disorienting jump you get from a plain overflow container."
    )
    .user(
      "And if they've scrolled up to re-read an older answer? I don't want to yank them back down."
    )
    .assistant(
      "You won't. Auto-scroll only runs when the viewport is already pinned to the bottom, so scrolling up is a deliberate opt-out — their place in the thread stays put even as new tokens keep arriving below.\n\nWhen there is content they haven't seen yet, `MessageScrollerButton` appears at the bottom of the viewport. One tap jumps them back to the newest message and re-engages auto-scroll. Same pattern as Slack or iMessage: quiet when you're caught up, helpful when you're not."
    )
    .user("Last one — does this work with assistive tech?")
    .assistant(
      '`MessageScrollerContent` sets `role="log"` and `aria-relevant="additions"` by default, so screen readers announce new messages as they stream in.\n\nThe scroll button is a real `<button>` with an sr-only label, and it\'s removed from the tab order when you\'re already at the bottom — no ghost focus stops.'
    );

  const { messages, status, nextMessage, send, reset } = useMessageScrollerDemoChat(chat, {
    chunkDelayMs: 20,
  });

  const isBusy = computed(() => status.value === "streaming");

  function onSubmit() {
    if (!nextMessage.value || isBusy.value) return;
    send();
  }
</script>
