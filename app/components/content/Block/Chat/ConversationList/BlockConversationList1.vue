<template>
  <!--
    Simple conversation list
    Features: Avatar, name, last message preview and time for every conversation, selected row highlight, truncated previews, keyboard friendly buttons and a compose button
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-md overflow-hidden rounded-xl border">
      <div class="flex items-center justify-between border-b px-4 py-3">
        <h1 class="text-lg font-semibold">{{ title }}</h1>
        <UiButton
          variant="ghost"
          size="icon-sm"
          aria-label="New message"
          @click="useSonner.info('Open your composer here')"
        >
          <Icon name="lucide:square-pen" class="size-4" />
        </UiButton>
      </div>
      <ul class="divide-y" role="list">
        <li v-for="chat in conversations" :key="chat.id">
          <button
            type="button"
            class="hover:bg-muted/50 focus-visible:ring-ring/50 flex w-full items-center gap-3 px-4 py-3 text-left outline-none focus-visible:ring-[3px] focus-visible:ring-inset"
            :class="selected === chat.id ? 'bg-muted' : ''"
            :aria-current="selected === chat.id ? 'true' : undefined"
            @click="selected = chat.id"
          >
            <UiAvatar :src="chat.avatar" :fallback="chat.name[0]" class="size-10" />
            <span class="min-w-0 flex-1">
              <span class="flex items-baseline justify-between gap-2">
                <span class="truncate font-medium">{{ chat.name }}</span>
                <span class="text-muted-foreground shrink-0 text-xs">{{ chat.time }}</span>
              </span>
              <span class="text-muted-foreground block truncate text-sm">{{ chat.preview }}</span>
            </span>
          </button>
        </li>
      </ul>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Conversation = { id: string; name: string; avatar: string; preview: string; time: string };

  const props = withDefaults(
    defineProps<{
      title?: string;
      conversations?: Conversation[];
    }>(),
    {
      title: "Messages",
      conversations: () => [
        {
          id: "1",
          name: "Sofia Alvarez",
          avatar: "https://i.pravatar.cc/80?img=32",
          preview: "Can you review the new onboarding mockups before lunch?",
          time: "9:41 AM",
        },
        {
          id: "2",
          name: "Liam Carter",
          avatar: "https://i.pravatar.cc/80?img=12",
          preview: "Deployed the fix to staging. Looks good on my end.",
          time: "9:12 AM",
        },
        {
          id: "3",
          name: "Design team",
          avatar: "https://i.pravatar.cc/80?img=47",
          preview: "Aisha: Moodboard is ready for feedback",
          time: "Yesterday",
        },
        {
          id: "4",
          name: "Noah Williams",
          avatar: "https://i.pravatar.cc/80?img=15",
          preview: "Thanks! I will send the invoice tomorrow.",
          time: "Yesterday",
        },
        {
          id: "5",
          name: "Maya Chen",
          avatar: "https://i.pravatar.cc/80?img=45",
          preview: "Great call today. Notes are in the shared doc.",
          time: "Mon",
        },
      ],
    }
  );

  const selected = ref(props.conversations[0]?.id ?? "");
</script>
