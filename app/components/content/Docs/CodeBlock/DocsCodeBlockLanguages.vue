<template>
  <div class="mx-auto flex w-full max-w-md flex-col gap-4">
    <UiCodeBlock v-for="(sample, index) in samples" :key="sample.language">
      <UiCodeBlockHeader>
        <UiCodeBlockTitle>{{ sample.title }}</UiCodeBlockTitle>
      </UiCodeBlockHeader>
      <UiCodeBlockContent>
        <UiCodeBlockLine v-for="(line, i) in highlighted[index]?.value" :key="i">
          <UiCodeBlockToken v-for="(token, j) in line" :key="j" :token="token" />
        </UiCodeBlockLine>
      </UiCodeBlockContent>
    </UiCodeBlock>
  </div>
</template>

<script lang="ts" setup>
  const samples = [
    {
      language: "css",
      title: "assets/css/main.css",
      code: `@import "tailwindcss";

:root {
  --radius: 0.625rem;
}`,
    },
    {
      language: "python",
      title: "main.py",
      code: `def greet(name: str) -> str:
    return f"Hello, {name}!"`,
    },
    {
      language: "text",
      title: "notes.txt",
      code: "A language that is not in the list renders as plain text.",
    },
  ];

  const highlighted = samples.map((sample) => useHighlightedCode(sample.code, sample.language));
</script>
