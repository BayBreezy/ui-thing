<template>
  <div class="mx-auto flex w-full max-w-sm flex-col gap-6 py-12">
    <UiMessage align="end">
      <UiMessageAvatar>
        <UiAvatar>
          <UiAvatarImage src="https://github.com/baybreezy.png" alt="@me" />
          <UiAvatarFallback>ME</UiAvatarFallback>
        </UiAvatar>
      </UiMessageAvatar>
      <UiMessageContent>
        <UiBubble>
          <UiBubbleContent>Deploying to prod real quick.</UiBubbleContent>
        </UiBubble>
      </UiMessageContent>
    </UiMessage>
    <UiMessage>
      <UiMessageAvatar>
        <UiAvatar>
          <UiAvatarImage src="https://github.com/evilrabbit.png" alt="@rabbit" />
          <UiAvatarFallback>R</UiAvatarFallback>
        </UiAvatar>
      </UiMessageAvatar>
      <UiMessageContent>
        <UiBubble variant="muted">
          <UiBubbleContent>It&apos;s 4:55 PM. On a Friday.</UiBubbleContent>
        </UiBubble>
      </UiMessageContent>
    </UiMessage>
    <UiMessage align="end">
      <UiMessageAvatar>
        <UiAvatar>
          <UiAvatarImage src="https://github.com/baybreezy.png" alt="@me" />
          <UiAvatarFallback>ME</UiAvatarFallback>
        </UiAvatar>
      </UiMessageAvatar>
      <UiMessageContent>
        <UiBubble>
          <UiBubbleContent>It&apos;s a one-line change.</UiBubbleContent>
        </UiBubble>
        <UiMessageFooter>Delivered</UiMessageFooter>
      </UiMessageContent>
    </UiMessage>
    <UiMessage>
      <UiMessageAvatar>
        <UiAvatar>
          <UiAvatarImage src="https://github.com/evilrabbit.png" alt="@rabbit" />
          <UiAvatarFallback>R</UiAvatarFallback>
        </UiAvatar>
      </UiMessageAvatar>
      <UiMessageContent>
        <UiBubbleGroup>
          <UiBubble variant="muted">
            <UiBubbleContent> It&apos;s always a one-line change 😭. </UiBubbleContent>
          </UiBubble>
          <UiBubble variant="muted">
            <UiBubbleContent>Alright, let me take a look.</UiBubbleContent>
            <UiBubbleReactions aria-label="Reactions: thumbs up">
              <span>👍</span>
            </UiBubbleReactions>
          </UiBubble>
        </UiBubbleGroup>
      </UiMessageContent>
    </UiMessage>
    <UiMarker role="status">
      <UiMarkerContent class="shimmer">
        <span class="font-medium">Oliver</span> is typing...
      </UiMarkerContent>
    </UiMarker>
  </div>
</template>

<script lang="ts" setup></script>
