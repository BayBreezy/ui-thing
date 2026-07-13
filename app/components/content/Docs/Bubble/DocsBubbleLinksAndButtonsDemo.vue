<template>
  <div class="mx-auto flex w-full max-w-sm flex-col gap-8 py-12">
    <UiBubble variant="muted">
      <UiBubbleContent>How can I help you today?</UiBubbleContent>
    </UiBubble>
    <UiBubbleGroup>
      <UiBubble variant="tinted" align="end">
        <UiBubbleContent as-child>
          <button type="button" @click="() => useSonner('You clicked forgot password')">
            I forgot my password
          </button>
        </UiBubbleContent>
      </UiBubble>
      <UiBubble variant="tinted" align="end">
        <UiBubbleContent as-child>
          <button type="button" @click="() => useSonner('You clicked help with subscription')">
            I need help with my subscription
          </button>
        </UiBubbleContent>
      </UiBubble>
      <UiBubble variant="tinted" align="end">
        <UiBubbleContent as-child>
          <button
            type="button"
            @click="() => useSonner('You clicked something else. Talk to a human.')"
          >
            Something else. Talk to a human.
          </button>
        </UiBubbleContent>
      </UiBubble>
    </UiBubbleGroup>
  </div>
</template>

<script lang="ts" setup></script>
