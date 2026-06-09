---
title: Command
description: A command menu component composed of the Combobox primitives from Reka UI.
links:
  - title: Reka UI
    href: https://reka-ui.com/docs/components/combobox.html
    icon: "simple-icons:rekaui"
  - title: API Reference
    href: https://reka-ui.com/docs/components/combobox.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Command"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add command"}

## Usage

### Basic

::prose-show-case

:DocsCommand

#code

<!-- automd:file src="../../app/components/content/Docs/Command/DocsCommand.vue" code lang="vue" -->

```vue [DocsCommand.vue]
<template>
  <div class="flex w-full items-center justify-center">
    <UiCommand class="w-full max-w-sm rounded-lg border shadow-md" highlight-on-hover>
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
              :disabled="child.disabled"
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
  type CommandItem = {
    label: string;
    icon: string;
    perform: () => string | number;
    disabled?: boolean;
    shortcut?: string;
  };

  const items: Record<string, CommandItem[]> = {
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
        disabled: true,
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

### Dialog

::prose-show-case

:DocsCommandShortcut

#code

<!-- automd:file src="../../app/components/content/Docs/Command/DocsCommandShortcut.vue" code lang="vue" -->

```vue [DocsCommandShortcut.vue]
<template>
  <div class="flex flex-col items-center justify-center">
    <p class="text-muted-foreground text-sm">
      Press
      <UiKbd variant="outline"> ⌘J </UiKbd>
    </p>
    <UiCommandDialog v-model:open="open">
      <UiCommandInput placeholder="Type a command or search..." />
      <UiCommandList>
        <UiCommandEmpty>No results found.</UiCommandEmpty>
        <UiCommandGroup heading="Navigation">
          <UiCommandItem value="home" text="Home" icon="lucide:home" />
          <UiCommandItem value="inbox" text="Inbox" icon="lucide:inbox" />
          <UiCommandItem value="documents" text="Documents" icon="lucide:file-text" />
          <UiCommandItem value="folders" text="Folders" icon="lucide:folder" />
        </UiCommandGroup>
        <UiCommandSeparator />
        <UiCommandGroup heading="Actions">
          <UiCommandItem value="new-file" text="New File" icon="lucide:plus" shortcut="⌘N" />
          <UiCommandItem
            value="new-window"
            text="New Window"
            icon="lucide:app-window"
            shortcut="⌘⇧N"
          />
          <UiCommandItem
            value="new-folder"
            text="New Folder"
            icon="lucide:folder-plus"
            shortcut="⌘,"
          />
          <UiCommandItem value="copy" text="Copy" icon="lucide:copy" shortcut="⌘C" />
          <UiCommandItem value="cut" text="Cut" icon="lucide:scissors" shortcut="⌘X" />
          <UiCommandItem value="paste" text="Paste" icon="lucide:clipboard" shortcut="⌘V" />
          <UiCommandItem value="delete" text="Delete" icon="lucide:trash" shortcut="⌘⌫" />
        </UiCommandGroup>
        <UiCommandSeparator />
        <UiCommandGroup heading="Suggestions">
          <UiCommandItem value="calendar" text="Calendar" icon="lucide:calendar-days" />
          <UiCommandItem value="search-emoji" text="Emoji" icon="lucide:smile-plus" />
          <UiCommandItem value="calculator" disabled text="Calculator" icon="lucide:calculator" />
        </UiCommandGroup>
        <UiCommandSeparator />
        <UiCommandGroup heading="Settings">
          <UiCommandItem value="profile"> Profile </UiCommandItem>
          <UiCommandItem value="billing"> Billing </UiCommandItem>
          <UiCommandItem value="settings"> Settings </UiCommandItem>
        </UiCommandGroup>
      </UiCommandList>
      <UiCommandFooter />
    </UiCommandDialog>
  </div>
</template>

<script setup lang="ts">
  import { useMagicKeys } from "@vueuse/core";

  const open = ref(false);

  const { Meta_J, Ctrl_J } = useMagicKeys({
    passive: false,
    onEventFired(e) {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) e.preventDefault();
    },
  });

  watch([Meta_J, Ctrl_J], (v) => {
    if (v[0] || v[1]) open.value = !open.value;
  });
</script>
```

<!-- /automd -->

::

### Popover

::prose-show-case

:DocsCommandPopover

#code

<!-- automd:file src="../../app/components/content/Docs/Command/DocsCommandPopover.vue" code lang="vue" -->

```vue [DocsCommandPopover.vue]
<template>
  <div class="flex items-center justify-center space-x-4">
    <p class="text-muted-foreground text-sm">Status</p>
    <UiPopover v-model:open="open">
      <UiPopoverTrigger as-child>
        <UiButton variant="outline" size="sm" class="w-[150px] justify-start">
          <template v-if="selectedStatus">
            {{ selectedStatus?.label }}
          </template>
          <template v-else> + Set status </template>
        </UiButton>
      </UiPopoverTrigger>
      <UiPopoverContent class="max-w-[200px] p-0" side="right" align="start">
        <UiCommand>
          <UiCommandInput placeholder="Change status..." />
          <UiCommandList>
            <UiCommandEmpty>No results found.</UiCommandEmpty>
            <UiCommandGroup>
              <UiCommandItem
                v-for="status in statuses"
                :key="status.value"
                :value="status.value"
                @select="
                  () => {
                    selectedStatus = status;
                    open = false;
                  }
                "
              >
                {{ status.label }}
              </UiCommandItem>
            </UiCommandGroup>
          </UiCommandList>
        </UiCommand>
      </UiPopoverContent>
    </UiPopover>
  </div>
</template>

<script setup lang="ts">
  interface Status {
    value: string;
    label: string;
  }

  const statuses: Status[] = [
    {
      value: "backlog",
      label: "Backlog",
    },
    {
      value: "todo",
      label: "Todo",
    },
    {
      value: "in progress",
      label: "In Progress",
    },
    {
      value: "done",
      label: "Done",
    },
    {
      value: "canceled",
      label: "Canceled",
    },
  ];

  const open = ref(false);
  const selectedStatus = ref<Status>();
</script>
```

<!-- /automd -->

::

### Dropdown Menu

::prose-show-case

:DocsCommandDropdown

#code

<!-- automd:file src="../../app/components/content/Docs/Command/DocsCommandDropdown.vue" code lang="vue" -->

```vue [DocsCommandDropdown.vue]
<template>
  <div class="flex items-center justify-center">
    <div
      class="flex w-full flex-col items-start justify-between rounded-md border px-4 py-3 sm:flex-row sm:items-center"
    >
      <p class="text-sm leading-none font-medium">
        <span class="bg-primary text-primary-foreground mr-2 rounded-lg px-2 py-1 text-xs">
          {{ labelRef }}
        </span>
        <span class="text-muted-foreground">Create a new project</span>
      </p>
      <UiDropdownMenu v-model:open="open">
        <UiDropdownMenuTrigger as-child>
          <UiButton variant="ghost" size="icon-sm">
            <Icon name="lucide:more-horizontal" />
          </UiButton>
        </UiDropdownMenuTrigger>
        <UiDropdownMenuContent align="end" class="w-[200px]">
          <UiDropdownMenuLabel>Actions</UiDropdownMenuLabel>
          <UiDropdownMenuGroup>
            <UiDropdownMenuItem> Assign to... </UiDropdownMenuItem>
            <UiDropdownMenuItem> Set due date... </UiDropdownMenuItem>
            <UiDropdownMenuSeparator />
            <UiDropdownMenuSub>
              <UiDropdownMenuSubTrigger> Apply label </UiDropdownMenuSubTrigger>
              <UiDropdownMenuSubContent class="p-0">
                <UiCommand v-model="labelRef">
                  <UiCommandInput placeholder="Filter label..." auto-focus />
                  <UiCommandList>
                    <UiCommandEmpty>No label found.</UiCommandEmpty>
                    <UiCommandGroup>
                      <UiCommandItem
                        v-for="label in labels"
                        :key="label"
                        :value="label"
                        @select="
                          (ev) => {
                            labelRef = ev.detail.value as string;
                            open = false;
                          }
                        "
                      >
                        {{ label }}
                      </UiCommandItem>
                    </UiCommandGroup>
                  </UiCommandList>
                </UiCommand>
              </UiDropdownMenuSubContent>
            </UiDropdownMenuSub>
            <UiDropdownMenuSeparator />
            <UiDropdownMenuItem class="text-red-600">
              Delete
              <UiDropdownMenuShortcut>⌘⌫</UiDropdownMenuShortcut>
            </UiDropdownMenuItem>
          </UiDropdownMenuGroup>
        </UiDropdownMenuContent>
      </UiDropdownMenu>
    </div>
  </div>
</template>

<script setup lang="ts">
  const labels = [
    "feature",
    "bug",
    "enhancement",
    "documentation",
    "design",
    "question",
    "maintenance",
  ];

  const labelRef = ref("feature");
  const open = ref(false);
</script>
```

<!-- /automd -->

::

### Responsive

You can create a responsive combobox by using the `<Popover />` on desktop and the `<Drawer />` components on mobile.

::prose-show-case

:DocsCommandResponsive

#code

<!-- automd:file src="../../app/components/content/Docs/Command/DocsCommandResponsive.vue" code lang="vue" -->

```vue [DocsCommandResponsive.vue]
<template>
  <div class="flex items-center justify-center">
    <UseTemplate>
      <UiCommand v-model="selectedStatus" class="rounded-none! md:rounded-lg!">
        <UiCommandInput placeholder="Filter status..." />
        <UiCommandList>
          <UiCommandEmpty>No results found.</UiCommandEmpty>
          <UiCommandGroup>
            <UiCommandItem
              v-for="status of statuses"
              :key="status.value"
              :value="status"
              @select="onStatusSelect"
            >
              {{ status.label }}
            </UiCommandItem>
          </UiCommandGroup>
        </UiCommandList>
      </UiCommand>
    </UseTemplate>

    <UiPopover v-if="isDesktop" v-model:open="isOpen">
      <UiPopoverTrigger as-child>
        <UiButton variant="outline" class="w-[150px] justify-start">
          {{ selectedStatus ? selectedStatus.label : "+ Set status" }}
        </UiButton>
      </UiPopoverTrigger>
      <UiPopoverContent class="w-[200px] p-0" align="start">
        <StatusList />
      </UiPopoverContent>
    </UiPopover>

    <UiDrawer v-else v-model:open="isOpen" should-scale-background>
      <UiDrawerTrigger as-child>
        <UiButton variant="outline" class="w-[150px] justify-start">
          {{ selectedStatus ? selectedStatus.label : "+ Set status" }}
        </UiButton>
      </UiDrawerTrigger>
      <UiDrawerContent>
        <UiDrawerTitle class="sr-only">Set Status</UiDrawerTitle>
        <UiDrawerDescription class="sr-only"> Select a status for the task. </UiDrawerDescription>
        <div class="mt-4 border-t">
          <StatusList />
        </div>
      </UiDrawerContent>
    </UiDrawer>
  </div>
</template>

<script lang="ts" setup>
  import { createReusableTemplate, useMediaQuery } from "@vueuse/core";
  import { ref } from "vue";

  interface Status {
    value: string;
    label: string;
  }

  const statuses: Status[] = [
    {
      value: "backlog",
      label: "Backlog",
    },
    {
      value: "todo",
      label: "Todo",
    },
    {
      value: "in progress",
      label: "In Progress",
    },
    {
      value: "done",
      label: "Done",
    },
    {
      value: "canceled",
      label: "Canceled",
    },
  ];

  const [UseTemplate, StatusList] = createReusableTemplate();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const isOpen = ref(false);
  const selectedStatus = ref<Status | null>(null);

  const onStatusSelect = () => (isOpen.value = false);
</script>
```

<!-- /automd -->

::
