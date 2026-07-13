<template>
  <UiDropdownMenu>
    <UiDropdownMenuTrigger as-child>
      <UiButton type="button" variant="secondary">Jump to...</UiButton>
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent align="end" side="bottom" class="w-64">
      <UiDropdownMenuGroup>
        <UiDropdownMenuLabel>Conversations</UiDropdownMenuLabel>
        <UiDropdownMenuItem
          v-for="message in userMessages"
          :key="message.id"
          @click="scrollToMessage(message.id, { align: 'start', behavior: 'smooth' })"
        >
          <span class="line-clamp-1 min-w-0">{{ getTrimmedMessageText(message) }}</span>
        </UiDropdownMenuItem>
      </UiDropdownMenuGroup>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>

<script lang="ts" setup>
  const props = defineProps<{ messages: DemoMessage[] }>();

  const userMessages = computed(() => props.messages.filter((message) => message.role === "user"));

  const { scrollToMessage } = useMessageScroller();

  function getTrimmedMessageText(message: DemoMessage) {
    const text = message.text;
    return text.length > 42 ? `${text.slice(0, 39)}...` : text;
  }
</script>
