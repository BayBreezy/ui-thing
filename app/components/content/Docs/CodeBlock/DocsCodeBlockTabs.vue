<template>
  <UiTabs default-value="route" class="mx-auto w-full max-w-md">
    <UiTabsList>
      <UiTabsTrigger v-for="file in files" :key="file.id" :value="file.id">
        {{ file.title.split("/").at(-1) }}
      </UiTabsTrigger>
    </UiTabsList>
    <UiTabsContent v-for="(file, index) in files" :key="file.id" :value="file.id">
      <UiCodeBlock>
        <UiCodeBlockHeader>
          <UiCodeBlockTitle>{{ file.title }}</UiCodeBlockTitle>
          <UiCodeBlockActions>
            <UiCodeBlockCopyButton :value="file.code" />
          </UiCodeBlockActions>
        </UiCodeBlockHeader>
        <UiCodeBlockContent line-numbers>
          <UiCodeBlockLine v-for="(line, i) in highlighted[index]?.value" :key="i">
            <UiCodeBlockToken v-for="(token, j) in line" :key="j" :token="token" />
          </UiCodeBlockLine>
        </UiCodeBlockContent>
      </UiCodeBlock>
    </UiTabsContent>
  </UiTabs>
</template>

<script lang="ts" setup>
  /* eslint-disable no-useless-escape */
  const files = [
    {
      id: "route",
      title: "server/api/chat.post.ts",
      language: "ts",
      code: `import { streamText } from "ai"

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event)
  const result = streamText({ model: "anthropic/claude-sonnet-4.5", messages })

  return result.toUIMessageStreamResponse()
})`,
    },
    {
      id: "chat",
      title: "components/Chat.vue",
      language: "vue",
      code: `<script setup lang="ts">
import { Chat } from "@ai-sdk/vue"

const chat = new Chat({})
<\/script>

<template>
  <MessageList :messages="chat.messages" />
</template>`,
    },
    {
      id: "env",
      title: ".env",
      language: "bash",
      code: "AI_GATEWAY_API_KEY=your-api-key",
    },
  ];

  const highlighted = files.map((file) => useHighlightedCode(file.code, file.language));
</script>
