<template>
  <span
    data-slot="code-block-token"
    :style="token.htmlStyle"
    class="text-(--shiki-light) dark:text-(--shiki-dark)"
    >{{ token.content }}</span
  >
</template>

<script lang="ts" setup>
  import type { HighlightedToken } from "~/utils/code-highlighter";

  defineProps<{
    /** A token returned by `highlightCode` or `useHighlightedCode`. */
    token: HighlightedToken;
  }>();
</script>
