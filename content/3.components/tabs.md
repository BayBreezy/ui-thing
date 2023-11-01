---
title: Tabs
description: A set of layered sections of content—known as tab panels—that are displayed one at a time.
links:
  - title: Radix-Vue
    href: https://www.radix-vue.com/components/tabs.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://www.radix-vue.com/components/tabs.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="Tabs"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add tabs
```

## Usage

### Basic example

::ShowCase{component="DocsTabs"}

#code

```vue [DocsTabs.vue]
<template>
  <div class="flex w-full justify-center">
    <UITabs class="w-[400px]" default-value="account">
      <UITabsList class="grid w-full grid-cols-2">
        <UITabsTrigger value="account">Account</UITabsTrigger>
        <UITabsTrigger value="password">Password</UITabsTrigger>
      </UITabsList>
      <UITabsContent value="account">
        <UICard
          title="Account"
          description="Make changes to your account here. Click save when you're done."
        >
          <template #content>
            <UICardContent class="space-y-2">
              <div class="space-y-1">
                <UILabel for="name">Name</UILabel>
                <UIInput id="name" value="Pedro Duarte" />
              </div>
              <div class="space-y-1">
                <UILabel htmlFor="username">Username</UILabel>
                <UIInput id="username" value="@peduarte" />
              </div>
            </UICardContent>
          </template>
          <template #footer>
            <UICardFooter>
              <UIButton>Save changes</UIButton>
            </UICardFooter>
          </template>
        </UICard>
      </UITabsContent>
      <UITabsContent value="password">
        <UICard
          title="Password"
          description="Change your password here. After saving, you'll be logged out."
        >
          <template #content>
            <UICardContent class="space-y-2">
              <div class="space-y-1">
                <UILabel htmlFor="current">Current password</UILabel>
                <UIInput id="current" type="password" />
              </div>
              <div class="space-y-1">
                <UILabel htmlFor="new">New password</UILabel>
                <UIInput id="new" type="password" />
              </div>
            </UICardContent>
          </template>
          <template #footer>
            <UICardFooter>
              <UIButton>Save password</UIButton>
            </UICardFooter>
          </template>
        </UICard>
      </UITabsContent>
    </UITabs>
  </div>
</template>
```

::
