<template>
  <div class="mx-auto w-full max-w-md">
    <UiCodeBlock variant="destructive">
      <UiCodeBlockHeader>
        <UiCodeBlockTitle>Error</UiCodeBlockTitle>
        <UiCodeBlockActions>
          <UiCodeBlockCopyButton :value="error" />
        </UiCodeBlockActions>
      </UiCodeBlockHeader>
      <UiCodeBlockContent wrap>
        {{ error }}
      </UiCodeBlockContent>
    </UiCodeBlock>
  </div>
</template>

<script lang="ts" setup>
  const error = `TypeError: Cannot read properties of undefined (reading 'map')
    at setup (components/MessageList.vue:18:22)
    at callWithErrorHandling (runtime-core.esm-bundler.js:199:19)`;
</script>
