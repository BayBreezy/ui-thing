<template>
  <div class="mx-auto w-full max-w-lg">
    <UiCodeBlock :code="code" language="ts" filename="server/api/chat.post.ts">
      <UiCodeBlockHeader>
        <UiCodeBlockTitle icon="lucide:file-code" />
        <UiCodeBlockActions>
          <UiCodeBlockDownloadButton />
          <UiCodeBlockCopyButton />
        </UiCodeBlockActions>
      </UiCodeBlockHeader>
      <UiCodeBlockContent line-numbers />
    </UiCodeBlock>
  </div>
</template>

<script lang="ts" setup>
  // `code`, `language` and `filename` are set once on the root. The title, content, copy and download
  // parts read them.
  const code = `import { streamText } from "ai";

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event);

  const result = streamText({
    model: "anthropic/claude-sonnet-4.5",
    messages,
  });

  return result.toUIMessageStreamResponse();
});`;
</script>
