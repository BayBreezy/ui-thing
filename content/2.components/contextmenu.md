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

::ShowCase{component="DocsContextMenuBasic"}

#code

```vue [DocsContextMenuBasic.vue]
<template>
  <UIContextMenu>
    <UIContextMenuTrigger
      as="div"
      class="mx-auto flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm"
    >
      Right click to see basic context menu
    </UIContextMenuTrigger>
    <UIContextMenuContent loop class="w-64">
      <UIContextMenuItem title="Back" inset shortcut="⌘[" />
      <UIContextMenuItem title="Forward" disabled inset shortcut="⌘]" />
      <UIContextMenuItem title="Reload" inset shortcut="⌘R" />
      <UIContextMenuSub>
        <UIContextMenuSubTrigger title="More Tools" inset />
        <UIContextMenuSubContent class="w-52">
          <UIContextMenuItem title="New window..." />
          <UIContextMenuItem title="Create shortcut..." />
          <UIContextMenuItem title="Save page as..." shortcut="⌘S" />
          <UIContextMenuItem title="Clear data" shortcut="⌘⇧⌫" />
          <UIContextMenuSeparator />
          <UIContextMenuItem title="Developer tools" shortcut="⌥⌘I" />
        </UIContextMenuSubContent>
      </UIContextMenuSub>
      <UIContextMenuSeparator />
      <UIContextMenuCheckboxItem
        v-model:checked="showBookmark"
        @select="(e) => e.preventDefault()"
        title="Show Bookmarks Bar"
        inset
        shortcut="⌘⇧B"
      />
      <UIContextMenuCheckboxItem
        v-model:checked="showFullUrls"
        @select="(e) => e.preventDefault()"
        title="Show full URLs"
        inset
        shortcut="⌘⇧U"
      />
      <UIContextMenuSeparator />
      <UIContextMenuLabel inset label="Choose a person" />
      <UIContextMenuSeparator />
      <UIContextMenuRadioGroup v-model="person">
        <UIContextMenuRadioItem
          @select="(e) => e.preventDefault()"
          title="Paul Rafael"
          inset
          value="1"
        />
        <UIContextMenuRadioItem
          @select="(e) => e.preventDefault()"
          title="Sarah Lindsey"
          inset
          value="2"
        />
      </UIContextMenuRadioGroup>
    </UIContextMenuContent>
  </UIContextMenu>
</template>

<script lang="ts" setup>
  const showBookmark = ref(true);
  const showFullUrls = ref(false);
  const person = ref("1");
</script>
```

::

### Checkbox Items

::ShowCase{component="DocsContextMenuCheckItems"}

#code

```vue [DocsContextMenuCheckItems.vue]
<template>
  <UIContextMenu>
    <UIContextMenuTrigger as-child>
      <div
        class="mx-auto flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm"
      >
        Right click for check items menu
      </div>
    </UIContextMenuTrigger>
    <UIContextMenuContent class="w-52">
      <UIContextMenuLabel class="my-1" label="Choose your hero(s)" />
      <UIContextMenuSeparator />
      <UIContextMenuGroup>
        <UIContextMenuCheckboxItem
          inset
          v-for="hero in heroList"
          :key="hero.id"
          @select="(e) => e.preventDefault()"
          class="mb-1"
          :checked="selectedHeros.includes(hero.id)"
          @click="
            selectedHeros.includes(hero.id)
              ? selectedHeros.splice(selectedHeros.indexOf(hero.id), 1)
              : selectedHeros.push(hero.id)
          "
        >
          <div class="flex items-center gap-4">
            <UIAvatar :src="hero.image" class="h-6 w-6" :alt="hero.name" />
            <span>{{ hero.name }}</span>
          </div>
        </UIContextMenuCheckboxItem>
      </UIContextMenuGroup>
    </UIContextMenuContent>
  </UIContextMenu>
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

::

### Radio Items

::ShowCase{component="DocsContextMenuRadioItems"}

#code

```vue [DocsContextMenuRadioItems.vue]
<template>
  <UIContextMenu>
    <UIContextMenuTrigger as-child>
      <div
        class="mx-auto flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm"
      >
        Right click for radio items context menu
      </div>
    </UIContextMenuTrigger>

    <UIContextMenuContent class="w-48">
      <UIContextMenuLabel label="Tooltip placement" />
      <UIContextMenuSeparator />
      <UIContextMenuRadioGroup v-model="placement">
        <UIContextMenuRadioItem
          v-for="item in placements"
          :key="item"
          :value="item"
          :title="item"
          :text-value="item"
        />
      </UIContextMenuRadioGroup>
    </UIContextMenuContent>
  </UIContextMenu>
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

::
