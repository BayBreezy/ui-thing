<template>
  <div class="mx-auto flex w-full max-w-md flex-col gap-3 text-sm" dir="rtl">
    <p>ثبّت الحزم، ثم شغّل خادم التطوير.</p>
    <UiCodeBlock>
      <UiCodeBlockHeader>
        <UiCodeBlockTitle>
          <Icon name="lucide:terminal" class="size-4" />
          الطرفية
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
  </div>
</template>

<script lang="ts" setup>
  const code = `pnpm add ai @ai-sdk/vue zod
pnpm dev`;

  const lines = useHighlightedCode(code, "bash");
</script>
