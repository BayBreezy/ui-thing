<template>
  <div class="mx-auto w-full max-w-md">
    <UiCodeBlock>
      <UiCodeBlockContent line-numbers>
        {{ code }}
      </UiCodeBlockContent>
    </UiCodeBlock>
  </div>
</template>

<script lang="ts" setup>
  const code = `{
  "name": "chat",
  "private": true,
  "scripts": {
    "dev": "nuxt dev",
    "build": "nuxt build"
  }
}`;
</script>
