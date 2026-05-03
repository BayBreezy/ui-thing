---
title: Animated Tooltip
description: A group of animated tooltips that display on hover with smooth spring animations and dynamic positioning based on mouse movement.
links:
  - title: Inspira UI
    href: https://inspira-ui.com/docs/en/components/miscellaneous/animated-tooltip
    icon: "lucide:sparkles"
---

## Source code

Click :SourceCodeLink{component="AnimatedTooltip.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add animated-tooltip"}

## Anatomy

Pass a list of `items` to the component. Each item should contain an image, title, and optionally a description.

```vue [AnimatedTooltip Anatomy.vue]
<template>
  <div class="flex">
    <UiAnimatedTooltip :items />
  </div>
</template>

<script lang="ts" setup>
  const items = [
    {
      id: "1",
      title: "John Doe",
      description: "Software Engineer",
      image: "https://i.pravatar.cc/150?img=1",
    },
    // ... more items
  ];
</script>
```

## Usage

### Basic

Display a group of avatars with animated tooltips that appear on hover. The tooltips follow mouse movement with smooth spring animations.

::prose-show-case

:DocsAnimatedTooltip

#code

```vue [DocsAnimatedTooltip.vue]
<template>
  <div class="flex items-center justify-center py-20">
    <UiAnimatedTooltip :items="people" />
  </div>
</template>

<script lang="ts" setup>
  const people = [
    {
      id: "1",
      title: "John Doe",
      description: "Software Engineer",
      image: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: "2",
      title: "Jane Smith",
      description: "Product Designer",
      image: "https://i.pravatar.cc/150?img=5",
    },
    {
      id: "3",
      title: "Mike Johnson",
      description: "DevOps Engineer",
      image: "https://i.pravatar.cc/150?img=8",
    },
    {
      id: "4",
      title: "Sarah Williams",
      description: "UX Researcher",
      image: "https://i.pravatar.cc/150?img=9",
    },
    {
      id: "5",
      title: "Tom Brown",
      description: "Backend Developer",
      image: "https://i.pravatar.cc/150?img=12",
    },
  ];
</script>
```

::

### Without Description

You can omit the description field to show only the title in the tooltip.

::prose-show-case

:DocsAnimatedTooltipNoDescription

#code

```vue [DocsAnimatedTooltipNoDescription.vue]
<template>
  <div class="flex items-center justify-center py-20">
    <UiAnimatedTooltip :items="team" />
  </div>
</template>

<script lang="ts" setup>
  const team = [
    {
      id: "1",
      title: "Alex Turner",
      image: "https://i.pravatar.cc/150?img=3",
    },
    {
      id: "2",
      title: "Emma Davis",
      image: "https://i.pravatar.cc/150?img=10",
    },
    {
      id: "3",
      title: "Chris Martin",
      image: "https://i.pravatar.cc/150?img=7",
    },
    {
      id: "4",
      title: "Lisa Anderson",
      image: "https://i.pravatar.cc/150?img=16",
    },
  ];
</script>
```

::

### Large Group

The component works well with larger groups of people. The avatars automatically stack with negative margin.

::prose-show-case

:DocsAnimatedTooltipLarge

#code

```vue [DocsAnimatedTooltipLarge.vue]
<template>
  <div class="flex items-center justify-center py-20">
    <UiAnimatedTooltip :items="teamMembers" />
  </div>
</template>

<script lang="ts" setup>
  const teamMembers = [
    {
      id: "1",
      title: "John Doe",
      description: "CEO",
      image: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: "2",
      title: "Jane Smith",
      description: "CTO",
      image: "https://i.pravatar.cc/150?img=5",
    },
    {
      id: "3",
      title: "Mike Johnson",
      description: "Lead Developer",
      image: "https://i.pravatar.cc/150?img=8",
    },
    {
      id: "4",
      title: "Sarah Williams",
      description: "Designer",
      image: "https://i.pravatar.cc/150?img=9",
    },
    {
      id: "5",
      title: "Tom Brown",
      description: "Developer",
      image: "https://i.pravatar.cc/150?img=12",
    },
    {
      id: "6",
      title: "Emily Davis",
      description: "Marketing",
      image: "https://i.pravatar.cc/150?img=10",
    },
    {
      id: "7",
      title: "David Wilson",
      description: "Sales",
      image: "https://i.pravatar.cc/150?img=13",
    },
    {
      id: "8",
      title: "Lisa Anderson",
      description: "HR Manager",
      image: "https://i.pravatar.cc/150?img=16",
    },
  ];
</script>
```

::

## Features

- **Dynamic Animation**: Tooltips animate in with smooth spring physics using Motion V
- **Mouse Tracking**: Tooltips rotate and translate based on mouse position for a natural feel
- **Auto-generated IDs**: If no ID is provided, the component automatically generates unique IDs
- **Flexible Content**: Support for title and optional description in tooltips
- **Stacked Layout**: Avatars stack with negative margin for a compact group display
- **Hover Effects**: Smooth scale and z-index transitions on hover

## Props

The component accepts an `items` prop with the following interface:

```ts
interface Item {
  id?: string; // Optional: Auto-generated if not provided
  title: string; // Required: Displayed in tooltip
  description?: string; // Optional: Secondary text in tooltip
  image: string; // Required: Avatar image URL
}
```

## Customization

You can customize the component by modifying the styles directly in the component file:

- **Avatar size**: Change `size-14` class on the image element
- **Tooltip styling**: Modify the tooltip container classes
- **Animation parameters**: Adjust `stiffness` and `damping` in the Motion component
- **Gradient colors**: Update the `via-emerald-500` and `via-sky-500` classes for different accent colors
