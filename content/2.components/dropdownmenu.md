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

::ShowCase{component="DocsDropdownMenuBasic"}

#code

```vue [DocsDropdownMenuBasic.vue],
<template>
  <div class="flex items-center justify-center">
    <UIDropdownMenu>
      <UIDropdownMenuTrigger asChild>
        <UIButton variant="outline">Open menu</UIButton>
      </UIDropdownMenuTrigger>
      <UIDropdownMenuContent class="w-56">
        <template v-for="(item, i) in menuitems" :key="i">
          <UIDropdownMenuLabel v-if="item.label" :label="item.label" />
          <UIDropdownMenuSeparator v-else-if="item.divider" />
          <UIDropdownMenuItem
            v-else-if="item.title && !item.items"
            :title="item.title"
            :icon="item.icon"
            :shortcut="item.shortcut"
            :disabled="item.disabled"
          />
          <UIDropdownMenuSub v-else-if="item.title && item.items">
            <UIDropdownMenuSubTrigger
              :title="item.title"
              :icon="item.icon"
              :textValue="item.title"
            />
            <UIDropdownMenuSubContent>
              <template v-for="(child, k) in item.items" :key="`child-${k}`">
                <UIDropdownMenuSeparator v-if="child.divider" />
                <UIDropdownMenuItem
                  v-else
                  :title="child.title"
                  :icon="child.icon"
                  :shortcut="child.shortcut"
                />
              </template>
            </UIDropdownMenuSubContent>
          </UIDropdownMenuSub>
        </template>
      </UIDropdownMenuContent>
    </UIDropdownMenu>
  </div>
</template>

<script lang="ts" setup>
  const showBookmark = ref(true);
  const showFullUrls = ref(false);
  const person = ref("1");

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

::

### Checkbox Menu Items

::ShowCase{component="DocsDropdownMenuCheckItems"}

#code

```vue [DocsDropdownMenuCheckItems.vue],
<template>
  <div class="flex w-full items-center justify-center">
    <UIDropdownMenu>
      <UIDropdownMenuTrigger as-child>
        <UIButton variant="outline">Checbox items</UIButton>
      </UIDropdownMenuTrigger>
      <UIDropdownMenuContent class="w-48">
        <UIDropdownMenuLabel label="Choose heros" />
        <UIDropdownMenuSeparator />
        <template v-for="h in heroList" :key="h.id">
          <UIDropdownMenuCheckboxItem
            :checked="selectedHeros.includes(h.id)"
            @select="(e) => e.preventDefault()"
            class="mb-1"
            @update:checked="
              selectedHeros.includes(h.id)
                ? selectedHeros.splice(selectedHeros.indexOf(h.id), 1)
                : selectedHeros.push(h.id)
            "
          >
            <div class="flex items-center gap-4">
              <UIAvatar :src="h.image" class="h-6 w-6" :alt="h.name" />
              <span>{{ h.name }}</span>
            </div>
          </UIDropdownMenuCheckboxItem>
        </template>
      </UIDropdownMenuContent>
    </UIDropdownMenu>
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

::

### Radio Menu Items

::ShowCase{component="DocsDropdownMenuRadioItems"}

#code

```vue [DocsDropdownMenuRadioItems.vue]
<template>
  <div class="flex w-full items-center justify-center">
    <UIDropdownMenu>
      <UIDropdownMenuTrigger as-child>
        <UIButton variant="outline">Radio options</UIButton>
      </UIDropdownMenuTrigger>

      <UIDropdownMenuContent class="w-48">
        <UIDropdownMenuLabel label="Tooltip placement" />
        <UIDropdownMenuSeparator />
        <UIDropdownMenuRadioGroup v-model="placement">
          <UIDropdownMenuRadioItem
            v-for="item in placements"
            :key="item"
            :value="item"
            :title="item"
            :text-value="item"
          />
        </UIDropdownMenuRadioGroup>
      </UIDropdownMenuContent>
    </UIDropdownMenu>
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

::
