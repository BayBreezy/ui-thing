<template>
  <div class="mx-auto w-full max-w-lg">
    <UiCodeBlock>
      <UiCodeBlockHeader>
        <UiCodeBlockTitle>
          <Icon name="lucide:file-code" class="size-4" />
          server/api/chat.post.ts
        </UiCodeBlockTitle>
        <UiCodeBlockActions>
          <UiButton
            variant="ghost"
            size="icon-xs"
            aria-label="Wrap lines"
            :aria-pressed="wrap"
            class="aria-pressed:text-foreground"
            @click="toggleWrap()"
          >
            <Icon name="lucide:text-wrap" class="size-4" />
          </UiButton>
          <UiButton
            variant="ghost"
            size="icon-xs"
            aria-label="Download"
            @click="download(code, 'chat.post.ts')"
          >
            <Icon name="lucide:download" class="size-4" />
          </UiButton>
          <UiCodeBlockCopyButton :value="code" />
        </UiCodeBlockActions>
      </UiCodeBlockHeader>
      <UiCodeBlockContent :wrap="wrap" line-numbers>
        <UiCodeBlockLine
          v-for="(line, index) in lines"
          :key="index"
          :variant="index >= 5 && index <= 9 ? 'highlighted' : 'default'"
        >
          <UiCodeBlockToken v-for="(token, i) in line" :key="i" :token="token" />
        </UiCodeBlockLine>
      </UiCodeBlockContent>
    </UiCodeBlock>
  </div>
</template>

<script lang="ts" setup>
  const code = `import { streamText } from "ai"

export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event)

  const result = streamText({
    model: "anthropic/claude-sonnet-4.5",
    system: "You are a helpful assistant. Answer in one short paragraph.",
    messages,
  })

  return result.toUIMessageStreamResponse()
})`;

  const [wrap, toggleWrap] = useToggle(false);
  const lines = useHighlightedCode(code, "ts");

  function download(value: string, filename: string) {
    const url = URL.createObjectURL(new Blob([value], { type: "text/plain" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }
</script>
