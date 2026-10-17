<template>
  <div class="mx-auto flex w-full max-w-md flex-col gap-4">
    <UiCodeBlock>
      <UiCodeBlockHeader>
        <UiCodeBlockTitle>
          <Icon name="lucide:terminal" class="size-4" />
          Terminal
        </UiCodeBlockTitle>
        <UiCodeBlockActions>
          <UiCodeBlockCopyButton :value="output" />
        </UiCodeBlockActions>
      </UiCodeBlockHeader>
      <UiCodeBlockContent wrap>
        {{ output }}
      </UiCodeBlockContent>
    </UiCodeBlock>
    <UiCodeBlock size="sm">
      <UiCodeBlockHeader>
        <UiCodeBlockTitle>
          <Icon name="lucide:terminal" class="size-4" />
          Terminal
        </UiCodeBlockTitle>
        <UiCodeBlockActions>
          <UiCodeBlockCopyButton :value="output" />
        </UiCodeBlockActions>
      </UiCodeBlockHeader>
      <UiCodeBlockContent wrap>
        {{ output }}
      </UiCodeBlockContent>
    </UiCodeBlock>
  </div>
</template>

<script lang="ts" setup>
  const output = `$ pnpm add ai @ai-sdk/vue zod
Progress: resolved 412, reused 398, downloaded 14, added 14, done
Done in 2.8s using pnpm v10.18.0`;
</script>
