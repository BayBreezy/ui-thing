---
title: Message
description: Displays a message in a conversation, with optional avatar, header, footer, and alignment.

---

## Source code

Click :SourceCodeLink{component="Message"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add message"}

## Usage

The `Message` component lays out a single message in a conversation. It handles the avatar, alignment, header, and footer around the message surface.

For AI apps, you can render reasoning steps, tool calls and assistant messages using the `Message` component.

::prose-show-case

:DocsMessageDemo

#code

<!-- automd:file src="../../app/components/content/Docs/Message/DocsMessageDemo.vue" code lang="vue" -->

```vue [DocsMessageDemo.vue]
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
```

<!-- /automd -->

::

**Note:** `Message` owns the row layout — avatar, alignment, header, and footer. Render the visible message surface inside it with [`Bubble`](/components/bubble).

## Anatomy

```vue [Message Anatomy.vue] lines
<template>
  <UiMessageGroup>
    <UiMessage>
      <UiMessageAvatar />
      <UiMessageContent>
        <UiMessageHeader />
        <UiBubble />
        <UiMessageFooter />
      </UiMessageContent>
    </UiMessage>
  </UiMessageGroup>
</template>
```

Use `UiMessageGroup` to stack consecutive messages from the same sender.

## Features

- Start and end alignment for sender and receiver rows via the `align` prop
- Avatar slot that anchors to the bottom of the message and stays clear of the footer
- Header and footer slots for sender names, status, and message actions
- Footer follows the message side; actions stay aligned on `align="end"` rows
- Group wrapper for stacking consecutive messages from the same sender
- Every part renders through `Primitive`, so `as` / `as-child` and Vue `class` overrides work on any part

## Examples

### Avatar

Use `UiMessageAvatar` to render an avatar next to the message. Set `align="end"` on the message to align the avatar to the end of the message.

::prose-show-case

:DocsMessageAvatarDemo

#code

<!-- automd:file src="../../app/components/content/Docs/Message/DocsMessageAvatarDemo.vue" code lang="vue" -->

```vue [DocsMessageAvatarDemo.vue]
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
```

<!-- /automd -->

::

| align   | Description                                          |
| ------- | ------------------------------------------------------ |
| `start` | Align the message to the start of the conversation. |
| `end`   | Align the message to the end of the conversation.   |

### Group

Use `UiMessageGroup` to stack consecutive messages from the same sender. Render an empty `UiMessageAvatar` on the earlier messages to keep them aligned with the avatar on the last one.

::prose-show-case

:DocsMessageGroupDemo

#code

<!-- automd:file src="../../app/components/content/Docs/Message/DocsMessageGroupDemo.vue" code lang="vue" -->

```vue [DocsMessageGroupDemo.vue]
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
```

<!-- /automd -->

::

### Header and Footer

Use `UiMessageHeader` for a sender name and `UiMessageFooter` for metadata such as a delivery or read status.

::prose-show-case

:DocsMessageHeaderAndFooterDemo

#code

<!-- automd:file src="../../app/components/content/Docs/Message/DocsMessageHeaderAndFooterDemo.vue" code lang="vue" -->

```vue [DocsMessageHeaderAndFooterDemo.vue]
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
```

<!-- /automd -->

::

### Actions

Place message-level actions in `UiMessageFooter`, such as copy, retry, or feedback buttons.

::prose-show-case

:DocsMessageActionsDemo

#code

<!-- automd:file src="../../app/components/content/Docs/Message/DocsMessageActionsDemo.vue" code lang="vue" -->

```vue [DocsMessageActionsDemo.vue]
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
```

<!-- /automd -->

::

## Accessibility

`Message` is a presentational layout wrapper. Accessibility comes from the content you place inside it.

### Label icon-only actions

Action buttons in `UiMessageFooter` are usually icon-only, so give each one an `aria-label`.

```vue
<template>
  <UiMessageFooter>
    <UiButton variant="ghost" size="icon" aria-label="Copy">
      <Icon name="lucide:copy" />
    </UiButton>
  </UiMessageFooter>
</template>
```

### Status updates

For in-progress messages, use a [`Marker`](/components/marker) with `role="status"` so assistive tech announces the update as it appears.

```vue
<template>
  <UiMessage>
    <UiMarker role="status">
      <UiMarkerIcon>
        <Icon name="lucide:loader-circle" class="animate-spin" />
      </UiMarkerIcon>
      <UiMarkerContent>Checking the logs...</UiMarkerContent>
    </UiMarker>
  </UiMessage>
</template>
```

## API Reference

All Message parts render through `Primitive`. Use `as` to choose another element, or `as-child` to merge the component's attributes and styles onto the single element or component in its default slot.

### Message

The message row wrapper.

| Prop       | Type                       | Default   | Description                                                  |
| ---------- | --------------------------- | --------- | -------------------------------------------------------------- |
| `align`    | `"start" \| "end"`         | `"start"` | The alignment of the message in the conversation.             |
| `as`       | `PrimitiveProps["as"]`     | `"div"`   | Element or component to render.                               |
| `as-child` | `boolean`                   | `false`   | Render the default slot as the root and merge props onto it. |
| `class`    | `HTMLAttributes["class"]`  | -         | Additional classes to apply to the row.                        |

### MessageGroup

Groups consecutive messages from the same sender.

| Prop       | Type                       | Default | Description                                                  |
| ---------- | --------------------------- | ------- | -------------------------------------------------------------- |
| `as`       | `PrimitiveProps["as"]`     | `"div"` | Element or component to render.                               |
| `as-child` | `boolean`                   | `false` | Render the default slot as the root and merge props onto it. |
| `class`    | `HTMLAttributes["class"]`  | -       | Additional classes to apply to the group root.                 |

### MessageAvatar

The avatar slot, aligned to the bottom of the message. When the message has a `UiMessageFooter`, the avatar shifts up to stay aligned with the message surface instead of the footer.

| Prop       | Type                       | Default | Description                                                  |
| ---------- | --------------------------- | ------- | -------------------------------------------------------------- |
| `as`       | `PrimitiveProps["as"]`     | `"div"` | Element or component to render.                               |
| `as-child` | `boolean`                   | `false` | Render the default slot as the root and merge props onto it. |
| `class`    | `HTMLAttributes["class"]`  | -       | Additional classes to apply to the avatar wrapper.             |

### MessageContent

Wraps the header, message surface, and footer.

| Prop       | Type                       | Default | Description                                                  |
| ---------- | --------------------------- | ------- | -------------------------------------------------------------- |
| `as`       | `PrimitiveProps["as"]`     | `"div"` | Element or component to render.                               |
| `as-child` | `boolean`                   | `false` | Render the default slot as the root and merge props onto it. |
| `class`    | `HTMLAttributes["class"]`  | -       | Additional classes to apply to the content wrapper.            |

### MessageHeader

Displays content above the message, such as a sender name. Aligns to the message side.

| Prop       | Type                       | Default | Description                                                  |
| ---------- | --------------------------- | ------- | -------------------------------------------------------------- |
| `as`       | `PrimitiveProps["as"]`     | `"div"` | Element or component to render.                               |
| `as-child` | `boolean`                   | `false` | Render the default slot as the root and merge props onto it. |
| `class`    | `HTMLAttributes["class"]`  | -       | Additional classes to apply to the header.                     |

### MessageFooter

Displays content below the message, such as status or actions. Aligns to the message side.

| Prop       | Type                       | Default | Description                                                  |
| ---------- | --------------------------- | ------- | -------------------------------------------------------------- |
| `as`       | `PrimitiveProps["as"]`     | `"div"` | Element or component to render.                               |
| `as-child` | `boolean`                   | `false` | Render the default slot as the root and merge props onto it. |
| `class`    | `HTMLAttributes["class"]`  | -       | Additional classes to apply to the footer.                     |
