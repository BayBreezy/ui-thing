<template>
  <div class="mx-auto w-full max-w-md">
    <UiCodeBlock>
      <UiCodeBlockHeader>
        <UiCodeBlockTitle>components/Chat.vue</UiCodeBlockTitle>
        <UiCodeBlockActions>
          <UiCodeBlockCopyButton :value="code" />
        </UiCodeBlockActions>
      </UiCodeBlockHeader>
      <UiCodeBlockContent
        :id="id"
        line-numbers
        :class="expanded ? undefined : 'scroll-fade-y max-h-64 overflow-y-hidden'"
      >
        <UiCodeBlockLine v-for="(line, index) in lines" :key="index">
          <UiCodeBlockToken v-for="(token, i) in line" :key="i" :token="token" />
        </UiCodeBlockLine>
      </UiCodeBlockContent>
      <UiCodeBlockFooter class="justify-center">
        <UiButton
          variant="ghost"
          size="xs"
          :aria-expanded="expanded"
          :aria-controls="id"
          @click="toggleExpanded()"
        >
          <Icon
            name="lucide:chevron-down"
            class="size-4 transition-transform in-aria-expanded:rotate-180"
          />
          {{ expanded ? "Show less" : "Show more" }}
        </UiButton>
      </UiCodeBlockFooter>
    </UiCodeBlock>
  </div>
</template>

<script lang="ts" setup>
  /* eslint-disable no-useless-escape */
  const code = `<script setup lang="ts">
import { Chat } from "@ai-sdk/vue"

const input = ref("")
const chat = new Chat({})

function onSubmit() {
  chat.sendMessage({ text: input.value })
  input.value = ""
}
<\/script>

<template>
  <div class="flex flex-col gap-4">
    <div v-for="message in chat.messages" :key="message.id">
      <template v-for="(part, index) in message.parts" :key="index">
        <p v-if="part.type === 'text'">
          {{ part.text }}
        </p>
      </template>
    </div>
    <form @submit.prevent="onSubmit">
      <UiInput v-model="input" />
      <UiButton :disabled="chat.status !== 'ready'">
        Send
      </UiButton>
    </form>
  </div>
</template>`;

  const [expanded, toggleExpanded] = useToggle(false);
  const lines = useHighlightedCode(code, "vue");
  const id = useId();
</script>
