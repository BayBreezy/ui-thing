<template>
  <div class="mx-auto flex w-full max-w-sm flex-col gap-6 py-12">
    <UiMessage>
      <UiMessageAvatar>
        <UiAvatar>
          <UiAvatarImage src="https://github.com/mirari.png" alt="@avatar" />
          <UiAvatarFallback>R</UiAvatarFallback>
        </UiAvatar>
      </UiMessageAvatar>
      <UiMessageContent>
        <UiBubble variant="muted">
          <UiBubbleContent> The build failed during dependency installation. </UiBubbleContent>
        </UiBubble>
      </UiMessageContent>
    </UiMessage>
    <UiMessage align="end">
      <UiMessageAvatar>
        <UiAvatar>
          <UiAvatarImage src="https://github.com/baybreezy.png" alt="@avatar" />
          <UiAvatarFallback>R</UiAvatarFallback>
        </UiAvatar>
      </UiMessageAvatar>
      <UiMessageContent>
        <UiBubble>
          <UiBubbleContent>Can you share the exact error?</UiBubbleContent>
        </UiBubble>
      </UiMessageContent>
    </UiMessage>
    <UiMessage>
      <UiMessageAvatar>
        <UiAvatar>
          <UiAvatarImage src="https://github.com/mirari.png" alt="@avatar" />
          <UiAvatarFallback>R</UiAvatarFallback>
        </UiAvatar>
      </UiMessageAvatar>
      <UiMessageContent>
        <UiBubbleGroup>
          <UiBubble variant="muted">
            <UiBubbleContent>Here&apos;s the error from the logs</UiBubbleContent>
          </UiBubble>
          <UiBubble variant="muted">
            <UiBubbleContent>
              Something went wrong with the build. The libraries are not installed correctly. Try
              running the build again.
            </UiBubbleContent>
          </UiBubble>
        </UiBubbleGroup>
      </UiMessageContent>
    </UiMessage>
  </div>
</template>

<script lang="ts" setup></script>
