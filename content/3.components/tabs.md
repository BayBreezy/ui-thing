---
title: Tabs
description: A set of layered sections of content—known as tab panels—that are displayed one at a time.
label: New Examples
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

::ShowCase

:DocsTabs

#code

<!-- automd:file src="../../app/components/content/Docs/Tabs/DocsTabs.vue" code lang="vue" -->

```vue [DocsTabs.vue]
<template>
  <div class="flex w-full justify-center">
    <UiTabs class="w-[400px]" default-value="account">
      <UiTabsList class="grid w-full grid-cols-2">
        <UiTabsTrigger value="account">Account</UiTabsTrigger>
        <UiTabsTrigger value="password">Password</UiTabsTrigger>
      </UiTabsList>
      <UiTabsContent value="account">
        <UiCard
          title="Account"
          description="Make changes to your account here. Click save when you're done."
        >
          <template #content>
            <UiCardContent class="space-y-2">
              <div class="space-y-1">
                <UiLabel for="name">Name</UiLabel>
                <UiInput id="name" value="Pedro Duarte" />
              </div>
              <div class="space-y-1">
                <UiLabel html-for="username">Username</UiLabel>
                <UiInput id="username" value="@peduarte" />
              </div>
            </UiCardContent>
          </template>
          <template #footer>
            <UiCardFooter>
              <UiButton>Save changes</UiButton>
            </UiCardFooter>
          </template>
        </UiCard>
      </UiTabsContent>
      <UiTabsContent value="password">
        <UiCard
          title="Password"
          description="Change your password here. After saving, you'll be logged out."
        >
          <template #content>
            <UiCardContent class="space-y-2">
              <div class="space-y-1">
                <UiLabel html-for="current">Current password</UiLabel>
                <UiInput id="current" type="password" />
              </div>
              <div class="space-y-1">
                <UiLabel html-for="new">New password</UiLabel>
                <UiInput id="new" type="password" />
              </div>
            </UiCardContent>
          </template>
          <template #footer>
            <UiCardFooter>
              <UiButton>Save password</UiButton>
            </UiCardFooter>
          </template>
        </UiCard>
      </UiTabsContent>
    </UiTabs>
  </div>
</template>
```

<!-- /automd -->

::

### With Indicator

Passing `:pill="false"` to the List and Trigger components will remove the background color from both components. This allows us to use the Indicator component to create a custom indicator.

::ShowCase

:DocsTabsIndicator

#code

<!-- automd:file src="../../app/components/content/Docs/Tabs/DocsTabsIndicator.vue" code lang="vue" -->

```vue [DocsTabsIndicator.vue]
<template>
  <div class="flex w-full justify-center">
    <UiTabs class="w-[400px]" default-value="account">
      <UiTabsList :pill="false" class="relative grid w-full grid-cols-2">
        <UiTabsTrigger :pill="false" value="account">Account</UiTabsTrigger>
        <UiTabsTrigger :pill="false" value="password">Password</UiTabsTrigger>
        <UiTabsIndicator />
      </UiTabsList>
      <UiTabsContent value="account">
        <UiCard
          title="Account"
          description="Make changes to your account here. Click save when you're done."
        >
          <template #content>
            <UiCardContent class="space-y-2">
              <div class="space-y-1">
                <UiLabel for="name">Name</UiLabel>
                <UiInput id="name" model-value="Pedro Duarte" />
              </div>
              <div class="space-y-1">
                <UiLabel html-for="username">Username</UiLabel>
                <UiInput id="username" model-value="@peduarte" />
              </div>
            </UiCardContent>
          </template>
          <template #footer>
            <UiCardFooter>
              <UiButton>Save changes</UiButton>
            </UiCardFooter>
          </template>
        </UiCard>
      </UiTabsContent>
      <UiTabsContent value="password">
        <UiCard
          title="Password"
          description="Change your password here. After saving, you'll be logged out."
        >
          <template #content>
            <UiCardContent class="space-y-2">
              <div class="space-y-1">
                <UiLabel html-for="current">Current password</UiLabel>
                <UiInput id="current" type="password" />
              </div>
              <div class="space-y-1">
                <UiLabel html-for="new">New password</UiLabel>
                <UiInput id="new" type="password" />
              </div>
            </UiCardContent>
          </template>
          <template #footer>
            <UiCardFooter>
              <UiButton>Save password</UiButton>
            </UiCardFooter>
          </template>
        </UiCard>
      </UiTabsContent>
    </UiTabs>
  </div>
</template>
```

<!-- /automd -->

::

## Origin UI Examples

These are some examples that I found today over here [Origin UI](https://originui.com/tabs). I think they are cool.

To use these examples you will have to copy the code and adjust it for your own use.

### One

::ShowCase

:DocsTabs1

#code

<!-- automd:file src="../../app/components/content/Docs/Tabs/DocsTabs1.vue" code lang="vue" -->

```vue [DocsTabs1.vue]
<template>
  <div>
    <UiTabs default-value="tab-1">
      <div class="flex justify-center">
        <UiTabsList>
          <UiTabsTrigger v-for="t in 3" :key="t" :value="`tab-${t}`">Tab {{ t }}</UiTabsTrigger>
        </UiTabsList>
      </div>
      <UiTabsContent v-for="t in 3" :key="t" :value="`tab-${t}`">
        <p class="p-4 text-center text-sm text-muted-foreground">Content for Tab {{ t }}</p>
      </UiTabsContent>
    </UiTabs>
  </div>
</template>
```

<!-- /automd -->

::

### Two

::ShowCase

:DocsTabs2

#code

<!-- automd:file src="../../app/components/content/Docs/Tabs/DocsTabs2.vue" code lang="vue" -->

```vue [DocsTabs2.vue]
<template>
  <div>
    <UiTabs default-value="tab-1">
      <div class="flex justify-center">
        <UiTabsList class="bg-transparent">
          <UiTabsTrigger
            v-for="t in 3"
            :key="t"
            :value="`tab-${t}`"
            class="data-[state=active]:bg-muted data-[state=active]:shadow-none"
            >Tab {{ t }}</UiTabsTrigger
          >
        </UiTabsList>
      </div>
      <UiTabsContent v-for="t in 3" :key="t" :value="`tab-${t}`">
        <p class="p-4 text-center text-sm text-muted-foreground">Content for Tab {{ t }}</p>
      </UiTabsContent>
    </UiTabs>
  </div>
</template>
```

<!-- /automd -->

::

### Three

::ShowCase

:DocsTabs3

#code

<!-- automd:file src="../../app/components/content/Docs/Tabs/DocsTabs3.vue" code lang="vue" -->

```vue [DocsTabs3.vue]
<template>
  <div>
    <UiTabs default-value="tab-1">
      <div class="flex justify-center">
        <UiTabsList class="bg-transparent">
          <UiTabsTrigger
            v-for="t in 3"
            :key="t"
            :value="`tab-${t}`"
            class="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
            >Tab {{ t }}</UiTabsTrigger
          >
        </UiTabsList>
      </div>
      <UiTabsContent v-for="t in 3" :key="t" :value="`tab-${t}`">
        <p class="p-4 text-center text-sm text-muted-foreground">Content for Tab {{ t }}</p>
      </UiTabsContent>
    </UiTabs>
  </div>
</template>
```

<!-- /automd -->

::

### Four

::ShowCase

:DocsTabs4

#code

<!-- automd:file src="../../app/components/content/Docs/Tabs/DocsTabs4.vue" code lang="vue" -->

```vue [DocsTabs4.vue]
<template>
  <div>
    <UiTabs default-value="tab-1">
      <div class="flex justify-center">
        <UiTabsList :pill="false" class="relative bg-transparent">
          <UiTabsTrigger
            v-for="t in 3"
            :key="t"
            :pill="false"
            :value="`tab-${t}`"
            class="relative rounded-none py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >Tab {{ t }}</UiTabsTrigger
          >
          <UiTabsIndicator />
        </UiTabsList>
      </div>
      <UiTabsContent v-for="t in 3" :key="t" :value="`tab-${t}`">
        <p class="p-4 text-center text-sm text-muted-foreground">Content for Tab {{ t }}</p>
      </UiTabsContent>
    </UiTabs>
  </div>
</template>
```

<!-- /automd -->

::

### Five

::ShowCase

:DocsTabs5

#code

<!-- automd:file src="../../app/components/content/Docs/Tabs/DocsTabs5.vue" code lang="vue" -->

```vue [DocsTabs5.vue]
<template>
  <div>
    <UiTabs default-value="tab-1">
      <div class="flex justify-center">
        <UiTabsList :pill="false" class="relative bg-transparent">
          <UiTabsTrigger
            v-for="t in 3"
            :key="t"
            :pill="false"
            :value="`tab-${t}`"
            class="relative hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:hover:bg-accent"
            >Tab {{ t }}</UiTabsTrigger
          >
          <UiTabsIndicator />
        </UiTabsList>
      </div>
      <UiTabsContent v-for="t in 3" :key="t" :value="`tab-${t}`">
        <p class="p-4 text-center text-sm text-muted-foreground">Content for Tab {{ t }}</p>
      </UiTabsContent>
    </UiTabs>
  </div>
</template>
```

<!-- /automd -->

::

### Six

::ShowCase

:DocsTabs6

#code

<!-- automd:file src="../../app/components/content/Docs/Tabs/DocsTabs6.vue" code lang="vue" -->

```vue [DocsTabs6.vue]
<template>
  <div>
    <UiTabs default-value="tab-1">
      <div class="flex justify-center">
        <UiTabsList
          :pill="false"
          class="relative h-auto -space-x-px bg-background p-0 shadow-sm shadow-black/5 rtl:space-x-reverse"
        >
          <UiTabsTrigger
            v-for="t in 3"
            :key="t"
            :pill="false"
            :value="`tab-${t}`"
            class="rounded-none border first:rounded-s data-[state=active]:bg-muted [&:nth-child(3n)]:rounded-e"
            >Tab {{ t }}</UiTabsTrigger
          >
          <UiTabsIndicator />
        </UiTabsList>
      </div>
      <UiTabsContent v-for="t in 3" :key="t" :value="`tab-${t}`">
        <p class="p-4 text-center text-sm text-muted-foreground">Content for Tab {{ t }}</p>
      </UiTabsContent>
    </UiTabs>
  </div>
</template>
```

<!-- /automd -->

::

### Seven

::ShowCase

:DocsTabs7

#code

<!-- automd:file src="../../app/components/content/Docs/Tabs/DocsTabs7.vue" code lang="vue" -->

```vue [DocsTabs7.vue]
<template>
  <div>
    <UiTabs default-value="tab-1" class="flex flex-col justify-center">
      <UiTabsList
        :pill="false"
        class="relative h-auto w-full gap-0.5 bg-transparent p-0 before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-border"
      >
        <UiTabsTrigger
          v-for="t in 3"
          :key="t"
          :pill="false"
          :value="`tab-${t}`"
          class="overflow-hidden rounded-b-none border-x border-t border-border bg-muted py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
          >Tab {{ t }}</UiTabsTrigger
        >
      </UiTabsList>

      <UiTabsContent v-for="t in 3" :key="t" :value="`tab-${t}`">
        <p class="p-4 text-center text-sm text-muted-foreground">Content for Tab {{ t }}</p>
      </UiTabsContent>
    </UiTabs>
  </div>
</template>
```

<!-- /automd -->

::

### Eight

::ShowCase

:DocsTabs8

#code

<!-- automd:file src="../../app/components/content/Docs/Tabs/DocsTabs8.vue" code lang="vue" -->

```vue [DocsTabs8.vue]
<template>
  <div>
    <UiTabs default-value="Projects">
      <div class="flex justify-center">
        <UiTabsList>
          <UiTabsTrigger
            v-for="t in tabs"
            :key="t.title"
            :value="t.title"
            class="flex items-center gap-2"
          >
            <Icon :name="t.icon" class="-ms-0.5 me-1.5 size-4 shrink-0 opacity-60" />
            {{ t.title }}
            <UiBadge v-if="t.badge" class="px-2">{{ t.badge }}</UiBadge>
          </UiTabsTrigger>
        </UiTabsList>
      </div>
      <UiTabsContent v-for="t in tabs" :key="t.title" :value="t.title">
        <p class="p-4 text-center text-sm text-muted-foreground">{{ t.content }}</p>
      </UiTabsContent>
    </UiTabs>
  </div>
</template>

<script lang="ts" setup>
  const tabs = [
    {
      title: "Overview",
      icon: "lucide:home",
      content: "This is the overview. Here you can see the overview of the project.",
    },
    {
      title: "Projects",
      badge: 3,
      icon: "lucide:panels-top-left",
      content: "These are the number of outstanding projects.",
    },
    {
      title: "Packages",
      icon: "lucide:box",
      badge: "New",
      content: "You have a few new packages awaiting your approval.",
    },
  ];
</script>
```

<!-- /automd -->

::

### Nine

::ShowCase

:DocsTabs9

#code

<!-- automd:file src="../../app/components/content/Docs/Tabs/DocsTabs9.vue" code lang="vue" -->

```vue [DocsTabs9.vue]
<template>
  <div>
    <UiTabs default-value="Projects">
      <div class="flex justify-center">
        <UiTabsList class="bg-transparent">
          <UiTabsTrigger
            v-for="t in tabs"
            :key="t.title"
            :value="t.title"
            class="flex items-center gap-2 rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
          >
            <Icon :name="t.icon" class="-ms-0.5 me-1.5 size-4 shrink-0 opacity-60" />
            {{ t.title }}
          </UiTabsTrigger>
        </UiTabsList>
      </div>
      <UiTabsContent v-for="t in tabs" :key="t.title" :value="t.title">
        <p class="p-4 text-center text-sm text-muted-foreground">{{ t.content }}</p>
      </UiTabsContent>
    </UiTabs>
  </div>
</template>

<script lang="ts" setup>
  const tabs = [
    {
      title: "Overview",
      icon: "lucide:home",
      content: "This is the overview. Here you can see the overview of the project.",
    },
    {
      title: "Projects",
      badge: 3,
      icon: "lucide:panels-top-left",
      content: "These are the number of outstanding projects.",
    },
    {
      title: "Packages",
      icon: "lucide:box",
      badge: "New",
      content: "You have a few new packages awaiting your approval.",
    },
  ];
</script>
```

<!-- /automd -->

::

### Ten

::ShowCase

:DocsTabs10

#code

<!-- automd:file src="../../app/components/content/Docs/Tabs/DocsTabs10.vue" code lang="vue" -->

```vue [DocsTabs10.vue]
<template>
  <div>
    <UiTabs default-value="Projects">
      <div class="relative mb-3 flex justify-center">
        <UiTabsList
          class="h-auto -space-x-px bg-background p-0 shadow-sm shadow-black/5 rtl:space-x-reverse"
        >
          <UiTabsTrigger
            v-for="t in tabs"
            :key="t.title"
            :value="t.title"
            class="relative flex items-center gap-2 overflow-hidden rounded-none border border-border py-2 first:rounded-s last:rounded-e data-[state=active]:bg-muted"
          >
            <Icon :name="t.icon" class="-ms-0.5 me-1.5 size-4 shrink-0 opacity-60" />
            {{ t.title }}
          </UiTabsTrigger>
        </UiTabsList>
        <UiTabsIndicator />
      </div>
      <UiTabsContent v-for="t in tabs" :key="t.title" :value="t.title">
        <p class="p-4 text-center text-sm text-muted-foreground">{{ t.content }}</p>
      </UiTabsContent>
    </UiTabs>
  </div>
</template>

<script lang="ts" setup>
  const tabs = [
    {
      title: "Overview",
      icon: "lucide:home",
      content: "This is the overview. Here you can see the overview of the project.",
    },
    {
      title: "Projects",
      badge: 3,
      icon: "lucide:panels-top-left",
      content: "These are the number of outstanding projects.",
    },
    {
      title: "Packages",
      icon: "lucide:box",
      badge: "New",
      content: "You have a few new packages awaiting your approval.",
    },
  ];
</script>
```

<!-- /automd -->

::

### Eleven

::ShowCase

:DocsTabs11

#code

<!-- automd:file src="../../app/components/content/Docs/Tabs/DocsTabs11.vue" code lang="vue" -->

```vue [DocsTabs11.vue]
<template>
  <div>
    <UiTabs default-value="Projects">
      <div class="relative flex justify-center">
        <UiTabsList
          class="relative mb-3 h-auto w-full gap-0.5 bg-transparent p-0 before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-border"
        >
          <UiTabsTrigger
            v-for="t in tabs"
            :key="t.title"
            :value="t.title"
            class="relative flex items-center gap-2 overflow-hidden rounded-b-none border-x border-t border-border bg-muted py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
          >
            <Icon :name="t.icon" class="-ms-0.5 me-1.5 size-4 shrink-0 opacity-60" />
            {{ t.title }}
          </UiTabsTrigger>
        </UiTabsList>
      </div>
      <UiTabsContent v-for="t in tabs" :key="t.title" :value="t.title">
        <p class="p-4 text-center text-sm text-muted-foreground">{{ t.content }}</p>
      </UiTabsContent>
    </UiTabs>
  </div>
</template>

<script lang="ts" setup>
  const tabs = [
    {
      title: "Overview",
      icon: "lucide:home",
      content: "This is the overview. Here you can see the overview of the project.",
    },
    {
      title: "Projects",
      badge: 3,
      icon: "lucide:panels-top-left",
      content: "These are the number of outstanding projects.",
    },
    {
      title: "Packages",
      icon: "lucide:box",
      badge: "New",
      content: "You have a few new packages awaiting your approval.",
    },
  ];
</script>
```

<!-- /automd -->

::

### Twelve

::ShowCase

:DocsTabs12

#code

<!-- automd:file src="../../app/components/content/Docs/Tabs/DocsTabs12.vue" code lang="vue" -->

```vue [DocsTabs12.vue]
<template>
  <div class="flex justify-center">
    <UiTabs default-value="Projects">
      <UiScrollArea orientation="horizontal" class="w-full max-w-lg">
        <UiTabsList
          class="relative mb-3 h-auto gap-2 rounded-none border-b border-border bg-transparent px-0 py-1 text-foreground"
        >
          <UiTabsTrigger
            v-for="t in tabs"
            :key="t.title"
            :value="t.title"
            class="relative hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:hover:bg-accent"
          >
            <Icon :name="t.icon" class="-ms-0.5 me-1.5 size-4 shrink-0 opacity-60" />
            {{ t.title }}
          </UiTabsTrigger>
          <UiTabsIndicator />
        </UiTabsList>
      </UiScrollArea>
      <UiTabsContent v-for="t in tabs" :key="t.title" :value="t.title">
        <p class="p-4 text-center text-sm text-muted-foreground">{{ t.content }}</p>
      </UiTabsContent>
    </UiTabs>
  </div>
</template>

<script lang="ts" setup>
  const tabs = [
    {
      title: "Overview",
      icon: "lucide:home",
      content: "This is the overview. Here you can see the overview of the project.",
    },
    {
      title: "Projects",
      icon: "lucide:panels-top-left",
      content: "These are the number of outstanding projects.",
    },
    {
      title: "Packages",
      icon: "lucide:box",
      content: "You have a few new packages awaiting your approval.",
    },
    {
      title: "Team",
      icon: "lucide:users",
      content: "This is the team section. Here you can see the team members.",
    },
    {
      title: "Settings",
      icon: "lucide:settings",
      content: "This is the settings section. Here you can change the settings.",
    },
    {
      title: "Reports",
      icon: "lucide:chart-area",
      content: "This is the reports section. Here you can see the reports.",
    },
  ];
</script>
```

<!-- /automd -->

::

### Thirteen

::ShowCase

:DocsTabs13

#code

<!-- automd:file src="../../app/components/content/Docs/Tabs/DocsTabs13.vue" code lang="vue" -->

```vue [DocsTabs13.vue]
<template>
  <div class="flex justify-center">
    <UiTabs default-value="Projects">
      <UiTabsList
        class="flex h-auto justify-center rounded-none border-b border-border bg-transparent p-0"
      >
        <UiTabsTrigger
          v-for="t in tabs"
          :key="t.title"
          :value="t.title"
          class="relative flex-col rounded-none px-4 py-2 text-xs after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary"
        >
          <Icon :name="t.icon" class="mb-1.5 size-4 shrink-0 opacity-60" />
          {{ t.title }}
        </UiTabsTrigger>
      </UiTabsList>
      <UiTabsContent v-for="t in tabs" :key="t.title" :value="t.title">
        <p class="mx-auto max-w-sm text-pretty p-4 text-center text-sm text-muted-foreground">
          {{ t.content }}
        </p>
      </UiTabsContent>
    </UiTabs>
  </div>
</template>

<script lang="ts" setup>
  const tabs = [
    {
      title: "Overview",
      icon: "lucide:home",
      content: "This is the overview. Here you can see the overview of the project.",
    },
    {
      title: "Projects",
      icon: "lucide:panels-top-left",
      content: "These are the number of outstanding projects.",
    },
    {
      title: "Packages",
      icon: "lucide:box",
      content: "You have a few new packages awaiting your approval.",
    },
  ];
</script>
```

<!-- /automd -->

::

### Fourteen

::ShowCase

:DocsTabs14

#code

<!-- automd:file src="../../app/components/content/Docs/Tabs/DocsTabs14.vue" code lang="vue" -->

```vue [DocsTabs14.vue]
<template>
  <div class="flex justify-center">
    <UiTabs default-value="Projects">
      <UiTabsList class="mx-auto flex max-w-xs bg-transparent">
        <UiTabsTrigger
          v-for="t in tabs"
          :key="t.title"
          :value="t.title"
          :pill="false"
          class="group flex-1 flex-col p-3 text-xs data-[state=active]:bg-muted data-[state=active]:shadow-none"
        >
          <UiBadge
            class="mb-1.5 flex min-w-5 items-center justify-center px-1 transition-opacity group-data-[state=inactive]:opacity-50"
            >{{ t.badge }}</UiBadge
          >
          {{ t.title }}
        </UiTabsTrigger>
      </UiTabsList>
      <UiTabsContent v-for="t in tabs" :key="t.title" :value="t.title">
        <p class="mx-auto max-w-sm text-pretty p-4 text-center text-sm text-muted-foreground">
          {{ t.content }}
        </p>
      </UiTabsContent>
    </UiTabs>
  </div>
</template>

<script lang="ts" setup>
  const tabs = [
    {
      title: "Overview",
      icon: "lucide:home",
      badge: 3,
      content: "This is the overview. Here you can see the overview of the project.",
    },
    {
      title: "Projects",
      icon: "lucide:panels-top-left",
      badge: 0,
      content: "These are the number of outstanding projects.",
    },
    {
      title: "Packages",
      icon: "lucide:box",
      badge: 7,
      content: "You have a few new packages awaiting your approval.",
    },
  ];
</script>
```

<!-- /automd -->

::

### Fifteen

::ShowCase

:DocsTabs15

#code

<!-- automd:file src="../../app/components/content/Docs/Tabs/DocsTabs15.vue" code lang="vue" -->

```vue [DocsTabs15.vue]
<template>
  <div class="flex justify-center">
    <UiTabs default-value="Projects">
      <div class="flex justify-center">
        <UiTabsList class="h-12 p-0.5">
          <UiTooltip v-for="t in tabs" :key="t.title">
            <UiTooltipTrigger as-child>
              <span class="h-full">
                <UiTabsTrigger :value="t.title" class="h-full">
                  <UiChip
                    v-if="t.badge"
                    class="bg-primary text-primary-foreground"
                    :text="t.badge?.toString()"
                    size="lg"
                  >
                    <Icon :name="t.icon" class="size-5 shrink-0" />
                  </UiChip>
                  <Icon v-else :name="t.icon" class="size-5 shrink-0" />
                </UiTabsTrigger>
              </span>
            </UiTooltipTrigger>
            <UiTooltipContent class="px-2 py-1 text-xs">{{ t.title }}</UiTooltipContent>
          </UiTooltip>
        </UiTabsList>
      </div>
      <UiTabsContent v-for="t in tabs" :key="t.title" :value="t.title">
        <p class="mx-auto text-pretty p-4 text-center text-sm text-muted-foreground">
          {{ t.content }}
        </p>
      </UiTabsContent>
    </UiTabs>
  </div>
</template>

<script lang="ts" setup>
  const tabs = [
    {
      title: "Overview",
      icon: "lucide:home",
      content: "This is the overview. Here you can see the overview of the project.",
    },
    {
      title: "Projects",
      icon: "lucide:panels-top-left",
      badge: 2,
      content: "These are the number of outstanding projects.",
    },
    {
      title: "Packages",
      icon: "lucide:box",
      content: "You have a few new packages awaiting your approval.",
    },
  ];
</script>
```

<!-- /automd -->

::

### Sixteen

::ShowCase

:DocsTabs16

#code

<!-- automd:file src="../../app/components/content/Docs/Tabs/DocsTabs16.vue" code lang="vue" -->

```vue [DocsTabs16.vue]
<template>
  <div class="mx-auto w-full max-w-lg">
    <UiTabs default-value="Projects" orientation="vertical" class="flex w-full gap-2">
      <div class="flex justify-center">
        <UiTabsList class="h-auto flex-col p-0.5">
          <UiTooltip v-for="t in tabs" :key="t.title">
            <UiTooltipTrigger as-child>
              <span class="h-full">
                <UiTabsTrigger :value="t.title" class="h-full py-3">
                  <UiChip
                    v-if="t.badge"
                    class="bg-primary text-primary-foreground"
                    :text="t.badge?.toString()"
                    size="lg"
                  >
                    <Icon :name="t.icon" class="size-5 shrink-0" />
                  </UiChip>
                  <Icon v-else :name="t.icon" class="size-5 shrink-0" />
                </UiTabsTrigger>
              </span>
            </UiTooltipTrigger>
            <UiTooltipContent side="right" class="px-2 py-1 text-xs">{{
              t.title
            }}</UiTooltipContent>
          </UiTooltip>
        </UiTabsList>
      </div>
      <div className="grow rounded-lg border border-border text-start">
        <UiTabsContent v-for="t in tabs" :key="t.title" :value="t.title">
          <p class="text-pretty px-3 text-sm text-muted-foreground">
            {{ t.content }}
          </p>
        </UiTabsContent>
      </div>
    </UiTabs>
  </div>
</template>

<script lang="ts" setup>
  const tabs = [
    {
      title: "Overview",
      icon: "lucide:home",
      content: "This is the overview. Here you can see the overview of the project.",
    },
    {
      title: "Projects",
      icon: "lucide:panels-top-left",
      badge: 2,
      content: "These are the number of outstanding projects.",
    },
    {
      title: "Packages",
      icon: "lucide:box",
      content: "You have a few new packages awaiting your approval.",
    },
  ];
</script>
```

<!-- /automd -->

::

### Seventeen

::ShowCase

:DocsTabs17

#code

<!-- automd:file src="../../app/components/content/Docs/Tabs/DocsTabs17.vue" code lang="vue" -->

```vue [DocsTabs17.vue]
<template>
  <UiTabs
    default-value="Projects"
    orientation="vertical"
    class="mx-auto flex w-full max-w-lg justify-center gap-2"
  >
    <UiTabsList class="h-auto flex-col p-0.5">
      <UiTabsTrigger v-for="t in tabs" :key="t.title" :value="t.title" class="w-full">
        {{ t.title }}
      </UiTabsTrigger>
    </UiTabsList>

    <div className="grow rounded-lg border border-border text-start">
      <UiTabsContent v-for="t in tabs" :key="t.title" :value="t.title">
        <p class="text-pretty px-3 text-sm text-muted-foreground">
          {{ t.content }}
        </p>
      </UiTabsContent>
    </div>
  </UiTabs>
</template>

<script lang="ts" setup>
  const tabs = [
    {
      title: "Overview",
      icon: "lucide:home",
      content: "This is the overview. Here you can see the overview of the project.",
    },
    {
      title: "Projects",
      icon: "lucide:panels-top-left",
      badge: 2,
      content: "These are the number of outstanding projects.",
    },
    {
      title: "Packages",
      icon: "lucide:box",
      content: "You have a few new packages awaiting your approval.",
    },
  ];
</script>
```

<!-- /automd -->

::

### Eighteen

::ShowCase

:DocsTabs18

#code

<!-- automd:file src="../../app/components/content/Docs/Tabs/DocsTabs18.vue" code lang="vue" -->

```vue [DocsTabs18.vue]
<template>
  <UiTabs
    default-value="Projects"
    orientation="vertical"
    class="mx-auto flex w-full max-w-lg justify-center gap-2"
  >
    <UiTabsList
      :pill="false"
      class="relative h-auto flex-col rounded-none border-l border-border bg-transparent p-0"
    >
      <UiTabsTrigger
        v-for="t in tabs"
        :key="t.title"
        :pill="false"
        :value="t.title"
        class="relative w-full justify-start rounded-none after:absolute after:inset-y-0 after:start-0 after:w-0.5 data-[state=active]:after:bg-primary"
      >
        {{ t.title }}
      </UiTabsTrigger>
    </UiTabsList>

    <div className="grow rounded-lg border border-border text-start">
      <UiTabsContent v-for="t in tabs" :key="t.title" :value="t.title">
        <p class="text-pretty px-3 text-sm text-muted-foreground">
          {{ t.content }}
        </p>
      </UiTabsContent>
    </div>
  </UiTabs>
</template>

<script lang="ts" setup>
  const tabs = [
    {
      title: "Overview",
      icon: "lucide:home",
      content: "This is the overview. Here you can see the overview of the project.",
    },
    {
      title: "Projects",
      icon: "lucide:panels-top-left",
      badge: 2,
      content: "These are the number of outstanding projects.",
    },
    {
      title: "Packages",
      icon: "lucide:box",
      content: "You have a few new packages awaiting your approval.",
    },
  ];
</script>
```

<!-- /automd -->

::

### Nineteen

::ShowCase

:DocsTabs19

#code

<!-- automd:file src="../../app/components/content/Docs/Tabs/DocsTabs19.vue" code lang="vue" -->

```vue [DocsTabs19.vue]
<template>
  <UiTabs
    default-value="Projects"
    orientation="vertical"
    class="mx-auto flex w-full max-w-lg justify-center gap-2"
  >
    <UiTabsList
      :pill="false"
      class="relative h-auto flex-col gap-1 rounded-none bg-transparent px-1 py-0 text-foreground"
    >
      <UiTabsTrigger
        v-for="t in tabs"
        :key="t.title"
        :pill="false"
        :value="t.title"
        class="relative w-full justify-start after:absolute after:inset-y-0 after:start-0 after:-ms-1 after:w-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent"
      >
        <Icon :name="t.icon" class="-ms-0.5 me-1.5 size-4 opacity-60" />
        {{ t.title }}
      </UiTabsTrigger>
    </UiTabsList>

    <div className="grow rounded-lg border border-border text-start">
      <UiTabsContent v-for="t in tabs" :key="t.title" :value="t.title">
        <p class="text-pretty px-3 text-sm text-muted-foreground">
          {{ t.content }}
        </p>
      </UiTabsContent>
    </div>
  </UiTabs>
</template>

<script lang="ts" setup>
  const tabs = [
    {
      title: "Overview",
      icon: "lucide:home",
      content: "This is the overview. Here you can see the overview of the project.",
    },
    {
      title: "Projects",
      icon: "lucide:panels-top-left",
      content: "These are the number of outstanding projects.",
    },
    {
      title: "Packages",
      icon: "lucide:box",
      content: "You have a few new packages awaiting your approval.",
    },
  ];
</script>
```

<!-- /automd -->

::

### Twenty

::ShowCase

:DocsTabs20

#code

<!-- automd:file src="../../app/components/content/Docs/Tabs/DocsTabs20.vue" code lang="vue" -->

```vue [DocsTabs20.vue]
<template>
  <UiTabs
    default-value="Projects"
    orientation="vertical"
    class="mx-auto flex w-full max-w-lg justify-center"
  >
    <UiTabsList :pill="false" class="h-auto flex-col gap-1 py-0">
      <UiTabsTrigger
        v-for="t in tabs"
        :key="t.title"
        :pill="false"
        :value="t.title"
        class="w-full justify-start data-[state=active]:bg-muted data-[state=active]:shadow-none"
      >
        {{ t.title }}
      </UiTabsTrigger>
    </UiTabsList>

    <div className="grow rounded-lg border border-border text-start">
      <UiTabsContent v-for="t in tabs" :key="t.title" :value="t.title">
        <p class="text-pretty px-3 text-sm text-muted-foreground">
          {{ t.content }}
        </p>
      </UiTabsContent>
    </div>
  </UiTabs>
</template>

<script lang="ts" setup>
  const tabs = [
    {
      title: "Overview",
      icon: "lucide:home",
      content: "This is the overview. Here you can see the overview of the project.",
    },
    {
      title: "Projects",
      icon: "lucide:panels-top-left",
      content: "These are the number of outstanding projects.",
    },
    {
      title: "Packages",
      icon: "lucide:box",
      content: "You have a few new packages awaiting your approval.",
    },
  ];
</script>
```

<!-- /automd -->

::
