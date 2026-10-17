<template>
  <div class="typeset mx-auto w-full max-w-md">
    <h3>Stream a response</h3>
    <p>
      Create a server route that calls <code>streamText</code> and returns the stream to the client.
    </p>
    <UiCodeBlock>
      <UiCodeBlockHeader>
        <UiCodeBlockTitle>
          <Icon name="lucide:file-code" class="size-4" />
          server/api/chat.post.ts
        </UiCodeBlockTitle>
        <UiCodeBlockActions>
          <UiCodeBlockCopyButton :value="code" />
        </UiCodeBlockActions>
      </UiCodeBlockHeader>
      <UiCodeBlockContent line-numbers>
        <UiCodeBlockLine v-for="(line, index) in lines" :key="index">
          <UiCodeBlockToken v-for="(token, i) in line" :key="i" :token="token" />
        </UiCodeBlockLine>
      </UiCodeBlockContent>
    </UiCodeBlock>
    <p>
      The <code>Chat</code> class from <code>@ai-sdk/vue</code> reads the stream on the client and
      renders the answer while it is written.
    </p>
  </div>
</template>

<script lang="ts" setup>
  const code = `import { streamText } from "ai"

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event)
  const result = streamText({ model: "anthropic/claude-sonnet-4.5", messages })

  return result.toUIMessageStreamResponse()
})`;

  const lines = useHighlightedCode(code, "ts");
</script>
