---
title: Avatar
description: An image element with a fallback for representing the user.
links:
  - title: Radix-Vue
    href: https://www.radix-vue.com/components/avatar.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://www.radix-vue.com/components/avatar.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Avatar"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add avatar
```

## Usage

::ShowCase

:DocsAvatar

#code

<!-- automd:file src="../../app/components/content/Docs/Avatar/DocsAvatar.vue" code lang="vue" -->

```vue [DocsAvatar.vue]
<template>
  <div class="flex flex-wrap items-center justify-center gap-3">
    <UiAvatar
      src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
      alt="Colm Tuite"
      fallback="CT"
      :delay-ms="600"
    />
    <UiAvatar fallback="JD" />
  </div>
</template>
```

<!-- /automd -->

::

## Origin UI Examples

These are some examples that I found today over here [Origin UI](https://originui.com/avatars-badges). I think they are cool.

To use these examples you will have to copy the code and adjust it for your own use.

### Simple

::ShowCase

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

::ShowCase

:DocsAvatarInitialOnly

#code

<!-- automd:file src="../../app/components/content/Docs/Avatar/DocsAvatarInitialOnly.vue" code lang="vue" -->

```vue [DocsAvatarInitialOnly.vue]
<template>
  <div class="flex items-center justify-center gap-10">
    <UiAvatar>
      <UiAvatarFallback>KK</UiAvatarFallback>
    </UiAvatar>
    <UiAvatar class="rounded-lg">
      <UiAvatarFallback>MW</UiAvatarFallback>
    </UiAvatar>
    <UiAvatar class="rounded-none">
      <UiAvatarFallback>BB</UiAvatarFallback>
    </UiAvatar>
  </div>
</template>
```

<!-- /automd -->

::

### Icon Only

::ShowCase

:DocsAvatarIconOnly

#code

<!-- automd:file src="../../app/components/content/Docs/Avatar/DocsAvatarIconOnly.vue" code lang="vue" -->

```vue [DocsAvatarIconOnly.vue]
<template>
  <div class="flex items-center justify-center gap-10">
    <UiAvatar>
      <UiAvatarFallback>
        <Icon name="lucide:user-round" class="size-5 opacity-80" aria-hidden="true" />
      </UiAvatarFallback>
    </UiAvatar>
    <UiAvatar>
      <UiAvatarFallback>
        <Icon name="lucide:rocket" class="size-5 opacity-80" aria-hidden="true" />
      </UiAvatarFallback>
    </UiAvatar>
    <UiAvatar>
      <UiAvatarFallback>
        <Icon name="lucide:accessibility" class="size-5 opacity-80" aria-hidden="true" />
      </UiAvatarFallback>
    </UiAvatar>
  </div>
</template>
```

<!-- /automd -->

::

### Chip

::ShowCase

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

::ShowCase

:DocsAvatarBadge

#code

<!-- automd:file src="../../app/components/content/Docs/Avatar/DocsAvatarBadge.vue" code lang="vue" -->

```vue [DocsAvatarBadge.vue]
<template>
  <div class="flex items-center justify-center gap-10">
    <UiChip size="3xl" class="h-auto min-w-fit translate-x-0 bg-background p-0 ring-1">
      <template #content>
        <div class="flex items-center justify-center">
          <Icon name="heroicons:check-badge-solid" class="size-5 text-foreground" />
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

::ShowCase

:DocsAvatarGroup

#code

<!-- automd:file src="../../app/components/content/Docs/Avatar/DocsAvatarGroup.vue" code lang="vue" -->

```vue [DocsAvatarGroup.vue]
<template>
  <div class="flex flex-col items-center justify-center gap-10">
    <div class="flex -space-x-1">
      <UiAvatar v-for="u in users" :key="u.name" class="size-8 ring-2 ring-background">
        <UiAvatarImage :src="u.avatar" :alt="u.name" />
        <UiAvatarFallback>{{ u.initials }}</UiAvatarFallback>
      </UiAvatar>
    </div>
    <div class="flex -space-x-1">
      <UiAvatar v-for="u in users" :key="u.name" class="size-8 ring-2 ring-background">
        <UiAvatarImage :src="u.avatar" :alt="u.name" />
        <UiAvatarFallback>{{ u.initials }}</UiAvatarFallback>
      </UiAvatar>
      <UiButton
        v-tippy="{ content: 'Add user' }"
        variant="secondary"
        class="z-10 flex size-8 items-center justify-center rounded-full bg-secondary text-xs text-muted-foreground ring-2 ring-background hover:bg-secondary hover:text-foreground"
        size="icon"
      >
        +3
      </UiButton>
    </div>
    <div class="flex -space-x-3">
      <UiAvatar v-for="u in users" :key="u.name" class="size-12 ring-2 ring-background">
        <UiAvatarImage :src="u.avatar" :alt="u.name" />
        <UiAvatarFallback>{{ u.initials }}</UiAvatarFallback>
      </UiAvatar>
    </div>
    <div class="flex -space-x-2">
      <UiAvatar v-for="u in users" :key="u.name" class="size-20 ring-2 ring-background">
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

::ShowCase

:DocsAvatarBadgeGroup

#code

<!-- automd:file src="../../app/components/content/Docs/Avatar/DocsAvatarBadgeGroup.vue" code lang="vue" -->

```vue [DocsAvatarBadgeGroup.vue]
<template>
  <div class="flex items-center justify-center gap-10">
    <div
      class="flex items-center rounded-full border border-border bg-background p-1 shadow shadow-black/5"
    >
      <div class="flex -space-x-1">
        <UiAvatar v-for="u in users" :key="u.name" class="size-5 ring-1 ring-background">
          <UiAvatarImage :src="u.avatar" :alt="u.name" />
          <UiAvatarFallback>{{ u.initials }}</UiAvatarFallback>
        </UiAvatar>
      </div>
      <p class="px-2 text-xs text-muted-foreground">
        Trusted by <strong class="font-medium text-foreground">60K+</strong> developers.
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
