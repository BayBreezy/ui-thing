---
title: Dropdown Menu
description: Displays a menu to the user—such as a set of actions or functions—triggered by a button.
links:
  - title: Reka UI
    href: https://reka-ui.com/docs/components/dropdown-menu.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://reka-ui.com/docs/components/dropdown-menu.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="DropdownMenu"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add dropdown-menu"}

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

### Translucent Surface

Use the `translucent` prop on the content surface when you want a softer glassmorphic menu treatment without changing the menu behavior.

::ShowCase

:DocsDropdownMenuTranslucent

#code

<!-- automd:file src="../../app/components/content/Docs/DropdownMenu/DocsDropdownMenuTranslucent.vue" code lang="vue" -->

```vue [DocsDropdownMenuTranslucent.vue]
<template>
  <div class="flex items-center justify-center">
    <UiDropdownMenu>
      <UiDropdownMenuTrigger as-child>
        <UiButton variant="outline">Translucent menu</UiButton>
      </UiDropdownMenuTrigger>
      <UiDropdownMenuContent translucent class="w-56">
        <UiDropdownMenuArrow translucent />
        <UiDropdownMenuLabel label="Workspace" />
        <UiDropdownMenuSeparator />
        <UiDropdownMenuItem title="Profile" icon="ph:user" shortcut="⇧⌘P" />
        <UiDropdownMenuItem title="Theme" icon="ph:palette" shortcut="⌘T" />
        <UiDropdownMenuSub>
          <UiDropdownMenuSubTrigger title="Share" icon="ph:share-network" text-value="Share" />
          <UiDropdownMenuSubContent translucent>
            <UiDropdownMenuItem title="Copy link" icon="ph:link" shortcut="⌘C" />
            <UiDropdownMenuItem title="Invite team" icon="ph:users-three" shortcut="⇧⌘I" />
          </UiDropdownMenuSubContent>
        </UiDropdownMenuSub>
        <UiDropdownMenuSeparator />
        <UiDropdownMenuItem title="Sign out" icon="ph:sign-out" />
      </UiDropdownMenuContent>
    </UiDropdownMenu>
  </div>
</template>
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
            :model-value="selectedHeros.includes(h.id)"
            class="mb-1"
            @select="(e) => e.preventDefault()"
            @update:model-value="
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

### Origin UI Examples

::ShowCase

:DocsDropdownMenuOriginU-I

#code

<!-- automd:file src="../../app/components/content/Docs/DropdownMenu/DocsDropdownMenuOriginUI.vue" code lang="vue" -->

```vue [DocsDropdownMenuOriginUI.vue]
<template>
  <div class="@container">
    <div class="flex flex-col divide-y">
      <!-- Row -->
      <div class="flex h-32 w-full items-stretch">
        <!-- Left column -->
        <div class="flex flex-1 items-center justify-center border-r">
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiButton
                size="icon"
                variant="ghost"
                class="rounded-full shadow-none"
                aria-label="Open edit menu"
              >
                <Icon name="lucide:ellipsis" class="size-4" aria-hidden="true" />
              </UiButton>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent>
              <UiDropdownMenuItem v-for="item in 4" :key="item" :title="`Option ${item}`" />
            </UiDropdownMenuContent>
          </UiDropdownMenu>
        </div>
        <!-- Right column -->
        <div class="flex flex-1 items-center justify-center">
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiButton variant="outline">
                Same width of trigger
                <Icon
                  name="lucide:chevron-down"
                  class="-me-1 size-4 opacity-60"
                  aria-hidden="true"
                />
              </UiButton>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent class="min-w-(--reka-dropdown-menu-trigger-width)">
              <UiDropdownMenuItem v-for="item in 4" :key="item" :title="`Option ${item}`" />
            </UiDropdownMenuContent>
          </UiDropdownMenu>
        </div>
      </div>
      <!-- Row -->
      <div class="flex h-32 w-full items-stretch">
        <!-- Left column -->
        <div class="flex flex-1 items-center justify-center border-r">
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiButton variant="outline">
                Menu with icons
                <Icon
                  name="lucide:chevron-down"
                  class="-me-1 size-4 opacity-60"
                  aria-hidden="true"
                />
              </UiButton>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent class="min-w-(--reka-dropdown-menu-trigger-width)">
              <UiDropdownMenuItem v-for="item in menuWithIcons" :key="item.title">
                <Icon :name="item.icon" class="size-4 opacity-60" aria-hidden="true" />
                {{ item.title }}
              </UiDropdownMenuItem>
            </UiDropdownMenuContent>
          </UiDropdownMenu>
        </div>
        <!-- Right column -->
        <div class="flex flex-1 items-center justify-center">
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiButton variant="outline">
                Grouped items
                <Icon
                  name="lucide:chevron-down"
                  class="-me-1 size-4 opacity-60"
                  aria-hidden="true"
                />
              </UiButton>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent class="min-w-(--reka-dropdown-menu-trigger-width)">
              <template v-for="(group, index) in groupedItems" :key="`group-${index}`">
                <UiDropdownMenuGroup v-for="(item, i) in group" :key="i">
                  <UiDropdownMenuItem :variant="item.variant ?? 'default'" :title="item.title">
                    <Icon :name="item.icon" class="size-4 opacity-60" aria-hidden="true" />
                    {{ item.title }}
                  </UiDropdownMenuItem>
                </UiDropdownMenuGroup>
                <UiDropdownMenuSeparator class="last:hidden" />
              </template>
            </UiDropdownMenuContent>
          </UiDropdownMenu>
        </div>
      </div>
      <!-- Row -->
      <div class="flex h-32 w-full items-stretch">
        <!-- Left column -->
        <div class="flex flex-1 items-center justify-center border-r">
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiButton variant="outline">
                Labeled grouped items
                <Icon
                  name="lucide:chevron-down"
                  class="-me-1 size-4 opacity-60"
                  aria-hidden="true"
                />
              </UiButton>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent class="min-w-(--reka-dropdown-menu-trigger-width)">
              <UiDropdownMenuLabel>Label</UiDropdownMenuLabel>
              <UiDropdownMenuGroup>
                <UiDropdownMenuItem title="Copy" icon="lucide:copy-plus" />
                <UiDropdownMenuItem title="Edit" icon="lucide:bolt" />
              </UiDropdownMenuGroup>
              <UiDropdownMenuSeparator />
              <UiDropdownMenuLabel>Label</UiDropdownMenuLabel>
              <UiDropdownMenuGroup>
                <UiDropdownMenuItem title="Group" icon="lucide:layers-2" />
                <UiDropdownMenuItem title="Clone" icon="lucide:files" />
                <UiDropdownMenuItem variant="destructive" title="Delete" icon="lucide:trash" />
              </UiDropdownMenuGroup>
            </UiDropdownMenuContent>
          </UiDropdownMenu>
        </div>
        <!-- Right column -->
        <div class="flex flex-1 items-center justify-center">
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiButton
                size="icon"
                variant="ghost"
                class="rounded-full shadow-none"
                aria-label="Open edit menu"
              >
                <Icon name="lucide:plus" class="size-4" aria-hidden="true" />
              </UiButton>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent class="pb-2">
              <UiDropdownMenuLabel>Add block</UiDropdownMenuLabel>
              <UiDropdownMenuItem v-for="(block, i) in blocks" :key="i">
                <div
                  class="flex size-8 items-center justify-center rounded-md border bg-accent text-accent-foreground"
                  aria-hidden="true"
                >
                  <Icon :name="block.icon" size="16" />
                </div>
                <div>
                  <div class="text-sm font-medium">{{ block.title }}</div>
                  <div class="text-xs text-muted-foreground">{{ block.description }}</div>
                </div>
              </UiDropdownMenuItem>
            </UiDropdownMenuContent>
          </UiDropdownMenu>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const menuWithIcons = [
    { title: "Copy", icon: "lucide:copy-plus" },
    { title: "Edit", icon: "lucide:bolt" },
    { title: "Group", icon: "lucide:layers-2" },
    { title: "Clone", icon: "lucide:files" },
  ];
  const groupedItems = [
    [
      { title: "Copy", icon: "lucide:copy-plus" },
      { title: "Edit", icon: "lucide:bolt" },
    ],
    [
      { title: "Group", icon: "lucide:layers-2" },
      { title: "Clone", icon: "lucide:files" },
      { title: "Delete", icon: "lucide:trash", variant: "destructive" },
    ],
  ];

  const blocks = [
    { title: "Text", icon: "lucide:type", description: "Start writing with plain text" },
    { title: "Quote", icon: "lucide:text-quote", description: "Capture a quote" },
    { title: "Divider", icon: "lucide:minus", description: "Visually divide blocks" },
    { title: "Heading 1", icon: "lucide:heading-1", description: "Big section heading" },
    { title: "Heading 2", icon: "lucide:heading-2", description: "Medium section subheading" },
  ];
</script>
```

<!-- /automd -->

::
