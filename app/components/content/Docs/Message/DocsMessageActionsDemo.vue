<template>
  <div class="mx-auto flex w-full max-w-sm flex-col gap-8 py-12">
    <UiMessage>
      <UiMessageContent>
        <UiBubble variant="muted">
          <UiBubbleContent>
            The install failure is coming from the workspace package.
          </UiBubbleContent>
        </UiBubble>
        <UiMessageFooter>
          <UiButton variant="ghost" size="icon" aria-label="Copy" title="Copy">
            <Icon name="lucide:copy" />
          </UiButton>
          <UiButton variant="ghost" size="icon" aria-label="Like" title="Like">
            <Icon name="lucide:thumbs-up" />
          </UiButton>
          <UiButton variant="ghost" size="icon" aria-label="Dislike" title="Dislike">
            <Icon name="lucide:thumbs-down" />
          </UiButton>
        </UiMessageFooter>
      </UiMessageContent>
    </UiMessage>
    <UiMessage align="end">
      <UiMessageContent>
        <UiBubble>
          <UiBubbleContent>Okay drop me a link. Taking a look...</UiBubbleContent>
        </UiBubble>
        <UiMessageFooter class="gap-2">
          <span class="text-destructive font-normal">Failed to send</span>
          <UiButton variant="ghost" size="icon-sm" title="Retry" aria-label="Retry">
            <Icon name="lucide:refresh-ccw" />
          </UiButton>
        </UiMessageFooter>
      </UiMessageContent>
    </UiMessage>
  </div>
</template>

<script lang="ts" setup></script>
