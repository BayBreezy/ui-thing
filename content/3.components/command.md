---
title: Command
description: A command menu component composed of the Combobox primitives from Radix-Vue.
links:
  - title: Radix-Vue
    href: https://www.radix-vue.com/components/combobox.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://www.radix-vue.com/components/combobox.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Command"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add command
```

## Usage

::ShowCase

:DocsCommand

#code

<!-- automd:file src="../../app/components/content/Docs/DocsCommand.vue" code lang="vue" -->

```vue [DocsCommand.vue]
<template>
  <div class="flex w-full items-center justify-center">
    <UiCommand class="max-w-[450px] rounded-lg border shadow-md">
      <UiCommandInput placeholder="Type a command or search..." />
      <UiCommandList>
        <UiCommandEmpty>No results found.</UiCommandEmpty>
        <template v-for="(item, label, i) in items" :key="i">
          <UiCommandGroup :heading="label">
            <UiCommandItem
              v-for="(child, k) in item"
              :key="k"
              :text="child.label"
              :icon="child.icon"
              :value="child.label"
              :shortcut="child.shortcut"
              @select="
                child.perform?.();
                $event.preventDefault();
              "
            />
          </UiCommandGroup>
          <UiCommandSeparator class="last:hidden" />
        </template>
      </UiCommandList>
    </UiCommand>
  </div>
</template>

<script lang="ts" setup>
  const items = {
    Suggestions: [
      {
        label: "Calendar",
        icon: "lucide:calendar",
        perform: () => useSonner("Now performing the action: Calendar"),
      },
      {
        label: "Search Emoji",
        icon: "lucide:smile",
        perform: () => useSonner("Now performing the action: Smile"),
      },
      {
        label: "Calculator",
        icon: "lucide:calculator",
        perform: () => useSonner("Now performing the action: Calculator"),
      },
    ],
    Settings: [
      {
        label: "Profile",
        icon: "lucide:user",
        perform: () => useSonner("Now performing the action: User profile"),
        shortcut: "⌘P",
      },
      {
        label: "Billing",
        icon: "lucide:credit-card",
        perform: () => useSonner("Now performing the action: Billing"),
        shortcut: "⌘B",
      },
      {
        label: "Settings",
        icon: "lucide:settings",
        perform: () => useSonner("Now performing the action: Settings"),
        shortcut: "⌘S",
      },
    ],
  };
</script>
```

<!-- /automd -->

::
