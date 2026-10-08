---
title: Badge
description: A badge is a component that is used to highlight an item's status for quick recognition.
label: Updated
---

## Source code

Click :SourceCodeLink{component="Badge.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add badge"}

## Variants

### Default

::prose-show-case

:DocsBadgeDefault

#code

<!-- automd:file src="../../app/components/content/Docs/Badge/DocsBadgeDefault.vue" code lang="vue" -->

```vue [DocsBadgeDefault.vue]
<template>
  <div class="text-center">
    <UiBadge>Default</UiBadge>
  </div>
</template>
```

<!-- /automd -->

::

### Destructive

::prose-show-case

:DocsBadgeDestructive

#code

<!-- automd:file src="../../app/components/content/Docs/Badge/DocsBadgeDestructive.vue" code lang="vue" -->

```vue [DocsBadgeDestructive.vue]
<template>
  <div class="text-center">
    <UiBadge variant="destructive">Destructive</UiBadge>
  </div>
</template>
```

<!-- /automd -->

::

### Outline

::prose-show-case

:DocsBadgeOutline

#code

<!-- automd:file src="../../app/components/content/Docs/Badge/DocsBadgeOutline.vue" code lang="vue" -->

```vue [DocsBadgeOutline.vue]
<template>
  <div class="text-center">
    <UiBadge variant="outline">Outline</UiBadge>
  </div>
</template>
```

<!-- /automd -->

::

### Secondary

::prose-show-case

:DocsBadgeSecondary

#code

<!-- automd:file src="../../app/components/content/Docs/Badge/DocsBadgeSecondary.vue" code lang="vue" -->

```vue [DocsBadgeSecondary.vue]
<template>
  <div class="text-center">
    <UiBadge variant="secondary">Secondary</UiBadge>
  </div>
</template>
```

<!-- /automd -->

::

### Shadcn

::prose-show-case

:DocsBadgeShadcn

#code

<!-- automd:file src="../../app/components/content/Docs/Badge/DocsBadgeShadcn.vue" code lang="vue" -->

```vue [DocsBadgeShadcn.vue]
<template>
  <div class="flex justify-center">
    <div class="flex flex-col items-center justify-center gap-2">
      <div class="flex w-full flex-wrap justify-center gap-2">
        <UiBadge>Badge</UiBadge>
        <UiBadge variant="secondary">Secondary</UiBadge>
        <UiBadge variant="destructive">Destructive</UiBadge>
        <UiBadge variant="outline">Outline</UiBadge>
      </div>
      <div class="flex w-full flex-wrap justify-center gap-2">
        <UiBadge variant="secondary" class="bg-blue-500 text-white dark:bg-blue-600">
          <Icon name="lucide:badge-check" />
          Verified
        </UiBadge>
        <UiBadge class="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"> 8 </UiBadge>
        <UiBadge class="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums" variant="destructive">
          99
        </UiBadge>
        <UiBadge class="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums" variant="outline">
          20+
        </UiBadge>
      </div>
    </div>
  </div>
</template>
```

<!-- /automd -->

::

### Origin UI

::prose-show-case

:DocsBadgeOriginU-I

#code

<!-- automd:file src="../../app/components/content/Docs/Badge/DocsBadgeOriginUI.vue" code lang="vue" -->

```vue [DocsBadgeOriginUI.vue]
<template>
  <div class="flex justify-center">
    <div class="flex flex-wrap justify-center gap-2">
      <UiBadge>
        <Icon name="lucide:zap" class="-ms-0.5 size-3 opacity-60" aria-hidden="true" />
        Badge
      </UiBadge>
      <UiBadge class="items-baseline gap-1.5">
        Badge
        <span class="text-primary-foreground/60 text-[0.625rem] font-medium"> 73 </span>
      </UiBadge>
      <UiBadge variant="outline" class="gap-1">
        <Icon name="lucide:check" class="size-3 text-emerald-500" aria-hidden="true" />
        Badge
      </UiBadge>
      <UiBadge variant="outline" class="gap-1.5">
        <span class="size-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
        Badge
      </UiBadge>
      <UiBadge variant="outline" class="gap-1.5">
        <span class="size-1.5 rounded-full bg-amber-500" aria-hidden="true" />
        Badge
      </UiBadge>
      <UiBadge variant="outline" class="gap-1.5">
        <span class="size-1.5 rounded-full bg-red-500" aria-hidden="true" />
        Badge
      </UiBadge>
      <UiBadge
        class="has-focus-visible:border-ring has-focus-visible:ring-ring/50 has-data-[state=unchecked]:bg-muted has-data-[state=unchecked]:text-muted-foreground relative outline-none has-focus-visible:ring-[3px]"
      >
        <UiCheckbox :id class="peer sr-only after:absolute after:inset-0" default-checked />
        <div class="hidden items-center justify-center peer-data-[state=checked]:flex">
          <Icon name="lucide:check" class="size-2.5" aria-hidden="true" />
        </div>
        <label :for="id" class="cursor-pointer select-none after:absolute after:inset-0">
          Selectable
        </label>
      </UiBadge>

      <UiBadge v-if="open" class="gap-0 rounded-full">
        Removable
        <button
          class="text-primary-foreground/60 hover:text-primary-foreground focus-visible:border-ring focus-visible:ring-ring/50 -my-px -ms-px -me-1.5 inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-[inherit] p-0 transition-[color,box-shadow] outline-none focus-visible:ring-[3px]"
          @click="open = false"
        >
          <Icon name="lucide:x" class="size-3" aria-hidden="true" />
        </button>
      </UiBadge>

      <UiBadge v-if="tagActive" variant="outline" class="gap-0 rounded-md px-2">
        Tag
        <button
          class="text-foreground/60 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 -my-[5px] -ms-0.5 -me-2 inline-flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-[inherit] p-0 transition-[color,box-shadow] outline-none focus-visible:ring-[3px]"
          aria-label="Delete"
          @click="tagActive = false"
        >
          <Icon name="lucide:x" class="size-3" aria-hidden="true" />
        </button>
      </UiBadge>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const id = useId();

  const open = ref(true);
  const tagActive = ref(true);

  watch(open, (value) => {
    if (!value) {
      setTimeout(() => {
        open.value = true;
      }, 1000);
    }
  });
  watch(tagActive, (value) => {
    if (!value) {
      setTimeout(() => {
        tagActive.value = true;
      }, 1000);
    }
  });
</script>
```

<!-- /automd -->

::

## Sizes

Three sizes are available for badges: `sm`, `md`, and `lg`.

::prose-show-case

:DocsBadgeSizes

#code

<!-- automd:file src="../../app/components/content/Docs/Badge/DocsBadgeSizes.vue" code lang="vue" -->

```vue [DocsBadgeSizes.vue]
<template>
  <div class="flex items-center justify-center gap-2">
    <UiBadge v-for="s in sizes" :key="s" :size="s" variant="secondary">Label</UiBadge>
  </div>
</template>

<script lang="ts" setup>
  const sizes = ["sm", "md", "lg"] as const;
</script>
```

<!-- /automd -->

::

## Colors

Use `color` with the `soft`, `solid` or `outline` variant. There are 30 colors: `primary`, the whole Tailwind palette (`red` to `rose`, `slate`, `gray`, `zinc`, `neutral`, `stone` and the newer `taupe`, `mauve`, `mist` and `olive`) and the `error`, `warning` and `success` aliases. The `badgeColors` array in `~/utils/badge-colors` lists them all, and every color has light and dark styles.

::prose-show-case

:DocsBadgeColors

#code

<!-- automd:file src="../../app/components/content/Docs/Badge/DocsBadgeColors.vue" code lang="vue" -->

```vue [DocsBadgeColors.vue]
<template>
  <div class="mx-auto flex max-w-2xl flex-wrap justify-center gap-2">
    <UiBadge v-for="c in badgeColors" :key="c" variant="soft" :color="c" size="md" dot>
      {{ c }}
    </UiBadge>
  </div>
</template>

<script lang="ts" setup>
  import { badgeColors } from "~/utils/badge-colors";
</script>
```

<!-- /automd -->

::

## Styles

`soft` is a tinted badge, `solid` is filled, `outline` only draws the border and `modern` is a neutral card where the color is used for the dot. `soft`, `solid` and `modern` use `gray` when no `color` is set. An `outline` badge without a color keeps the neutral look it always had, and the other variants (`default`, `secondary`, `destructive`, `success`, `warning`, `info`, `error` and `ghost`) did not change. The same colors and styles are used by the [Tag Group](/components/tag-group).

::prose-show-case

:DocsBadgeStyles

#code

<!-- automd:file src="../../app/components/content/Docs/Badge/DocsBadgeStyles.vue" code lang="vue" -->

```vue [DocsBadgeStyles.vue]
<template>
  <div class="mx-auto max-w-2xl space-y-6">
    <div v-for="v in variants" :key="v" class="space-y-2">
      <p class="text-muted-foreground text-xs font-medium tracking-wide uppercase">{{ v }}</p>
      <div class="flex flex-wrap gap-2">
        <UiBadge v-for="c in colors" :key="c" :variant="v" :color="c" size="md">{{ c }}</UiBadge>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const variants = ["soft", "solid", "outline", "modern"] as const;
  const colors = [
    "gray",
    "primary",
    "red",
    "orange",
    "yellow",
    "green",
    "teal",
    "blue",
    "indigo",
    "purple",
    "pink",
    "mauve",
    "olive",
  ] as const;
</script>
```

<!-- /automd -->

::

## Shapes

Use `shape="rounded"` (default) or `shape="pill"`.

::prose-show-case

:DocsBadgeShapes

#code

<!-- automd:file src="../../app/components/content/Docs/Badge/DocsBadgeShapes.vue" code lang="vue" -->

```vue [DocsBadgeShapes.vue]
<template>
  <div class="mx-auto max-w-md space-y-4">
    <div class="flex flex-wrap items-center justify-center gap-2">
      <UiBadge shape="rounded" variant="soft" color="violet" size="md">Rounded</UiBadge>
      <UiBadge shape="rounded" variant="solid" color="pink" size="md">Rounded</UiBadge>
      <UiBadge shape="rounded" variant="outline" color="sky" size="md">Rounded</UiBadge>
    </div>
    <div class="flex flex-wrap items-center justify-center gap-2">
      <UiBadge shape="pill" variant="soft" color="violet" size="md">Pill</UiBadge>
      <UiBadge shape="pill" variant="solid" color="pink" size="md">Pill</UiBadge>
      <UiBadge shape="pill" variant="outline" color="sky" size="md">Pill</UiBadge>
    </div>
  </div>
</template>
```

<!-- /automd -->

::

## Icons

`icon` renders an icon before the text and `trailing-icon` one after it. The `leading` and `trailing` slots replace them with any content.

::prose-show-case

:DocsBadgeIcons

#code

<!-- automd:file src="../../app/components/content/Docs/Badge/DocsBadgeIcons.vue" code lang="vue" -->

```vue [DocsBadgeIcons.vue]
<template>
  <div class="mx-auto max-w-md space-y-4">
    <div class="flex flex-wrap items-center justify-center gap-2">
      <UiBadge variant="soft" color="green" size="md" icon="lucide:badge-check">Verified</UiBadge>
      <UiBadge variant="soft" color="amber" size="md" icon="lucide:clock">Pending</UiBadge>
      <UiBadge variant="soft" color="red" size="md" icon="lucide:circle-alert">Failed</UiBadge>
      <UiBadge variant="soft" color="purple" size="md" icon="lucide:sparkles">New</UiBadge>
    </div>

    <div class="flex flex-wrap items-center justify-center gap-2">
      <UiBadge variant="outline" color="blue" size="md" trailing-icon="lucide:arrow-up-right">
        Docs
      </UiBadge>
      <UiBadge variant="solid" color="amber" size="md" trailing-icon="lucide:crown">Pro</UiBadge>
      <!-- The `leading` and `trailing` slots replace the icons -->
      <UiBadge variant="modern" color="pink" size="md">
        <template #leading><Icon name="lucide:flask-conical" class="size-3" /></template>
        Beta
        <template #trailing><Icon name="lucide:chevron-down" class="size-3" /></template>
      </UiBadge>
    </div>
  </div>
</template>
```

<!-- /automd -->

::

## Dots

The `modern` variant shows a dot colored by `color`. Add `dot` to show one on any other variant.

::prose-show-case

:DocsBadgeDots

#code

<!-- automd:file src="../../app/components/content/Docs/Badge/DocsBadgeDots.vue" code lang="vue" -->

```vue [DocsBadgeDots.vue]
<template>
  <div class="mx-auto max-w-md space-y-4">
    <!-- The `modern` variant is neutral and uses the color for its dot -->
    <div class="flex flex-wrap items-center justify-center gap-2">
      <UiBadge variant="modern" color="green" size="md">Online</UiBadge>
      <UiBadge variant="modern" color="amber" size="md">Away</UiBadge>
      <UiBadge variant="modern" color="red" size="md">Busy</UiBadge>
      <UiBadge variant="modern" color="gray" size="md">Offline</UiBadge>
    </div>

    <!-- Add `dot` to any other variant -->
    <div class="flex flex-wrap items-center justify-center gap-2">
      <UiBadge variant="soft" color="emerald" size="lg" dot>Production</UiBadge>
      <UiBadge variant="soft" color="orange" size="lg" dot>Staging</UiBadge>
      <UiBadge variant="soft" color="sky" size="lg" dot>Development</UiBadge>
    </div>
  </div>
</template>
```

<!-- /automd -->

::

## Avatars

Use `avatar` to show an image before the text.

::prose-show-case

:DocsBadgeAvatars

#code

<!-- automd:file src="../../app/components/content/Docs/Badge/DocsBadgeAvatars.vue" code lang="vue" -->

```vue [DocsBadgeAvatars.vue]
<template>
  <div class="mx-auto flex max-w-md flex-wrap items-center justify-center gap-2">
    <UiBadge
      v-for="p in people"
      :key="p.name"
      variant="modern"
      shape="pill"
      size="md"
      :avatar="p.avatar"
    >
      {{ p.name }}
    </UiBadge>
  </div>
</template>

<script lang="ts" setup>
  const people = [
    { name: "Kelly King", avatar: "https://i.pravatar.cc/150?img=1" },
    { name: "Ryan Author", avatar: "https://i.pravatar.cc/150?img=4" },
    { name: "Mia Chen", avatar: "https://i.pravatar.cc/150?img=5" },
  ];
</script>
```

<!-- /automd -->

::

## Links and buttons

A badge renders a link when it has `to` or `href`, a button when it has an `@click` handler and a `div` otherwise. Use `tag` to render any other element.

::prose-show-case

:DocsBadgeLink

#code

<!-- automd:file src="../../app/components/content/Docs/Badge/DocsBadgeLink.vue" code lang="vue" -->

```vue [DocsBadgeLink.vue]
<template>
  <div class="mx-auto flex max-w-md flex-wrap items-center justify-center gap-2">
    <!-- Badges with a `to`/`href` render a link and badges with `@click` render a button -->
    <UiBadge to="/components/tag-group" variant="soft" color="indigo" size="md" icon="lucide:tags">
      Tag Group
    </UiBadge>
    <UiBadge variant="solid" color="emerald" size="md" icon="lucide:copy" @click="copy">
      {{ copied ? "Copied" : "Copy" }}
    </UiBadge>
  </div>
</template>

<script lang="ts" setup>
  const copied = ref(false);

  const copy = () => {
    copied.value = true;
    setTimeout(() => (copied.value = false), 1500);
  };
</script>
```

<!-- /automd -->

::

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `variant` | `"default" \| "secondary" \| "destructive" \| "outline" \| "success" \| "warning" \| "info" \| "error" \| "ghost" \| "soft" \| "solid" \| "modern"` | `"default"` | The style of the badge. |
| `color` | `BadgeColor` | | Color of the `soft`, `solid` and `outline` variants, and of the dot of `modern`. `gray` when a color is needed and none is set. |
| `size` | `"sm" \| "md" \| "lg"` | `"sm"` | The size of the badge. |
| `shape` | `"rounded" \| "pill"` | `"rounded"` | The shape of the badge. |
| `icon` | `string` | | Icon shown before the text. |
| `trailing-icon` | `string` | | Icon shown after the text. |
| `dot` | `boolean` | `false` | Show a colored dot before the text. The `modern` variant shows one unless an icon or avatar is set. |
| `avatar` | `string` | | Image shown before the text. |
| `disabled` | `boolean` | `false` | Dims the badge and shows the not-allowed cursor. |
| `tag` | `string` | | The element to render the badge as. |
| `to` / `href` | `string` | | Renders the badge as a link. Accepts the props of `NuxtLink`. |

| Slot | Description |
| --- | --- |
| `default` | The text of the badge. |
| `leading` | Content before the text. Replaces `dot`, `avatar` and `icon`. |
| `trailing` | Content after the text. Replaces `trailing-icon`. |
