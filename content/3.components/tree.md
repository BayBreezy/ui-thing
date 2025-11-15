---
title: Tree
description: A tree view widget displays a hierarchical list of items that can be expanded or collapsed to show or hide their child items, such as in a file system navigator.
links:
  - title: Reka UI
    href: https://reka-ui.com/docs/components/tree.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://reka-ui.com/docs/components/tree.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Tree"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add tree"}

## Usage

### Basic

The `Tree` component can be styled to look like anything you want. For that reason, I decided to not style the tree component at all. Instead, I provide a basic example of how to use the tree component.

::ShowCase

:DocsTree

#code

<!-- automd:file src="../../app/components/content/Docs/Tree/DocsTree.vue" code lang="vue" -->

```vue [DocsTree.vue]
<template>
  <div class="flex justify-center">
    <UiScrollArea class="max-h-[500px] w-[250px] rounded-md border bg-background">
      <UiTree
        v-slot="{ flattenItems }"
        :default-expanded="['app', 'server']"
        :items="structure"
        :get-key="(i) => i.title"
        class="p-2 pr-3"
      >
        <p class="mb-3 text-sm font-semibold">Nuxt 4 directory structure</p>
        <template v-for="item in flattenItems" :key="item._id">
          <TreeItem
            v-slot="{ isExpanded }"
            v-bind="item.bind"
            :style="{ 'padding-left': `${item.level - 0.5}rem` }"
            class="flex cursor-pointer items-center gap-2 rounded px-2 py-1 text-sm font-medium focus-visible:ring-2 focus-visible:ring-border focus-visible:outline-none"
          >
            <template v-if="item.hasChildren">
              <Icon v-if="isExpanded" :name="item.value.openIcon" class="size-3.5" />
              <Icon v-else :name="item.value.icon" class="size-3.5" />
            </template>
            <Icon v-else :name="item.value.icon || 'lucide:file'" class="size-3.5" />
            <div class="">{{ item.value.title }}</div>
          </TreeItem>
        </template>
      </UiTree>
    </UiScrollArea>
  </div>
</template>

<script lang="ts" setup>
  const structure = [
    {
      title: ".output",
      openIcon: "vscode-icons:default-folder-opened",
      icon: "vscode-icons:default-folder",
      children: [],
    },
    {
      title: ".nuxt",
      openIcon: "vscode-icons:folder-type-nuxt-opened",
      icon: "vscode-icons:folder-type-nuxt",
      children: [],
    },
    {
      title: "app",
      openIcon: "vscode-icons:default-folder-opened",
      icon: "vscode-icons:default-folder",
      children: [
        {
          title: "assets",
          openIcon: "vscode-icons:default-folder-opened",
          icon: "vscode-icons:default-folder",
          children: [
            {
              title: "css",
              openIcon: "vscode-icons:default-folder-opened",
              icon: "vscode-icons:default-folder",
              children: [
                {
                  title: "tailwind.css",
                  icon: "vscode-icons:file-type-css",
                },
              ],
            },
          ],
        },
        {
          title: "components",
          openIcon: "vscode-icons:default-folder-opened",
          icon: "vscode-icons:default-folder",
          children: [],
        },
        {
          title: "composables",
          openIcon: "vscode-icons:default-folder-opened",
          icon: "vscode-icons:default-folder",
          children: [
            {
              title: "useUser.ts",
              icon: "vscode-icons:file-type-typescript-official",
            },
          ],
        },
        {
          title: "layouts",
          openIcon: "vscode-icons:default-folder-opened",
          icon: "vscode-icons:default-folder",
          children: [
            {
              title: "default.vue",
              icon: "vscode-icons:file-type-vue",
            },
          ],
        },
        {
          title: "middleware",
          openIcon: "vscode-icons:default-folder-opened",
          icon: "vscode-icons:default-folder",
          children: [
            {
              title: "auth.ts",
              icon: "vscode-icons:file-type-typescript-official",
            },
          ],
        },
        {
          title: "pages",
          openIcon: "vscode-icons:default-folder-opened",
          icon: "vscode-icons:default-folder",
          children: [
            {
              title: "auth",
              openIcon: "vscode-icons:default-folder-opened",
              icon: "vscode-icons:default-folder",
              children: [
                {
                  title: "login",
                  openIcon: "vscode-icons:default-folder-opened",
                  icon: "vscode-icons:default-folder",
                  children: [
                    {
                      title: "index.vue",
                      icon: "vscode-icons:file-type-vue",
                    },
                  ],
                },
              ],
            },
            {
              title: "index.vue",
              icon: "vscode-icons:file-type-vue",
            },
          ],
        },
        {
          title: "plugins",
          openIcon: "vscode-icons:default-folder-opened",
          icon: "vscode-icons:default-folder",
          children: [
            {
              title: "fetch-user.ts",
              icon: "vscode-icons:file-type-typescript-official",
            },
          ],
        },
        {
          title: "utils",
          openIcon: "vscode-icons:default-folder-opened",
          icon: "vscode-icons:default-folder",
          children: [
            {
              title: "validation.ts",
              icon: "vscode-icons:file-type-typescript-official",
            },
          ],
        },
        {
          title: "app.config.ts",
          icon: "vscode-icons:file-type-typescript-official",
        },
        {
          title: "app.vue",
          icon: "vscode-icons:file-type-vue",
        },
        {
          title: "router.options.ts",
          icon: "vscode-icons:file-type-typescript-official",
        },
      ],
    },
    {
      title: "layers",
      openIcon: "vscode-icons:folder-type-nuxt-opened",
      icon: "vscode-icons:folder-type-nuxt",
      children: [],
    },
    {
      title: "modules",
      openIcon: "vscode-icons:folder-type-nuxt-opened",
      icon: "vscode-icons:folder-type-nuxt",
      children: [],
    },
    {
      title: "node_modules",
      openIcon: "vscode-icons:default-folder-opened",
      icon: "vscode-icons:default-folder",
      children: [],
    },
    {
      title: "public",
      openIcon: "vscode-icons:default-folder-opened",
      icon: "vscode-icons:default-folder",
      children: [],
    },
    {
      title: "server",
      openIcon: "vscode-icons:default-folder-opened",
      icon: "vscode-icons:default-folder",
      children: [
        {
          title: "api",
          openIcon: "vscode-icons:folder-type-nuxt-opened",
          icon: "vscode-icons:folder-type-nuxt",
          children: [],
        },
        {
          title: "middleware",
          openIcon: "vscode-icons:folder-type-nuxt-opened",
          icon: "vscode-icons:folder-type-nuxt",
          children: [],
        },
        {
          title: "plugins",
          openIcon: "vscode-icons:folder-type-nuxt-opened",
          icon: "vscode-icons:folder-type-nuxt",
          children: [],
        },
        {
          title: "routes",
          openIcon: "vscode-icons:folder-type-nuxt-opened",
          icon: "vscode-icons:folder-type-nuxt",
          children: [],
        },
        {
          title: "utils",
          openIcon: "vscode-icons:folder-type-nuxt-opened",
          icon: "vscode-icons:folder-type-nuxt",
          children: [],
        },
      ],
    },
    {
      title: "nuxt.config.ts",
      icon: "vscode-icons:file-type-typescript-official",
    },
  ];
</script>
```

<!-- /automd -->

::

### Virtualizer

We can render a large number of items using the `Virtualizer` component.

Click on one of the items to see the details.

::ShowCase

:DocsTreeVirtualizer

#code

<!-- automd:file src="../../app/components/content/Docs/Tree/DocsTreeVirtualizer.vue" code lang="vue" -->

```vue [DocsTreeVirtualizer.vue]
<template>
  <div class="flex justify-center">
    <UiScrollArea class="max-h-[500px] w-[300px] rounded-md border bg-background">
      <UiTree multiple :items="data" :get-key="(i) => i.email" class="p-2 pr-3">
        <p class="mb-3 font-semibold">Contact List</p>
        <UiTreeVirtualizer v-slot="{ item }" :text-content="(o) => o.email">
          <TreeItem
            v-slot="{ isSelected }"
            v-bind="item.bind"
            :style="{ 'padding-left': item.level > 1 ? `${item.level * 8}px` : '0px' }"
            class="group rounded px-2 py-1 text-sm focus-visible:ring-1 focus-visible:ring-border focus-visible:outline-none"
          >
            <div
              class="line-clamp-1 flex w-full cursor-pointer items-center gap-2 px-2 select-none"
            >
              <UiAvatar class="size-6" :src="item.value.picture.thumbnail" />
              {{ item.value.name?.first }} {{ item.value.name?.last }}
            </div>
            <TransitionExpand>
              <div
                v-if="isSelected"
                class="mt-1 ml-[18px] flex flex-col gap-1 border-l p-2 pl-2 text-xs"
              >
                <p class="flex items-center gap-3">
                  <span>Email</span>
                  <span class="text-muted-foreground">{{ item.value.email }}</span>
                </p>
                <p class="flex items-center gap-3">
                  <span>Phone</span>
                  <span class="text-muted-foreground">{{ item.value.phone }}</span>
                </p>
              </div>
            </TransitionExpand>
          </TreeItem>
        </UiTreeVirtualizer>
      </UiTree>
    </UiScrollArea>
  </div>
</template>

<script lang="ts" setup>
  const { data } = await useAsyncData(
    "random-users",
    () =>
      $fetch<{ results: Array<any>; info: Record<string, any> }>(
        "https://randomuser.me/api/?results=100"
      ),
    {
      transform: (data) => data.results,
      default: () => [],
    }
  );
</script>
```

<!-- /automd -->

::

### Origin UI

::ShowCase

:DocsTreeOrigin

#code

<!-- automd:file src="../../app/components/content/Docs/Tree/DocsTreeOrigin.vue" code lang="vue" -->

```vue [DocsTreeOrigin.vue]
<template>
  <div class="grid grid-cols-1 gap-10">
    <div class="mx-auto w-full max-w-xs">
      <UiTree
        v-slot="{ flattenItems }"
        :default-expanded="['Design System', 'Frontend', 'Engineering']"
        :items="items"
        :get-key="(v) => v.name"
        class="flex flex-col"
      >
        <template v-for="item in flattenItems" :key="item._id">
          <UiTreeItem
            v-slot="{ isExpanded, isSelected }"
            :data-folder="item.hasChildren == true || undefined"
            :data-level="item.level"
            v-bind="item.bind"
            :style="{ 'padding-left': `${item.level * 20}px` }"
            class="z-10 outline-hidden select-none not-last:pb-0.5 focus:z-20 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
          >
            <div
              :class="[isSelected ? 'bg-accent' : 'bg-background']"
              class="flex items-center gap-1 rounded-sm px-2 py-1.5 text-sm transition-colors not-in-data-[folder=true]:ps-7 hover:bg-accent focus-visible:ring-[3px] focus-visible:ring-ring/50 [&_svg]:pointer-events-none [&_svg]:shrink-0"
            >
              <template v-if="item.hasChildren">
                <Icon
                  name="lucide:chevron-right"
                  class="size-3.5 text-muted-foreground"
                  :class="[
                    isExpanded ? 'rotate-90' : '',
                    'transition-transform duration-200 ease-in-out',
                  ]"
                />
              </template>
              <span class="capitalize">{{ item.value.name }}</span>
            </div>
          </UiTreeItem>
        </template>
      </UiTree>
    </div>

    <div class="mx-auto w-full max-w-xs">
      <UiTree
        v-slot="{ flattenItems }"
        :default-expanded="['Design System', 'Frontend', 'Engineering']"
        :items="items"
        :get-key="(v) => v.name"
        class="flex flex-col"
      >
        <template v-for="item in flattenItems" :key="item._id">
          <UiTreeItem
            v-slot="{ isExpanded, isSelected }"
            :data-folder="item.hasChildren == true || undefined"
            :data-level="item.level"
            v-bind="item.bind"
            :style="{ 'padding-left': `${item.level * 20}px` }"
            class="z-10 outline-hidden select-none not-last:pb-0.5 focus:z-20 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
          >
            <div
              :class="[isSelected ? 'bg-accent' : 'bg-background']"
              class="flex items-center gap-1 rounded-sm px-2 py-1.5 text-sm transition-colors not-in-data-[folder=true]:ps-7 hover:bg-accent focus-visible:ring-[3px] focus-visible:ring-ring/50 [&_svg]:pointer-events-none [&_svg]:shrink-0"
            >
              <template v-if="item.hasChildren">
                <Icon
                  name="lucide:chevron-right"
                  class="size-3.5 text-muted-foreground"
                  :class="[
                    isExpanded ? 'rotate-90' : '',
                    'transition-transform duration-200 ease-in-out',
                  ]"
                />
              </template>
              <template v-if="item.hasChildren">
                <Icon v-if="isExpanded" class="text-muted-foreground" name="lucide:folder-open" />
                <Icon v-if="!isExpanded" class="text-muted-foreground" name="lucide:folder" />
              </template>
              <template v-else>
                <Icon class="text-muted-foreground" name="lucide:file" />
              </template>
              <span class="capitalize">{{ item.value.name }}</span>
            </div>
          </UiTreeItem>
        </template>
      </UiTree>
    </div>

    <div class="mx-auto w-full max-w-xs">
      <UiTree
        v-slot="{ flattenItems }"
        :default-expanded="['Design System', 'Frontend', 'Engineering']"
        :items="items"
        :get-key="(v) => v.name"
        class="flex flex-col"
      >
        <template v-for="item in flattenItems" :key="item._id">
          <UiTreeItem
            v-slot="{ isExpanded, isSelected }"
            :data-folder="item.hasChildren == true || undefined"
            :data-level="item.level"
            v-bind="item.bind"
            :style="{ 'padding-left': `${item.level * 20}px` }"
            class="z-10 outline-hidden select-none not-last:pb-0.5 focus:z-20 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
          >
            <div
              :class="[isSelected ? 'bg-accent' : 'bg-background']"
              class="flex items-center gap-1 rounded-sm px-2 py-1.5 text-sm transition-colors not-in-data-[folder=true]:ps-7 hover:bg-accent focus-visible:ring-[3px] focus-visible:ring-ring/50 [&_svg]:pointer-events-none [&_svg]:shrink-0"
            >
              <template v-if="item.hasChildren">
                <Icon v-if="isExpanded" class="text-muted-foreground" name="lucide:folder-open" />
                <Icon v-if="!isExpanded" class="text-muted-foreground" name="lucide:folder" />
              </template>
              <template v-else>
                <Icon class="text-muted-foreground" name="lucide:file" />
              </template>
              <span class="capitalize">{{ item.value.name }}</span>

              <template v-if="item.hasChildren">
                <Icon
                  name="lucide:chevron-right"
                  class="ml-auto size-3.5 text-muted-foreground"
                  :class="[
                    isExpanded ? 'rotate-90' : '',
                    'transition-transform duration-200 ease-in-out',
                  ]"
                />
              </template>
            </div>
          </UiTreeItem>
        </template>
      </UiTree>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const designId = useId();
  type Item = {
    id: string;
    name: string;
    children?: Item[];
  };
  const items: Item[] = [
    {
      id: useId(),
      name: "Engineering",
      children: [
        {
          id: useId(),
          name: "Frontend",
          children: [
            {
              id: designId,
              name: "Design System",
              children: [
                { id: useId(), name: "Components" },
                { id: useId(), name: "Tokens" },
                { id: useId(), name: "Guidelines" },
              ],
            },
            { id: useId(), name: "Web Platform" },
          ],
        },
        {
          id: useId(),
          name: "Backend",
          children: [
            { id: useId(), name: "APIs" },
            { id: useId(), name: "Infrastructure" },
          ],
        },
        { id: useId(), name: "Platform Team" },
      ],
    },
    {
      id: useId(),
      name: "Marketing",
      children: [
        { id: useId(), name: "Content" },
        { id: useId(), name: "SEO" },
      ],
    },
    {
      id: useId(),
      name: "Operations",
      children: [
        { id: useId(), name: "HR" },
        { id: useId(), name: "Finance" },
      ],
    },
  ];
</script>
```

<!-- /automd -->

::
