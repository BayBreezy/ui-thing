<template>
  <div class="mx-auto flex w-full max-w-sm flex-col gap-12 py-12">
    <UiBubble>
      <UiBubbleContent>This is the default primary bubble.</UiBubbleContent>
    </UiBubble>
    <UiBubble variant="secondary" align="end">
      <UiBubbleContent>This is the secondary variant.</UiBubbleContent>
    </UiBubble>
    <UiBubble variant="muted">
      <UiBubbleContent>
        This one is muted. It uses a lower emphasis color for the chat bubble.
      </UiBubbleContent>
      <UiBubbleReactions role="img" aria-label="Reaction: thumbs up">
        <span>👍</span>
      </UiBubbleReactions>
    </UiBubble>
    <UiBubble variant="tinted" align="end">
      <UiBubbleContent>
        This one is tinted. The tint is a softer color derived from the primary color.
      </UiBubbleContent>
    </UiBubble>
    <UiBubble variant="outline">
      <UiBubbleContent>We can also use an outlined variant.</UiBubbleContent>
    </UiBubble>
    <UiBubble variant="destructive" align="end">
      <UiBubbleContent>Or a destructive variant with a reaction.</UiBubbleContent>
      <UiBubbleReactions role="img" aria-label="Reaction: fire">
        <span>🔥</span>
      </UiBubbleReactions>
    </UiBubble>
    <UiBubble variant="ghost">
      <UiBubbleContent>
        Ghost bubbles work for assistant text, <b>markdown</b>, and other content that should not be
        framed. This is perfect for assistant messages that should not have a frame and can take the
        full width of the container. You can also render <code>code</code> in it. Ghost bubbles are
        full width and can take the full width of the container.
      </UiBubbleContent>
    </UiBubble>
  </div>
</template>

<script lang="ts" setup></script>
