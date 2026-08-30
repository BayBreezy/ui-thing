---
title: Marker
description: Displays an inline status, system note, bordered row, or labeled separator in a conversation.

---

## Source code

Click :SourceCodeLink{component="Marker"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add marker"}

## Usage

::prose-show-case

:DocsMarkerDemo

#code

<!-- automd:file src="../../app/components/content/Docs/Marker/DocsMarkerDemo.vue" code lang="vue" -->

```vue [DocsMarkerDemo.vue]
<template>
  <div class="flex w-full max-w-sm flex-col gap-8 py-12">
    <UiMarker>
      <UiMarkerIcon>
        <Icon name="lucide:git-branch" />
      </UiMarkerIcon>
      <UiMarkerContent>Switched to a new branch</UiMarkerContent>
    </UiMarker>
    <UiMarker role="status">
      <UiMarkerIcon>
        <Icon name="lucide:loader-circle" class="animate-spin" data-slot="spinner" />
      </UiMarkerIcon>
      <UiMarkerContent class="shimmer"> Thinking... </UiMarkerContent>
    </UiMarker>
    <UiMarker variant="separator">
      <UiMarkerContent>Conversation compacted</UiMarkerContent>
    </UiMarker>
    <UiMarker>
      <UiMarkerIcon>
        <Icon name="lucide:search" />
      </UiMarkerIcon>
      <UiMarkerContent>Explored 4 files</UiMarkerContent>
    </UiMarker>
  </div>
</template>

<script lang="ts" setup></script>
```

<!-- /automd -->

::

## Anatomy

```vue [Marker Anatomy.vue] lines
<template>
  <UiMarker>
    <UiMarkerIcon />
    <UiMarkerContent />
  </UiMarker>
</template>
```

## Features

- Inline marker, bordered row, and labeled separator variants
- Decorative icon slot that is hidden from assistive tech
- Polymorphic root via `as` or `as-child` for link and button markers
- Pairs with the [`shimmer`](/utilities/shimmer) utility for streaming status text
- Every part renders through `Primitive`, so `as` / `as-child` and Vue `class` overrides work on any part

## Examples

### Variants

Use `variant` to switch between an inline marker, bordered row, and labeled separator.

::prose-show-case

:DocsMarkerVariantsDemo

#code

<!-- automd:file src="../../app/components/content/Docs/Marker/DocsMarkerVariantsDemo.vue" code lang="vue" -->

```vue [DocsMarkerVariantsDemo.vue]
<template>
  <div class="flex w-full max-w-sm flex-col gap-8 py-12">
    <UiMarker>
      <UiMarkerContent>A default marker for inline notes.</UiMarkerContent>
    </UiMarker>
    <UiMarker variant="separator">
      <UiMarkerContent>A separator marker</UiMarkerContent>
    </UiMarker>
    <UiMarker variant="border">
      <UiMarkerContent>A border marker for row boundaries.</UiMarkerContent>
    </UiMarker>
  </div>
</template>

<script lang="ts" setup></script>
```

<!-- /automd -->

::

| Variant     | Description                                            |
| ----------- | -------------------------------------------------------- |
| `default`   | An inline marker for status, notes, and actions.       |
| `border`    | A default marker with a bottom border under the row. |
| `separator` | A centered label with divider lines on each side.      |

### Status

Set `role="status"` and include a loading icon for streaming or in-progress markers so updates are announced.

::prose-show-case

:DocsMarkerStatusDemo

#code

<!-- automd:file src="../../app/components/content/Docs/Marker/DocsMarkerStatusDemo.vue" code lang="vue" -->

```vue [DocsMarkerStatusDemo.vue]
<template>
  <div class="flex w-full max-w-sm flex-col gap-8 py-12">
    <UiMarker role="status">
      <UiMarkerIcon>
        <Icon name="lucide:loader-circle" class="animate-spin" data-slot="spinner" />
      </UiMarkerIcon>
      <UiMarkerContent>Compacting conversation</UiMarkerContent>
    </UiMarker>
    <UiMarker variant="separator" role="status">
      <UiMarkerIcon>
        <Icon name="lucide:loader-circle" class="animate-spin" data-slot="spinner" />
      </UiMarkerIcon>
      <UiMarkerContent>Running tests</UiMarkerContent>
    </UiMarker>
  </div>
</template>

<script lang="ts" setup></script>
```

<!-- /automd -->

::

### Shimmer

Add the [`shimmer`](/utilities/shimmer) utility class to `UiMarkerContent` for an animated streaming-text effect.

::prose-show-case

:DocsMarkerShimmerDemo

#code

<!-- automd:file src="../../app/components/content/Docs/Marker/DocsMarkerShimmerDemo.vue" code lang="vue" -->

```vue [DocsMarkerShimmerDemo.vue]
<template>
  <div class="flex w-full max-w-sm flex-col gap-8 py-12">
    <UiMarker role="status">
      <UiMarkerContent class="shimmer"> Thinking... </UiMarkerContent>
    </UiMarker>
    <UiMarker variant="separator" role="status">
      <UiMarkerContent class="shimmer"> Reading 4 files </UiMarkerContent>
    </UiMarker>
  </div>
</template>

<script lang="ts" setup></script>
```

<!-- /automd -->

::

### Separator

Use the `separator` variant for labeled dividers, such as dates or section breaks, in a conversation.

::prose-show-case

:DocsMarkerSeparatorDemo

#code

<!-- automd:file src="../../app/components/content/Docs/Marker/DocsMarkerSeparatorDemo.vue" code lang="vue" -->

```vue [DocsMarkerSeparatorDemo.vue]
<template>
  <div class="flex w-full max-w-sm flex-col gap-8 py-12">
    <UiMarker variant="separator">
      <UiMarkerContent>Today</UiMarkerContent>
    </UiMarker>
    <UiMarker variant="separator">
      <UiMarkerContent>Worked for 42s</UiMarkerContent>
    </UiMarker>
    <UiMarker variant="separator">
      <UiMarkerContent>Conversation compacted</UiMarkerContent>
    </UiMarker>
  </div>
</template>

<script lang="ts" setup></script>
```

<!-- /automd -->

::

### Border

Use the `border` variant for status rows that should keep the default marker alignment while separating the next row.

::prose-show-case

:DocsMarkerBorderDemo

#code

<!-- automd:file src="../../app/components/content/Docs/Marker/DocsMarkerBorderDemo.vue" code lang="vue" -->

```vue [DocsMarkerBorderDemo.vue]
<template>
  <div class="flex w-full max-w-sm flex-col gap-3 py-12">
    <UiMarker variant="border">
      <UiMarkerIcon>
        <Icon name="lucide:git-branch" />
      </UiMarkerIcon>
      <UiMarkerContent>Switched to release-candidate</UiMarkerContent>
    </UiMarker>
    <UiMarker variant="border">
      <UiMarkerIcon>
        <Icon name="lucide:search" />
      </UiMarkerIcon>
      <UiMarkerContent>Reviewed 8 related files</UiMarkerContent>
    </UiMarker>
    <UiMarker variant="border">
      <UiMarkerIcon>
        <Icon name="lucide:file-text" />
      </UiMarkerIcon>
      <UiMarkerContent>Opened implementation notes</UiMarkerContent>
    </UiMarker>
  </div>
</template>

<script lang="ts" setup></script>
```

<!-- /automd -->

::

### With Icon

Use `UiMarkerIcon` to render an icon alongside the content. Use `flex-col` to stack the icon above the content.

::prose-show-case

:DocsMarkerIconDemo

#code

<!-- automd:file src="../../app/components/content/Docs/Marker/DocsMarkerIconDemo.vue" code lang="vue" -->

```vue [DocsMarkerIconDemo.vue]
<template>
  <div class="flex w-full max-w-sm flex-col gap-12 py-12">
    <UiMarker>
      <UiMarkerIcon>
        <Icon name="lucide:git-branch" />
      </UiMarkerIcon>
      <UiMarkerContent>Switched to a new branch</UiMarkerContent>
    </UiMarker>
    <UiMarker variant="separator">
      <UiMarkerIcon>
        <Icon name="lucide:search" />
      </UiMarkerIcon>
      <UiMarkerContent>Explored 4 files</UiMarkerContent>
    </UiMarker>
    <UiMarker class="flex-col">
      <UiMarkerIcon>
        <Icon name="lucide:book-open-check" />
      </UiMarkerIcon>
      <UiMarkerContent>Syncing completed</UiMarkerContent>
    </UiMarker>
  </div>
</template>

<script lang="ts" setup></script>
```

<!-- /automd -->

::

### Links and Buttons

Turn a marker into a link or button with the `as-child` prop on `UiMarker`.

::prose-show-case

:DocsMarkerLinkButtonDemo

#code

<!-- automd:file src="../../app/components/content/Docs/Marker/DocsMarkerLinkButtonDemo.vue" code lang="vue" -->

```vue [DocsMarkerLinkButtonDemo.vue]
<template>
  <div class="flex w-full max-w-sm flex-col gap-8 py-12">
    <UiMarker as-child>
      <a href="#links-and-buttons">
        <UiMarkerIcon>
          <Icon name="lucide:git-branch" />
        </UiMarkerIcon>
        <UiMarkerContent>View the pull request</UiMarkerContent>
      </a>
    </UiMarker>
    <UiMarker as-child>
      <button
        type="button"
        class="hover:text-foreground transition-colors"
        @click="() => useSonner('You clicked the revert button')"
      >
        <UiMarkerIcon>
          <Icon name="lucide:rotate-ccw" />
        </UiMarkerIcon>
        <UiMarkerContent>Revert this change</UiMarkerContent>
      </button>
    </UiMarker>
  </div>
</template>

<script lang="ts" setup></script>
```

<!-- /automd -->

::

## Accessibility

`Marker` is presentational by default. The correct semantics depend on how you use it, so choose the role based on intent rather than relying on a single default.

### Status and Progress

For streaming or progress markers such as "Thinking..." or a running tool, set `role="status"` so assistive tech announces the update as it appears. `UiMarker` forwards `role` to the underlying element.

```vue
<template>
  <UiMarker role="status">
    <UiMarkerIcon>
      <Icon name="lucide:loader-circle" class="animate-spin" />
    </UiMarkerIcon>
    <UiMarkerContent>Compacting conversation</UiMarkerContent>
  </UiMarker>
</template>
```

### Labeled Separators

A separator that carries text, such as a date or a section label, needs no role. The divider lines are decorative CSS pseudo-elements, and the text is announced as ordinary content.

```vue
<template>
  <UiMarker variant="separator">
    <UiMarkerContent>Today</UiMarkerContent>
  </UiMarker>
</template>
```

::callout
**Note:** Do not add `role="separator"` to a labeled divider. A separator takes its accessible name from `aria-label`, not from its text, and its contents are treated as presentational, so the visible label would not be announced. Reserve `role="separator"` for a divider with no meaningful text.
::

### Bordered Markers

A bordered marker keeps the same semantics as the default marker. The bottom border is decorative, so choose `role="status"`, `as-child`, or no role based on the marker's purpose.

```vue
<template>
  <UiMarker variant="border">
    <UiMarkerIcon>
      <Icon name="lucide:file-text" />
    </UiMarkerIcon>
    <UiMarkerContent>Opened implementation notes</UiMarkerContent>
  </UiMarker>
</template>
```

### Decorative Icons

`UiMarkerIcon` is decorative and hidden from assistive tech with `aria-hidden`, so the adjacent `UiMarkerContent` carries the meaning. For an icon-only marker, provide an `aria-label` or visible text so it is not announced as empty.

```vue
<template>
  <UiMarker aria-label="Synced">
    <UiMarkerIcon>
      <Icon name="lucide:check" />
    </UiMarkerIcon>
  </UiMarker>
</template>
```

### Interactive Markers

When a marker links or triggers an action, render it as a real `<button>` or `<a>` with the `as-child` prop so it is focusable and exposes the correct role. The accessible name comes from the marker text.

```vue
<template>
  <UiMarker as-child>
    <a href="/files">
      <UiMarkerIcon>
        <Icon name="lucide:file-text" />
      </UiMarkerIcon>
      <UiMarkerContent>Explored 4 files</UiMarkerContent>
    </a>
  </UiMarker>
</template>
```

## API Reference

All Marker parts render through `Primitive`. Use `as` to choose another element, or `as-child` to merge the component's attributes and styles onto the single element or component in its default slot.

### Marker

The root marker element.

| Prop       | Type                                    | Default     | Description                                                  |
| ---------- | ----------------------------------------- | ----------- | -------------------------------------------------------------- |
| `variant`  | `"default" \| "border" \| "separator"` | `"default"` | The marker layout.                                            |
| `as`       | `PrimitiveProps["as"]`                  | `"div"`     | Element or component to render.                               |
| `as-child` | `boolean`                                | `false`     | Render the default slot as the root and merge props onto it. |
| `class`    | `HTMLAttributes["class"]`               | -           | Additional classes to apply to the root element.              |

### MarkerIcon

A decorative icon slot. Hidden from assistive tech with `aria-hidden`.

| Prop       | Type                       | Default  | Description                                                  |
| ---------- | --------------------------- | -------- | -------------------------------------------------------------- |
| `as`       | `PrimitiveProps["as"]`     | `"span"` | Element or component to render.                              |
| `as-child` | `boolean`                   | `false`  | Render the default slot as the root and merge props onto it. |
| `class`    | `HTMLAttributes["class"]`  | -        | Additional classes to apply to the icon slot.                  |

### MarkerContent

The marker text content.

| Prop       | Type                       | Default  | Description                                                  |
| ---------- | --------------------------- | -------- | -------------------------------------------------------------- |
| `as`       | `PrimitiveProps["as"]`     | `"span"` | Element or component to render.                              |
| `as-child` | `boolean`                   | `false`  | Render the default slot as the root and merge props onto it. |
| `class`    | `HTMLAttributes["class"]`  | -        | Additional classes to apply to the content slot.               |
