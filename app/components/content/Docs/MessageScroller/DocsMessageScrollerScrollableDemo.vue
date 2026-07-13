<template>
  <div class="mx-auto flex w-full max-w-sm flex-col gap-4">
    <UiCard class="h-140 w-full gap-0 overflow-hidden">
      <UiCardHeader class="gap-1 border-b">
        <UiCardTitle>Scroll Status</UiCardTitle>
        <UiCardDescription>
          Where the reader can scroll to based on current scroll position.
        </UiCardDescription>
      </UiCardHeader>
      <UiMessageScrollerProvider default-scroll-position="start">
        <UiCardContent class="flex-1 overflow-hidden p-0">
          <UiMessageScroller>
            <UiMessageScrollerViewport>
              <UiMessageScrollerContent class="gap-4 p-6">
                <DocsMessageScrollerAnimatedItem
                  v-for="message in messages"
                  :key="message.id"
                  :message="message"
                  :scroll-anchor="message.role === 'user'"
                  user-variant="muted"
                  assistant-variant="ghost"
                />
              </UiMessageScrollerContent>
            </UiMessageScrollerViewport>
            <UiMessageScrollerButton />
          </UiMessageScroller>
        </UiCardContent>
        <DocsMessageScrollerScrollStateFooter />
      </UiMessageScrollerProvider>
    </UiCard>
    <div class="text-muted-foreground px-0.5 text-center text-xs">
      Scroll the transcript to see the footer update.
    </div>
  </div>
</template>

<script lang="ts" setup>
  const messages: DemoMessage[] = Array.from({ length: 12 }, (_, index) => ({
    id: `scrollable-${index + 1}`,
    role: index % 2 === 0 ? "user" : "assistant",
    text:
      index % 2 === 0
        ? `Review scroll checkpoint ${index + 1}.`
        : `Checkpoint ${index + 1} is synced. The scrollable hook updates as the viewport moves.\n\nWhen the reader is at the first message, the footer should only point them down. Once they move into the middle of the transcript, it should explain that both directions are available.\n\nAt the latest message, the footer should switch again and only point them back up.`,
  }));
</script>
