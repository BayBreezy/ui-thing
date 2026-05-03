---
title: Badge Group
description: A pill-style badge group that pairs a labeled addon with a short message, available in light and modern themes with leading or trailing alignment.
label: New
---

## Source code

Click :SourceCodeLink{component="BadgeGroup.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add badge-group"}

## Usage

::prose-show-case

:DocsBadgeGroupDefault

#code

<!-- automd:file src="../../app/components/content/Docs/BadgeGroup/DocsBadgeGroupDefault.vue" code lang="vue" -->

```vue [DocsBadgeGroupDefault.vue]
<template>
  <div class="flex justify-center">
    <UiBadgeGroup addon-text="New feature" theme="light" align="leading" size="md">
      We've just released a new feature
    </UiBadgeGroup>
  </div>
</template>
```

<!-- /automd -->

::

## Colors

The `color` prop controls the palette of the badge addon and icon. Applies to the `light` theme only — the `modern` theme uses system-aware tokens.

### All colors

::prose-show-case

:DocsBadgeGroupAllColors

#code

<!-- automd:file src="../../app/components/content/Docs/BadgeGroup/DocsBadgeGroupAllColors.vue" code lang="vue" -->

```vue [DocsBadgeGroupAllColors.vue]
<template>
  <div class="flex flex-wrap gap-3">
    <UiBadgeGroup
      v-for="c in colors"
      :key="c"
      :color="c"
      :addon-text="`${c?.[0]?.toUpperCase()}${c.slice(1)} Color`"
      theme="light"
      align="leading"
      size="md"
    >
      Check out the {{ c }} color!
    </UiBadgeGroup>
  </div>
</template>

<script lang="ts" setup>
  const colors = [
    "primary",
    "gray",
    "red",
    "orange",
    "amber",
    "yellow",
    "lime",
    "green",
    "emerald",
    "teal",
    "cyan",
    "sky",
    "blue",
    "indigo",
    "violet",
    "purple",
    "fuchsia",
    "pink",
    "rose",
  ] as const;
</script>
```

<!-- /automd -->

::

### Semantic aliases

::prose-show-case

:DocsBadgeGroupColors

#code

<!-- automd:file src="../../app/components/content/Docs/BadgeGroup/DocsBadgeGroupColors.vue" code lang="vue" -->

```vue [DocsBadgeGroupColors.vue]
<template>
  <div class="flex flex-col items-start gap-4">
    <UiBadgeGroup
      v-for="c in colors"
      :key="c.color"
      :addon-text="c.addonText"
      :color="c.color"
      theme="light"
      align="leading"
      size="md"
    >
      {{ c.text }}
    </UiBadgeGroup>
  </div>
</template>

<script lang="ts" setup>
  const colors = [
    { color: "primary", addonText: "New feature", text: "We've just released a new feature" },
    { color: "gray", addonText: "New feature", text: "We've just released a new feature" },
    { color: "blue", addonText: "New feature", text: "We've just released a new feature" },
    { color: "error", addonText: "Error", text: "There was a problem with that action" },
    {
      color: "warning",
      addonText: "Warning",
      text: "Just to let you know this might be a problem",
    },
    { color: "success", addonText: "Success", text: "You've updated your profile and details" },
  ] as const;
</script>
```

<!-- /automd -->

::

## Sizes

Two sizes are available: `md` and `lg`.

::prose-show-case

:DocsBadgeGroupSizes

#code

<!-- automd:file src="../../app/components/content/Docs/BadgeGroup/DocsBadgeGroupSizes.vue" code lang="vue" -->

```vue [DocsBadgeGroupSizes.vue]
<template>
  <div class="flex flex-col items-start gap-4">
    <UiBadgeGroup
      v-for="s in sizes"
      :key="s"
      :size="s"
      addon-text="New feature"
      theme="light"
      align="leading"
    >
      We've just released a new feature
    </UiBadgeGroup>
  </div>
</template>

<script lang="ts" setup>
  const sizes = ["md", "lg"] as const;
</script>
```

<!-- /automd -->

::

## Alignment

### Leading

The addon pill appears before the main text with the icon at the trailing end.

::prose-show-case

:DocsBadgeGroupColors

#code

<!-- automd:file src="../../app/components/content/Docs/BadgeGroup/DocsBadgeGroupColors.vue" code lang="vue" -->

```vue [DocsBadgeGroupColors.vue]
<template>
  <div class="flex flex-col items-start gap-4">
    <UiBadgeGroup
      v-for="c in colors"
      :key="c.color"
      :addon-text="c.addonText"
      :color="c.color"
      theme="light"
      align="leading"
      size="md"
    >
      {{ c.text }}
    </UiBadgeGroup>
  </div>
</template>

<script lang="ts" setup>
  const colors = [
    { color: "primary", addonText: "New feature", text: "We've just released a new feature" },
    { color: "gray", addonText: "New feature", text: "We've just released a new feature" },
    { color: "blue", addonText: "New feature", text: "We've just released a new feature" },
    { color: "error", addonText: "Error", text: "There was a problem with that action" },
    {
      color: "warning",
      addonText: "Warning",
      text: "Just to let you know this might be a problem",
    },
    { color: "success", addonText: "Success", text: "You've updated your profile and details" },
  ] as const;
</script>
```

<!-- /automd -->

::

### Trailing

The main text comes first, followed by the addon pill with the icon inside.

::prose-show-case

:DocsBadgeGroupTrailing

#code

<!-- automd:file src="../../app/components/content/Docs/BadgeGroup/DocsBadgeGroupTrailing.vue" code lang="vue" -->

```vue [DocsBadgeGroupTrailing.vue]
<template>
  <div class="flex flex-col items-start gap-4">
    <UiBadgeGroup
      v-for="c in colors"
      :key="c.color"
      :addon-text="c.addonText"
      :color="c.color"
      theme="light"
      align="trailing"
      size="md"
    >
      {{ c.text }}
    </UiBadgeGroup>
  </div>
</template>

<script lang="ts" setup>
  const colors = [
    { color: "gray", addonText: "New feature", text: "We've just released a new feature" },
    { color: "blue", addonText: "New feature", text: "We've just released a new feature" },
    { color: "error", addonText: "Error", text: "There was a problem with that action" },
    {
      color: "warning",
      addonText: "Warning",
      text: "Just to let you know this might be a problem",
    },
    { color: "success", addonText: "Success", text: "You've updated your profile and details" },
  ] as const;
</script>
```

<!-- /automd -->

::

## Theme

### Modern — leading

The modern theme uses system-aware background and border tokens with a color dot indicator inside the addon.

::prose-show-case

:DocsBadgeGroupModernLeading

#code

<!-- automd:file src="../../app/components/content/Docs/BadgeGroup/DocsBadgeGroupModernLeading.vue" code lang="vue" -->

```vue [DocsBadgeGroupModernLeading.vue]
<template>
  <div class="flex flex-col items-start gap-4">
    <UiBadgeGroup
      v-for="c in colors"
      :key="c.color"
      :addon-text="c.addonText"
      :color="c.color"
      theme="modern"
      align="leading"
      size="md"
    >
      {{ c.text }}
    </UiBadgeGroup>
  </div>
</template>

<script lang="ts" setup>
  const colors = [
    { color: "primary", addonText: "New feature", text: "We've just released a new feature" },
    { color: "gray", addonText: "New feature", text: "We've just released a new feature" },
    { color: "blue", addonText: "New feature", text: "We've just released a new feature" },
    { color: "error", addonText: "Error", text: "There was a problem with that action" },
    {
      color: "warning",
      addonText: "Warning",
      text: "Just to let you know this might be a problem",
    },
    { color: "success", addonText: "Success", text: "You've updated your profile and details" },
  ] as const;
</script>
```

<!-- /automd -->

::

### Modern — trailing

::prose-show-case

:DocsBadgeGroupModernTrailing

#code

<!-- automd:file src="../../app/components/content/Docs/BadgeGroup/DocsBadgeGroupModernTrailing.vue" code lang="vue" -->

```vue [DocsBadgeGroupModernTrailing.vue]
<template>
  <div class="flex flex-col items-start gap-4">
    <UiBadgeGroup
      v-for="c in colors"
      :key="c.color"
      :addon-text="c.addonText"
      :color="c.color"
      theme="modern"
      align="trailing"
      size="md"
      pulse
    >
      {{ c.text }}
    </UiBadgeGroup>
  </div>
</template>

<script lang="ts" setup>
  const colors = [
    { color: "primary", addonText: "New feature", text: "We've just released a new feature" },
    { color: "gray", addonText: "New feature", text: "We've just released a new feature" },
    { color: "blue", addonText: "New feature", text: "We've just released a new feature" },
    { color: "error", addonText: "Error", text: "There was a problem with that action" },
    {
      color: "warning",
      addonText: "Warning",
      text: "Just to let you know this might be a problem",
    },
    { color: "success", addonText: "Success", text: "You've updated your profile and details" },
  ] as const;
</script>
```

<!-- /automd -->

::

## No icon

Set `:icon="false"` to hide the trailing icon entirely.

::prose-show-case

:DocsBadgeGroupNoIcon

#code

<!-- automd:file src="../../app/components/content/Docs/BadgeGroup/DocsBadgeGroupNoIcon.vue" code lang="vue" -->

```vue [DocsBadgeGroupNoIcon.vue]
<template>
  <div class="flex flex-col items-start gap-4">
    <UiBadgeGroup addon-text="New feature" theme="light" align="leading" :icon="false">
      We've just released a new feature
    </UiBadgeGroup>
    <UiBadgeGroup addon-text="New feature" theme="modern" align="leading" :icon="false">
      We've just released a new feature
    </UiBadgeGroup>
  </div>
</template>
```

<!-- /automd -->

::
