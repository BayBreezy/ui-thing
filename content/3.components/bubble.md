---
title: Bubble
description: Displays conversational content in a message bubble. Supports variants, alignment, grouping, reactions, and collapsible content.
label: New
---

## Source code

Click :SourceCodeLink{component="Bubble"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add bubble"}

## Usage

The `Bubble` component displays framed conversational content. Use it for chat text, short structured output, quoted replies, suggestions, and reactions.

For full-featured chat interfaces, place avatars, names, timestamps, metadata, and message-level actions in the surrounding container. `Bubble` is intentionally scoped to the bubble surface.

::prose-show-case

:DocsBubbleDemo

#code

<!-- automd:file src="../../app/components/content/Docs/Bubble/DocsBubbleDemo.vue" code lang="vue" -->

```vue [DocsBubbleDemo.vue]
<template>
  <div class="mx-auto flex w-full max-w-sm flex-col gap-8 py-12">
    <UiBubble align="end">
      <UiBubbleContent>Hey there! what&apos;s up?</UiBubbleContent>
    </UiBubble>
    <UiBubbleGroup>
      <UiBubble variant="muted">
        <UiBubbleContent>Hey! Want to see chat bubbles?</UiBubbleContent>
      </UiBubble>
      <UiBubble variant="muted">
        <UiBubbleContent>
          I can group messages, switch sides, and keep the whole thread easy to scan.
        </UiBubbleContent>
        <UiBubbleReactions role="img" aria-label="Reaction: thumbs up">
          <span>👍</span>
        </UiBubbleReactions>
      </UiBubble>
    </UiBubbleGroup>
    <UiBubble align="end">
      <UiBubbleContent>Sure. Hit me with your best demo.</UiBubbleContent>
    </UiBubble>
    <UiBubble variant="muted">
      <UiBubbleContent>
        Yes. You are reading a demo that is demoing itself. Very meta. Very on-brand.
      </UiBubbleContent>
      <UiBubbleReactions role="img" aria-label="Reactions: thumbs up, fire, eyes, and 2 more">
        <span>👍</span>
        <span>🔥</span>
        <span>👀</span>
        <span>+2</span>
      </UiBubbleReactions>
    </UiBubble>
  </div>
</template>

<script lang="ts" setup></script>
```

<!-- /automd -->

::

## Anatomy

```vue [Bubble Anatomy.vue] lines
<template>
  <UiBubbleGroup>
    <UiBubble>
      <UiBubbleContent />
      <UiBubbleReactions />
    </UiBubble>
    <UiBubble>
      <UiBubbleContent />
    </UiBubble>
  </UiBubbleGroup>
</template>
```

Use `UiBubbleGroup` to group consecutive bubbles from the same sender. Set `align` on each `UiBubble`, not on the group.

## Features

- Seven visual variants, from a strong primary bubble to unframed ghost content
- Start and end alignment for sender and receiver bubbles
- Reactions that anchor to the bubble edge with configurable side and alignment
- Bubbles size to their content, up to 80% of the container width
- Polymorphic content via `as` or `as-child` for link and button bubbles
- Every part renders through `Primitive`, so `as` / `as-child` and Vue `class` overrides work on any part

## Examples

### Variants

Use `variant` to change the visual treatment of the bubble.

::prose-show-case

:DocsBubbleVariantsDemo

#code

<!-- automd:file src="../../app/components/content/Docs/Bubble/DocsBubbleVariantsDemo.vue" code lang="vue" -->

```vue [DocsBubbleVariantsDemo.vue]
<template>
  <div class="mx-auto flex w-full max-w-sm flex-col gap-12 py-12">
    <UiBubble>
      <UiBubbleContent>This is the default primary bubble.</UiBubbleContent>
    </UiBubble>
    <UiBubble variant="secondary" align="end">
      <UiBubbleContent>This is the secondary variant.</UiBubbleContent>
    </UiBubble>
    <UiBubble variant="muted">
      <UiBubbleContent>
        This one is muted. It uses a lower emphasis color for the chat bubble.
      </UiBubbleContent>
      <UiBubbleReactions role="img" aria-label="Reaction: thumbs up">
        <span>👍</span>
      </UiBubbleReactions>
    </UiBubble>
    <UiBubble variant="tinted" align="end">
      <UiBubbleContent>
        This one is tinted. The tint is a softer color derived from the primary color.
      </UiBubbleContent>
    </UiBubble>
    <UiBubble variant="outline">
      <UiBubbleContent>We can also use an outlined variant.</UiBubbleContent>
    </UiBubble>
    <UiBubble variant="destructive" align="end">
      <UiBubbleContent>Or a destructive variant with a reaction.</UiBubbleContent>
      <UiBubbleReactions role="img" aria-label="Reaction: fire">
        <span>🔥</span>
      </UiBubbleReactions>
    </UiBubble>
    <UiBubble variant="ghost">
      <UiBubbleContent>
        Ghost bubbles work for assistant text, <b>markdown</b>, and other content that should not be
        framed. This is perfect for assistant messages that should not have a frame and can take the
        full width of the container. You can also render <code>code</code> in it. Ghost bubbles are
        full width and can take the full width of the container.
      </UiBubbleContent>
    </UiBubble>
  </div>
</template>

<script lang="ts" setup></script>
```

<!-- /automd -->

::

A bubble sizes to its content, up to 80% of the container width. The `ghost` variant removes the max-width so assistant text and rich content can span the full row.

| Variant       | Description                                            |
| ------------- | ------------------------------------------------------- |
| `default`     | A strong primary bubble, usually for the current user. |
| `secondary`   | The standard neutral bubble for conversation content.  |
| `muted`       | A lower-emphasis bubble for quiet supporting content.  |
| `tinted`      | A subtle primary-tinted bubble.                        |
| `outline`     | A bordered bubble for secondary or rich content.       |
| `ghost`       | Unframed content for assistant text or rich content.   |
| `destructive` | A destructive bubble for error or failed actions.      |

### Alignment

Use `align` on `UiBubble` to align the bubble to the start or end of the conversation.

::prose-show-case

:DocsBubbleAlignmentDemo

#code

<!-- automd:file src="../../app/components/content/Docs/Bubble/DocsBubbleAlignmentDemo.vue" code lang="vue" -->

```vue [DocsBubbleAlignmentDemo.vue]
<template>
  <div class="mx-auto flex w-full max-w-sm flex-col gap-8 py-12">
    <UiBubble variant="muted">
      <UiBubbleContent>
        This bubble is aligned to the start. This is the default alignment.
      </UiBubbleContent>
    </UiBubble>
    <UiBubble align="end">
      <UiBubbleContent>
        This bubble is aligned to the end. Use this for user messages.
      </UiBubbleContent>
    </UiBubble>
  </div>
</template>

<script lang="ts" setup></script>
```

<!-- /automd -->

::

| align   | Description                                        |
| ------- | ---------------------------------------------------- |
| `start` | Align the bubble to the start of the conversation. |
| `end`   | Align the bubble to the end of the conversation.   |

### Bubble Group

Use `UiBubbleGroup` to group consecutive bubbles from the same sender. Note the `align` prop should be set on the `UiBubble` component itself, not the `UiBubbleGroup` component.

::prose-show-case

:DocsBubbleGroupDemo

#code

<!-- automd:file src="../../app/components/content/Docs/Bubble/DocsBubbleGroupDemo.vue" code lang="vue" -->

```vue [DocsBubbleGroupDemo.vue]
<template>
  <div class="mx-auto flex w-full max-w-sm flex-col gap-8 py-12">
    <UiBubble variant="muted">
      <UiBubbleContent>Can you tell me what&apos;s the issue?</UiBubbleContent>
    </UiBubble>
    <UiBubbleGroup>
      <UiBubble align="end">
        <UiBubbleContent>You tell me!</UiBubbleContent>
      </UiBubble>
      <UiBubble align="end">
        <UiBubbleContent>It worked yesterday. You broke it!</UiBubbleContent>
      </UiBubble>
      <UiBubble align="end">
        <UiBubbleContent>Find the bug and fix it.</UiBubbleContent>
        <UiBubbleReactions aria-label="Reactions: eyes" align="start">
          <span>👀</span>
        </UiBubbleReactions>
      </UiBubble>
    </UiBubbleGroup>
    <UiBubble variant="muted">
      <UiBubbleContent>
        Want me to diff yesterday&apos;s you against today&apos;s you? It&apos;s a bit embarrassing.
      </UiBubbleContent>
    </UiBubble>
  </div>
</template>

<script lang="ts" setup></script>
```

<!-- /automd -->

::

### Links and Buttons

Use `as-child` to merge `UiBubbleContent` styling and attributes onto a link or button passed through its default slot.

::prose-show-case

:DocsBubbleLinksAndButtonsDemo

#code

<!-- automd:file src="../../app/components/content/Docs/Bubble/DocsBubbleLinksAndButtonsDemo.vue" code lang="vue" -->

```vue [DocsBubbleLinksAndButtonsDemo.vue]
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
```

<!-- /automd -->

::

### Reactions

Use `UiBubbleReactions` for bubble reactions. You can use it to display reactions or quick action buttons. Use `side` and `align` to position the row — `side="top"` anchors it to the upper edge. Reactions overlap the bubble edge, so leave vertical space between rows — the examples below use a larger `gap` for this reason.

::prose-show-case

:DocsBubbleReactionsDemo

#code

<!-- automd:file src="../../app/components/content/Docs/Bubble/DocsBubbleReactionsDemo.vue" code lang="vue" -->

```vue [DocsBubbleReactionsDemo.vue]
<template>
  <div class="mx-auto flex w-full max-w-sm flex-col gap-12 py-12">
    <UiBubble variant="muted" align="end">
      <UiBubbleContent> I don&apos;t need tests, I know my code works. </UiBubbleContent>
      <UiBubbleReactions align="start" role="img" aria-label="Reactions: thumbs up, surprised">
        <span>👍</span>
        <span>😮</span>
      </UiBubbleReactions>
    </UiBubble>
    <UiBubble variant="muted">
      <UiBubbleContent>
        Bold. Fine I&apos;ll add some tests. I&apos;ll let you know when they&apos;re done.
      </UiBubbleContent>
      <UiBubbleReactions role="img" aria-label="Reactions: eyes, rocket, and 2 more">
        <span>👀</span>
        <span>🚀</span>
        <span>+2</span>
      </UiBubbleReactions>
    </UiBubble>
    <UiBubble variant="default" align="end">
      <UiBubbleContent>
        Tests passed on the first try. All 142 of them. Looking good!
      </UiBubbleContent>
      <UiBubbleReactions
        side="top"
        align="start"
        role="img"
        aria-label="Reactions: party popper, clapping hands"
      >
        <span>🎉</span>
        <span>👏</span>
      </UiBubbleReactions>
    </UiBubble>
    <UiBubble variant="destructive">
      <UiBubbleContent>Are you sure I can run this command?</UiBubbleContent>
      <UiBubbleReactions>
        <UiButton
          variant="ghost"
          size="sm"
          @click="() => useSonner.success('You clicked yes, running command...')"
        >
          Yes, run it
        </UiButton>
      </UiBubbleReactions>
    </UiBubble>
  </div>
</template>

<script lang="ts" setup></script>
```

<!-- /automd -->

::

### Show More / Collapsible

Long bubble content can be composed with [`Collapsible`](/components/collapsible) to allow for a show more or show less interaction. Use the `UiCollapsibleTrigger` component to trigger the collapsible content.

::prose-show-case

:DocsBubbleCollapsibleDemo

#code

<!-- automd:file src="../../app/components/content/Docs/Bubble/DocsBubbleCollapsibleDemo.vue" code lang="vue" -->

```vue [DocsBubbleCollapsibleDemo.vue]
<template>
  <div class="mx-auto flex w-full max-w-sm flex-col gap-8 py-12">
    <UiBubble variant="muted">
      <UiBubbleContent>How can I help you today?</UiBubbleContent>
    </UiBubble>

    <UiBubble variant="muted" align="end">
      <UiBubbleContent class="whitespace-pre-line">
        <UiCollapsible v-model:open="open">
          <div>{{ open || !isLong ? text : preview }}</div>
          <template v-if="isLong">
            <UiCollapsibleTrigger as-child>
              <UiButton variant="link" class="group/collapsible text-muted-foreground gap-1 p-0">
                {{ open ? "Show less" : "Show more" }}
                <Icon
                  name="lucide:chevron-down"
                  class="size-4 group-data-[state=open]/collapsible:rotate-180"
                />
              </UiButton>
            </UiCollapsibleTrigger>
          </template>
        </UiCollapsible>
      </UiBubbleContent>
    </UiBubble>
  </div>
</template>

<script lang="ts" setup>
  const text = `The accessibility review found two focus states that were visually too subtle in dark mode.

I checked the dialog, menu, and drawer paths because each one renders focusable controls inside a layered surface.

The dialog and drawer are fine. The menu needs the hover and focus tokens split so keyboard focus stays visible when the pointer is not involved.

I also recommend keeping the change in the style file instead of the primitive so the other themes can choose their own focus treatment later.`;

  const previewLength = 180;
  const open = ref(false);
  const preview = computed(() => `${text.slice(0, previewLength)}...`);
  const isLong = computed(() => text.length > previewLength);
</script>
```

<!-- /automd -->

::

### Tooltip

Wrap a bubble reaction in a [`Tooltip`](/components/tooltip) to reveal metadata on hover, such as when a message was read.

::prose-show-case

:DocsBubbleTooltipDemo

#code

<!-- automd:file src="../../app/components/content/Docs/Bubble/DocsBubbleTooltipDemo.vue" code lang="vue" -->

```vue [DocsBubbleTooltipDemo.vue]
<template>
  <div class="mx-auto flex w-full max-w-sm flex-col gap-4 py-12">
    <UiBubble variant="secondary">
      <UiBubbleContent>Did you remove the stale route?</UiBubbleContent>
    </UiBubble>
    <UiBubble align="end">
      <UiBubbleContent>Yes, removed it from the registry.</UiBubbleContent>
      <UiBubbleReactions>
        <UiTooltip>
          <UiTooltipTrigger as-child>
            <UiButton variant="ghost" size="icon-sm" class="rounded-full">
              <Icon name="lucide:check" />
            </UiButton>
          </UiTooltipTrigger>
          <UiTooltipContent>Read on Jan 5, 2026 at 4:32 PM</UiTooltipContent>
        </UiTooltip>
      </UiBubbleReactions>
    </UiBubble>
  </div>
</template>

<script lang="ts" setup></script>
```

<!-- /automd -->

::

### Popover

Pair a bubble reaction with a [`Popover`](/components/popover) to surface more information on demand, such as the full error message for a failed action.

::prose-show-case

:DocsBubblePopoverDemo

#code

<!-- automd:file src="../../app/components/content/Docs/Bubble/DocsBubblePopoverDemo.vue" code lang="vue" -->

```vue [DocsBubblePopoverDemo.vue]
<template>
  <div class="mx-auto flex w-full max-w-sm flex-col gap-4 py-12">
    <UiBubble align="end">
      <UiBubbleContent>Run the build script.</UiBubbleContent>
    </UiBubble>
    <UiBubble variant="destructive">
      <UiBubbleContent>Failed to run the command.</UiBubbleContent>
      <UiBubbleReactions>
        <UiPopover>
          <UiPopoverTrigger as-child>
            <UiButton
              variant="ghost"
              size="icon-sm"
              aria-label="Show error details"
              class="aria-expanded:text-destructive rounded-full"
            >
              <Icon name="lucide:info" />
            </UiButton>
          </UiPopoverTrigger>
          <UiPopoverContent>
            <div class="flex flex-col gap-1 text-sm">
              <div class="text-sm font-medium">Command failed with exit code 1</div>
              <div class="text-muted-foreground text-sm">
                ENOENT: no such file or directory, open pnpm-lock.yaml
              </div>
            </div>
          </UiPopoverContent>
        </UiPopover>
      </UiBubbleReactions>
    </UiBubble>
  </div>
</template>

<script lang="ts" setup></script>
```

<!-- /automd -->

::

## Accessibility

`UiBubble` renders the presentational message surface. Keep conversation-level semantics on the surrounding container and follow the guidelines below.

### Labeling Reactions

Reactions render as a row of emoji. A screen reader reads each glyph with no context, and counters like `+8` are announced as "plus eight". Group the row as a single image with a descriptive `aria-label` so it announces once. `role="img"` also hides the individual emoji from assistive tech, so no `aria-hidden` is needed.

```vue
<template>
  <UiBubbleReactions role="img" aria-label="Reactions: thumbs up, fire, and 8 more">
    <span>👍</span>
    <span>🔥</span>
    <span>+8</span>
  </UiBubbleReactions>
</template>
```

When reactions are interactive, render buttons instead and give icon-only buttons an `aria-label`.

```vue
<template>
  <UiBubbleReactions>
    <UiButton aria-label="Thumbs up" variant="secondary" size="icon-xs">
      <Icon name="lucide:thumbs-up" />
    </UiButton>
  </UiBubbleReactions>
</template>
```

### Interactive Bubbles

When a bubble is clickable, pass a real `<button>` or `<a>` through `UiBubbleContent` with `as-child` so it is focusable and exposes the correct role. `UiBubbleContent` ships a visible focus ring for interactive elements, and the accessible name comes from the bubble text. No extra label is needed.

```vue
<template>
  <UiBubble variant="muted" align="end">
    <UiBubbleContent as-child>
      <button type="button" @click="onReply">I forgot my password</button>
    </UiBubbleContent>
  </UiBubble>
</template>
```

### Meaning Beyond Color

Bubble variants signal role and tone with color. Pair them with text, alignment, or icons so meaning is not conveyed by color alone. For a `destructive` bubble, keep the error context in the message text rather than relying on the color treatment.

## API Reference

All Bubble parts render through `Primitive`. Use `as` to choose another element, or `as-child` to merge the component's attributes and styles onto the single element or component in its default slot.

### Bubble

The root bubble wrapper.

| Prop       | Type                                                                                        | Default     | Description                                                  |
| ---------- | -------------------------------------------------------------------------------------------- | ----------- | -------------------------------------------------------------- |
| `variant`  | `"default" \| "secondary" \| "muted" \| "tinted" \| "outline" \| "ghost" \| "destructive"` | `"default"` | The bubble visual treatment.                                  |
| `align`    | `"start" \| "end"`                                                                          | `"start"`   | The inline alignment of the bubble.                            |
| `as`       | `PrimitiveProps["as"]`                                                                       | `"div"`     | Element or component to render.                               |
| `as-child` | `boolean`                                                                                     | `false`     | Render the default slot as the root and merge props onto it. |
| `class`    | `HTMLAttributes["class"]`                                                                    | -           | Additional classes to apply to the root element.              |

### BubbleContent

The bubble content wrapper.

| Prop       | Type                       | Default | Description                                                  |
| ---------- | --------------------------- | ------- | -------------------------------------------------------------- |
| `as`       | `PrimitiveProps["as"]`     | `"div"` | Element or component to render.                               |
| `as-child` | `boolean`                   | `false` | Render the default slot as the root and merge props onto it. |
| `class`    | `HTMLAttributes["class"]`  | -       | Additional classes to apply to the content element.           |

### BubbleReactions

Displays overlapped reactions for a bubble.

| Prop       | Type                       | Default    | Description                                                  |
| ---------- | --------------------------- | ---------- | -------------------------------------------------------------- |
| `side`     | `"top" \| "bottom"`        | `"bottom"` | The side of the bubble to anchor the reactions.               |
| `align`    | `"start" \| "end"`         | `"end"`    | The inline alignment of the reactions.                        |
| `as`       | `PrimitiveProps["as"]`     | `"div"`    | Element or component to render.                               |
| `as-child` | `boolean`                   | `false`    | Render the default slot as the root and merge props onto it. |
| `class`    | `HTMLAttributes["class"]`  | -          | Additional classes to apply to the reaction row.               |

### BubbleGroup

Groups consecutive bubbles from the same sender.

| Prop       | Type                       | Default | Description                                                  |
| ---------- | --------------------------- | ------- | -------------------------------------------------------------- |
| `as`       | `PrimitiveProps["as"]`     | `"div"` | Element or component to render.                               |
| `as-child` | `boolean`                   | `false` | Render the default slot as the root and merge props onto it. |
| `class`    | `HTMLAttributes["class"]`  | -       | Additional classes to apply to the group root.                |
