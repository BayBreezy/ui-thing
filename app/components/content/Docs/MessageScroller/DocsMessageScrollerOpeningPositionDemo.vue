<template>
  <div class="relative flex flex-col gap-4">
    <UiCard class="mx-auto h-140 w-full max-w-sm gap-0">
      <UiCardHeader class="gap-1 border-b">
        <UiCardTitle>Opening Position</UiCardTitle>
        <UiCardDescription> Choose where a saved transcript opens. </UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="flex-1 overflow-hidden p-0">
        <UiMessageScrollerProvider>
          <DocsMessageScrollerOpeningPositionInner :position="position" :position-key="positionKey">
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
          </DocsMessageScrollerOpeningPositionInner>
        </UiMessageScrollerProvider>
      </UiCardContent>
      <UiCardFooter class="flex items-center justify-center border-t">
        <UiTabs :model-value="position" class="w-full" @update:model-value="onValueChange">
          <UiTabsList class="w-full">
            <UiTabsTrigger v-for="option in positions" :key="option.value" :value="option.value">
              {{ option.label }}
            </UiTabsTrigger>
          </UiTabsList>
        </UiTabs>
      </UiCardFooter>
    </UiCard>
    <div class="text-muted-foreground mx-auto max-w-sm px-0.5 text-center text-xs">
      Toggle the defaultScrollPosition to see where the transcript starts when you open the thread
    </div>
  </div>
</template>

<script lang="ts" setup>
  type Position = "start" | "end" | "last-anchor";

  const messages: DemoMessage[] = [
    {
      id: "open-1",
      role: "user",
      text: "This is the first message the user sent in the conversation.",
    },
    {
      id: "open-2",
      role: "assistant",
      text: "Workspace creation rose 8%, but first invite completion only rose 2%.",
    },
    {
      id: "open-3",
      role: "user",
      text: "This is the last message the user sent in the conversation.",
    },
    {
      id: "open-4",
      role: "assistant",
      text: "Start with the invite step. Teams are creating workspaces but waiting to add collaborators.\n\nRecommended follow-up:\n\n1. Compare invite drop-off by account size.\n2. Check whether users who skip invites still return within 24 hours.\n3. Review the empty-state copy on the first project screen.\n4. Segment activation by template, since template users may not need invites right away.\n\nIf that pattern holds, the next experiment should make collaboration useful earlier instead of prompting for invites harder.",
    },
  ];

  const positions: { value: Position; label: string }[] = [
    { value: "start", label: "start" },
    { value: "end", label: "end" },
    { value: "last-anchor", label: "last-anchor" },
  ];

  const position = ref<Position>("last-anchor");
  const positionKey = ref(0);

  function onValueChange(value: unknown) {
    if (value === "start" || value === "end" || value === "last-anchor") {
      position.value = value;
      positionKey.value += 1;
    }
  }
</script>
