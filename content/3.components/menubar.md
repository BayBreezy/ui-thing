---
title: Menubar
description: A visually persistent menu common in desktop applications that provides quick access to a consistent set of commands.
links:
  - title: Reka UI
    href: https://reka-ui.com/docs/components/menubar.html
    icon: "simple-icons:rekaui"
  - title: API Reference
    href: https://reka-ui.com/docs/components/menubar.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Menubar"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add menubar"}

## Usage

### Full example

::prose-show-case

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
                v-model="child.model!.value"
                :title="child.title"
                :shortcut="child.shortcut"
                @select="(e) => e.preventDefault()"
              />
              <UiMenubarRadioGroup v-else-if="child.type === 'radio'" v-model="child.model!.value">
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
  type Menu = {
    trigger?: string;
    value?: string;
    items?: Array<{
      title?: string;
      shortcut?: string;
      disabled?: boolean;
      inset?: boolean;
      type?: "check" | "radio";
      model?: { value: any };
      options?: Array<{ title: string; value: any; shortcut?: string }>;
      icon?: string;
      items?: Menu["items"];
      divider?: boolean;
    }>;
  };
  const menu: Menu[] = [
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

### Simple

A minimal menubar with keyboard shortcuts and disabled items — great as a starting point.

::prose-show-case

:DocsMenubarSimple

#code

<!-- automd:file src="../../app/components/content/Docs/Menubar/DocsMenubarSimple.vue" code lang="vue" -->

```vue [DocsMenubarSimple.vue]
<template>
  <div class="flex w-full items-center justify-center">
    <UiMenubar>
      <UiMenubarMenu value="file">
        <UiMenubarTrigger class="cursor-pointer">File</UiMenubarTrigger>
        <UiMenubarContent>
          <UiMenubarItem title="New File" shortcut="⌘N" />
          <UiMenubarItem title="Open..." shortcut="⌘O" />
          <UiMenubarItem title="Save" shortcut="⌘S" />
          <UiMenubarItem title="Save As..." shortcut="⇧⌘S" />
          <UiMenubarSeparator />
          <UiMenubarItem title="Close Window" shortcut="⌘W" />
        </UiMenubarContent>
      </UiMenubarMenu>

      <UiMenubarMenu value="edit">
        <UiMenubarTrigger class="cursor-pointer">Edit</UiMenubarTrigger>
        <UiMenubarContent>
          <UiMenubarItem title="Undo" shortcut="⌘Z" />
          <UiMenubarItem title="Redo" shortcut="⇧⌘Z" />
          <UiMenubarSeparator />
          <UiMenubarItem title="Cut" shortcut="⌘X" />
          <UiMenubarItem title="Copy" shortcut="⌘C" />
          <UiMenubarItem title="Paste" shortcut="⌘V" />
          <UiMenubarSeparator />
          <UiMenubarItem title="Select All" shortcut="⌘A" />
        </UiMenubarContent>
      </UiMenubarMenu>

      <UiMenubarMenu value="format">
        <UiMenubarTrigger class="cursor-pointer">Format</UiMenubarTrigger>
        <UiMenubarContent>
          <UiMenubarItem title="Bold" shortcut="⌘B" />
          <UiMenubarItem title="Italic" shortcut="⌘I" />
          <UiMenubarItem title="Underline" shortcut="⌘U" />
          <UiMenubarSeparator />
          <UiMenubarItem title="Strikethrough" disabled />
          <UiMenubarItem title="Superscript" disabled />
        </UiMenubarContent>
      </UiMenubarMenu>
    </UiMenubar>
  </div>
</template>
```

<!-- /automd -->

::

### With labels

Use `UiMenubarLabel` to visually group items within a menu into named sections.

::prose-show-case

:DocsMenubarWithLabels

#code

<!-- automd:file src="../../app/components/content/Docs/Menubar/DocsMenubarWithLabels.vue" code lang="vue" -->

```vue [DocsMenubarWithLabels.vue]
<template>
  <div class="flex w-full items-center justify-center">
    <UiMenubar>
      <UiMenubarMenu value="insert">
        <UiMenubarTrigger class="cursor-pointer">Insert</UiMenubarTrigger>
        <UiMenubarContent class="w-52">
          <UiMenubarLabel>Media</UiMenubarLabel>
          <UiMenubarItem title="Image..." icon="lucide:image" />
          <UiMenubarItem title="Video..." icon="lucide:video" />
          <UiMenubarItem title="Audio..." icon="lucide:music" />
          <UiMenubarSeparator />
          <UiMenubarLabel>Content</UiMenubarLabel>
          <UiMenubarItem title="Table" icon="lucide:table" />
          <UiMenubarItem title="Code Block" icon="lucide:code" />
          <UiMenubarItem title="Blockquote" icon="lucide:quote" />
          <UiMenubarSeparator />
          <UiMenubarLabel>Other</UiMenubarLabel>
          <UiMenubarItem title="Horizontal Rule" icon="lucide:minus" />
          <UiMenubarItem title="Page Break" icon="lucide:file-plus" />
        </UiMenubarContent>
      </UiMenubarMenu>

      <UiMenubarMenu value="view">
        <UiMenubarTrigger class="cursor-pointer">View</UiMenubarTrigger>
        <UiMenubarContent class="w-48">
          <UiMenubarLabel>Layout</UiMenubarLabel>
          <UiMenubarItem title="Sidebar" shortcut="⌘B" icon="lucide:panel-left" />
          <UiMenubarItem title="Activity Bar" icon="lucide:layout-dashboard" />
          <UiMenubarSeparator />
          <UiMenubarLabel>Appearance</UiMenubarLabel>
          <UiMenubarItem title="Zoom In" shortcut="⌘+" icon="lucide:zoom-in" />
          <UiMenubarItem title="Zoom Out" shortcut="⌘-" icon="lucide:zoom-out" />
          <UiMenubarItem title="Reset Zoom" shortcut="⌘0" icon="lucide:maximize" />
        </UiMenubarContent>
      </UiMenubarMenu>

      <UiMenubarMenu value="tools">
        <UiMenubarTrigger class="cursor-pointer">Tools</UiMenubarTrigger>
        <UiMenubarContent class="w-52">
          <UiMenubarLabel>Analysis</UiMenubarLabel>
          <UiMenubarItem title="Word Count" icon="lucide:hash" />
          <UiMenubarItem title="Spell Check" shortcut="⌘;" icon="lucide:spell-check" />
          <UiMenubarSeparator />
          <UiMenubarLabel>Automation</UiMenubarLabel>
          <UiMenubarItem title="Macros" icon="lucide:play-circle" />
          <UiMenubarItem title="Extensions" icon="lucide:puzzle" />
        </UiMenubarContent>
      </UiMenubarMenu>
    </UiMenubar>
  </div>
</template>
```

<!-- /automd -->

::

### Destructive items

Use `variant="destructive"` on `UiMenubarItem` to highlight dangerous or irreversible actions.

::prose-show-case

:DocsMenubarDestructive

#code

<!-- automd:file src="../../app/components/content/Docs/Menubar/DocsMenubarDestructive.vue" code lang="vue" -->

```vue [DocsMenubarDestructive.vue]
<template>
  <div class="flex w-full items-center justify-center">
    <UiMenubar>
      <UiMenubarMenu value="project">
        <UiMenubarTrigger class="cursor-pointer">Project</UiMenubarTrigger>
        <UiMenubarContent class="w-52">
          <UiMenubarItem title="Settings..." icon="lucide:settings" shortcut="⌘," />
          <UiMenubarItem title="Rename..." icon="lucide:pencil" />
          <UiMenubarItem title="Duplicate" icon="lucide:copy" />
          <UiMenubarSeparator />
          <UiMenubarItem title="Archive Project" icon="lucide:archive" />
          <UiMenubarItem
            title="Delete Project"
            icon="lucide:trash-2"
            variant="destructive"
            shortcut="⌘⌫"
          />
        </UiMenubarContent>
      </UiMenubarMenu>

      <UiMenubarMenu value="team">
        <UiMenubarTrigger class="cursor-pointer">Team</UiMenubarTrigger>
        <UiMenubarContent class="w-52">
          <UiMenubarItem title="Invite Members..." icon="lucide:user-plus" />
          <UiMenubarItem title="Manage Roles" icon="lucide:shield" />
          <UiMenubarSeparator />
          <UiMenubarItem title="Leave Team" icon="lucide:log-out" variant="destructive" />
          <UiMenubarItem
            title="Disband Team"
            icon="lucide:users-x"
            variant="destructive"
            disabled
          />
        </UiMenubarContent>
      </UiMenubarMenu>

      <UiMenubarMenu value="account">
        <UiMenubarTrigger class="cursor-pointer">Account</UiMenubarTrigger>
        <UiMenubarContent class="w-52">
          <UiMenubarItem title="Profile" icon="lucide:user" />
          <UiMenubarItem title="Billing" icon="lucide:credit-card" />
          <UiMenubarSeparator />
          <UiMenubarItem title="Sign Out" icon="lucide:log-out" shortcut="⇧⌘Q" />
          <UiMenubarItem
            title="Delete Account"
            icon="lucide:user-x"
            variant="destructive"
            shortcut="⌫"
          />
        </UiMenubarContent>
      </UiMenubarMenu>
    </UiMenubar>
  </div>
</template>
```

<!-- /automd -->

::

### Translucent

Pass `translucent` to `UiMenubarContent` for a frosted-glass panel effect.

::prose-show-case

:DocsMenubarTranslucent

#code

<!-- automd:file src="../../app/components/content/Docs/Menubar/DocsMenubarTranslucent.vue" code lang="vue" -->

```vue [DocsMenubarTranslucent.vue]
<template>
  <div class="flex w-full items-center justify-center">
    <UiMenubar>
      <UiMenubarMenu value="file">
        <UiMenubarTrigger class="cursor-pointer">File</UiMenubarTrigger>
        <UiMenubarContent translucent>
          <UiMenubarItem title="New Tab" shortcut="⌘T" />
          <UiMenubarItem title="New Window" shortcut="⌘N" />
          <UiMenubarSeparator />
          <UiMenubarItem title="Open Location..." shortcut="⌘L" />
          <UiMenubarItem title="Close Tab" shortcut="⌘W" />
          <UiMenubarSeparator />
          <UiMenubarItem title="Print..." shortcut="⌘P" />
        </UiMenubarContent>
      </UiMenubarMenu>

      <UiMenubarMenu value="window">
        <UiMenubarTrigger class="cursor-pointer">Window</UiMenubarTrigger>
        <UiMenubarContent translucent>
          <UiMenubarItem title="Minimize" shortcut="⌘M" />
          <UiMenubarItem title="Zoom" />
          <UiMenubarSeparator />
          <UiMenubarItem title="Move to Left Side" />
          <UiMenubarItem title="Move to Right Side" />
          <UiMenubarSeparator />
          <UiMenubarItem title="Bring All to Front" />
        </UiMenubarContent>
      </UiMenubarMenu>

      <UiMenubarMenu value="help">
        <UiMenubarTrigger class="cursor-pointer">Help</UiMenubarTrigger>
        <UiMenubarContent translucent class="w-56">
          <UiMenubarItem title="Documentation" icon="lucide:book-open" />
          <UiMenubarItem title="Keyboard Shortcuts" icon="lucide:keyboard" shortcut="⌘/" />
          <UiMenubarSeparator />
          <UiMenubarItem title="Report an Issue" icon="lucide:bug" />
          <UiMenubarItem title="About" icon="lucide:info" />
        </UiMenubarContent>
      </UiMenubarMenu>
    </UiMenubar>
  </div>
</template>
```

<!-- /automd -->

::
