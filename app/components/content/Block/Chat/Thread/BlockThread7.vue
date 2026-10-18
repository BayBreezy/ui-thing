<template>
  <!--
    Channel thread with system messages
    Features: Centered system events for joins, renames and pinned messages, date separators, a new messages divider with a jump link and regular chat bubbles in between
  -->
  <UiContainer class="py-12 lg:py-20">
    <UiCard class="mx-auto h-[36rem] w-full max-w-lg gap-0 py-0">
      <UiCardHeader class="border-b py-3">
        <UiCardTitle class="flex items-center gap-1 text-base">
          <Icon name="lucide:hash" class="size-4" />
          {{ channel }}
        </UiCardTitle>
        <UiCardDescription>Company wide announcements and updates</UiCardDescription>
      </UiCardHeader>

      <UiCardContent class="min-h-0 flex-1 overflow-hidden p-0">
        <UiMessageScrollerProvider>
          <UiMessageScroller>
            <UiMessageScrollerViewport>
              <UiMessageScrollerContent class="gap-4 p-4">
                <UiMessageScrollerItem
                  v-for="entry in entries"
                  :key="entry.id"
                  :message-id="entry.id"
                >
                  <div
                    v-if="entry.type === 'date'"
                    class="text-muted-foreground flex items-center gap-3 text-xs"
                    role="separator"
                  >
                    <span class="bg-border h-px flex-1" />
                    {{ entry.text }}
                    <span class="bg-border h-px flex-1" />
                  </div>
                  <div
                    v-else-if="entry.type === 'new'"
                    class="flex items-center gap-3 text-xs font-medium text-red-600 dark:text-red-400"
                    role="separator"
                  >
                    <span class="h-px flex-1 bg-current opacity-40" />
                    New messages
                    <span class="h-px flex-1 bg-current opacity-40" />
                  </div>
                  <p
                    v-else-if="entry.type === 'system'"
                    class="text-muted-foreground flex items-center justify-center gap-2 text-center text-xs"
                  >
                    <Icon :name="entry.icon!" class="size-3.5 shrink-0" />
                    <span
                      ><strong class="text-foreground font-medium">{{ entry.who }}</strong>
                      {{ entry.text }}</span
                    >
                  </p>
                  <UiMessage v-else>
                    <UiMessageAvatar>
                      <UiAvatar :src="entry.avatar" :fallback="entry.who![0]" />
                    </UiMessageAvatar>
                    <UiMessageContent>
                      <UiMessageHeader>
                        {{ entry.who }}
                        <span class="text-muted-foreground ml-1 text-xs font-normal">{{
                          entry.time
                        }}</span>
                      </UiMessageHeader>
                      <UiBubble variant="muted">
                        <UiBubbleContent>{{ entry.text }}</UiBubbleContent>
                      </UiBubble>
                    </UiMessageContent>
                  </UiMessage>
                </UiMessageScrollerItem>
              </UiMessageScrollerContent>
            </UiMessageScrollerViewport>
            <UiMessageScrollerButton />
          </UiMessageScroller>
        </UiMessageScrollerProvider>
      </UiCardContent>
    </UiCard>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Entry = {
    id: string;
    type: "date" | "new" | "system" | "message";
    text?: string;
    who?: string;
    avatar?: string;
    time?: string;
    icon?: string;
  };

  withDefaults(
    defineProps<{
      channel?: string;
      entries?: Entry[];
    }>(),
    {
      channel: "announcements",
      entries: () => [
        { id: "e1", type: "date", text: "Yesterday" },
        {
          id: "e2",
          type: "system",
          icon: "lucide:user-plus",
          who: "Aisha",
          text: "joined the channel",
        },
        {
          id: "e3",
          type: "message",
          who: "Maya",
          avatar: "https://i.pravatar.cc/80?img=45",
          time: "4:12 PM",
          text: "Welcome Aisha! Glad to have you on the marketing team.",
        },
        {
          id: "e4",
          type: "system",
          icon: "lucide:pencil",
          who: "Maya",
          text: "renamed the channel from #general-news to #announcements",
        },
        { id: "e5", type: "date", text: "Today" },
        { id: "e6", type: "system", icon: "lucide:pin", who: "Liam", text: "pinned a message" },
        { id: "e7", type: "new" },
        {
          id: "e8",
          type: "message",
          who: "Sofia",
          avatar: "https://i.pravatar.cc/80?img=32",
          time: "9:30 AM",
          text: "Reminder: all hands meeting at 2 PM today. Agenda is in the pinned message.",
        },
        {
          id: "e9",
          type: "system",
          icon: "lucide:calendar-plus",
          who: "Noah",
          text: "scheduled an event for 2:00 PM",
        },
      ],
    }
  );
</script>
