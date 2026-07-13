---
title: Message Scroller
description: A scroll container for chat transcripts that anchors turns, follows streamed replies, restores prepended history, and jumps to messages.
label: New
---

## Source code

Click :SourceCodeLink{component="MessageScroller"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add message-scroller"}

## MessageScroller

A great streaming chat scroller has to juggle a lot at once: pin to the live edge while a reply streams, but never fight a reader who scrolls up; anchor each new turn near the top with a peek of the previous exchange; preserve position when older history loads above; and expose commands to jump anywhere in the thread. `MessageScroller` owns those hard parts so your message list doesn't have to.

It does **not** own your messages, AI state, transport, or model — it is a headless scroll container you compose around your own rows.

## Usage

::prose-show-case

:DocsMessageScrollerDemo

#code

<!-- automd:file src="../../app/components/content/Docs/MessageScroller/DocsMessageScrollerDemo.vue" code lang="vue" -->

```vue [DocsMessageScrollerDemo.vue]
<template>
  <UiMessageScrollerProvider>
    <div class="relative flex flex-col gap-4">
      <UiCard class="mx-auto h-140 w-full max-w-sm gap-0">
        <UiCardHeader class="gap-1 border-b">
          <UiCardTitle>New Chat</UiCardTitle>
          <UiCardDescription>How can I help you today?</UiCardDescription>
          <UiCardAction>
            <UiTooltip>
              <UiTooltipTrigger as-child>
                <UiButton
                  class="rounded-full"
                  variant="outline"
                  size="icon"
                  aria-label="Reset conversation"
                  :disabled="isBusy"
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
              <UiEmptyTitle>Morning, shadcn!</UiEmptyTitle>
              <UiEmptyDescription>
                What are we working on today? Press send to start a new conversation
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
            <UiMessageScrollerButton variant="outline" class="bg-secondary! rounded-full" />
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
                    No messages queued. Reset the conversation.
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
        Demo is read only. Press send to send messages.
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
      "That's the classic streaming scroll problem. Wrap your message list in `MessageScroller` and turn on `autoScroll` — the viewport pins to the bottom as tokens arrive, so users always see the latest text land in place.\n\nThe important part: it only auto-scrolls while the reader is already at the bottom. The moment they scroll up to read something earlier, auto-scroll backs off and their position is preserved."
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
      "You won't. Auto-scroll only runs when the viewport is already pinned to the bottom, so scrolling up is a deliberate opt-out — their place in the thread stays put even as new tokens keep arriving below.\n\nWhen there is content they haven't seen yet, `MessageScrollerButton` appears at the bottom of the viewport. One tap jumps them back to the newest message and re-engages auto-scroll."
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
```

<!-- /automd -->

::

The provider must have a constrained height (or a height-bounded parent) so the viewport can scroll.

## Anatomy

```vue [Message Scroller Anatomy.vue] lines
<template>
  <UiMessageScrollerProvider auto-scroll default-scroll-position="last-anchor">
    <UiMessageScroller>
      <UiMessageScrollerViewport>
        <UiMessageScrollerContent>
          <UiMessageScrollerItem
            v-for="message in messages"
            :key="message.id"
            :message-id="message.id"
            :scroll-anchor="message.role === 'user'"
          >
            <!-- Message / Bubble / Marker goes here -->
          </UiMessageScrollerItem>
        </UiMessageScrollerContent>
      </UiMessageScrollerViewport>
      <UiMessageScrollerButton direction="end" />
    </UiMessageScroller>
  </UiMessageScrollerProvider>
</template>
```

## Examples

### Anchoring Turns

A turn is the part of the conversation that starts a new exchange — usually the user's message and the assistant reply that follows. An _anchor_ is the row the viewport should treat as the start of that turn. Mark that row with `scrollAnchor`. When a new anchor is appended, the viewport moves it near the top and keeps a peek of the previous item above it, so the new turn does not feel detached from its context.

```vue
<template>
  <UiMessageScrollerItem :message-id="message.id" :scroll-anchor="message.role === 'user'">
    <!-- ... -->
  </UiMessageScrollerItem>
</template>
```

Scroll anchors are not tied to message role. You can turn any row into an anchor: a user message, a system marker, a handoff event, or anything else that starts a meaningful turn.

::prose-show-case

:DocsMessageScrollerAnchoringDemo

#code

<!-- automd:file src="../../app/components/content/Docs/MessageScroller/DocsMessageScrollerAnchoringDemo.vue" code lang="vue" -->

```vue [DocsMessageScrollerAnchoringDemo.vue]
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
```

<!-- /automd -->

::

### Group Chat

In a group chat, the turn boundary is often the message that asks the model to respond, or a marker like "Marcus joined the chat". Typing indicators and history controls usually should not anchor. Because anchoring is role-independent, you can anchor a marker just as easily as a message.

::prose-show-case

:DocsMessageScrollerGroupChatDemo

#code

<!-- automd:file src="../../app/components/content/Docs/MessageScroller/DocsMessageScrollerGroupChatDemo.vue" code lang="vue" -->

```vue [DocsMessageScrollerGroupChatDemo.vue]
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
```

<!-- /automd -->

::

### Keeping Context Visible

When a new turn starts, it should still feel like part of the same continuous thread. `scrollPreviousItemPeek` keeps a slice of the previous item visible above the anchor, so the reader keeps their context instead of feeling like the conversation restarted on a blank page.

::prose-show-case

:DocsMessageScrollerPreviousContextDemo

#code

<!-- automd:file src="../../app/components/content/Docs/MessageScroller/DocsMessageScrollerPreviousContextDemo.vue" code lang="vue" -->

```vue [DocsMessageScrollerPreviousContextDemo.vue]
<template>
  <UiMessageScrollerProvider :key="demoKey" :scroll-margin="24" :scroll-previous-item-peek="peek">
    <div class="relative flex flex-col gap-4">
      <UiCard class="mx-auto h-140 w-full max-w-sm gap-0">
        <UiCardHeader class="gap-1 border-b">
          <UiCardTitle>Keeping Context Visible</UiCardTitle>
          <UiCardDescription>
            New turns keep part of the previous reply in view.
          </UiCardDescription>
          <UiCardAction>
            <UiTooltip>
              <UiTooltipTrigger as-child>
                <UiButton
                  class="rounded-full"
                  variant="outline"
                  size="icon"
                  aria-label="Reset context example"
                  :disabled="isBusy"
                  @click="onReset"
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
          <UiMessageScroller>
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
            <UiMessageScrollerButton class="rounded-full" />
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
                    No messages queued. Reset the context.
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
                <div class="flex w-28 items-center gap-2">
                  <span class="text-muted-foreground text-xs tabular-nums"> {{ peek }}px </span>
                  <UiSlider
                    aria-label="Previous context peek"
                    :model-value="[peek]"
                    :min="64"
                    :max="128"
                    :step="1"
                    :disabled="isBusy"
                    @update:model-value="onPeekChange"
                  />
                </div>
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
        Adjust the slider and send. Observe the previous message peek
      </div>
    </div>
  </UiMessageScrollerProvider>
</template>

<script lang="ts" setup>
  const DEFAULT_PEEK = 64;

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
    initialCount: 2,
    chunkDelayMs: 35,
  });

  const demoKey = ref(0);
  const peek = ref(DEFAULT_PEEK);

  const isBusy = computed(() => status.value === "streaming");

  function onSubmit() {
    if (!nextMessage.value || isBusy.value) return;
    send();
  }

  function onReset() {
    reset();
    peek.value = DEFAULT_PEEK;
    demoKey.value += 1;
  }

  function onPeekChange(value: number[] | undefined) {
    const nextValue = Array.isArray(value) ? value[0] : value;
    peek.value = nextValue ?? DEFAULT_PEEK;
  }
</script>
```

<!-- /automd -->

::

### Following the Live Edge

When the reader is at the live edge, `autoScroll` keeps streamed replies in view as they grow. Scrolling away from the live edge — by wheel, touch, keyboard, or dragging the scrollbar — releases the view, so new chunks arrive without moving the reader. `autoScroll` composes with turn anchoring: when a new turn anchors near the top, the view stays put while the reply streams into the room below it.

::prose-show-case

:DocsMessageScrollerStreamingDemo

#code

<!-- automd:file src="../../app/components/content/Docs/MessageScroller/DocsMessageScrollerStreamingDemo.vue" code lang="vue" -->

```vue [DocsMessageScrollerStreamingDemo.vue]
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
```

<!-- /automd -->

::

### Opening Saved Threads

Reopening a saved thread at the absolute end often drops the reader in without enough context. A better default is `"last-anchor"`: show the last meaningful turn, like the user's latest message, with the reply below it.

::prose-show-case

:DocsMessageScrollerOpeningPositionDemo

#code

<!-- automd:file src="../../app/components/content/Docs/MessageScroller/DocsMessageScrollerOpeningPositionDemo.vue" code lang="vue" -->

```vue [DocsMessageScrollerOpeningPositionDemo.vue]
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
```

<!-- /automd -->

::

### Loading Earlier Messages

Loading earlier messages should not move the conversation the reader is already looking at. When older rows are prepended above the current transcript, `UiMessageScrollerViewport` preserves the visible row so the reader stays in the same place while history loads above them. This is enabled by default through `preserveScrollOnPrepend`.

::prose-show-case

:DocsMessageScrollerLoadHistoryDemo

#code

<!-- automd:file src="../../app/components/content/Docs/MessageScroller/DocsMessageScrollerLoadHistoryDemo.vue" code lang="vue" -->

```vue [DocsMessageScrollerLoadHistoryDemo.vue]
<template>
  <UiMessageScrollerProvider>
    <div class="relative flex flex-col gap-4">
      <UiCard class="mx-auto h-140 w-full max-w-sm gap-0">
        <UiCardHeader class="gap-1 border-b">
          <UiCardTitle>Load History</UiCardTitle>
          <UiCardDescription> Prepended messages keep your place. </UiCardDescription>
          <UiCardAction>
            <UiTooltip>
              <UiTooltipTrigger as-child>
                <UiButton
                  type="button"
                  variant="outline"
                  size="icon"
                  aria-label="Reset loaded messages"
                  :disabled="!canReset"
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
          <UiMessageScroller :key="demoKey">
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
                <UiMessageScrollerItem :scroll-anchor="false">
                  <UiMarker variant="separator">
                    <UiMarkerContent>End of Conversation</UiMarkerContent>
                  </UiMarker>
                </UiMessageScrollerItem>
              </UiMessageScrollerContent>
            </UiMessageScrollerViewport>
            <UiMessageScrollerButton />
          </UiMessageScroller>
        </UiCardContent>
        <UiCardFooter class="flex flex-col items-center gap-2 border-t">
          <UiButton
            type="button"
            :disabled="!canLoadHistory"
            class="w-full"
            variant="secondary"
            @click="loadHistory"
          >
            {{ canLoadHistory ? "Load History" : "History Loaded" }}
          </UiButton>
          <p class="text-muted-foreground text-xs">
            Restore earlier messages while keeping your place.
          </p>
        </UiCardFooter>
      </UiCard>
      <div class="text-muted-foreground mx-auto max-w-sm px-0.5 text-center text-xs text-balance">
        Click Load History to load the entire conversation
      </div>
    </div>
  </UiMessageScrollerProvider>
</template>

<script lang="ts" setup>
  const chat = createDemoChat()
    .user("Can you summarize the incident channel?")
    .assistant(
      "The first alert was a delayed export job. It started backing up around 09:42 UTC and triggered the warning once the retry queue crossed the threshold.\n\nNo customer-facing checkout paths were affected, but exports for larger workspaces were running about 12 minutes behind."
    )
    .user("Was checkout affected?")
    .assistant(
      "No checkout errors were reported. Payment authorization, order creation, and confirmation emails stayed inside their normal latency bands.\n\nThe only elevated metric was export queue depth, which maps to analytics downloads instead of checkout."
    )
    .user("What changed in the last deploy?")
    .assistant(
      "Only the export queue worker changed. The deploy moved large CSV jobs onto the shared retry policy, which made each failed attempt hold a worker slot longer than before.\n\nThe app deploy did not include checkout, pricing, or billing API changes."
    )
    .user("Do we need to roll back?")
    .assistant(
      "Not yet. Queue depth is recovering after we reduced retry concurrency, and the oldest pending job is now under five minutes old.\n\nKeep rollback ready if the queue starts climbing again, but the current trend points toward recovery."
    )
    .user("Keep watching for customer-visible issues.")
    .assistant(
      "I will watch the queue and support tags for another 15 minutes. I am tracking export failures, delayed download requests, and any support thread that mentions missing reports.\n\nIf those stay quiet through the next batch window, we can close this as an internal degradation."
    );

  const history: DemoMessage[] = chat.turns.map((turn, index) => ({
    id: `history-${index}`,
    role: turn.role,
    text: turn.text,
  }));
  const INITIAL_VISIBLE_COUNT = 5;

  const demoKey = ref(0);
  const messages = ref<DemoMessage[]>(history.slice(-INITIAL_VISIBLE_COUNT));

  const canLoadHistory = computed(() => messages.value.length < history.length);
  const canReset = computed(() => messages.value.length > INITIAL_VISIBLE_COUNT);

  function loadHistory() {
    // Prepend the earlier messages to the top; preserveScrollOnPrepend keeps
    // the viewport anchored so the reader's place does not jump.
    const remaining = history.slice(0, history.length - messages.value.length);
    messages.value.unshift(...remaining);
    useSonner("History loaded", {
      description: "Scroll up to see earlier messages.",
    });
  }

  function reset() {
    messages.value = history.slice(-INITIAL_VISIBLE_COUNT);
    demoKey.value += 1;
  }
</script>
```

<!-- /automd -->

::

### Animating New Messages

A common chat pattern is to animate the user's message when it is sent, then let the assistant reply stream into a regular row below it. Keep `messageId` and `scrollAnchor` on the animated item and use transform and opacity for the entrance — avoid animating height, margin, or padding, which can fight the scroller's positioning.

::prose-show-case

:DocsMessageScrollerAnimationDemo

#code

<!-- automd:file src="../../app/components/content/Docs/MessageScroller/DocsMessageScrollerAnimationDemo.vue" code lang="vue" -->

```vue [DocsMessageScrollerAnimationDemo.vue]
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
```

<!-- /automd -->

::

### Jumping to Messages

Search results, permalinks, outline items, and toolbar buttons often need to drive the transcript from outside the message list. Use `useMessageScroller` for those controls — the composable reads from `UiMessageScrollerProvider`, so it works in any component inside the provider.

```vue
<script setup lang="ts">
  const { scrollToMessage, scrollToEnd, scrollToStart } = useMessageScroller();
</script>
```

::prose-show-case

:DocsMessageScrollerCommandsDemo

#code

<!-- automd:file src="../../app/components/content/Docs/MessageScroller/DocsMessageScrollerCommandsDemo.vue" code lang="vue" -->

```vue [DocsMessageScrollerCommandsDemo.vue]
<template>
  <UiMessageScrollerProvider default-scroll-position="end">
    <div class="relative flex flex-col gap-4">
      <UiCard class="mx-auto h-140 w-full max-w-sm gap-0">
        <UiCardHeader class="gap-1 border-b">
          <UiCardTitle>Commands</UiCardTitle>
          <UiCardDescription> Drive the transcript from outside. </UiCardDescription>
          <UiCardAction>
            <DocsMessageScrollerCommandMenu :messages="messages" />
          </UiCardAction>
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
      <div class="text-muted-foreground mx-auto max-w-sm px-0.5 text-center text-xs text-balance">
        Use the controls to jump to any message in the conversation.
      </div>
    </div>
  </UiMessageScrollerProvider>
</template>

<script lang="ts" setup>
  const messages: DemoMessage[] = [
    {
      id: "command-activation",
      role: "user",
      text: "We're seeing activation dip after workspace creation. Can you help me find the likely step?",
    },
    {
      id: "command-activation-reply",
      role: "assistant",
      text: "The sharpest drop is between creating the workspace and inviting the first teammate.\n\nWorkspace creation is still healthy, but the invite step is where users pause. That suggests the product is asking for collaboration before the user has enough confidence in the workspace.",
    },
    {
      id: "command-compare",
      role: "user",
      text: "What should I compare before we change the onboarding flow?",
    },
    {
      id: "command-compare-reply",
      role: "assistant",
      text: "Compare three cohorts:\n\n1. Users who choose a template before inviting teammates.\n2. Users who start from a blank workspace.\n3. Users who skip invites and return within 24 hours.\n\nIf template users invite faster, the fix is probably better first-run guidance rather than a louder invite prompt.",
    },
    {
      id: "command-experiment",
      role: "user",
      text: "Can you turn that into an experiment?",
    },
    {
      id: "command-experiment-reply",
      role: "assistant",
      text: "Yes. Create a variant that shows a short checklist after workspace creation:\n\n- Pick a template.\n- Add one project detail.\n- Invite a teammate when the workspace has context.\n\nMeasure first invite completion, 24-hour return rate, and whether teams create a second project.",
    },
    {
      id: "command-risk",
      role: "user",
      text: "What's the risk if we delay the invite prompt?",
    },
    {
      id: "command-risk-reply",
      role: "assistant",
      text: "The main risk is reducing team creation for accounts that already know who they want to invite.\n\nTo protect that path, keep the invite action visible in the header and only change the primary empty-state guidance. That gives confident teams a direct route without forcing uncertain users through the invite step too early.",
    },
  ];
</script>
```

<!-- /automd -->

::

### Tracking the Reader's Position

Use `useMessageScrollerVisibility` to track the reader's position — a table-of-contents or jump menu that highlights the current anchored turn. `currentAnchorId` answers "where am I" and stays set after that anchor scrolls above the viewport; `visibleMessageIds` answers "what is on screen", in document order.

::prose-show-case

:DocsMessageScrollerVisibilityDemo

#code

<!-- automd:file src="../../app/components/content/Docs/MessageScroller/DocsMessageScrollerVisibilityDemo.vue" code lang="vue" -->

```vue [DocsMessageScrollerVisibilityDemo.vue]
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
```

<!-- /automd -->

::

### Reading Scroll State

Use `useMessageScrollerScrollable` when you need scroll state in JavaScript, such as a status indicator or a custom "jump to latest" control. It reports which edges the viewport can still scroll toward.

::prose-show-case

:DocsMessageScrollerScrollableDemo

#code

<!-- automd:file src="../../app/components/content/Docs/MessageScroller/DocsMessageScrollerScrollableDemo.vue" code lang="vue" -->

```vue [DocsMessageScrollerScrollableDemo.vue]
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
```

<!-- /automd -->

::

## API Reference

All Message Scroller parts render a `<div>` by default, except `MessageScrollerButton`, which renders a [`Button`](/components/button).

### MessageScrollerProvider

Owns the scroll state and behavior. Descendants read from it with `useMessageScroller`, `useMessageScrollerScrollable`, and `useMessageScrollerVisibility`.

| Prop                     | Type                                | Default | Description                                                     |
| ------------------------ | -------------------------------------- | ------- | ------------------------------------------------------------------- |
| `autoScroll`             | `boolean`                            | `false` | Follow the live edge while the reader is pinned to the bottom. |
| `defaultScrollPosition`  | `"start" \| "end" \| "last-anchor"` | `"end"` | Opening position for the transcript.                            |
| `scrollEdgeThreshold`    | `number`                             | `8`     | Distance in px from an edge before it is considered scrollable. |
| `scrollPreviousItemPeek` | `number`                             | `64`    | Amount in px of the previous turn kept visible when anchoring.  |
| `scrollMargin`           | `number`                             | `0`     | Extra offset in px applied when scrolling to an element.        |

### MessageScroller

The scroll region's outer wrapper. Needs a constrained height (or a height-bounded parent) so its viewport can scroll.

| Prop    | Type                       | Default | Description                                      |
| ------- | --------------------------- | ------- | --------------------------------------------------- |
| `class` | `HTMLAttributes["class"]`  | -       | Additional classes to apply to the root element. |

### MessageScrollerViewport

The scrollable region. Renders as a `role="region"`, `aria-label="Messages"`, focusable (`tabindex="0"`) native scroll container.

| Prop                      | Type      | Default | Description                                          |
| --------------------------- | ----------- | ------- | ------------------------------------------------------- |
| `preserveScrollOnPrepend` | `boolean` | `true`  | Keep the current view when messages are added above. |
| `class`                   | `HTMLAttributes["class"]`  | -       | Additional classes to apply to the viewport.          |

### MessageScrollerContent

Renders as `role="log"` with `aria-relevant="additions"` so assistive tech announces new rows.

| Prop          | Type                       | Default | Description                                             |
| --------------- | --------------------------- | ------- | ----------------------------------------------------------- |
| `class`       | `HTMLAttributes["class"]`  | -       | Additional classes to apply to the content element.      |
| `spacerClass` | `HTMLAttributes["class"]`  | -       | Additional classes to apply to the trailing spacer.      |

### MessageScrollerItem

| Prop           | Type      | Default | Description                                       |
| ---------------- | ----------- | ------- | ------------------------------------------------------ |
| `messageId`    | `string`  | -       | Stable id used for anchoring, visibility, and jumps. |
| `scrollAnchor` | `boolean` | `false` | Marks this row as the start of a turn.              |
| `class`        | `HTMLAttributes["class"]`  | -       | Additional classes to apply to the item.            |

### MessageScrollerButton

Exposes `data-active` for styling and becomes `inert` with `tabindex="-1"` when there is nothing to scroll toward.

| Prop        | Type                       | Default     | Description                          |
| ------------- | --------------------------- | ------------- | --------------------------------------- |
| `direction` | `"start" \| "end"`         | `"end"`     | Direction the button scrolls toward. |
| `behavior`  | `ScrollBehavior`           | `"smooth"`  | Scroll behavior for the jump.        |
| `variant`   | `ButtonVariants["variant"]` | `"secondary"` | The button variant.                  |
| `size`      | `ButtonVariants["size"]`   | `"icon-sm"` | The button size.                     |
| `class`     | `HTMLAttributes["class"]`  | -           | Additional classes to apply.         |

### Composables

#### useMessageScroller()

```ts
const { scrollToMessage, scrollToEnd, scrollToStart } = useMessageScroller();
```

- `scrollToMessage(id, options?)` — scroll to the item with the matching `messageId`. Returns `true` if handled (queued if the item is not mounted yet), `false` if the id is missing after rows have mounted.
- `scrollToEnd(options?)` / `scrollToStart(options?)` — scroll to the live edge or the top.

#### useMessageScrollerVisibility()

```ts
const visibility = useMessageScrollerVisibility();
// visibility.value.currentAnchorId, visibility.value.visibleMessageIds
```

Tracking only runs while something subscribes, and rows need a `messageId` to participate.

#### useMessageScrollerScrollable()

```ts
const scrollable = useMessageScrollerScrollable();
// scrollable.value.start, scrollable.value.end
```

Reports which edges the viewport can still scroll toward. For styling the scroller itself, prefer the `data-scrollable` attribute.
