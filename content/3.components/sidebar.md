---
title: Sidebar
description: A composable, themeable and customizable sidebar component.
---

## Credits

I just want to start by thanking the shadcn-vue & shadcn-ui team for doing the heavy lifting for this component. I basically just copied their code and have it here for this thing.

## The Setup

<Steps>

<Step>

### Install the component

To get started, you should add the component to your project.

```bash
npx ui-thing@latest add sidebar
```

</Step>

<Step>

### Update the Tailwind CSS file

Next you will need to update your `tailwind.css` file to include the following:

```css
@layer base {
  :root {
    --sidebar-background: 0 0% 98%;
    --sidebar-foreground: 240 5.3% 26.1%;
    --sidebar-primary: 240 5.9% 10%;
    --sidebar-primary-foreground: 0 0% 98%;
    --sidebar-accent: 240 4.8% 95.9%;
    --sidebar-accent-foreground: 240 5.9% 10%;
    --sidebar-border: 220 13% 91%;
    --sidebar-ring: 217.2 91.2% 59.8%;
    --sidebar-input: 240 5.9% 90%;
  }

  .dark {
    --sidebar-background: 240 5.9% 10%;
    --sidebar-foreground: 240 4.8% 95.9%;
    --sidebar-primary: 224.3 76.3% 48%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 240 3.7% 15.9%;
    --sidebar-accent-foreground: 240 4.8% 95.9%;
    --sidebar-border: 240 3.7% 15.9%;
    --sidebar-ring: 217.2 91.2% 59.8%;
    --sidebar-input: 240 3.7% 15.9%;
  }
}
```

</Step>

<Step>

### Update the Tailwind Config file

Now update the `tailwind.config.js` file to include the following:

```js
// ...
sidebar: {
  DEFAULT: "hsl(var(--sidebar-background))",
  foreground: "hsl(var(--sidebar-foreground))",
  primary: "hsl(var(--sidebar-primary))",
  "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
  accent: "hsl(var(--sidebar-accent))",
  "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
  border: "hsl(var(--sidebar-border))",
  ring: "hsl(var(--sidebar-ring))",
  input: "hsl(var(--sidebar-input))",
},
// ...
```

</Step>

</Steps>

## Source code

Click :SourceCodeLink{component="Sidebar"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Usage

You should always ensure that you have all parts of the `Sidebar` components wrapped in a `UiSidebarProvider` component. This is to ensure that the sidebar can be toggled on and off.

```vue [app.vue]
<template>
  <UiSidebarProvider>
    <!-- Other Sidebar stuff -->
  </UiSidebarProvider>
</template>
```

### First Sidebar

Let's start with the most basic sidebar. A collapsible sidebar with a menu.

:BlockShowcase{blockPath="Sidebar/BlockSidebarFirstSidebar" containerClass="h-screen" component="BlockSidebarFirstSidebar" iframeHeight="600px"}

The code. Take note of the `UiSidebarTrigger` component. This is what toggles the sidebar.

Also, the `UiSidebarInset` component! When I just started using this component, I was confused as to where the page content should go.

<!-- automd:file src="../../app/components/content/Block/Sidebar/BlockSidebarFirstSidebar.vue" code lang="vue" -->

```vue [BlockSidebarFirstSidebar.vue]
<template>
  <UiSidebarProvider>
    <UiSidebar>
      <UiSidebarContent>
        <UiSidebarGroup>
          <UiSidebarGroupLabel label="Application" />
          <UiSidebarGroupContent>
            <UiSidebarMenu>
              <UiSidebarMenuItem v-for="item in items" :key="item.title">
                <UiSidebarMenuButton as-child>
                  <a :href="item.url">
                    <Icon :name="item.icon" />
                    <span>{{ item.title }}</span>
                  </a>
                </UiSidebarMenuButton>
              </UiSidebarMenuItem>
            </UiSidebarMenu>
          </UiSidebarGroupContent>
        </UiSidebarGroup>
      </UiSidebarContent>
    </UiSidebar>
    <UiSidebarInset>
      <UiNavbar sticky>
        <UiContainer class="flex h-12 items-center">
          <UiSidebarTrigger />
        </UiContainer>
      </UiNavbar>
    </UiSidebarInset>
  </UiSidebarProvider>
</template>

<script lang="ts" setup>
  // Menu items.
  const items = [
    { title: "Home", url: "#", icon: "lucide:home" },
    { title: "Inbox", url: "#", icon: "lucide:inbox" },
    { title: "Calendar", url: "#", icon: "lucide:calendar" },
    { title: "Search", url: "#", icon: "lucide:search" },
    { title: "Settings", url: "#", icon: "lucide:settings" },
  ];
</script>
```

<!-- /automd -->

## SidebarHeader

Use the `UiSidebarHeader` component to add a sticky header to the sidebar.

The following example adds a `<UiDropdownMenu>` to the `UiSidebarHeader`.

:BlockShowcase{blockPath="Sidebar/BlockSidebarHeader" containerClass="h-screen" component="BlockSidebarHeader" iframeHeight="600px"}

## SidebarFooter

Use the `UiSidebarFooter` component to add a sticky footer to the sidebar.

The following example adds a `<UiDropdownMenu>` to the `UiSidebarFooter`.

:BlockShowcase{blockPath="Sidebar/BlockSidebarFooter" containerClass="h-screen" component="BlockSidebarFooter" iframeHeight="600px"}

## Collapsible SidebarGroup

To make a `UiSidebarGroup` collapsible, wrap it in a `UiCollapsible`.

:BlockShowcase{blockPath="Sidebar/BlockSidebarCollapsibleSideGroup" containerClass="h-screen" component="BlockSidebarCollapsibleSideGroup" iframeHeight="600px"}

We wrap the `UiCollapsibleTrigger` in a `UiSidebarGroupLabel` to render a button.

## SidebarGroupAction

Use the `UiSidebarGroupAction` component to add an action button to the `UiSidebarGroup`.

:BlockShowcase{blockPath="Sidebar/BlockSidebarSidebarGroupAction" containerClass="h-screen" component="BlockSidebarSidebarGroupAction" iframeHeight="600px"}

## SidebarMenuAction

The `UiSidebarMenuAction` component is used to render a menu action within a `UiSidebarMenuItem`.

This button works independently of the `UiSidebarMenuButton` i.e you can have the `<UiSidebarMenuButton />` as a clickable link and the `<UiSidebarMenuAction />` as a button.

:BlockShowcase{blockPath="Sidebar/BlockSidebarSidebarMenuAction" containerClass="h-screen" component="BlockSidebarSidebarMenuAction" iframeHeight="600px"}

## SidebarMenuSub

The `UiSidebarMenuSub` component is used to render a submenu within a `UiSidebarMenu`.

Use `<UiSidebarMenuSubItem />` and `<UiSidebarMenuSubButton />` to render a submenu item.

:BlockShowcase{blockPath="Sidebar/BlockSidebarSidebarMenuSub" containerClass="h-screen" component="BlockSidebarSidebarMenuSub" iframeHeight="600px"}

## Collapsible SidebarMenu

To make a `UiSidebarMenu` component collapsible, wrap it and the `UiSidebarMenuSub` components in a `UiCollapsible`.

:BlockShowcase{blockPath="Sidebar/BlockSidebarSidebarMenuSubCollapsible" containerClass="h-screen" component="BlockSidebarSidebarMenuSubCollapsible" iframeHeight="600px"}

## SidebarMenuBadge

The `UiSidebarMenuBadge` component is used to render a badge within a `UiSidebarMenuItem`.

:BlockShowcase{blockPath="Sidebar/BlockSidebarSidebarMenuBadge" containerClass="h-screen" component="BlockSidebarSidebarMenuBadge" iframeHeight="600px"}

## SidebarRail

The `UiSidebarRail` component is used to render a rail within a `UiSidebar`. This rail can be used to toggle the sidebar.

:BlockShowcase{blockPath="Sidebar/BlockSidebarSidebarRail" containerClass="h-screen" component="BlockSidebarSidebarRail" iframeHeight="600px"}

## Controlled Sidebar

Use the `v-model:open` directive to control the visibility of the sidebar.

This should be added to the `UiSidebarProvider` component.

You can even model this to local storage with the help of [useStorage](https://vueuse.org/core/useStorage/) from VueUse.

You can even use Pinia to store the state of the sidebar & make it global.

:BlockShowcase{blockPath="Sidebar/BlockSidebarControlled" containerClass="h-screen" component="BlockSidebarControlled" iframeHeight="600px"}
