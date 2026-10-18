<template>
  <!--
    Chat thread with emoji reactions
    Features: Reaction chips under each bubble with counts, your own reactions highlighted, click a chip to toggle it, add reaction popover with quick emoji and reactions announced to screen readers
  -->
  <UiContainer class="py-12 lg:py-20">
    <UiCard class="mx-auto h-[34rem] w-full max-w-lg gap-0 py-0">
      <UiCardHeader class="border-b py-3">
        <UiCardTitle class="text-base">Team lounge</UiCardTitle>
        <UiCardDescription>Hover or focus a message to react</UiCardDescription>
      </UiCardHeader>
      <UiCardContent class="min-h-0 flex-1 overflow-hidden p-0">
        <UiMessageScrollerProvider>
          <UiMessageScroller>
            <UiMessageScrollerViewport>
              <UiMessageScrollerContent class="gap-5 p-4">
                <UiMessageScrollerItem
                  v-for="message in items"
                  :key="message.id"
                  :message-id="message.id"
                >
                  <UiMessage :align="message.mine ? 'end' : 'start'" class="group/msg">
                    <UiMessageAvatar v-if="!message.mine">
                      <UiAvatar :src="message.avatar" :fallback="message.author[0]" />
                    </UiMessageAvatar>
                    <UiMessageContent>
                      <UiBubble
                        :variant="message.mine ? 'default' : 'muted'"
                        :align="message.mine ? 'end' : 'start'"
                      >
                        <UiBubbleContent>{{ message.text }}</UiBubbleContent>
                      </UiBubble>
                      <div
                        class="flex flex-wrap items-center gap-1"
                        :class="message.mine ? 'justify-end' : ''"
                      >
                        <button
                          v-for="reaction in message.reactions"
                          :key="reaction.emoji"
                          type="button"
                          class="focus-visible:ring-ring/50 flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs transition outline-none focus-visible:ring-[3px]"
                          :class="reaction.mine ? 'border-primary bg-primary/10' : 'hover:bg-muted'"
                          :aria-pressed="reaction.mine"
                          :aria-label="`${reaction.emoji} ${reaction.count}, ${reaction.mine ? 'remove' : 'add'} your reaction`"
                          @click="toggle(message, reaction.emoji)"
                        >
                          <span aria-hidden="true">{{ reaction.emoji }}</span>
                          <span class="tabular-nums">{{ reaction.count }}</span>
                        </button>
                        <UiPopover>
                          <UiPopoverTrigger as-child>
                            <UiButton
                              variant="ghost"
                              size="icon-sm"
                              class="size-6 opacity-0 transition group-focus-within/msg:opacity-100 group-hover/msg:opacity-100 data-[state=open]:opacity-100"
                              aria-label="Add reaction"
                            >
                              <Icon name="lucide:smile-plus" class="size-4" />
                            </UiButton>
                          </UiPopoverTrigger>
                          <UiPopoverContent class="w-auto p-1" align="start">
                            <div class="flex gap-0.5">
                              <button
                                v-for="emoji in quick"
                                :key="emoji"
                                type="button"
                                class="hover:bg-muted rounded p-1.5 text-lg"
                                :aria-label="`React with ${emoji}`"
                                @click="toggle(message, emoji)"
                              >
                                {{ emoji }}
                              </button>
                            </div>
                          </UiPopoverContent>
                        </UiPopover>
                      </div>
                    </UiMessageContent>
                  </UiMessage>
                </UiMessageScrollerItem>
              </UiMessageScrollerContent>
            </UiMessageScrollerViewport>
          </UiMessageScroller>
        </UiMessageScrollerProvider>
      </UiCardContent>
    </UiCard>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Reaction = { emoji: string; count: number; mine: boolean };
  type Message = {
    id: string;
    author: string;
    avatar: string;
    text: string;
    mine?: boolean;
    reactions: Reaction[];
  };

  const props = withDefaults(
    defineProps<{
      messages?: Message[];
    }>(),
    {
      messages: () => [
        {
          id: "r1",
          author: "Sofia",
          avatar: "https://i.pravatar.cc/80?img=32",
          text: "We just crossed 10,000 users!",
          reactions: [
            { emoji: "🎉", count: 5, mine: true },
            { emoji: "🚀", count: 2, mine: false },
          ],
        },
        {
          id: "r2",
          author: "You",
          avatar: "",
          mine: true,
          text: "Amazing work everyone. Drinks on me on Friday.",
          reactions: [{ emoji: "👍", count: 3, mine: false }],
        },
        {
          id: "r3",
          author: "Liam",
          avatar: "https://i.pravatar.cc/80?img=12",
          text: "I will bring the cake.",
          reactions: [],
        },
      ],
    }
  );

  const quick = ["👍", "❤️", "😂", "🎉", "🚀", "👀"];

  const items = ref<Message[]>(
    props.messages.map((message) => ({
      ...message,
      reactions: message.reactions.map((reaction) => ({ ...reaction })),
    }))
  );

  function toggle(message: Message, emoji: string) {
    const existing = message.reactions.find((reaction) => reaction.emoji === emoji);
    if (!existing) {
      message.reactions.push({ emoji, count: 1, mine: true });
      return;
    }
    existing.mine = !existing.mine;
    existing.count += existing.mine ? 1 : -1;
    if (existing.count <= 0)
      message.reactions = message.reactions.filter((reaction) => reaction.emoji !== emoji);
  }
</script>
