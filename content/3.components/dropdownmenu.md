---
title: Dropdown Menu
description: Displays a menu to the user—such as a set of actions or functions—triggered by a button.
links:
  - title: Radix-Vue
    href: https://www.radix-vue.com/components/dropdown-menu.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://www.radix-vue.com/components/dropdown-menu.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="DropdownMenu"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add dropdown-menu
```

## Usage

### Menu Items w/ Submenu

::ShowCase

:DocsDropdownMenuBasic

#code

<!-- automd:file src="../../app/components/content/Docs/DropdownMenu/DocsDropdownMenuBasic.vue" code lang="vue" -->

```vue [DocsDropdownMenuBasic.vue]
<template>
  <div class="flex items-center justify-center">
    <UiDropdownMenu>
      <UiDropdownMenuTrigger as-child>
        <UiButton variant="outline">Open menu</UiButton>
      </UiDropdownMenuTrigger>
      <UiDropdownMenuContent class="w-56">
        <template v-for="(item, i) in menuitems" :key="i">
          <UiDropdownMenuLabel v-if="item.label" :label="item.label" />
          <UiDropdownMenuSeparator v-else-if="item.divider" />
          <UiDropdownMenuItem
            v-else-if="item.title && !item.items"
            :title="item.title"
            :icon="item.icon"
            :shortcut="item.shortcut"
            :disabled="item.disabled"
          />
          <UiDropdownMenuSub v-else-if="item.title && item.items">
            <UiDropdownMenuSubTrigger
              :title="item.title"
              :icon="item.icon"
              :text-value="item.title"
            />
            <UiDropdownMenuSubContent>
              <template v-for="(child, k) in item.items" :key="`child-${k}`">
                <UiDropdownMenuSeparator v-if="child.divider" />
                <UiDropdownMenuItem
                  v-else
                  :title="child.title"
                  :icon="child.icon"
                  :shortcut="child.shortcut"
                />
              </template>
            </UiDropdownMenuSubContent>
          </UiDropdownMenuSub>
        </template>
      </UiDropdownMenuContent>
    </UiDropdownMenu>
  </div>
</template>

<script lang="ts" setup>
  const menuitems = [
    { label: "My Account" },
    { divider: true },
    { title: "Profile", icon: "ph:user", shortcut: "⇧⌘P" },
    { title: "Billing", icon: "ph:credit-card", shortcut: "⌘B" },
    { title: "Settings", icon: "ph:gear", shortcut: "⌘S" },
    { title: "Keyboard shortcuts", icon: "ph:keyboard", shortcut: "⌘K" },
    { divider: true },
    { title: "Team", icon: "ph:users", shortcut: "⇧⌘T" },
    {
      title: "Invite Users",
      icon: "ph:user-plus",
      items: [
        { title: "Email", icon: "ph:envelope", shortcut: "⇧⌘E" },
        { title: "Facebook", icon: "logos:facebook", shortcut: "⇧⌘F" },
        { title: "Twitter", icon: "logos:twitter", shortcut: "⇧⌘T" },
        { divider: true },
        { title: "More", icon: "ph:plus-circle" },
      ],
    },
    { title: "Settings", icon: "ph:gear", shortcut: "⌘S" },
    { title: "Keyboard shortcuts", icon: "ph:keyboard", shortcut: "⌘K" },
    { divider: true },
    { title: "Github", icon: "ph:github-logo" },
    { title: "Support", icon: "ph:lifebuoy" },
    { title: "API", icon: "ph:cloud", disabled: true },
    { divider: true },
    { title: "Sign out", icon: "ph:sign-out" },
  ];
</script>
```

<!-- /automd -->

::

### Checkbox Menu Items

::ShowCase

:DocsDropdownMenuCheckItems

#code

<!-- automd:file src="../../app/components/content/Docs/DropdownMenu/DocsDropdownMenuCheckItems.vue" code lang="vue" -->

```vue [DocsDropdownMenuCheckItems.vue]
<template>
  <div class="flex w-full items-center justify-center">
    <UiDropdownMenu>
      <UiDropdownMenuTrigger as-child>
        <UiButton variant="outline">Checbox items</UiButton>
      </UiDropdownMenuTrigger>
      <UiDropdownMenuContent class="w-48">
        <UiDropdownMenuLabel label="Choose heros" />
        <UiDropdownMenuSeparator />
        <template v-for="h in heroList" :key="h.id">
          <UiDropdownMenuCheckboxItem
            :checked="selectedHeros.includes(h.id)"
            class="mb-1"
            @select="(e) => e.preventDefault()"
            @update:checked="
              selectedHeros.includes(h.id)
                ? selectedHeros.splice(selectedHeros.indexOf(h.id), 1)
                : selectedHeros.push(h.id)
            "
          >
            <div class="flex items-center gap-4">
              <UiAvatar :src="h.image" class="h-6 w-6" :alt="h.name" />
              <span>{{ h.name }}</span>
            </div>
          </UiDropdownMenuCheckboxItem>
        </template>
      </UiDropdownMenuContent>
    </UiDropdownMenu>
  </div>
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

### Radio Menu Items

::ShowCase

:DocsDropdownMenuRadioItems

#code

<!-- automd:file src="../../app/components/content/Docs/DropdownMenu/DocsDropdownMenuRadioItems.vue" code lang="vue" -->

```vue [DocsDropdownMenuRadioItems.vue]
<template>
  <div class="flex w-full items-center justify-center">
    <UiDropdownMenu>
      <UiDropdownMenuTrigger as-child>
        <UiButton variant="outline">Radio options</UiButton>
      </UiDropdownMenuTrigger>

      <UiDropdownMenuContent class="w-48">
        <UiDropdownMenuLabel label="Tooltip placement" />
        <UiDropdownMenuSeparator />
        <UiDropdownMenuRadioGroup v-model="placement">
          <UiDropdownMenuRadioItem
            v-for="item in placements"
            :key="item"
            :value="item"
            :title="item"
            :text-value="item"
            @select="(e) => e.preventDefault()"
          />
        </UiDropdownMenuRadioGroup>
      </UiDropdownMenuContent>
    </UiDropdownMenu>
  </div>
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
