---
title: Icon
description: A versatile icon component that supports Iconify icons, emojis, and custom images with automatic detection.
links:
  - title: Iconify
    href: https://iconify.design/
    icon: "simple-icons:iconify"
  - title: Icon Sets
    href: https://icon-sets.iconify.design/
    icon: "lucide:search"
---

## Source code

Click :SourceCodeLink{component="Icon.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Anatomy

The Icon component automatically detects the type of icon you want to display and renders it appropriately.

```vue [Icon Anatomy.vue]
<template>
  <!-- Iconify Icon -->
  <UiIcon name="lucide:home" />

  <!-- Emoji -->
  <UiIcon name="🚀" />

  <!-- Image URL -->
  <UiIcon name="https://example.com/icon.png" />
</template>
```

## Installation

:prose-pm-x{command="ui-thing@latest add icon"}

## Usage

### Iconify Icons

The primary use case is displaying icons from Iconify's vast collection of icon sets. Simply use the format `collection:icon-name`.

::ShowCase

:DocsIcon

#code

```vue [DocsIcon.vue]
<template>
  <div class="flex items-center gap-4">
    <UiIcon name="lucide:home" :size="24" />
    <UiIcon name="heroicons:heart" :size="24" />
    <UiIcon name="mdi:github" :size="24" />
    <UiIcon name="tabler:settings" :size="24" />
    <UiIcon name="ri:notification-line" :size="24" />
  </div>
</template>
```

::

### Different Sizes

Control the size of icons using the `size` prop. It accepts both numbers (pixels) and strings.

::ShowCase

:DocsIconSizes

#code

```vue [DocsIconSizes.vue]
<template>
  <div class="flex items-center gap-4">
    <UiIcon name="lucide:star" :size="16" />
    <UiIcon name="lucide:star" :size="24" />
    <UiIcon name="lucide:star" :size="32" />
    <UiIcon name="lucide:star" :size="48" />
    <UiIcon name="lucide:star" :size="64" />
  </div>
</template>
```

::

### Emojis

The component automatically detects and renders emojis properly.

::ShowCase

:DocsIconEmoji

#code

```vue [DocsIconEmoji.vue]
<template>
  <div class="flex items-center gap-4">
    <UiIcon name="🚀" :size="24" />
    <UiIcon name="🎨" :size="24" />
    <UiIcon name="💻" :size="24" />
    <UiIcon name="🔥" :size="24" />
    <UiIcon name="✨" :size="24" />
    <UiIcon name="🎉" :size="24" />
  </div>
</template>
```

::

### Custom Images

You can also use custom image URLs. The component will render them as `<img>` tags.

::ShowCase

:DocsIconImage

#code

```vue [DocsIconImage.vue]
<template>
  <div class="flex items-center gap-4">
    <UiIcon name="https://i.pravatar.cc/150?img=1" :size="32" />
    <UiIcon name="https://i.pravatar.cc/150?img=5" :size="32" />
    <UiIcon name="https://i.pravatar.cc/150?img=8" :size="32" />
  </div>
</template>
```

::

### With Colors

Style icons using Tailwind classes. The component inherits color from the parent context.

::ShowCase

:DocsIconColors

#code

```vue [DocsIconColors.vue]
<template>
  <div class="flex items-center gap-4">
    <UiIcon name="lucide:heart" :size="32" class="text-red-500" />
    <UiIcon name="lucide:star" :size="32" class="text-yellow-500" />
    <UiIcon name="lucide:leaf" :size="32" class="text-green-500" />
    <UiIcon name="lucide:droplet" :size="32" class="text-blue-500" />
    <UiIcon name="lucide:zap" :size="32" class="text-purple-500" />
  </div>
</template>
```

::

### In Buttons

Icons work seamlessly with other components like buttons.

::ShowCase

:DocsIconButton

#code

```vue [DocsIconButton.vue]
<template>
  <div class="flex items-center gap-3">
    <UiButton>
      <UiIcon name="lucide:download" :size="16" />
      Download
    </UiButton>

    <UiButton variant="outline">
      <UiIcon name="lucide:share-2" :size="16" />
      Share
    </UiButton>

    <UiButton size="icon" variant="ghost">
      <UiIcon name="lucide:heart" :size="20" />
    </UiButton>
  </div>
</template>
```

::

### Popular Icon Sets

Here are some popular icon sets you can use with the component:

::ShowCase

:DocsIconSets

#code

```vue [DocsIconSets.vue]
<template>
  <div class="space-y-6">
    <div>
      <h3 class="mb-3 text-sm font-medium">Lucide</h3>
      <div class="flex items-center gap-3">
        <UiIcon name="lucide:home" :size="24" />
        <UiIcon name="lucide:user" :size="24" />
        <UiIcon name="lucide:settings" :size="24" />
        <UiIcon name="lucide:search" :size="24" />
        <UiIcon name="lucide:mail" :size="24" />
      </div>
    </div>

    <div>
      <h3 class="mb-3 text-sm font-medium">Heroicons</h3>
      <div class="flex items-center gap-3">
        <UiIcon name="heroicons:home" :size="24" />
        <UiIcon name="heroicons:user" :size="24" />
        <UiIcon name="heroicons:cog" :size="24" />
        <UiIcon name="heroicons:magnifying-glass" :size="24" />
        <UiIcon name="heroicons:envelope" :size="24" />
      </div>
    </div>

    <div>
      <h3 class="mb-3 text-sm font-medium">Material Design Icons</h3>
      <div class="flex items-center gap-3">
        <UiIcon name="mdi:home" :size="24" />
        <UiIcon name="mdi:account" :size="24" />
        <UiIcon name="mdi:cog" :size="24" />
        <UiIcon name="mdi:magnify" :size="24" />
        <UiIcon name="mdi:email" :size="24" />
      </div>
    </div>
  </div>
</template>
```

::

## Features

- **Automatic Detection**: Intelligently detects whether the input is an Iconify icon, emoji, or image URL
- **Vast Icon Library**: Access to 200,000+ icons from Iconify's collection
- **Flexible Sizing**: Support for both numeric and string size values
- **Emoji Support**: Built-in emoji rendering with proper sizing
- **Image URLs**: Fallback to image rendering for custom icons
- **Type Safe**: Full TypeScript support with proper type definitions
- **Class Support**: Accepts Tailwind and custom classes for styling

## Props

```ts
interface IconProps {
  /**
   * The icon to display. Can be:
   * - Iconify icon name (e.g., "lucide:home")
   * - Emoji (e.g., "🚀")
   * - Image URL (e.g., "https://example.com/icon.png")
   */
  name: string;

  /**
   * Size of the icon in pixels
   * @default 16
   */
  size?: number | string;
}
```

## Finding Icons

To find icons from Iconify's collection:

1. Visit [Iconify Icon Sets](https://icon-sets.iconify.design/)
2. Search for the icon you want
3. Copy the icon name in the format `collection:icon-name`
4. Use it in your component: `<UiIcon name="lucide:search" />`

## Popular Icon Collections

- **Lucide** (`lucide:`) - Modern, clean icons
- **Heroicons** (`heroicons:`) - Tailwind CSS icons
- **Material Design** (`mdi:`) - Google's Material Design
- **Tabler Icons** (`tabler:`) - Open source icons
- **Remix Icon** (`ri:`) - Neutral-style icons
- **Simple Icons** (`simple-icons:`) - Brand icons
- **Font Awesome** (`fa6-solid:`, `fa6-regular:`) - Popular icon set

## Customization

The Icon component is highly flexible and can be styled using Tailwind classes:

```vue
<!-- Color -->
<UiIcon name="lucide:heart" class="text-red-500" />

<!-- Size with Tailwind -->
<UiIcon name="lucide:star" class="h-8 w-8" />

<!-- Rotation -->
<UiIcon name="lucide:loader" class="animate-spin" />

<!-- Opacity -->
<UiIcon name="lucide:info" class="opacity-50" />
```
