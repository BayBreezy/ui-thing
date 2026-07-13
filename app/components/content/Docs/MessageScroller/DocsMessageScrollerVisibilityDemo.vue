<template>
  <UiMessageScrollerProvider :scroll-margin="12">
    <div class="relative flex flex-col gap-4">
      <div class="relative mx-auto w-full max-w-sm">
        <UiCard class="h-140 w-full gap-0">
          <UiCardHeader class="gap-1 border-b">
            <UiCardTitle>Transcript Outline</UiCardTitle>
            <UiCardDescription> Track the current anchored turn. </UiCardDescription>
          </UiCardHeader>
          <UiCardContent class="flex-1 overflow-hidden p-0">
            <UiMessageScroller>
              <UiMessageScrollerViewport>
                <UiMessageScrollerContent class="p-6">
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
        </UiCard>
        <div class="absolute top-1/2 -right-12 -translate-y-1/2">
          <DocsMessageScrollerTranscriptOutline :messages="messages" />
        </div>
      </div>
      <div class="text-muted-foreground mx-auto max-w-sm px-0.5 text-center text-xs">
        Open the outline to jump between anchored turns as you read.
      </div>
    </div>
  </UiMessageScrollerProvider>
</template>

<script lang="ts" setup>
  const messages: DemoMessage[] = [
    {
      id: "vis-brief",
      role: "user",
      text: "Review the incident handoff and tell me what to read first.",
    },
    {
      id: "vis-brief-reply",
      role: "assistant",
      text: "Start with the summary and the impact section. The regression affected the upload queue, but the recovery path completed for every queued job.",
    },
    {
      id: "vis-impact",
      role: "user",
      text: "What was the customer impact?",
    },
    {
      id: "vis-impact-reply",
      role: "assistant",
      text: "Impact was limited to delayed processing.\n\nNo records were dropped, and the reconciliation worker confirmed each retry batch. Support saw confusion from two customers, but there were no checkout or billing errors.",
    },
    {
      id: "vis-actions",
      role: "user",
      text: "What actions are open?",
    },
    {
      id: "vis-actions-reply",
      role: "assistant",
      text: "Keep the retry window enabled until the next deploy, then add a queue-depth alert as the long-term fix.\n\nThe alert should fire on sustained queue growth, not a single short spike.",
    },
    {
      id: "vis-checklist",
      role: "user",
      text: "Give me the follow-up checklist.",
    },
    {
      id: "vis-checklist-reply",
      role: "assistant",
      text: "After that, compare the queue recovery graph with the deploy timeline so the handoff shows exactly when processing returned to baseline. That makes it easier for support and engineering to answer the same customer questions without re-reading the whole incident thread.\n\nI would also add a short owner note beside each follow-up item. The checklist is small, but ownership keeps the retry-window decision, alert tuning, and support macro from drifting into separate follow-up conversations.\n\nKeep the retry window enabled until the next deploy, then add a queue-depth alert as the long-term fix.\n\nThe alert should fire on sustained queue growth, not a single short spike.",
    },
  ];
</script>
