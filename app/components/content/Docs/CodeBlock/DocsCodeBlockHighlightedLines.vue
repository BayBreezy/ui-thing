<template>
  <div class="mx-auto w-full max-w-md">
    <UiCodeBlock>
      <UiCodeBlockContent line-numbers>
        <UiCodeBlockLine
          v-for="(line, index) in code.split('\n')"
          :key="index"
          :variant="highlighted.includes(index) ? 'highlighted' : 'default'"
        >
          {{ line }}
        </UiCodeBlockLine>
      </UiCodeBlockContent>
    </UiCodeBlock>
  </div>
</template>

<script lang="ts" setup>
  const code = `export default defineNuxtConfig({
  experimental: {
    viewTransition: true,
    typedPages: true,
  },
  image: {
    domains: ["avatars.githubusercontent.com"],
  },
})`;

  const highlighted = [2, 3];
</script>
