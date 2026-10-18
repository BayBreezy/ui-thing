<template>
  <!--
    Group chat thread with names and avatars
    Features: Avatar and name above the first message of each run, consecutive messages grouped into one stack, day divider, member count in the header and a message group landmark
  -->
  <UiContainer class="py-12 lg:py-20">
    <UiCard class="mx-auto h-[36rem] w-full max-w-lg gap-0 py-0">
      <div class="flex items-center gap-3 border-b px-6 py-3">
        <div class="flex -space-x-2">
          <UiAvatar
            v-for="member in members.slice(0, 3)"
            :key="member.name"
            :src="member.avatar"
            :fallback="member.name[0]"
            class="ring-background size-8 ring-2"
          />
        </div>
        <div class="min-w-0 flex-1">
          <UiCardTitle class="truncate text-base">{{ title }}</UiCardTitle>
          <p class="text-muted-foreground text-xs">{{ members.length }} members</p>
        </div>
      </div>

      <UiCardContent class="min-h-0 flex-1 overflow-hidden p-0">
        <UiMessageScrollerProvider>
          <UiMessageScroller>
            <UiMessageScrollerViewport>
              <UiMessageScrollerContent class="gap-5 p-4">
                <div class="text-muted-foreground flex items-center gap-3 text-xs" role="separator">
                  <span class="bg-border h-px flex-1" />
                  Today
                  <span class="bg-border h-px flex-1" />
                </div>
                <UiMessageScrollerItem
                  v-for="(run, index) in runs"
                  :key="index"
                  :message-id="`run-${index}`"
                >
                  <UiMessage :align="run.mine ? 'end' : 'start'">
                    <UiMessageAvatar v-if="!run.mine">
                      <UiAvatar :src="run.author.avatar" :fallback="run.author.name[0]" />
                    </UiMessageAvatar>
                    <UiMessageContent>
                      <UiMessageHeader v-if="!run.mine">
                        {{ run.author.name }}
                        <span class="text-muted-foreground ml-1 text-xs font-normal">{{
                          run.time
                        }}</span>
                      </UiMessageHeader>
                      <UiBubbleGroup>
                        <UiBubble
                          v-for="text in run.texts"
                          :key="text"
                          :variant="run.mine ? 'default' : 'muted'"
                        >
                          <UiBubbleContent>{{ text }}</UiBubbleContent>
                        </UiBubble>
                      </UiBubbleGroup>
                    </UiMessageContent>
                  </UiMessage>
                </UiMessageScrollerItem>
              </UiMessageScrollerContent>
            </UiMessageScrollerViewport>
            <UiMessageScrollerButton />
          </UiMessageScroller>
        </UiMessageScrollerProvider>
      </UiCardContent>

      <UiCardFooter class="border-t py-3">
        <div class="flex w-full items-center gap-2">
          <UiLabel for="thread2-input" class="sr-only">Message the team</UiLabel>
          <UiInput id="thread2-input" placeholder="Message the team" />
          <UiButton
            size="icon"
            aria-label="Send message"
            @click="useSonner.info('Wire this up to your API')"
          >
            <Icon name="lucide:arrow-up" class="size-4" />
          </UiButton>
        </div>
      </UiCardFooter>
    </UiCard>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Member = { name: string; avatar: string };
  type Run = { author: Member; mine?: boolean; time: string; texts: string[] };

  withDefaults(
    defineProps<{
      title?: string;
      members?: Member[];
      runs?: Run[];
    }>(),
    {
      title: "Launch squad",
      members: () => [
        { name: "Sofia", avatar: "https://i.pravatar.cc/80?img=32" },
        { name: "Liam", avatar: "https://i.pravatar.cc/80?img=12" },
        { name: "Aisha", avatar: "https://i.pravatar.cc/80?img=44" },
        { name: "You", avatar: "https://i.pravatar.cc/80?img=45" },
      ],
      runs: () => [
        {
          author: { name: "Sofia", avatar: "https://i.pravatar.cc/80?img=32" },
          time: "9:30 AM",
          texts: [
            "Morning team!",
            "Launch checklist is almost done.",
            "Only the pricing page is left.",
          ],
        },
        {
          author: { name: "Liam", avatar: "https://i.pravatar.cc/80?img=12" },
          time: "9:34 AM",
          texts: ["I can take pricing. Do we have final copy?"],
        },
        {
          author: { name: "You", avatar: "https://i.pravatar.cc/80?img=45" },
          mine: true,
          time: "9:35 AM",
          texts: ["Copy is in the shared doc.", "Ping me if anything is unclear."],
        },
        {
          author: { name: "Aisha", avatar: "https://i.pravatar.cc/80?img=44" },
          time: "9:41 AM",
          texts: ["Announcement email is scheduled for 2 PM."],
        },
      ],
    }
  );
</script>
