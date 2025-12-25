---
title: Empty
description: A component used to display a message when there is no data to show.
---

## Source code

Click :SourceCodeLink{component="Empty"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add empty"}

## Usage

```vue
<template>
  <UiEmpty>
    <UiEmptyHeader>
      <UiEmptyMedia variant="icon">
        <Icon />
      </UiEmptyMedia>
    </UiEmptyHeader>
    <UiEmptyTitle>No data</UiEmptyTitle>
    <UiEmptyDescription>No data found</UiEmptyDescription>
    <UiEmptyContent>
      <Button>Add data</Button>
    </UiEmptyContent>
  </UiEmpty>
</template>
```

## Examples

### Basic

::ShowCase

:DocsEmpty

#code

<!-- automd:file src="../../app/components/content/Docs/Empty/DocsEmpty.vue" code lang="vue" -->

```vue [DocsEmpty.vue]
<template>
  <div class="flex items-center justify-center">
    <UiEmpty>
      <UiEmptyHeader>
        <UiEmptyMedia variant="icon">
          <Icon name="lucide:folder-code" />
        </UiEmptyMedia>
        <UiEmptyTitle>No Projects Yet</UiEmptyTitle>
        <UiEmptyDescription>
          You haven't created any projects yet. Get started by creating your first project.
        </UiEmptyDescription>
      </UiEmptyHeader>
      <UiEmptyContent>
        <div className="flex gap-2">
          <UiButton>Create Project</UiButton>
          <UiButton variant="outline">Import Project</UiButton>
        </div>
      </UiEmptyContent>
      <UiButton variant="link" as-child size="sm">
        <a href="#" class="flex items-center gap-2 text-muted-foreground">
          Learn More <Icon name="lucide:arrow-up-right" />
        </a>
      </UiButton>
    </UiEmpty>
  </div>
</template>
```

<!-- /automd -->

::

### Outline

::ShowCase

:DocsEmptyOutline

#code

<!-- automd:file src="../../app/components/content/Docs/Empty/DocsEmptyOutline.vue" code lang="vue" -->

```vue [DocsEmptyOutline.vue]
<template>
  <div class="flex items-center justify-center">
    <UiEmpty class="border border-dashed">
      <UiEmptyHeader>
        <UiEmptyMedia variant="icon">
          <Icon name="lucide:cloud" />
        </UiEmptyMedia>
        <UiEmptyTitle>Cloud Storage UiEmpty</UiEmptyTitle>
        <UiEmptyDescription>
          Upload files to your cloud storage to access them anywhere.
        </UiEmptyDescription>
      </UiEmptyHeader>
      <UiEmptyContent>
        <UiButton variant="outline" size="sm"> Upload Files </UiButton>
      </UiEmptyContent>
    </UiEmpty>
  </div>
</template>
```

<!-- /automd -->

::

### Background

::ShowCase

:DocsEmptyBackground

#code

<!-- automd:file src="../../app/components/content/Docs/Empty/DocsEmptyBackground.vue" code lang="vue" -->

```vue [DocsEmptyBackground.vue]
<template>
  <div class="flex items-center justify-center">
    <UiEmpty class="h-full bg-gradient-to-b from-muted/50 from-30% to-background">
      <UiEmptyHeader>
        <UiEmptyMedia variant="icon">
          <Icon name="lucide:bell" />
        </UiEmptyMedia>
        <UiEmptyTitle>No Notifications</UiEmptyTitle>
        <UiEmptyDescription>
          You're all caught up. New notifications will appear here.
        </UiEmptyDescription>
      </UiEmptyHeader>
      <UiEmptyContent>
        <UiButton variant="outline" size="sm">
          <Icon name="lucide:refresh-ccw" />
          Refresh
        </UiButton>
      </UiEmptyContent>
    </UiEmpty>
  </div>
</template>
```

<!-- /automd -->

::

### Avatar

::ShowCase

:DocsEmptyAvatar

#code

<!-- automd:file src="../../app/components/content/Docs/Empty/DocsEmptyAvatar.vue" code lang="vue" -->

```vue [DocsEmptyAvatar.vue]
<template>
  <div class="flex items-center justify-center">
    <UiEmpty>
      <UiEmptyHeader>
        <UiEmptyMedia variant="default">
          <UiAvatar class="size-12">
            <UiAvatarImage src="https://github.com/BayBreezy.png" class="grayscale" />
            <UiAvatarFallback>BB</UiAvatarFallback>
          </UiAvatar>
        </UiEmptyMedia>
        <UiEmptyTitle>User Offline</UiEmptyTitle>
        <UiEmptyDescription>
          This user is currently offline. You can leave a message to notify them or try again later.
        </UiEmptyDescription>
      </UiEmptyHeader>
      <UiEmptyContent>
        <UiButton size="sm">Leave Message</UiButton>
      </UiEmptyContent>
    </UiEmpty>
  </div>
</template>
```

<!-- /automd -->

::

### Avatar Group

::ShowCase

:DocsEmptyAvatarGroup

#code

<!-- automd:file src="../../app/components/content/Docs/Empty/DocsEmptyAvatarGroup.vue" code lang="vue" -->

```vue [DocsEmptyAvatarGroup.vue]
<template>
  <div class="flex items-center justify-center">
    <UiEmpty>
      <UiEmptyHeader>
        <UiEmptyMedia>
          <div
            class="flex -space-x-2 *:data-[slot=avatar]:size-12 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:grayscale"
          >
            <UiAvatar>
              <UiAvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <UiAvatarFallback>CN</UiAvatarFallback>
            </UiAvatar>
            <UiAvatar>
              <UiAvatarImage src="https://github.com/baybreezy.png" alt="@baybreezy" />
              <UiAvatarFallback>BB</UiAvatarFallback>
            </UiAvatar>
            <UiAvatar>
              <UiAvatarImage src="https://github.com/mirari.png" alt="@mirari" />
              <UiAvatarFallback>MI</UiAvatarFallback>
            </UiAvatar>
          </div>
        </UiEmptyMedia>
        <UiEmptyTitle>No Team Members</UiEmptyTitle>
        <UiEmptyDescription> Invite your team to collaborate on this project. </UiEmptyDescription>
      </UiEmptyHeader>
      <UiEmptyContent>
        <UiButton size="sm">
          <Icon name="lucide:plus" />
          Invite Members
        </UiButton>
      </UiEmptyContent>
    </UiEmpty>
  </div>
</template>
```

<!-- /automd -->

::

### Input Group

::ShowCase

:DocsEmptyInputGroup

#code

<!-- automd:file src="../../app/components/content/Docs/Empty/DocsEmptyInputGroup.vue" code lang="vue" -->

```vue [DocsEmptyInputGroup.vue]
<template>
  <div class="flex items-center justify-center">
    <UiEmpty>
      <UiEmptyHeader>
        <UiEmptyTitle>404 - Not Found</UiEmptyTitle>
        <UiEmptyDescription>
          The page you're looking for doesn't exist. Try searching for what you need below.
        </UiEmptyDescription>
      </UiEmptyHeader>
      <UiEmptyContent>
        <UiInputGroup class="sm:w-3/4">
          <UiInputGroupInput placeholder="Try searching for pages..." />
          <UiInputGroupAddon>
            <Icon name="lucide:search" />
          </UiInputGroupAddon>
          <UiInputGroupAddon align="inline-end">
            <UiKbd>/</UiKbd>
          </UiInputGroupAddon>
        </UiInputGroup>
        <UiEmptyDescription> Need help? <a href="#">Contact support</a> </UiEmptyDescription>
      </UiEmptyContent>
    </UiEmpty>
  </div>
</template>
```

<!-- /automd -->

::
