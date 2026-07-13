<template>
  <UiHoverCard>
    <UiHoverCardTrigger as-child>
      <button
        type="button"
        aria-label="Open transcript outline"
        class="focus-visible:ring-ring/50 flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-md transition-colors outline-none focus-visible:ring-3"
      >
        <span
          v-for="message in userMessages"
          :key="message.id"
          :data-current="message.id === visibility.currentAnchorId"
          class="bg-muted-foreground/40 data-[current=true]:bg-foreground h-0.5 w-4 rounded-full"
        />
      </button>
    </UiHoverCardTrigger>
    <UiHoverCardContent
      align="center"
      side="left"
      :side-offset="-28"
      class="flex w-64 flex-col gap-1 rounded-2xl p-1"
    >
      <button
        v-for="message in userMessages"
        :key="message.id"
        type="button"
        :aria-current="visibility.currentAnchorId === message.id ? 'location' : undefined"
        class="hover:bg-accent hover:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground aria-current:bg-accent aria-current:text-accent-foreground flex min-h-7 items-center rounded-xl px-2 py-1.5 text-left text-sm transition-colors outline-none"
        @click="scrollToMessage(message.id, { align: 'start', behavior: 'smooth' })"
      >
        <span class="line-clamp-1 min-w-0">{{ getTrimmedMessageText(message) }}</span>
      </button>
    </UiHoverCardContent>
  </UiHoverCard>
</template>

<script lang="ts" setup>
  const props = defineProps<{ messages: DemoMessage[] }>();

  const userMessages = computed(() => props.messages.filter((message) => message.role === "user"));

  const { scrollToMessage } = useMessageScroller();
  const visibility = useMessageScrollerVisibility();

  function getTrimmedMessageText(message: DemoMessage) {
    const text = message.text;
    return text.length > 42 ? `${text.slice(0, 39)}...` : text;
  }
</script>
