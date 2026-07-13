<template>
  <div class="mx-auto flex w-full max-w-sm flex-col gap-8 py-12">
    <UiMessage>
      <UiMessageContent>
        <UiMessageHeader>Olivia</UiMessageHeader>
        <UiBubble variant="muted">
          <UiBubbleContent>I already checked the logs.</UiBubbleContent>
        </UiBubble>
      </UiMessageContent>
    </UiMessage>
    <UiMessage align="end">
      <UiMessageContent>
        <UiBubble>
          <UiBubbleContent>
            Send the report to the team. Ping @shadcn if you need help.
          </UiBubbleContent>
        </UiBubble>
        <UiMessageFooter>
          <div>Read <span class="font-normal">Yesterday</span></div>
        </UiMessageFooter>
      </UiMessageContent>
    </UiMessage>
  </div>
</template>

<script lang="ts" setup></script>
