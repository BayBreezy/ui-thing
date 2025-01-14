---
title: Menubar
description: A visually persistent menu common in desktop applications that provides quick access to a consistent set of commands.
links:
  - title: Radix-Vue
    href: https://www.radix-vue.com/components/menubar.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://www.radix-vue.com/components/menubar.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Menubar"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add menubar
```

## Usage

### Full example

::ShowCase

:DocsMenubar

#code

<!-- automd:file src="../../app/components/content/Docs/Menubar/DocsMenubar.vue" code lang="vue" -->

```vue [DocsMenubar.vue]
<template>
  <div class="flex w-full items-center justify-center">
    <UiMenubar>
      <template v-for="(item, i) in menu" :key="i">
        <UiMenubarMenu :value="item.value">
          <UiMenubarTrigger class="cursor-pointer">
            {{ item.trigger }}
          </UiMenubarTrigger>

          <UiMenubarContent>
            <template v-for="(child, k) in item.items" :key="`child-${k}`">
              <UiMenubarSeparator v-if="child.divider" />
              <UiMenubarCheckboxItem
                v-else-if="child.type === 'check'"
                v-model:checked="child.model.value"
                :title="child.title"
                :shortcut="child.shortcut"
                @select="(e) => e.preventDefault()"
              />
              <UiMenubarRadioGroup v-else-if="child.type === 'radio'" v-model="child.model.value">
                <template v-for="(o, m) in child.options" :key="m">
                  <UiMenubarRadioItem
                    :title="o.title"
                    :shortcut="o.shortcut"
                    :value="o.value"
                    @select="(e) => e.preventDefault()"
                  />
                </template>
              </UiMenubarRadioGroup>
              <UiMenubarItem
                v-else-if="!child.divider && !child.items"
                :title="child.title"
                :inset="child.inset"
                :shortcut="child.shortcut"
                :disabled="child.disabled"
              />
              <UiMenubarSub v-else-if="child.items">
                <UiMenubarSubTrigger :title="child.title" />
                <UiMenubarSubContent class="w-44">
                  <template v-for="(kid, j) in child.items" :key="`kid-${j}`">
                    <UiMenubarSeparator v-if="kid.divider" />
                    <UiMenubarItem v-else :inset="kid.inset" :title="kid.title" :icon="kid.icon" />
                  </template>
                </UiMenubarSubContent>
              </UiMenubarSub>
            </template>
          </UiMenubarContent>
        </UiMenubarMenu>
      </template>
    </UiMenubar>
  </div>
</template>

<script lang="ts" setup>
  const showBookmarks = ref(false);
  const showURLs = ref(false);
  const person = ref();
  const menu = [
    {
      trigger: "File",
      value: "file",
      items: [
        { title: "New Tab", shortcut: "⌘T" },
        { title: "New Window", shortcut: "⌘NW" },
        { title: "New Incognito Window", disabled: true },
        { divider: true },
        {
          title: "Share",
          items: [
            { title: "WhatsApp", icon: "logos:whatsapp-icon" },
            { title: "Facebook", icon: "logos:facebook" },
            { title: "Twitter", icon: "logos:twitter" },
          ],
        },
        { divider: true },
        { title: "Print", shortcut: "⌘P" },
      ],
    },
    {
      trigger: "Edit",
      value: "edit",
      items: [
        { title: "Undo", shortcut: "⌘Z" },
        { title: "Redo", shortcut: "⇧⌘Z" },
        { divider: true },
        {
          title: "Find",
          items: [
            { title: "Search the web" },
            { divider: true },
            { title: "Find..." },
            { title: "Find Next" },
            { title: "Find Previous" },
          ],
        },
        { divider: true },
        { title: "Cut" },
        { title: "Copy" },
        { title: "Paste" },
      ],
    },
    {
      trigger: "View",
      value: "view",
      items: [
        { title: "Always show bookmarks bar", model: showBookmarks, type: "check" },
        { title: "Always show full URLs", model: showURLs, type: "check" },
        { divider: true },
        { title: "Reload", shortcut: "⌘R", inset: true },
        { title: "Force reload", shortcut: "⇧⌘R", disabled: true, inset: true },
        { divider: true },
        { title: "Toggle fullscreen", inset: true },
        { title: "Hide sidebar", inset: true },
      ],
    },
    {
      trigger: "Profile",
      value: "profile",
      items: [
        {
          model: person,
          type: "radio",
          options: [
            { title: "Andy", value: "andy" },
            { title: "Bob", value: "bob" },
            { title: "Charlie", value: "charlie" },
          ],
        },
        { divider: true },
        { title: "Edit", shortcut: "⌘E", inset: true },
        { title: "Add profile", shortcut: "⇧⌘P", inset: true },
      ],
    },
  ];
</script>
```

<!-- /automd -->

::
