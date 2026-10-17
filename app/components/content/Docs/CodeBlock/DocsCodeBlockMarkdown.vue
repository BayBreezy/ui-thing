<template>
  <div class="mx-auto flex min-h-112 w-full max-w-md flex-col gap-4 py-6 text-sm">
    <template v-for="message in messages" :key="message.id">
      <UiMessage v-if="message.role === 'user'" align="end">
        <UiMessageContent>
          <UiBubble align="end" variant="muted">
            <UiBubbleContent>{{ message.text }}</UiBubbleContent>
          </UiBubble>
        </UiMessageContent>
      </UiMessage>
      <UiMessage v-else>
        <UiMessageContent>
          <DocsAiMarkdown :value="message.text" :streaming="busy && message === messages.at(-1)" />
        </UiMessageContent>
      </UiMessage>
    </template>
    <UiButton v-if="!busy" variant="outline" size="sm" class="mt-auto self-start" @click="replay">
      Replay
    </UiButton>
  </div>
</template>

<script lang="ts" setup>
  interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    text: string;
  }

  const question = "How do I debounce a search input in Vue?";

  const response = `Wrap the value in a \`useDebounce\` composable. It returns the latest value once it stops changing for \`delay\` milliseconds.

\`\`\`ts
export function useDebounce<T>(value: Ref<T>, delay = 300) {
  const debounced = shallowRef(value.value);

  watch(value, (next, _, onCleanup) => {
    const timeout = setTimeout(() => (debounced.value = next), delay);
    onCleanup(() => clearTimeout(timeout));
  });

  return debounced;
}
\`\`\`

Pass the debounced value to your fetch instead of the raw input.`;

  const messages = ref<ChatMessage[]>([
    { id: "question", role: "user", text: question },
    { id: "answer", role: "assistant", text: response },
  ]);

  // Stream the answer a word at a time.
  const chunks = response.split(/(?<=\s)/);
  let index = 0;

  const {
    pause,
    resume,
    isActive: busy,
  } = useIntervalFn(
    () => {
      if (index >= chunks.length) {
        pause();
        return;
      }

      messages.value = [
        messages.value[0]!,
        { id: "answer", role: "assistant", text: chunks.slice(0, ++index).join("") },
      ];
    },
    30,
    { immediate: false }
  );

  function replay() {
    index = 0;
    messages.value = [{ id: "question", role: "user", text: question }];
    resume();
  }
</script>
