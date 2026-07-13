---
title: Attachment
description: Displays a file or image attachment with media, metadata, upload state, and actions.
label: New
---

## Source code

Click :SourceCodeLink{component="Attachment"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add attachment"}

## Usage

The `Attachment` component displays a file or image attachment, its media, name, and metadata, with optional actions and upload state. Use it for files and images in chat composers, message threads, and upload lists.

::prose-show-case

:DocsAttachmentDemo

#code

<!-- automd:file src="../../app/components/content/Docs/Attachment/DocsAttachmentDemo.vue" code lang="vue" -->

```vue [DocsAttachmentDemo.vue]
<template>
  <div class="mx-auto flex w-full max-w-sm flex-col gap-3 py-12">
    <UiAttachmentGroup>
      <template v-for="image in images" :key="image.name">
        <UiAttachment orientation="vertical">
          <UiAttachmentMedia variant="image">
            <img :src="image.src" :alt="image.alt" />
          </UiAttachmentMedia>
          <UiAttachmentContent>
            <UiAttachmentTitle>{{ image.name }}</UiAttachmentTitle>
            <UiAttachmentDescription>{{ image.meta }}</UiAttachmentDescription>
          </UiAttachmentContent>
        </UiAttachment>
      </template>
    </UiAttachmentGroup>
    <UiAttachment state="uploading" class="w-full">
      <UiAttachmentMedia>
        <Icon name="lucide:loader-circle" class="animate-spin" data-slot="spinner" />
      </UiAttachmentMedia>
      <UiAttachmentContent>
        <UiAttachmentTitle>sales-dashboard.pdf</UiAttachmentTitle>
        <UiAttachmentDescription>Uploading · 64%</UiAttachmentDescription>
      </UiAttachmentContent>
      <UiAttachmentActions>
        <UiAttachmentAction aria-label="Cancel upload">
          <Icon name="lucide:x" />
        </UiAttachmentAction>
      </UiAttachmentActions>
    </UiAttachment>
    <UiAttachment class="w-full">
      <UiAttachmentMedia>
        <Icon name="lucide:file-code" />
      </UiAttachmentMedia>
      <UiAttachmentContent>
        <UiAttachmentTitle>message-renderer.vue</UiAttachmentTitle>
        <UiAttachmentDescription>TypeScript · 12 KB</UiAttachmentDescription>
      </UiAttachmentContent>
      <UiAttachmentActions>
        <UiAttachmentAction aria-label="Remove message-renderer.vue">
          <Icon name="lucide:x" />
        </UiAttachmentAction>
      </UiAttachmentActions>
    </UiAttachment>
  </div>
</template>

<script lang="ts" setup>
  const images = [
    {
      name: "workspace.png",
      meta: "PNG · 820 KB",
      src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80",
      alt: "Workspace",
    },
    {
      name: "desk-reference.jpg",
      meta: "JPG · 1.1 MB",
      src: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=900&auto=format&fit=crop&q=80",
      alt: "Desk",
    },
    {
      name: "office-reference.jpg",
      meta: "JPG · 940 KB",
      src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&auto=format&fit=crop&q=80",
      alt: "Office",
    },
  ];
</script>
```

<!-- /automd -->

::

## Anatomy

```vue [Attachment Anatomy.vue] lines
<template>
  <UiAttachmentGroup>
    <UiAttachment>
      <UiAttachmentMedia />
      <UiAttachmentContent>
        <UiAttachmentTitle />
        <UiAttachmentDescription />
      </UiAttachmentContent>
      <UiAttachmentActions>
        <UiAttachmentAction />
      </UiAttachmentActions>
      <UiAttachmentTrigger />
    </UiAttachment>
  </UiAttachmentGroup>
</template>
```

Wrap multiple attachments in `UiAttachmentGroup` to lay them out in a scrollable, snapping row.

## Features

- Icon and image media through `UiAttachmentMedia`
- Upload states: `idle`, `uploading`, `processing`, `error`, and `done` with built-in styling and a shimmer while in progress
- Three sizes and horizontal or vertical orientation
- A full-card `UiAttachmentTrigger` that opens a link or dialog while the actions stay independently clickable
- Scrollable, snapping `UiAttachmentGroup` with an edge fade
- Every part renders through `Primitive`, so `as` / `as-child` and Vue `class` overrides work on any part

## Examples

### Image

Set `variant="image"` on `UiAttachmentMedia` and render an `<img>` inside it. Use `orientation="vertical"` to stack the media above the content.

::prose-show-case

:DocsAttachmentImageDemo

#code

<!-- automd:file src="../../app/components/content/Docs/Attachment/DocsAttachmentImageDemo.vue" code lang="vue" -->

```vue [DocsAttachmentImageDemo.vue]
<template>
  <div class="mx-auto w-full max-w-sm py-12">
    <UiAttachmentGroup class="w-full">
      <template v-for="image in images" :key="image.name">
        <UiAttachment orientation="vertical">
          <UiAttachmentMedia variant="image">
            <img :src="image.src" :alt="image.alt" />
          </UiAttachmentMedia>
          <UiAttachmentContent>
            <UiAttachmentTitle>{{ image.name }}</UiAttachmentTitle>
            <UiAttachmentDescription>{{ image.meta }}</UiAttachmentDescription>
          </UiAttachmentContent>
          <UiAttachmentActions>
            <UiAttachmentAction :aria-label="`Remove ${image.name}`">
              <Icon name="lucide:x" />
            </UiAttachmentAction>
          </UiAttachmentActions>
          <UiAttachmentTrigger as-child>
            <a
              :href="image.src"
              target="_blank"
              rel="noreferrer"
              :aria-label="`Open ${image.name}`"
            />
          </UiAttachmentTrigger>
        </UiAttachment>
      </template>
    </UiAttachmentGroup>
  </div>
</template>

<script lang="ts" setup>
  const images = [
    {
      name: "workspace.png",
      meta: "PNG · 820 KB",
      src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80",
      alt: "Workspace",
    },
    {
      name: "desk-reference.jpg",
      meta: "JPG · 1.1 MB",
      src: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=900&auto=format&fit=crop&q=80",
      alt: "Desk",
    },
    {
      name: "office-reference.jpg",
      meta: "JPG · 940 KB",
      src: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=900&auto=format&fit=crop&q=80",
      alt: "Office",
    },
  ];
</script>
```

<!-- /automd -->

::

### States

Set `state` to reflect the upload lifecycle. `uploading` and `processing` shimmer the title, and `error` switches to a destructive treatment.

::prose-show-case

:DocsAttachmentStatesDemo

#code

<!-- automd:file src="../../app/components/content/Docs/Attachment/DocsAttachmentStatesDemo.vue" code lang="vue" -->

```vue [DocsAttachmentStatesDemo.vue]
<template>
  <div class="mx-auto flex w-full max-w-sm flex-col gap-2 py-12">
    <UiAttachment state="idle" class="w-full">
      <UiAttachmentMedia>
        <Icon name="lucide:clock" />
      </UiAttachmentMedia>
      <UiAttachmentContent>
        <UiAttachmentTitle>selected-file.pdf</UiAttachmentTitle>
        <UiAttachmentDescription>Ready to upload</UiAttachmentDescription>
      </UiAttachmentContent>
      <UiAttachmentActions>
        <UiAttachmentAction aria-label="Remove selected-file.pdf">
          <Icon name="lucide:x" />
        </UiAttachmentAction>
      </UiAttachmentActions>
    </UiAttachment>
    <UiAttachment state="uploading" class="w-full">
      <UiAttachmentMedia>
        <Icon name="lucide:loader-circle" class="animate-spin" data-slot="spinner" />
      </UiAttachmentMedia>
      <UiAttachmentContent>
        <UiAttachmentTitle>design-system.zip</UiAttachmentTitle>
        <UiAttachmentDescription>Uploading · 64%</UiAttachmentDescription>
      </UiAttachmentContent>
      <UiAttachmentActions>
        <UiAttachmentAction aria-label="Cancel upload">
          <Icon name="lucide:x" />
        </UiAttachmentAction>
      </UiAttachmentActions>
    </UiAttachment>
    <UiAttachment state="processing" class="w-full">
      <UiAttachmentMedia>
        <Icon name="lucide:file-text" />
      </UiAttachmentMedia>
      <UiAttachmentContent>
        <UiAttachmentTitle>market-research.pdf</UiAttachmentTitle>
        <UiAttachmentDescription>Processing document</UiAttachmentDescription>
      </UiAttachmentContent>
      <UiAttachmentActions>
        <UiAttachmentAction aria-label="Remove market-research.pdf">
          <Icon name="lucide:x" />
        </UiAttachmentAction>
      </UiAttachmentActions>
    </UiAttachment>
    <UiAttachment state="error" class="w-full">
      <UiAttachmentMedia>
        <Icon name="lucide:file-warning" />
      </UiAttachmentMedia>
      <UiAttachmentContent>
        <UiAttachmentTitle>financial-model.xlsx</UiAttachmentTitle>
        <UiAttachmentDescription> Upload failed. Try again. </UiAttachmentDescription>
      </UiAttachmentContent>
      <UiAttachmentActions>
        <UiAttachmentAction aria-label="Retry upload">
          <Icon name="lucide:refresh-cw" />
        </UiAttachmentAction>
        <UiAttachmentAction aria-label="Remove financial-model.xlsx">
          <Icon name="lucide:x" />
        </UiAttachmentAction>
      </UiAttachmentActions>
    </UiAttachment>
    <UiAttachment state="done" class="w-full">
      <UiAttachmentMedia>
        <Icon name="lucide:check" />
      </UiAttachmentMedia>
      <UiAttachmentContent>
        <UiAttachmentTitle>uploaded-report.pdf</UiAttachmentTitle>
        <UiAttachmentDescription>Uploaded · 1.8 MB</UiAttachmentDescription>
      </UiAttachmentContent>
      <UiAttachmentActions>
        <UiAttachmentAction aria-label="Remove uploaded-report.pdf">
          <Icon name="lucide:x" />
        </UiAttachmentAction>
      </UiAttachmentActions>
    </UiAttachment>
  </div>
</template>

<script lang="ts" setup></script>
```

<!-- /automd -->

::

### Sizes

Use `size` to switch between `default`, `sm`, and `xs`.

::prose-show-case

:DocsAttachmentSizesDemo

#code

<!-- automd:file src="../../app/components/content/Docs/Attachment/DocsAttachmentSizesDemo.vue" code lang="vue" -->

```vue [DocsAttachmentSizesDemo.vue]
<template>
  <div class="mx-auto flex w-full max-w-sm flex-col gap-3 py-12">
    <UiAttachment size="default" class="w-full">
      <UiAttachmentMedia>
        <Icon name="lucide:file-text" />
      </UiAttachmentMedia>
      <UiAttachmentContent>
        <UiAttachmentTitle>Default attachment</UiAttachmentTitle>
        <UiAttachmentDescription>PDF · 2.4 MB</UiAttachmentDescription>
      </UiAttachmentContent>
    </UiAttachment>
    <UiAttachment size="sm" class="w-full">
      <UiAttachmentMedia>
        <Icon name="lucide:file-text" />
      </UiAttachmentMedia>
      <UiAttachmentContent>
        <UiAttachmentTitle>Small attachment</UiAttachmentTitle>
        <UiAttachmentDescription>PDF · 2.4 MB</UiAttachmentDescription>
      </UiAttachmentContent>
    </UiAttachment>
    <UiAttachment size="xs" class="w-full">
      <UiAttachmentMedia>
        <Icon name="lucide:file-text" />
      </UiAttachmentMedia>
      <UiAttachmentContent>
        <UiAttachmentTitle>Extra small attachment</UiAttachmentTitle>
      </UiAttachmentContent>
    </UiAttachment>
  </div>
</template>

<script lang="ts" setup></script>
```

<!-- /automd -->

::

### Group

Wrap attachments in `UiAttachmentGroup` to lay them out in a horizontally scrollable, snapping row with an edge fade.

::prose-show-case

:DocsAttachmentGroupDemo

#code

<!-- automd:file src="../../app/components/content/Docs/Attachment/DocsAttachmentGroupDemo.vue" code lang="vue" -->

```vue [DocsAttachmentGroupDemo.vue]
<template>
  <div class="mx-auto w-full max-w-sm py-12">
    <UiAttachmentGroup class="w-full">
      <template v-for="item in items" :key="item.name">
        <UiAttachment class="w-64">
          <UiAttachmentMedia v-if="item.src" variant="image">
            <img :src="item.src" :alt="item.name" />
          </UiAttachmentMedia>

          <UiAttachmentMedia v-if="item.icon">
            <Icon :name="item.icon" />
          </UiAttachmentMedia>

          <UiAttachmentContent>
            <UiAttachmentTitle>{{ item.name }}</UiAttachmentTitle>
            <UiAttachmentDescription>{{ item.meta }}</UiAttachmentDescription>
          </UiAttachmentContent>
          <UiAttachmentActions>
            <UiAttachmentAction :aria-label="`Remove ${item.name}`">
              <Icon name="lucide:x" />
            </UiAttachmentAction>
          </UiAttachmentActions>
        </UiAttachment>
      </template>
    </UiAttachmentGroup>
  </div>
</template>

<script lang="ts" setup>
  interface Item {
    name: string;
    meta: string;
    icon?: string;
    src?: string;
  }

  const items: Item[] = [
    { name: "briefing-notes.pdf", meta: "PDF · 1.4 MB", icon: "lucide:file-text" },
    {
      name: "workspace.png",
      meta: "PNG · 820 KB",
      src: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=900&auto=format&fit=crop&q=80",
    },
    { name: "customers.csv", meta: "CSV · 18 KB", icon: "lucide:table" },
    { name: "renderer.vue", meta: "Vue · 12 KB", icon: "lucide:file-code" },
  ];
</script>
```

<!-- /automd -->

::

### Trigger

Add an `UiAttachmentTrigger` to make the whole card open a link or dialog. It fills the card behind the actions, so the actions stay clickable.

::prose-show-case

:DocsAttachmentTriggerDemo

#code

<!-- automd:file src="../../app/components/content/Docs/Attachment/DocsAttachmentTriggerDemo.vue" code lang="vue" -->

```vue [DocsAttachmentTriggerDemo.vue]
<template>
  <div class="mx-auto w-full max-w-sm py-12">
    <UiDialog>
      <UiAttachment class="w-full">
        <UiAttachmentMedia>
          <Icon name="lucide:file-search" />
        </UiAttachmentMedia>
        <UiAttachmentContent>
          <UiAttachmentTitle>research-summary.pdf</UiAttachmentTitle>
          <UiAttachmentDescription>Open preview dialog</UiAttachmentDescription>
        </UiAttachmentContent>
        <UiAttachmentActions>
          <UiAttachmentAction aria-label="Copy link">
            <Icon name="lucide:copy" />
          </UiAttachmentAction>
          <UiAttachmentAction aria-label="Remove research-summary.pdf">
            <Icon name="lucide:x" />
          </UiAttachmentAction>
        </UiAttachmentActions>
        <UiDialogTrigger as-child>
          <UiAttachmentTrigger aria-label="Preview research-summary.pdf" />
        </UiDialogTrigger>
      </UiAttachment>

      <UiDialogContent class="sm:max-w-md">
        <UiDialogHeader>
          <UiDialogTitle>research-summary.pdf</UiDialogTitle>
          <UiDialogDescription>
            The attachment trigger fills the card and opens the dialog, while the actions stay
            independently clickable above it.
          </UiDialogDescription>
        </UiDialogHeader>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script lang="ts" setup></script>
```

<!-- /automd -->

::

## Accessibility

`UiAttachmentAction` renders a [`Button`](/docs/components/button), and `UiAttachmentTrigger` renders a real `<button>` (or your element via `as-child`). Follow the guidance below so both are operable and announced.

### Label icon-only actions

`UiAttachmentAction` is usually icon-only, so give each one an `aria-label` describing the action and its target.

```vue
<template>
  <UiAttachmentAction aria-label="Remove sales-dashboard.pdf">
    <Icon name="lucide:x" />
  </UiAttachmentAction>
</template>
```

### Label the trigger

`UiAttachmentTrigger` covers the card with no text of its own, so give it an `aria-label` for what activating it does.

```vue
<template>
  <UiAttachmentTrigger as-child>
    <a :href="url" target="_blank" rel="noreferrer" aria-label="Open workspace.png" />
  </UiAttachmentTrigger>
</template>
```

The trigger sits behind the actions in the stacking order, so an `UiAttachmentAction` and the `UiAttachmentTrigger` never trap each other — both remain separately focusable and clickable.

### Keyboard scrolling

An `UiAttachmentGroup` scrolls horizontally. When its attachments are interactive: a trigger or actions, keyboard users reach off-screen items by tabbing to them. For a row of presentational attachments, make the group itself focusable and scrollable by adding `tabindex="0"`, `role="group"`, and an `aria-label`.

### Meaning beyond color

The `error` state uses a destructive color. Keep the failure reason in `UiAttachmentDescription` so the state is not conveyed by color alone.

## API Reference

### Attachment

The root attachment container.

| Prop          | Type                                                          | Default        | Description                                       |
| ------------- | -------------------------------------------------------------- | -------------- | -------------------------------------------------- |
| `state`       | `"idle" \| "uploading" \| "processing" \| "error" \| "done"`   | `"done"`       | The upload state. Drives styling and the shimmer. |
| `size`        | `"default" \| "sm" \| "xs"`                                     | `"default"`    | The attachment size.                              |
| `orientation` | `"horizontal" \| "vertical"`                                    | `"horizontal"` | Lay the media beside or above the content.        |
| `as`          | `PrimitiveProps["as"]`                                          | `"div"`        | Element or component to render.                   |
| `as-child`    | `boolean`                                                       | `false`        | Render as the child element.                      |
| `class`       | `HTMLAttributes["class"]`                                       | -              | Additional classes to apply to the root element.  |

### AttachmentMedia

The media slot for an icon or image preview.

| Prop      | Type                       | Default  | Description                                    |
| --------- | -------------------------- | -------- | ----------------------------------------------- |
| `variant` | `"icon" \| "image"`        | `"icon"` | Whether the media holds an icon or an `<img>`. |
| `class`   | `HTMLAttributes["class"]`  | -        | Additional classes to apply to the media slot. |

### AttachmentContent

Wraps the title and description.

| Prop    | Type                       | Default | Description                                      |
| ------- | -------------------------- | ------- | -------------------------------------------------- |
| `class` | `HTMLAttributes["class"]`  | -       | Additional classes to apply to the content slot. |

### AttachmentTitle

The attachment name. Shimmers while the attachment is `uploading` or `processing`.

| Prop    | Type                       | Default | Description                                |
| ------- | -------------------------- | ------- | -------------------------------------------- |
| `class` | `HTMLAttributes["class"]`  | -       | Additional classes to apply to the title. |

### AttachmentDescription

Secondary metadata such as the file type, size, or upload status.

| Prop    | Type                       | Default | Description                                      |
| ------- | -------------------------- | ------- | -------------------------------------------------- |
| `class` | `HTMLAttributes["class"]`  | -       | Additional classes to apply to the description. |

### AttachmentActions

A container for one or more actions, aligned to the end of the attachment.

| Prop    | Type                       | Default | Description                                  |
| ------- | -------------------------- | ------- | ----------------------------------------------- |
| `class` | `HTMLAttributes["class"]`  | -       | Additional classes to apply to the actions. |

### AttachmentAction

An action button. Renders a [`Button`](/docs/components/button) and accepts Vue fallthrough attributes such as `aria-label`.

| Prop      | Type                          | Default     | Description                                |
| --------- | ------------------------------ | ----------- | --------------------------------------------- |
| `variant` | `ButtonVariants["variant"]`    | `"ghost"`   | The button variant.                        |
| `size`    | `ButtonVariants["size"]`       | `"icon-xs"` | The button size.                           |
| `class`   | `HTMLAttributes["class"]`      | -           | Additional classes to apply to the action. |

### AttachmentTrigger

A full-card overlay that activates the attachment. Renders a `<button>` by default and accepts Vue fallthrough attributes such as `aria-label`.

| Prop       | Type                       | Default    | Description                                   |
| ---------- | -------------------------- | ---------- | ------------------------------------------------ |
| `as`       | `PrimitiveProps["as"]`     | `"button"` | Element or component to render.               |
| `as-child` | `boolean`                  | `false`    | Render as the child element, such as a link. |
| `class`    | `HTMLAttributes["class"]`  | -          | Additional classes to apply to the trigger.   |

### AttachmentGroup

Lays out attachments in a horizontally scrollable, snapping row.

| Prop    | Type                       | Default | Description                                |
| ------- | -------------------------- | ------- | ---------------------------------------------- |
| `class` | `HTMLAttributes["class"]`  | -       | Additional classes to apply to the group.  |
