<template>
  <div class="mx-auto flex w-full max-w-md flex-col gap-4 text-sm">
    <UiMessage align="end">
      <UiMessageContent>
        <UiBubble variant="muted">
          <UiBubbleContent>How do I stream a response?</UiBubbleContent>
        </UiBubble>
      </UiMessageContent>
    </UiMessage>
    <UiMessage>
      <UiMessageContent class="gap-3">
        <p>Create a server route that returns the stream:</p>
        <UiCodeBlock>
          <UiCodeBlockHeader>
            <UiCodeBlockTitle>server/api/chat.post.ts</UiCodeBlockTitle>
            <UiCodeBlockActions>
              <UiCodeBlockCopyButton :value="code" />
            </UiCodeBlockActions>
          </UiCodeBlockHeader>
          <UiCodeBlockContent>
            <UiCodeBlockLine v-for="(line, index) in lines" :key="index">
              <UiCodeBlockToken v-for="(token, i) in line" :key="i" :token="token" />
            </UiCodeBlockLine>
          </UiCodeBlockContent>
        </UiCodeBlock>
        <p>The client reads it with Chat from @ai-sdk/vue.</p>
      </UiMessageContent>
    </UiMessage>
  </div>
</template>

<script lang="ts" setup>
  const code = `import { streamText } from "ai"

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event)

  const result = streamText({
    model: "anthropic/claude-sonnet-4.5",
    messages,
  })

  return result.toUIMessageStreamResponse()
})`;

  const lines = useHighlightedCode(code, "ts");
</script>
