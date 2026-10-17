<template>
  <div class="mx-auto w-full max-w-md">
    <!-- v-model:wrap is shared with the wrap button and the content -->
    <UiCodeBlock v-model:wrap="wrap" :code="output" filename="install.log">
      <UiCodeBlockHeader>
        <UiCodeBlockTitle icon="lucide:terminal" text="Terminal" />
        <UiCodeBlockActions>
          <UiCodeBlockWrapButton />
          <UiCodeBlockDownloadButton />
          <UiCodeBlockCopyButton />
        </UiCodeBlockActions>
      </UiCodeBlockHeader>
      <UiCodeBlockContent />
      <UiCodeBlockFooter class="text-xs">Wrapping is {{ wrap ? "on" : "off" }}</UiCodeBlockFooter>
    </UiCodeBlock>
  </div>
</template>

<script lang="ts" setup>
  const wrap = ref(false);

  const output = `$ pnpm add ai @ai-sdk/vue zod @ai-sdk/anthropic @ai-sdk/openai @ai-sdk/google
Packages: +42
Progress: resolved 128, reused 120, downloaded 8, added 42, done
Done in 2.8s using pnpm v10.18.0`;
</script>
