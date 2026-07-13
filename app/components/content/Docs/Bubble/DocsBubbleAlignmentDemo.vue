<template>
  <div class="mx-auto flex w-full max-w-sm flex-col gap-8 py-12">
    <UiBubble variant="muted">
      <UiBubbleContent>
        This bubble is aligned to the start. This is the default alignment.
      </UiBubbleContent>
    </UiBubble>
    <UiBubble align="end">
      <UiBubbleContent>
        This bubble is aligned to the end. Use this for user messages.
      </UiBubbleContent>
    </UiBubble>
  </div>
</template>

<script lang="ts" setup></script>
