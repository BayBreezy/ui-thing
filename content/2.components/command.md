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

::ShowCase{component="DocsCommand"}

#code

```vue [DocsCommand.vue]
<template>
  <div class="flex w-full items-center justify-center">
    <UICommand class="max-w-[450px] rounded-lg border shadow-md">
      <UICommandInput placeholder="Type a command or search..." />
      <UICommandList>
        <UICommandEmpty>No results found.</UICommandEmpty>
        <template v-for="(item, label, i) in items" :key="i">
          <UICommandGroup :heading="label">
            <UICommandItem
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
          </UICommandGroup>
          <UICommandSeparator class="last:hidden" />
        </template>
      </UICommandList>
    </UICommand>
  </div>
</template>

<script lang="ts" setup>
  const items = {
    Suggestions: [
      { label: "Calendar", icon: "lucide:calendar", perform: () => alert("Calendar") },
      { label: "Search Emoji", icon: "lucide:smile", perform: () => alert("Smile") },
      { label: "Calculator", icon: "lucide:calculator", perform: () => alert("Calculator") },
    ],
    Settings: [
      {
        label: "Profile",
        icon: "lucide:user",
        perform: () => alert("User profile"),
        shortcut: "⌘P",
      },
      {
        label: "Billing",
        icon: "lucide:credit-card",
        perform: () => alert("Billing"),
        shortcut: "⌘B",
      },
      {
        label: "Settings",
        icon: "lucide:settings",
        perform: () => alert("Settings"),
        shortcut: "⌘S",
      },
    ],
  };
</script>
```

::
