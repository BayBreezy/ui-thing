<template>
  <div class="mx-auto flex w-full max-w-sm flex-col gap-12 py-12">
    <UiBubble variant="muted" align="end">
      <UiBubbleContent> I don&apos;t need tests, I know my code works. </UiBubbleContent>
      <UiBubbleReactions align="start" role="img" aria-label="Reactions: thumbs up, surprised">
        <span>👍</span>
        <span>😮</span>
      </UiBubbleReactions>
    </UiBubble>
    <UiBubble variant="muted">
      <UiBubbleContent>
        Bold. Fine I&apos;ll add some tests. I&apos;ll let you know when they&apos;re done.
      </UiBubbleContent>
      <UiBubbleReactions role="img" aria-label="Reactions: eyes, rocket, and 2 more">
        <span>👀</span>
        <span>🚀</span>
        <span>+2</span>
      </UiBubbleReactions>
    </UiBubble>
    <UiBubble variant="default" align="end">
      <UiBubbleContent>
        Tests passed on the first try. All 142 of them. Looking good!
      </UiBubbleContent>
      <UiBubbleReactions
        side="top"
        align="start"
        role="img"
        aria-label="Reactions: party popper, clapping hands"
      >
        <span>🎉</span>
        <span>👏</span>
      </UiBubbleReactions>
    </UiBubble>
    <UiBubble variant="destructive">
      <UiBubbleContent>Are you sure I can run this command?</UiBubbleContent>
      <UiBubbleReactions>
        <UiButton
          variant="ghost"
          size="sm"
          @click="() => useSonner.success('You clicked yes, running command...')"
        >
          Yes, run it
        </UiButton>
      </UiBubbleReactions>
    </UiBubble>
  </div>
</template>

<script lang="ts" setup></script>
