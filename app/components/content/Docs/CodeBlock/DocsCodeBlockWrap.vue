<template>
  <div class="mx-auto flex w-full max-w-md flex-col gap-4">
    <UiCodeBlock>
      <UiCodeBlockContent>{{ output }}</UiCodeBlockContent>
    </UiCodeBlock>
    <UiCodeBlock>
      <UiCodeBlockContent wrap>
        {{ output }}
      </UiCodeBlockContent>
    </UiCodeBlock>
  </div>
</template>

<script lang="ts" setup>
  const output = `Error: The model "anthropic/claude-sonnet-4.5" returned an error: Request too large. The prompt is 212,431 tokens and the context window is 200,000 tokens. Remove some messages or summarize the conversation and try again.`;
</script>
