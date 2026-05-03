---
title: Item
description: A versatile component that you can use to display any content.
---

The `Item` component is a straightforward flex container that can house nearly any type of content. Use it to display a title, description, and actions. Group it with the `ItemGroup` component to create a list of items.

## Source code

Click :SourceCodeLink{component="Item"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add item"}

## Usage

```vue
<template>
  <UiItem>
    <UiItemHeader>Item Header</UiItemHeader>
    <UiItemMedia />
    <UiItemContent>
      <UiItemTitle>Item</UiItemTitle>
      <UiItemDescription>Item</UiItemDescription>
    </UiItemContent>
    <UiItemActions />
    <UiItemFooter>Item Footer</UiItemFooter>
  </UiItem>
</template>
```

## Item vs Field

Use `Field` if you need to display a form input such as a checkbox, input, radio, or select.

If you only need to display content such as a title, description, and actions, use `Item`.

## Examples

### Basic

::prose-show-case

:DocsItem

#code

<!-- automd:file src="../../app/components/content/Docs/Item/DocsItem.vue" code lang="vue" -->

```vue [DocsItem.vue]
<template>
  <div class="mx-auto flex w-full max-w-md flex-col gap-6">
    <UiItem variant="outline">
      <UiItemContent>
        <UiItemTitle>Basic Item</UiItemTitle>
        <UiItemDescription> A simple item with title and description. </UiItemDescription>
      </UiItemContent>
      <UiItemActions>
        <UiButton variant="outline" size="sm"> Action </UiButton>
      </UiItemActions>
    </UiItem>
    <UiItem variant="outline" size="sm" as-child>
      <a href="#">
        <UiItemMedia>
          <Icon name="lucide:badge-check" class="size-5" />
        </UiItemMedia>
        <UiItemContent>
          <UiItemTitle>Your profile has been verified.</UiItemTitle>
        </UiItemContent>
        <UiItemActions>
          <Icon name="lucide:chevron-right" class="size-4" />
        </UiItemActions>
      </a>
    </UiItem>
  </div>
</template>

<script lang="ts" setup></script>
```

<!-- /automd -->

::

### Variants

::prose-show-case

:DocsItemVariants

#code

<!-- automd:file src="../../app/components/content/Docs/Item/DocsItemVariants.vue" code lang="vue" -->

```vue [DocsItemVariants.vue]
<template>
  <div class="mx-auto flex w-full max-w-xl flex-col gap-6">
    <UiItem v-for="(item, index) in items" :key="index" :variant="item.variant">
      <UiItemContent>
        <UiItemTitle>{{ item.title }}</UiItemTitle>
        <UiItemDescription>
          {{ item.description }}
        </UiItemDescription>
      </UiItemContent>
      <UiItemActions>
        <UiButton variant="outline" size="sm">{{ item.action }}</UiButton>
      </UiItemActions>
    </UiItem>
  </div>
</template>

<script lang="ts" setup>
  const items = [
    {
      title: "Default Variant",
      description: "Standard styling with subtle background and borders.",
      action: "Open",
      variant: "default",
    },
    {
      title: "Outline Variant",
      description: "Outlined style with clear borders and transparent background.",
      action: "Open",
      variant: "outline",
    },
    {
      title: "Muted Variant",
      description: "Subdued appearance with muted colors for secondary content.",
      action: "Open",
      variant: "muted",
    },
  ] as const;
</script>
```

<!-- /automd -->

::

### Size

The `Item` component has different sizes for different use cases. For example, you can use the `sm` size for a compact item or the `default` size for a standard item.

::prose-show-case

:DocsItemSize

#code

<!-- automd:file src="../../app/components/content/Docs/Item/DocsItemSize.vue" code lang="vue" -->

```vue [DocsItemSize.vue]
<template>
  <div class="mx-auto flex w-full max-w-md flex-col gap-6">
    <UiItem variant="outline">
      <UiItemContent>
        <UiItemTitle>Basic Item</UiItemTitle>
        <UiItemDescription> A simple item with title and description. </UiItemDescription>
      </UiItemContent>
      <UiItemActions>
        <UiButton variant="outline" size="sm"> Action </UiButton>
      </UiItemActions>
    </UiItem>
    <UiItem variant="outline" size="sm" as-child>
      <NuxtLink href="#">
        <UiItemMedia>
          <Icon name="lucide:badge-check" class="size-5" />
        </UiItemMedia>
        <UiItemContent>
          <UiItemTitle>Your profile has been verified.</UiItemTitle>
        </UiItemContent>
        <UiItemActions>
          <Icon name="lucide:chevron-right" class="size-4" />
        </UiItemActions>
      </NuxtLink>
    </UiItem>
  </div>
</template>
```

<!-- /automd -->

::

### Icon

::prose-show-case

:DocsItemIcon

#code

<!-- automd:file src="../../app/components/content/Docs/Item/DocsItemIcon.vue" code lang="vue" -->

```vue [DocsItemIcon.vue]
<template>
  <div class="mx-auto flex w-full max-w-lg flex-col gap-6">
    <UiItem variant="outline">
      <UiItemMedia variant="icon">
        <Icon name="lucide:shield-alert" />
      </UiItemMedia>
      <UiItemContent>
        <UiItemTitle>Security Alert</UiItemTitle>
        <UiItemDescription> New login detected from unknown device. </UiItemDescription>
      </UiItemContent>
      <UiItemActions>
        <UiButton size="sm" variant="outline"> Review </UiButton>
      </UiItemActions>
    </UiItem>
  </div>
</template>
```

<!-- /automd -->

::

### Avatar

::prose-show-case

:DocsItemAvatar

#code

<!-- automd:file src="../../app/components/content/Docs/Item/DocsItemAvatar.vue" code lang="vue" -->

```vue [DocsItemAvatar.vue]
<template>
  <div class="mx-auto flex w-full max-w-lg flex-col gap-6">
    <UiItem variant="outline">
      <UiItemMedia>
        <UiAvatar class="size-10">
          <UiAvatarImage class="bg-muted" src="https://github.com/baybreezy.png" alt="@baybreezy" />
          <UiAvatarFallback>BR</UiAvatarFallback>
        </UiAvatar>
      </UiItemMedia>
      <UiItemContent>
        <UiItemTitle>Behon Baker</UiItemTitle>
        <UiItemDescription>Last seen 5 months ago</UiItemDescription>
      </UiItemContent>
      <UiItemActions>
        <UiButton size="icon-sm" variant="outline" class="rounded-full" aria-label="Invite">
          <Icon name="lucide:plus" />
        </UiButton>
      </UiItemActions>
    </UiItem>
    <UiItem variant="outline">
      <UiItemMedia>
        <div
          class="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale"
        >
          <UiAvatar class="hidden sm:flex">
            <UiAvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <UiAvatarFallback>CN</UiAvatarFallback>
          </UiAvatar>
          <UiAvatar class="hidden sm:flex">
            <UiAvatarImage
              class="bg-muted"
              src="https://github.com/baybreezy.png"
              alt="@baybreezy"
            />
            <UiAvatarFallback>BR</UiAvatarFallback>
          </UiAvatar>
          <UiAvatar>
            <UiAvatarImage src="https://github.com/mirari.png" alt="@mirari" />
            <UiAvatarFallback>MI</UiAvatarFallback>
          </UiAvatar>
        </div>
      </UiItemMedia>
      <UiItemContent>
        <UiItemTitle>No Team Members</UiItemTitle>
        <UiItemDescription> Invite your team to collaborate on this project. </UiItemDescription>
      </UiItemContent>
      <UiItemActions>
        <UiButton size="sm" variant="outline"> Invite </UiButton>
      </UiItemActions>
    </UiItem>
  </div>
</template>

<script lang="ts" setup></script>
```

<!-- /automd -->

::

### Image

::prose-show-case

:DocsItemImage

#code

<!-- automd:file src="../../app/components/content/Docs/Item/DocsItemImage.vue" code lang="vue" -->

```vue [DocsItemImage.vue]
<template>
  <div class="mx-auto flex w-full max-w-md flex-col gap-6">
    <UiItemGroup class="gap-4">
      <UiItem v-for="(song, i) in music" :key="i" variant="outline" as-child role="listitem">
        <NuxtLink href="#">
          <UiItemMedia variant="image">
            <img
              :src="`https://avatar.vercel.sh/${song.title}`"
              :alt="song.title"
              :width="32"
              :height="32"
              class="object-cover grayscale transition-all group-hover/item:grayscale-0"
            />
          </UiItemMedia>
          <UiItemContent>
            <UiItemTitle class="line-clamp-1">
              {{ song.title }} -
              <span class="text-muted-foreground">{{ song.album }}</span>
            </UiItemTitle>
            <UiItemDescription>{{ song.artist }}</UiItemDescription>
          </UiItemContent>
          <UiItemContent class="flex-none text-center">
            <UiItemDescription>{{ song.duration }}</UiItemDescription>
          </UiItemContent>
        </NuxtLink>
      </UiItem>
    </UiItemGroup>
  </div>
</template>

<script lang="ts" setup>
  const music = [
    {
      title: "Midnight City Lights",
      artist: "Neon Dreams",
      album: "Electric Nights",
      duration: "3:45",
    },
    {
      title: "Coffee Shop Conversations",
      artist: "The Morning Brew",
      album: "Urban Stories",
      duration: "4:05",
    },
    {
      title: "Digital Rain",
      artist: "Cyber Symphony",
      album: "Binary Beats",
      duration: "3:30",
    },
  ];
</script>
```

<!-- /automd -->

::

### Group

::prose-show-case

:DocsItemGroup

#code

<!-- automd:file src="../../app/components/content/Docs/Item/DocsItemGroup.vue" code lang="vue" -->

```vue [DocsItemGroup.vue]
<template>
  <div class="mx-auto flex w-full max-w-md flex-col gap-6">
    <UiItemGroup>
      <template v-for="(person, index) in people" :key="index">
        <UiItem>
          <UiItemMedia>
            <UiAvatar>
              <UiAvatarImage :src="person.avatar" class="grayscale group-hover/item:grayscale-0" />
              <UiAvatarFallback>{{ person.username.charAt(0) }}</UiAvatarFallback>
            </UiAvatar>
          </UiItemMedia>
          <UiItemContent class="gap-1">
            <UiItemTitle>{{ person.username }}</UiItemTitle>
            <UiItemDescription>{{ person.email }}</UiItemDescription>
          </UiItemContent>
          <UiItemActions>
            <UiButton variant="ghost" size="icon" class="rounded-full">
              <Icon name="lucide:plus" />
            </UiButton>
          </UiItemActions>
        </UiItem>
        <UiItemSeparator v-if="index !== people.length - 1" />
      </template>
    </UiItemGroup>
  </div>
</template>

<script lang="ts" setup>
  const people = [
    {
      username: "baybreezy",
      avatar: "https://github.com/baybreezy.png",
      email: "baybreezy@uithing.com",
    },
    {
      username: "mirari",
      avatar: "https://github.com/mirari.png",
      email: "mirari@uithing.com",
    },
    {
      username: "evilrabbit",
      avatar: "https://github.com/evilrabbit.png",
      email: "evilrabbit@uithing.com",
    },
  ];
</script>
```

<!-- /automd -->

::

### Header

::prose-show-case

:DocsItemHeader

#code

<!-- automd:file src="../../app/components/content/Docs/Item/DocsItemHeader.vue" code lang="vue" -->

```vue [DocsItemHeader.vue]
<template>
  <div class="mx-auto flex w-full max-w-xl flex-col gap-6">
    <UiItemGroup class="grid grid-cols-3 gap-4">
      <UiItem v-for="(model, i) in models" :key="i" variant="outline">
        <UiItemHeader>
          <img
            :src="model.image"
            :alt="model.name"
            :width="128"
            :height="128"
            class="aspect-square w-full rounded-sm object-cover"
          />
        </UiItemHeader>
        <UiItemContent>
          <UiItemTitle>{{ model.name }}</UiItemTitle>
          <UiItemDescription>{{ model.description }}</UiItemDescription>
        </UiItemContent>
      </UiItem>
    </UiItemGroup>
  </div>
</template>

<script lang="ts" setup>
  const models = [
    {
      name: "v0-1.5-sm",
      description: "Everyday tasks and UI generation.",
      image:
        "https://images.unsplash.com/photo-1650804068570-7fb2e3dbf888?q=80&w=640&auto=format&fit=crop",
      credit: "Valeria Reverdo on Unsplash",
    },
    {
      name: "v0-1.5-lg",
      description: "Advanced thinking or reasoning.",
      image:
        "https://images.unsplash.com/photo-1610280777472-54133d004c8c?q=80&w=640&auto=format&fit=crop",
      credit: "Michael Oeser on Unsplash",
    },
    {
      name: "v0-2.0-mini",
      description: "Open Source model for everyone.",
      image:
        "https://images.unsplash.com/photo-1602146057681-08560aee8cde?q=80&w=640&auto=format&fit=crop",
      credit: "Cherry Laithang on Unsplash",
    },
  ];
</script>
```

<!-- /automd -->

::

### Link

To render an item as a link, use the `as-child` prop. The hover and focus states will be applied to the anchor element.

::prose-show-case

:DocsItemLink

#code

<!-- automd:file src="../../app/components/content/Docs/Item/DocsItemLink.vue" code lang="vue" -->

```vue [DocsItemLink.vue]
<template>
  <div class="mx-auto flex w-full max-w-md flex-col gap-4">
    <UiItem as-child>
      <NuxtLink href="#">
        <UiItemContent>
          <UiItemTitle>Visit our documentation</UiItemTitle>
          <UiItemDescription> Learn how to get started with our components. </UiItemDescription>
        </UiItemContent>
        <UiItemActions>
          <Icon name="lucide:chevron-right" class="size-4" />
        </UiItemActions>
      </NuxtLink>
    </UiItem>
    <UiItem variant="outline" as-child>
      <NuxtLink href="#" target="_blank" rel="noopener noreferrer">
        <UiItemContent>
          <UiItemTitle>External resource</UiItemTitle>
          <UiItemDescription> Opens in a new tab with security attributes. </UiItemDescription>
        </UiItemContent>
        <UiItemActions>
          <Icon name="lucide:external-link" class="size-4" />
        </UiItemActions>
      </NuxtLink>
    </UiItem>
  </div>
</template>

<script lang="ts" setup></script>
```

<!-- /automd -->

::

### Dropdown

::prose-show-case

:DocsItemDropdown

#code

<!-- automd:file src="../../app/components/content/Docs/Item/DocsItemDropdown.vue" code lang="vue" -->

```vue [DocsItemDropdown.vue]
<template>
  <div class="mx-auto flex min-h-64 w-full max-w-md flex-col items-center gap-6">
    <UiDropdownMenu>
      <UiDropdownMenuTrigger as-child>
        <UiButton variant="outline" size="sm" class="w-fit">
          Select <Icon name="lucide:chevron-down" />
        </UiButton>
      </UiDropdownMenuTrigger>
      <UiDropdownMenuContent class="w-72 [--radius:0.65rem]" align="end">
        <UiDropdownMenuItem v-for="person in people" :key="person.username" class="p-0">
          <UiItem size="sm" class="w-full p-2">
            <UiItemMedia>
              <UiAvatar class="size-8">
                <UiAvatarImage
                  :src="person.avatar"
                  :alt="`${person.username}'s avatar`"
                  class="grayscale"
                />
                <UiAvatarFallback>{{ person.username.charAt(0) }}</UiAvatarFallback>
              </UiAvatar>
            </UiItemMedia>
            <UiItemContent class="gap-0.5">
              <UiItemTitle>{{ person.username }}</UiItemTitle>
              <UiItemDescription>{{ person.email }}</UiItemDescription>
            </UiItemContent>
          </UiItem>
        </UiDropdownMenuItem>
      </UiDropdownMenuContent>
    </UiDropdownMenu>
  </div>
</template>

<script lang="ts" setup>
  const people = [
    {
      username: "baybreezy",
      avatar: "https://github.com/baybreezy.png",
      email: "baybreezy@uithing.com",
    },
    {
      username: "mirari",
      avatar: "https://github.com/mirari.png",
      email: "mirari@uithing.com",
    },
    {
      username: "evilrabbit",
      avatar: "https://github.com/evilrabbit.png",
      email: "evilrabbit@uithing.com",
    },
  ];
</script>
```

<!-- /automd -->

::
