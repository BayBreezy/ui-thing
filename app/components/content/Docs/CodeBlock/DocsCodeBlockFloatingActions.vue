<template>
  <div class="mx-auto w-full max-w-md">
    <UiCodeBlock>
      <UiCodeBlockActions>
        <UiCodeBlockCopyButton :value="output" />
      </UiCodeBlockActions>
      <UiCodeBlockContent>{{ output }}</UiCodeBlockContent>
    </UiCodeBlock>
  </div>
</template>

<script lang="ts" setup>
  const output = `$ pnpm add ai @ai-sdk/vue zod
Progress: resolved 412, reused 398, downloaded 14, added 14, done
dependencies:
+ @ai-sdk/vue 3.0.12
+ ai 6.0.12
+ zod 4.1.12
Done in 2.8s using pnpm v10.18.0`;
</script>
