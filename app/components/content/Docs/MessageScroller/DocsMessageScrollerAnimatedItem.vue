<template>
  <UiMessageScrollerItem
    :message-id="message.id"
    :scroll-anchor="anchor"
    :class="[isUser ? `ms-anim-${animationPreset}` : '', props.class]"
  >
    <UiMessage :align="isUser ? 'end' : 'start'">
      <UiMessageContent>
        <UiBubble :variant="isUser ? userVariant : assistantVariant">
          <UiBubbleContent class="space-y-2">
            <p v-for="(paragraph, index) in paragraphs" :key="index" class="whitespace-pre-wrap">
              {{ paragraph }}
            </p>
          </UiBubbleContent>
        </UiBubble>
      </UiMessageContent>
    </UiMessage>
  </UiMessageScrollerItem>
</template>

<script lang="ts" setup>
  import { computed } from "vue";

  import type { bubbleStyles } from "~/components/Ui/Bubble/Bubble.vue";

  const props = withDefaults(
    defineProps<{
      message: DemoMessage;
      scrollAnchor?: boolean;
      userVariant?: VariantProps<typeof bubbleStyles>["variant"];
      assistantVariant?: VariantProps<typeof bubbleStyles>["variant"];
      animationPreset?: MessageAnimationId;
      class?: string;
    }>(),
    {
      userVariant: "muted",
      assistantVariant: "ghost",
      animationPreset: "slide-up",
    }
  );

  const isUser = computed(() => props.message.role === "user");

  // User turns start the turn (anchor by default) and animate in; assistant
  // replies stream in place without an entrance animation.
  const anchor = computed(() => props.scrollAnchor ?? isUser.value);

  const paragraphs = computed(() =>
    props.message.text
      .split(/\n\s*\n/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean)
  );
</script>

<style scoped>
  @keyframes ms-anim-fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes ms-anim-slide-up {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes ms-anim-slide-side {
    from {
      opacity: 0;
      transform: translateX(18px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  @keyframes ms-anim-pop {
    from {
      opacity: 0;
      transform: translateY(6px) scale(0.94);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  @keyframes ms-anim-spring-bounce {
    0% {
      opacity: 0;
      transform: translateY(12px) scale(0.96);
    }
    60% {
      opacity: 1;
      transform: translateY(-2px) scale(1.01);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
  @keyframes ms-anim-blur-fade {
    from {
      opacity: 0;
      filter: blur(4px);
      transform: translateY(6px);
    }
    to {
      opacity: 1;
      filter: blur(0);
      transform: translateY(0);
    }
  }
  @keyframes ms-anim-scale-fade {
    from {
      opacity: 0;
      transform: scale(0.98);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .ms-anim-fade {
    animation: ms-anim-fade 0.26s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  .ms-anim-slide-up {
    animation: ms-anim-slide-up 0.26s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  .ms-anim-slide-side {
    animation: ms-anim-slide-side 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  .ms-anim-pop {
    animation: ms-anim-pop 0.28s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  }
  .ms-anim-spring-bounce {
    animation: ms-anim-spring-bounce 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  }
  .ms-anim-blur-fade {
    animation: ms-anim-blur-fade 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
  .ms-anim-scale-fade {
    animation: ms-anim-scale-fade 0.24s cubic-bezier(0.16, 1, 0.3, 1) both;
  }

  @media (prefers-reduced-motion: reduce) {
    [class*="ms-anim-"] {
      animation: none;
    }
  }
</style>
