<template>
  <DefineMessageAction v-slot="{ label, pressed, onClick, $slots }">
    <UiTooltip>
      <UiTooltipTrigger as-child>
        <UiButton
          variant="ghost"
          size="icon-sm"
          :aria-label="label"
          :aria-pressed="pressed"
          @click="onClick?.()"
        >
          <component :is="$slots.default" />
        </UiButton>
      </UiTooltipTrigger>
      <UiTooltipContent>
        <p>{{ label }}</p>
      </UiTooltipContent>
    </UiTooltip>
  </DefineMessageAction>

  <div class="mx-auto flex w-full max-w-md flex-col gap-8 py-6 text-sm">
    <UiMessage align="end">
      <UiMessageContent class="gap-2">
        <UiBubble align="end" variant="muted">
          <UiBubbleContent>
            How do I add a settings dialog? It should open from the gear icon in the header.
          </UiBubbleContent>
        </UiBubble>
        <UiMessageFooter>
          <MessageAction label="Copy">
            <Icon name="lucide:copy" class="size-4" />
          </MessageAction>
          <MessageAction label="Edit">
            <Icon name="lucide:pencil" class="size-4" />
          </MessageAction>
        </UiMessageFooter>
      </UiMessageContent>
    </UiMessage>
    <UiMessage>
      <UiMessageContent class="gap-2">
        <DocsAiMarkdown :value="reply" />
        <UiMessageFooter class="px-0">
          <MessageAction :label="copied ? 'Copied' : 'Copy'" @click="copy(reply)">
            <Icon v-if="copied" name="lucide:check" class="size-4" />
            <Icon v-else name="lucide:copy" class="size-4" />
          </MessageAction>
          <MessageAction
            label="Good response"
            :pressed="feedback === 'like'"
            @click="feedback = feedback === 'like' ? null : 'like'"
          >
            <Icon
              name="lucide:thumbs-up"
              class="size-4"
              :class="feedback === 'like' ? 'fill-current' : undefined"
            />
          </MessageAction>
          <MessageAction
            label="Bad response"
            :pressed="feedback === 'dislike'"
            @click="feedback = feedback === 'dislike' ? null : 'dislike'"
          >
            <Icon
              name="lucide:thumbs-down"
              class="size-4"
              :class="feedback === 'dislike' ? 'fill-current' : undefined"
            />
          </MessageAction>
          <MessageAction label="Retry">
            <Icon name="lucide:refresh-ccw" class="size-4" />
          </MessageAction>
        </UiMessageFooter>
      </UiMessageContent>
    </UiMessage>
  </div>
</template>

<script lang="ts" setup>
  const reply = `Install Dialog, then open it from the gear button in \`SiteHeader.vue\`.

\`\`\`bash
npx ui-thing@latest add dialog
\`\`\`

Wrap the button in a \`DialogTrigger\` and put the settings form in \`DialogContent\`. Focus moves into the dialog when it opens, and **Esc** closes it.`;

  const { copy, copied } = useClipboard({ copiedDuring: 2000, legacy: true });
  const feedback = ref<"like" | "dislike" | null>(null);

  const [DefineMessageAction, MessageAction] = createReusableTemplate<{
    label: string;
    pressed?: boolean;
    onClick?: () => void;
  }>();
</script>
