---
title: Message
description: One turn. The person's message, and the agent's reply with its actions.
label: New
---

::prose-show-case

:DocsAiMessage

#code

<!-- automd:file src="../../app/components/content/Docs/AiElements/Message/DocsAiMessage.vue" code lang="vue" -->

```vue [DocsAiMessage.vue]
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
```

<!-- /automd -->

::

Use Message for one turn in a thread. The person's text is a [Bubble](/components/bubble) on a [Message](/components/message) with `align="end"`. The agent's reply is markdown on a Message, with actions under it. A thread of these turns is [Chat](/ai-elements/chat).

## Installation

Message is built with the [Message](/components/message), [Bubble](/components/bubble), and [Tooltip](/components/tooltip) components.

:prose-pm-x{command="ui-thing@latest add message bubble tooltip"}

## Usage

```vue
<template>
  <UiMessage align="end">
    <UiMessageContent>
      <UiBubble align="end" variant="muted">
        <UiBubbleContent>How do I add a settings dialog?</UiBubbleContent>
      </UiBubble>
    </UiMessageContent>
  </UiMessage>
  <UiMessage>
    <UiMessageContent class="gap-2">
      <p>Install Dialog, then open it from the gear button.</p>
      <UiMessageFooter>
        <UiButton variant="ghost" size="icon-sm" aria-label="Copy">
          <UiIcon name="lucide:copy" />
        </UiButton>
      </UiMessageFooter>
    </UiMessageContent>
  </UiMessage>
</template>
```

See [Message](/components/message).

## Actions

Put actions in `UiMessageFooter`. It follows the message alignment, so on the person's turn the actions sit on the right. Use ghost icon buttons with a tooltip for each.

- **Copy** writes the reply to the clipboard and swaps to a check for two seconds.
- **Good response** and **Bad response** are toggles. Set `aria-pressed` so screen readers announce the state.
- **Retry** runs the turn again.
- **Edit** on the person's turn puts the text back in the field.

## Markdown

The reply streams as markdown. Render it with [Comark](https://comark.dev) (`@comark/vue`) and route fenced code to a [Code Block](/components/code-block#markdown) with a custom `pre` component, so code in the reply gets line numbers and a copy button. Pass `streaming` while the reply streams, so unfinished syntax is closed as it renders.

```vue
<template>
  <Markdown
    class="typeset"
    :value="text"
    :components="{ pre: MarkdownCodeBlock }"
    :streaming="isStreaming"
  />
</template>

<script lang="ts" setup>
  import { Markdown } from "@comark/vue";

  import MarkdownCodeBlock from "./MarkdownCodeBlock.vue";
</script>
```

## AI SDK

Branch on the message role. The person's turn is the bubble. The agent's turn is the reply, and `chat.regenerate` with the message id runs it again.

```vue
<template>
  <template v-for="message in chat.messages" :key="message.id">
    <UiMessage v-if="message.role === 'user'" align="end">
      <UiMessageContent>
        <UiBubble align="end" variant="muted">
          <UiBubbleContent>{{ getText(message) }}</UiBubbleContent>
        </UiBubble>
      </UiMessageContent>
    </UiMessage>
    <UiMessage v-else>
      <UiMessageContent class="gap-2">
        <Markdown
          class="typeset"
          :value="getText(message)"
          :components="{ pre: MarkdownCodeBlock }"
          :streaming="chat.status === 'streaming' && message === chat.messages.at(-1)"
        />
        <UiMessageFooter>
          <UiButton
            variant="ghost"
            size="icon-sm"
            aria-label="Retry"
            @click="chat.regenerate({ messageId: message.id })"
          >
            <UiIcon name="lucide:refresh-ccw" />
          </UiButton>
        </UiMessageFooter>
      </UiMessageContent>
    </UiMessage>
  </template>
</template>

<script lang="ts" setup>
  import { Chat } from "@ai-sdk/vue";
  import { Markdown } from "@comark/vue";
  import type { UIMessage } from "ai";

  import MarkdownCodeBlock from "./MarkdownCodeBlock.vue";

  const chat = new Chat({});

  function getText(message: UIMessage) {
    return message.parts.map((part) => (part.type === "text" ? part.text : "")).join("");
  }
</script>
```

