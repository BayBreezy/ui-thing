<template>
  <div class="mx-auto flex w-full max-w-sm flex-col gap-8 py-12">
    <UiBubble variant="muted">
      <UiBubbleContent>Can you tell me what&apos;s the issue?</UiBubbleContent>
    </UiBubble>
    <UiBubbleGroup>
      <UiBubble align="end">
        <UiBubbleContent>You tell me!</UiBubbleContent>
      </UiBubble>
      <UiBubble align="end">
        <UiBubbleContent>It worked yesterday. You broke it!</UiBubbleContent>
      </UiBubble>
      <UiBubble align="end">
        <UiBubbleContent>Find the bug and fix it.</UiBubbleContent>
        <UiBubbleReactions aria-label="Reactions: eyes" align="start">
          <span>👀</span>
        </UiBubbleReactions>
      </UiBubble>
    </UiBubbleGroup>
    <UiBubble variant="muted">
      <UiBubbleContent>
        Want me to diff yesterday&apos;s you against today&apos;s you? It&apos;s a bit embarrassing.
      </UiBubbleContent>
    </UiBubble>
  </div>
</template>

<script lang="ts" setup></script>
