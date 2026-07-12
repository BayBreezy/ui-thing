---
title: Floating Dock
description: A responsive floating dock with a magnified desktop hover state and an expandable mobile menu.
---

## Source code

Click :SourceCodeLink{component="FloatingDock.vue"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add floating-dock"}

Use `active: true` on any item to show the small running-app dot, similar to the macOS dock.

## Usage

### Basic

::prose-show-case

:DocsFloatingDock

#code

<!-- automd:file src="../../app/components/content/Docs/FloatingDock/DocsFloatingDock.vue" code lang="vue" -->

```vue [DocsFloatingDock.vue]
<template>
  <div
    class="from-background to-muted/30 relative min-h-[280px] rounded-3xl border bg-linear-to-br"
  >
    <UiFloatingDock
      :items="items"
      desktop-class="absolute bottom-4 left-1/2 -translate-x-1/2"
      mobile-class="absolute right-4 bottom-4"
    />
  </div>
</template>

<script lang="ts" setup>
  const items = [
    { title: "Home", icon: "lucide:house", href: "#", active: true },
    { title: "Search", icon: "lucide:search", href: "#" },
    { title: "Notifications", icon: "lucide:bell", href: "#", active: true },
    { title: "Profile", icon: "lucide:user-round", href: "#", active: true },
    { title: "Settings", icon: "lucide:settings-2", href: "#" },
  ];
</script>
```

<!-- /automd -->

::

### Soft colors

::prose-show-case

:DocsFloatingDockSoftColors

#code

<!-- automd:file src="../../app/components/content/Docs/FloatingDock/DocsFloatingDockSoftColors.vue" code lang="vue" -->

```vue [DocsFloatingDockSoftColors.vue]
<template>
  <div
    class="dark:via-background relative min-h-[280px] rounded-[2rem] bg-linear-to-br from-sky-100 via-white to-violet-100 p-4 dark:from-sky-950/40 dark:to-violet-950/40"
  >
    <UiFloatingDock
      :items="items"
      desktop-class="absolute bottom-4 left-1/2 -translate-x-1/2"
      mobile-class="absolute right-4 bottom-4"
    />
  </div>
</template>

<script lang="ts" setup>
  const items = [
    { title: "Inbox", icon: "lucide:inbox", href: "#", active: true },
    { title: "Calendar", icon: "lucide:calendar-days", href: "#", active: true },
    { title: "Files", icon: "lucide:folder-open", href: "#" },
    { title: "Teams", icon: "lucide:users-round", href: "#", active: true },
    { title: "Analytics", icon: "lucide:chart-column", href: "#" },
  ];
</script>
```

<!-- /automd -->

::

### Custom item slot

Use the `#item` slot when you want to render something other than the default icon output. This is useful for components like `UiFancyIcon` or any other custom visual treatment.

::prose-show-case

:DocsFloatingDockFancyIcon

#code

<!-- automd:file src="../../app/components/content/Docs/FloatingDock/DocsFloatingDockFancyIcon.vue" code lang="vue" -->

```vue [DocsFloatingDockFancyIcon.vue]
<template>
  <div
    class="from-background to-muted/20 relative min-h-[300px] rounded-[2rem] border bg-linear-to-br p-4"
  >
    <UiFloatingDock
      :items="items"
      desktop-class="absolute bottom-4 left-1/2 -translate-x-1/2"
      mobile-class="absolute right-4 bottom-4"
    >
      <template #item="{ item }">
        <UiFancyIcon
          :icon="typeof item.icon === 'string' ? item.icon : undefined"
          color="primary"
          theme="gradient"
          size="md"
        />
      </template>
    </UiFloatingDock>
  </div>
</template>

<script lang="ts" setup>
  const items = [
    { title: "Inbox", icon: "lucide:inbox", href: "#", active: true, color: "primary" },
    { title: "Search", icon: "lucide:search", href: "#", color: "info" },
    { title: "Alerts", icon: "lucide:bell", href: "#", active: true, color: "warning" },
    { title: "Teams", icon: "lucide:users-round", href: "#", color: "success" },
    { title: "Settings", icon: "lucide:settings-2", href: "#", color: "gray" },
  ];
</script>
```

<!-- /automd -->

::
