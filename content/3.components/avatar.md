---
title: Avatar
description: An image element with a fallback for representing the user.
links:
  - title: Reka UI
    href: https://reka-ui.com/docs/components/avatar.html
    icon: "simple-icons:rekaui"
  - title: API Reference
    href: https://reka-ui.com/docs/components/avatar.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Avatar"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add avatar"}

## Usage

::prose-show-case

:DocsAvatar

#code

<!-- automd:file src="../../app/components/content/Docs/Avatar/DocsAvatar.vue" code lang="vue" -->

```vue [DocsAvatar.vue]
<template>
  <div class="flex flex-row flex-wrap items-center justify-center gap-6 md:gap-12">
    <UiAvatar class="grayscale" :src fallback="BB" :alt />
    <UiAvatar>
      <UiAvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
      <UiAvatarFallback>ER</UiAvatarFallback>
      <UiAvatarBadge class="bg-green-600 dark:bg-green-800" />
    </UiAvatar>
    <UiAvatarGroup class="grayscale">
      <UiAvatar>
        <UiAvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <UiAvatarFallback>CN</UiAvatarFallback>
      </UiAvatar>
      <UiAvatar>
        <UiAvatarImage src="https://github.com/maxleiter.png" alt="@maxleiter" />
        <UiAvatarFallback>LR</UiAvatarFallback>
      </UiAvatar>
      <UiAvatar>
        <UiAvatarImage src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
        <UiAvatarFallback>ER</UiAvatarFallback>
      </UiAvatar>
      <UiAvatarGroupCount>+3</UiAvatarGroupCount>
    </UiAvatarGroup>
  </div>
</template>

<script lang="ts" setup>
  const src = "https://behonbaker.com/icon.png";
  const alt = "Behon Baker";
</script>
```

<!-- /automd -->

::

## Origin UI Examples

These are some examples that I found today over here [Origin UI](https://originui.com/avatars-badges). I think they are cool.

To use these examples you will have to copy the code and adjust it for your own use.

### Simple

::prose-show-case

:DocsAvatarSimple

#code

<!-- automd:file src="../../app/components/content/Docs/Avatar/DocsAvatarSimple.vue" code lang="vue" -->

```vue [DocsAvatarSimple.vue]
<template>
  <div class="flex items-center justify-center gap-10">
    <UiAvatar>
      <UiAvatarImage src="https://i.pravatar.cc/150?img=1" alt="Kelly King" />
      <UiAvatarFallback>KK</UiAvatarFallback>
    </UiAvatar>
    <UiAvatar class="rounded-lg">
      <UiAvatarImage src="https://i.pravatar.cc/150?img=4" alt="Ryan Author" />
      <UiAvatarFallback>RA</UiAvatarFallback>
    </UiAvatar>
    <UiAvatar class="rounded-none">
      <UiAvatarImage src="https://i.pravatar.cc/150?img=20" alt="Shelly White" />
      <UiAvatarFallback>SW</UiAvatarFallback>
    </UiAvatar>
  </div>
</template>
```

<!-- /automd -->

::

### Initials Only

::prose-show-case

:DocsAvatarInitialOnly

#code

<!-- automd:file src="../../app/components/content/Docs/Avatar/DocsAvatarInitialOnly.vue" code lang="vue" -->

```vue [DocsAvatarInitialOnly.vue]
<template>
  <div class="flex items-center justify-center gap-10">
    <UiAvatar fallback="KK" />
    <UiAvatar class="rounded-lg" fallback="MW" />
    <UiAvatar class="rounded-none" fallback="BB" />
  </div>
</template>
```

<!-- /automd -->

::

### Icon Only

::prose-show-case

:DocsAvatarIconOnly

#code

<!-- automd:file src="../../app/components/content/Docs/Avatar/DocsAvatarIconOnly.vue" code lang="vue" -->

```vue [DocsAvatarIconOnly.vue]
<template>
  <div class="flex items-center justify-center gap-10">
    <UiAvatar>
      <UiAvatarFallback>
        <Icon name="lucide:user-round" class="opacity-80" aria-hidden="true" />
      </UiAvatarFallback>
    </UiAvatar>
    <UiAvatar>
      <UiAvatarFallback>
        <Icon name="lucide:rocket" class="opacity-80" aria-hidden="true" />
      </UiAvatarFallback>
    </UiAvatar>
    <UiAvatar>
      <UiAvatarFallback>
        <Icon name="lucide:accessibility" class="opacity-80" aria-hidden="true" />
      </UiAvatarFallback>
    </UiAvatar>
  </div>
</template>
```

<!-- /automd -->

::

### Chip

::prose-show-case

:DocsAvatarChip

#code

<!-- automd:file src="../../app/components/content/Docs/Avatar/DocsAvatarChip.vue" code lang="vue" -->

```vue [DocsAvatarChip.vue]
<template>
  <div class="flex items-center justify-center gap-10">
    <UiChip color="bg-teal-500" position="bottom-right">
      <UiAvatar>
        <UiAvatarImage src="https://i.pravatar.cc/150?img=1" alt="Kelly King" />
        <UiAvatarFallback>KK</UiAvatarFallback>
      </UiAvatar>
    </UiChip>
    <UiChip color="bg-emerald-500">
      <UiAvatar class="rounded-lg">
        <UiAvatarImage src="https://i.pravatar.cc/150?img=4" alt="Ryan Author" />
        <UiAvatarFallback>RA</UiAvatarFallback>
      </UiAvatar>
    </UiChip>
    <UiChip color="bg-orange-500" position="bottom-left" inset>
      <UiAvatar class="rounded-none">
        <UiAvatarImage src="https://i.pravatar.cc/150?img=20" alt="Shelly White" />
        <UiAvatarFallback>SW</UiAvatarFallback>
      </UiAvatar>
    </UiChip>
  </div>
</template>
```

<!-- /automd -->

::

### Badge

::prose-show-case

:DocsAvatarBadge

#code

<!-- automd:file src="../../app/components/content/Docs/Avatar/DocsAvatarBadge.vue" code lang="vue" -->

```vue [DocsAvatarBadge.vue]
<template>
  <div class="flex items-center justify-center gap-10">
    <UiChip size="3xl" class="bg-background h-auto min-w-fit translate-x-0 p-0 ring-1">
      <template #content>
        <div class="flex items-center justify-center">
          <Icon name="heroicons:check-badge-solid" class="text-foreground size-5" />
        </div>
      </template>
      <UiAvatar>
        <UiAvatarImage src="https://i.pravatar.cc/150?img=1" alt="Kelly King" />
        <UiAvatarFallback>KK</UiAvatarFallback>
      </UiAvatar>
    </UiChip>
    <UiChip size="2xl" class="bg-emerald-500 text-white" text="6">
      <UiAvatar class="rounded-lg">
        <UiAvatarImage src="https://i.pravatar.cc/150?img=4" alt="Ryan Author" />
        <UiAvatarFallback>RA</UiAvatarFallback>
      </UiAvatar>
    </UiChip>
  </div>
</template>
```

<!-- /automd -->

::

### Group

::prose-show-case

:DocsAvatarGroup

#code

<!-- automd:file src="../../app/components/content/Docs/Avatar/DocsAvatarGroup.vue" code lang="vue" -->

```vue [DocsAvatarGroup.vue]
<template>
  <div class="flex flex-col items-center justify-center gap-10">
    <div class="flex -space-x-1">
      <UiAvatar v-for="u in users" :key="u.name" class="ring-background size-8 ring-2">
        <UiAvatarImage :src="u.avatar" :alt="u.name" />
        <UiAvatarFallback>{{ u.initials }}</UiAvatarFallback>
      </UiAvatar>
    </div>
    <div class="flex -space-x-1">
      <UiAvatar v-for="u in users" :key="u.name" class="ring-background size-8 ring-2">
        <UiAvatarImage :src="u.avatar" :alt="u.name" />
        <UiAvatarFallback>{{ u.initials }}</UiAvatarFallback>
      </UiAvatar>
      <UiButton
        v-tippy="{ content: 'Add user' }"
        variant="secondary"
        class="bg-secondary text-muted-foreground ring-background hover:bg-secondary hover:text-foreground z-10 flex size-8 items-center justify-center rounded-full text-xs ring-2"
        size="icon"
      >
        +3
      </UiButton>
    </div>
    <div class="flex -space-x-3">
      <UiAvatar v-for="u in users" :key="u.name" class="ring-background size-12 ring-2">
        <UiAvatarImage :src="u.avatar" :alt="u.name" />
        <UiAvatarFallback>{{ u.initials }}</UiAvatarFallback>
      </UiAvatar>
    </div>
    <div class="flex -space-x-2">
      <UiAvatar v-for="u in users" :key="u.name" class="ring-background size-20 ring-2">
        <UiAvatarImage :src="u.avatar" :alt="u.name" />
        <UiAvatarFallback>{{ u.initials }}</UiAvatarFallback>
      </UiAvatar>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const users = [
    {
      name: "Kelly King",
      avatar: "https://i.pravatar.cc/150?img=1",
      initials: "KK",
    },
    {
      name: "Ryan Author",
      avatar: "https://i.pravatar.cc/150?img=2",
      initials: "RA",
    },
    {
      name: "Megan Author",
      avatar: "https://i.pravatar.cc/150?img=3",
      initials: "MA",
    },
    {
      name: "John Doe",
      avatar: "https://i.pravatar.cc/150?img=4",
      initials: "JD",
    },
  ];
</script>
```

<!-- /automd -->

::

### Badge Group

::prose-show-case

:DocsAvatarBadgeGroup

#code

<!-- automd:file src="../../app/components/content/Docs/Avatar/DocsAvatarBadgeGroup.vue" code lang="vue" -->

```vue [DocsAvatarBadgeGroup.vue]
<template>
  <div class="flex items-center justify-center gap-10">
    <div
      class="border-border bg-background flex items-center rounded-full border p-1 shadow shadow-black/5"
    >
      <div class="flex -space-x-1">
        <UiAvatar v-for="u in users" :key="u.name" class="ring-background size-5 ring-1">
          <UiAvatarImage :src="u.avatar" :alt="u.name" />
          <UiAvatarFallback>{{ u.initials }}</UiAvatarFallback>
        </UiAvatar>
      </div>
      <p class="text-muted-foreground px-2 text-xs">
        Trusted by <strong class="text-foreground font-medium">60K+</strong> developers.
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const users = [
    {
      name: "Kelly King",
      avatar: "https://i.pravatar.cc/150?img=1",
      initials: "KK",
    },
    {
      name: "Ryan Author",
      avatar: "https://i.pravatar.cc/150?img=2",
      initials: "RA",
    },
    {
      name: "Megan Author",
      avatar: "https://i.pravatar.cc/150?img=3",
      initials: "MA",
    },
    {
      name: "John Doe",
      avatar: "https://i.pravatar.cc/150?img=4",
      initials: "JD",
    },
  ];
</script>
```

<!-- /automd -->

::

### Avatar Label Group

::prose-show-case

:DocsAvatarLabelGroup

#code

<!-- automd:file src="../../app/components/content/Docs/Avatar/DocsAvatarLabelGroup.vue" code lang="vue" -->

```vue [DocsAvatarLabelGroup.vue]
<template>
  <div class="flex flex-col gap-6">
    <UiAvatarLabelGroup
      v-for="s in sizes"
      :key="s"
      title="Behon Baker"
      subtitle="behon.baker@yahoo.com"
      src="https://behonbaker.com/icon.png"
      :size="s"
    />
  </div>
</template>
<script lang="ts" setup>
  const sizes = ["sm", "md", "lg", "xl"] as const;
</script>
```

<!-- /automd -->

::
