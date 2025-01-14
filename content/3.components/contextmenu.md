---
title: Context Menu
description: Displays a menu located at the pointer, triggered by a right-click or a long-press.
links:
  - title: Radix-Vue
    href: https://www.radix-vue.com/components/context-menu.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://www.radix-vue.com/components/context-menu.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="ContextMenu"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add context-menu
```

## Usage

### Basic

::ShowCase

:DocsContextMenuBasic

#code

<!-- automd:file src="../../app/components/content/Docs/ContextMenu/DocsContextMenuBasic.vue" code lang="vue" -->

```vue [DocsContextMenuBasic.vue]
<template>
  <UiContextMenu>
    <UiContextMenuTrigger
      as="div"
      class="mx-auto flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm"
    >
      Right click to see basic context menu
    </UiContextMenuTrigger>
    <UiContextMenuContent loop class="w-64">
      <UiContextMenuItem title="Back" inset shortcut="⌘[" />
      <UiContextMenuItem title="Forward" disabled inset shortcut="⌘]" />
      <UiContextMenuItem title="Reload" inset shortcut="⌘R" />
      <UiContextMenuSub>
        <UiContextMenuSubTrigger title="More Tools" inset />
        <UiContextMenuSubContent class="w-52">
          <UiContextMenuItem title="New window..." />
          <UiContextMenuItem title="Create shortcut..." />
          <UiContextMenuItem title="Save page as..." shortcut="⌘S" />
          <UiContextMenuItem title="Clear data" shortcut="⌘⇧⌫" />
          <UiContextMenuSeparator />
          <UiContextMenuItem title="Developer tools" shortcut="⌥⌘I" />
        </UiContextMenuSubContent>
      </UiContextMenuSub>
      <UiContextMenuSeparator />
      <UiContextMenuCheckboxItem
        v-model:checked="showBookmark"
        title="Show Bookmarks Bar"
        inset
        shortcut="⌘⇧B"
        @select="(e) => e.preventDefault()"
      />
      <UiContextMenuCheckboxItem
        v-model:checked="showFullUrls"
        title="Show full URLs"
        inset
        shortcut="⌘⇧U"
        @select="(e) => e.preventDefault()"
      />
      <UiContextMenuSeparator />
      <UiContextMenuLabel inset label="Choose a person" />
      <UiContextMenuSeparator />
      <UiContextMenuRadioGroup v-model="person">
        <UiContextMenuRadioItem
          title="Paul Rafael"
          inset
          value="1"
          @select="(e) => e.preventDefault()"
        />
        <UiContextMenuRadioItem
          title="Sarah Lindsey"
          inset
          value="2"
          @select="(e) => e.preventDefault()"
        />
      </UiContextMenuRadioGroup>
    </UiContextMenuContent>
  </UiContextMenu>
</template>

<script lang="ts" setup>
  const showBookmark = ref(true);
  const showFullUrls = ref(false);
  const person = ref("1");
</script>
```

<!-- /automd -->

::

### Checkbox Items

::ShowCase

:DocsContextMenuCheckItems

#code

<!-- automd:file src="../../app/components/content/Docs/ContextMenu/DocsContextMenuCheckItems.vue" code lang="vue" -->

```vue [DocsContextMenuCheckItems.vue]
<template>
  <UiContextMenu>
    <UiContextMenuTrigger as-child>
      <div
        class="mx-auto flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm"
      >
        Right click for check items menu
      </div>
    </UiContextMenuTrigger>
    <UiContextMenuContent class="w-52">
      <UiContextMenuLabel class="my-1" label="Choose your hero(s)" />
      <UiContextMenuSeparator />
      <UiContextMenuGroup>
        <UiContextMenuCheckboxItem
          v-for="hero in heroList"
          :key="hero.id"
          inset
          class="mb-1"
          :checked="selectedHeros.includes(hero.id)"
          @select="(e) => e.preventDefault()"
          @click="
            selectedHeros.includes(hero.id)
              ? selectedHeros.splice(selectedHeros.indexOf(hero.id), 1)
              : selectedHeros.push(hero.id)
          "
        >
          <div class="flex items-center gap-4">
            <UiAvatar :src="hero.image" class="h-6 w-6" :alt="hero.name" />
            <span>{{ hero.name }}</span>
          </div>
        </UiContextMenuCheckboxItem>
      </UiContextMenuGroup>
    </UiContextMenuContent>
  </UiContextMenu>
</template>

<script lang="ts" setup>
  const heroList = [
    {
      name: "Batman",
      id: "1",
      image:
        "https://static.dc.com/dc/files/default_images/Char_Profile_Batman_20190116_5c3fc4b40faec2.47318964.jpg",
    },
    {
      name: "Superman",
      id: "2",
      image: "https://s26162.pcdn.co/wp-content/uploads/2023/02/superman-1240x692.jpeg",
    },
    {
      name: "Hulk",
      id: "3",
      image:
        "https://a1cf74336522e87f135f-2f21ace9a6cf0052456644b80fa06d4f.ssl.cf2.rackcdn.com/images/characters/large/800/The-Hulk.The-Incredible-Hulk.webp",
    },
  ];
  const selectedHeros = ref<string[]>([]);
</script>
```

<!-- /automd -->

::

### Radio Items

::ShowCase

:DocsContextMenuRadioItems

#code

<!-- automd:file src="../../app/components/content/Docs/ContextMenu/DocsContextMenuRadioItems.vue" code lang="vue" -->

```vue [DocsContextMenuRadioItems.vue]
<template>
  <UiContextMenu>
    <UiContextMenuTrigger as-child>
      <div
        class="mx-auto flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm"
      >
        Right click for radio items context menu
      </div>
    </UiContextMenuTrigger>

    <UiContextMenuContent class="w-48">
      <UiContextMenuLabel label="Tooltip placement" />
      <UiContextMenuSeparator />
      <UiContextMenuRadioGroup v-model="placement">
        <UiContextMenuRadioItem
          v-for="item in placements"
          :key="item"
          :value="item"
          :title="item"
          :text-value="item"
        />
      </UiContextMenuRadioGroup>
    </UiContextMenuContent>
  </UiContextMenu>
</template>

<script lang="ts" setup>
  const placement = ref("top-start");
  const placements = [
    "top-start",
    "top",
    "top-end",
    "right-start",
    "right",
    "right-end",
    "bottom-start",
    "bottom",
    "bottom-end",
    "left-start",
    "left",
    "left-end",
  ];
</script>
```

<!-- /automd -->

::
