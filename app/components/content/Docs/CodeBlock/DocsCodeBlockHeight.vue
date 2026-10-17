<template>
  <div class="mx-auto w-full max-w-md">
    <UiCodeBlock>
      <UiCodeBlockHeader>
        <UiCodeBlockTitle>Logs</UiCodeBlockTitle>
        <UiCodeBlockActions>
          <UiCodeBlockCopyButton :value="logs" />
        </UiCodeBlockActions>
      </UiCodeBlockHeader>
      <UiCodeBlockContent class="scroll-fade-y max-h-48">
        {{ logs }}
      </UiCodeBlockContent>
    </UiCodeBlock>
  </div>
</template>

<script lang="ts" setup>
  const logs = Array.from(
    { length: 40 },
    (_, index) =>
      `[${String(index + 1).padStart(2, "0")}] GET /api/chat 200 in ${12 + ((index * 7) % 40)}ms`
  ).join("\n");
</script>
