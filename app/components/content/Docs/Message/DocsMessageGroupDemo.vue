<template>
  <div class="mx-auto flex w-full max-w-sm flex-col gap-6 py-12">
    <UiMessageGroup>
      <UiMessage>
        <UiMessageAvatar />
        <UiMessageContent>
          <UiBubble variant="muted">
            <UiBubbleContent>I checked the registry addresses.</UiBubbleContent>
          </UiBubble>
        </UiMessageContent>
      </UiMessage>
      <UiMessage>
        <UiMessageAvatar>
          <UiAvatar>
            <UiAvatarImage src="https://github.com/evilrabbit.png" alt="@avatar" />
            <UiAvatarFallback>CN</UiAvatarFallback>
          </UiAvatar>
        </UiMessageAvatar>
        <UiMessageContent>
          <UiBubble variant="muted">
            <UiBubbleContent>
              The component and example JSON now live under the UI registry.
            </UiBubbleContent>
          </UiBubble>
        </UiMessageContent>
      </UiMessage>
    </UiMessageGroup>
  </div>
</template>

<script lang="ts" setup></script>
