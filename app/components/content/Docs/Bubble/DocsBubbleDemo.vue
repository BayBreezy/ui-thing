<template>
  <div class="mx-auto flex w-full max-w-sm flex-col gap-8 py-12">
    <UiBubble align="end">
      <UiBubbleContent>Hey there! what&apos;s up?</UiBubbleContent>
    </UiBubble>
    <UiBubbleGroup>
      <UiBubble variant="muted">
        <UiBubbleContent>Hey! Want to see chat bubbles?</UiBubbleContent>
      </UiBubble>
      <UiBubble variant="muted">
        <UiBubbleContent>
          I can group messages, switch sides, and keep the whole thread easy to scan.
        </UiBubbleContent>
        <UiBubbleReactions role="img" aria-label="Reaction: thumbs up">
          <span>👍</span>
        </UiBubbleReactions>
      </UiBubble>
    </UiBubbleGroup>
    <UiBubble align="end">
      <UiBubbleContent>Sure. Hit me with your best demo.</UiBubbleContent>
    </UiBubble>
    <UiBubble variant="muted">
      <UiBubbleContent>
        Yes. You are reading a demo that is demoing itself. Very meta. Very on-brand.
      </UiBubbleContent>
      <UiBubbleReactions role="img" aria-label="Reactions: thumbs up, fire, eyes, and 2 more">
        <span>👍</span>
        <span>🔥</span>
        <span>👀</span>
        <span>+2</span>
      </UiBubbleReactions>
    </UiBubble>
  </div>
</template>

<script lang="ts" setup></script>
