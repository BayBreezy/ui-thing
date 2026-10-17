<template>
  <div class="mx-auto w-full max-w-lg">
    <!-- The `diff` language turns on `diff` automatically. Set `:diff="true"` for any other language. -->
    <UiCodeBlock :code="code" language="diff">
      <UiCodeBlockHeader>
        <UiCodeBlockTitle text="package.json" />
      </UiCodeBlockHeader>
      <UiCodeBlockContent />
    </UiCodeBlock>
  </div>
</template>

<script lang="ts" setup>
  const code = `  "dependencies": {
-   "ai": "^4.3.0",
+   "ai": "^5.0.0",
+   "@ai-sdk/vue": "^2.0.0",
    "zod": "^4.0.0"
  }`;
</script>
