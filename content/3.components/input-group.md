---
title: Input Group
description: Display additional information or actions to an input or textarea.
---

## Source code

Click :SourceCodeLink{component="InputGroup"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add input-group"}

## Usage

### Basic

::ShowCase

:DocsInputGroup

#code

<!-- automd:file src="../../app/components/content/Docs/InputGroup/DocsInputGroup.vue" code lang="vue" -->

```vue [DocsInputGroup.vue]
<template>
  <div class="mx-auto grid w-full max-w-sm gap-6">
    <UiInputGroup>
      <UiInputGroupInput placeholder="Search..." />
      <UiInputGroupAddon>
        <Icon name="lucide:search" />
      </UiInputGroupAddon>
      <UiInputGroupAddon align="inline-end">12 results</UiInputGroupAddon>
    </UiInputGroup>
    <UiInputGroup>
      <UiInputGroupInput placeholder="example.com" class="!pl-1" />
      <UiInputGroupAddon>
        <UiInputGroupText>https://</UiInputGroupText>
      </UiInputGroupAddon>
      <UiInputGroupAddon align="inline-end">
        <UiTooltip>
          <UiTooltipTrigger as-child>
            <UiInputGroupButton class="rounded-full" size="icon-xs">
              <Icon name="lucide:info" />
            </UiInputGroupButton>
          </UiTooltipTrigger>
          <UiTooltipContent>
            This is content in a tooltip.
            <UiTooltipArrow />
          </UiTooltipContent>
        </UiTooltip>
      </UiInputGroupAddon>
    </UiInputGroup>
    <UiInputGroup>
      <UiInputGroupTextarea placeholder="Ask, Search or Chat..." />
      <UiInputGroupAddon align="block-end">
        <UiInputGroupButton variant="outline" class="rounded-full" size="icon-xs">
          <Icon name="lucide:plus" />
        </UiInputGroupButton>
        <UiDropdownMenu>
          <UiDropdownMenuTrigger as-child>
            <UiInputGroupButton variant="ghost">Auto</UiInputGroupButton>
          </UiDropdownMenuTrigger>
          <UiDropdownMenuContent side="top" align="start" class="[--radius:0.95rem]">
            <UiDropdownMenuItem>Auto</UiDropdownMenuItem>
            <UiDropdownMenuItem>Agent</UiDropdownMenuItem>
            <UiDropdownMenuItem>Manual</UiDropdownMenuItem>
          </UiDropdownMenuContent>
        </UiDropdownMenu>
        <UiInputGroupText class="ml-auto">52% used</UiInputGroupText>
        <UiSeparator orientation="vertical" class="!h-4" />
        <UiInputGroupButton variant="default" class="rounded-full" size="icon-xs" disabled>
          <Icon name="lucide:arrow-up" />
          <span class="sr-only">Send</span>
        </UiInputGroupButton>
      </UiInputGroupAddon>
    </UiInputGroup>
    <UiInputGroup>
      <UiInputGroupInput placeholder="@uithing" />
      <UiInputGroupAddon align="inline-end">
        <div
          class="flex size-4 items-center justify-center rounded-full bg-primary text-primary-foreground"
        >
          <Icon name="lucide:check" class="size-3" />
        </div>
      </UiInputGroupAddon>
    </UiInputGroup>
  </div>
</template>
```

<!-- /automd -->

::

### Icon

::ShowCase

:DocsInputGroupIcon

#code

<!-- automd:file src="../../app/components/content/Docs/InputGroup/DocsInputGroupIcon.vue" code lang="vue" -->

```vue [DocsInputGroupIcon.vue]
<template>
  <div class="mx-auto grid w-full max-w-sm gap-6">
    <UiInputGroup>
      <UiInputGroupInput placeholder="Search..." />
      <UiInputGroupAddon>
        <Icon name="lucide:search" aria-label="Search" />
      </UiInputGroupAddon>
    </UiInputGroup>
    <UiInputGroup>
      <UiInputGroupInput type="email" placeholder="Enter your email" />
      <UiInputGroupAddon>
        <Icon name="lucide:mail" aria-label="Email" />
      </UiInputGroupAddon>
    </UiInputGroup>
    <UiInputGroup>
      <UiInputGroupInput placeholder="Card number" />
      <UiInputGroupAddon>
        <Icon name="lucide:credit-card" aria-label="Credit Card" />
      </UiInputGroupAddon>
      <UiInputGroupAddon align="inline-end">
        <Icon name="lucide:check" aria-label="Check" />
      </UiInputGroupAddon>
    </UiInputGroup>
    <UiInputGroup>
      <UiInputGroupInput placeholder="Card number" />
      <UiInputGroupAddon align="inline-end">
        <Icon name="lucide:star" aria-label="Star" />
        <Icon name="lucide:info" aria-label="Info" />
      </UiInputGroupAddon>
    </UiInputGroup>
  </div>
</template>
```

<!-- /automd -->

::

### Text

::ShowCase

:DocsInputGroupText

#code

<!-- automd:file src="../../app/components/content/Docs/InputGroup/DocsInputGroupText.vue" code lang="vue" -->

```vue [DocsInputGroupText.vue]
<template>
  <div class="mx-auto grid w-full max-w-sm gap-6">
    <UiInputGroup>
      <UiInputGroupAddon>
        <UiInputGroupText>$</UiInputGroupText>
      </UiInputGroupAddon>
      <UiInputGroupInput placeholder="0.00" />
      <UiInputGroupAddon align="inline-end">
        <UiInputGroupText>USD</UiInputGroupText>
      </UiInputGroupAddon>
    </UiInputGroup>
    <UiInputGroup>
      <UiInputGroupAddon>
        <UiInputGroupText>https://</UiInputGroupText>
      </UiInputGroupAddon>
      <UiInputGroupInput placeholder="example.com" class="!pl-0.5" />
      <UiInputGroupAddon align="inline-end">
        <UiInputGroupText>.com</UiInputGroupText>
      </UiInputGroupAddon>
    </UiInputGroup>
    <UiInputGroup>
      <UiInputGroupInput placeholder="Enter your username" />
      <UiInputGroupAddon align="inline-end">
        <UiInputGroupText>@company.com</UiInputGroupText>
      </UiInputGroupAddon>
    </UiInputGroup>
    <UiInputGroup>
      <UiInputGroupTextarea placeholder="Enter your message" />
      <UiInputGroupAddon align="block-end">
        <UiInputGroupText class="text-xs text-muted-foreground">
          120 characters left
        </UiInputGroupText>
      </UiInputGroupAddon>
    </UiInputGroup>
  </div>
</template>
```

<!-- /automd -->

::

### Button

::ShowCase

:DocsInputGroupButton

#code

<!-- automd:file src="../../app/components/content/Docs/InputGroup/DocsInputGroupButton.vue" code lang="vue" -->

```vue [DocsInputGroupButton.vue]
<template>
  <div class="mx-auto grid w-full max-w-sm gap-6">
    <UiInputGroup>
      <UiInputGroupInput placeholder="https://behonbaker.com" readonly />
      <UiInputGroupAddon align="inline-end">
        <UiInputGroupButton
          aria-label="Copy"
          :disabled="copied"
          title="Copy"
          size="icon-xs"
          @click="copy('https://behonbaker.com')"
        >
          <Icon :name="copied ? 'lucide:check' : 'lucide:copy'" />
        </UiInputGroupButton>
      </UiInputGroupAddon>
    </UiInputGroup>
    <UiInputGroup class="[--radius:9999px]">
      <UiPopover>
        <UiPopoverTrigger as-child>
          <UiInputGroupAddon>
            <UiInputGroupButton variant="secondary" size="icon-xs">
              <Icon name="lucide:info" />
            </UiInputGroupButton>
          </UiInputGroupAddon>
        </UiPopoverTrigger>
        <UiPopoverContent align="start" class="flex flex-col gap-1 rounded-xl text-sm">
          <p class="font-medium">Your connection is not secure.</p>
          <p>You should not enter any sensitive information on this site.</p>
        </UiPopoverContent>
      </UiPopover>
      <UiInputGroupAddon class="pl-1.5 text-muted-foreground"> https:// </UiInputGroupAddon>
      <UiInputGroupInput id="input-secure-19" />
      <UiInputGroupAddon align="inline-end">
        <UiInputGroupButton size="icon-xs" @click="isFavorite = !isFavorite">
          <Icon
            name="lucide:star"
            :data-favorite="isFavorite"
            class="data-[favorite=true]:text-blue-600"
          />
        </UiInputGroupButton>
      </UiInputGroupAddon>
    </UiInputGroup>
    <UiInputGroup>
      <UiInputGroupInput placeholder="Type to search..." />
      <UiInputGroupAddon align="inline-end">
        <UiInputGroupButton variant="secondary">Search</UiInputGroupButton>
      </UiInputGroupAddon>
    </UiInputGroup>
  </div>
</template>

<script lang="ts" setup>
  const { copied, copy } = useClipboard({ legacy: true });
  const isFavorite = ref(false);
</script>
```

<!-- /automd -->

::

### Tooltip

::ShowCase

:DocsInputGroupTooltip

#code

<!-- automd:file src="../../app/components/content/Docs/InputGroup/DocsInputGroupTooltip.vue" code lang="vue" -->

```vue [DocsInputGroupTooltip.vue]
<template>
  <div class="mx-auto grid w-full max-w-sm gap-4">
    <UiInputGroup>
      <UiInputGroupInput placeholder="Enter password" type="password" />
      <UiInputGroupAddon align="inline-end">
        <UiTooltip>
          <UiTooltipTrigger as-child>
            <UiInputGroupButton variant="ghost" aria-label="Info" size="icon-xs">
              <Icon name="lucide:info" />
            </UiInputGroupButton>
          </UiTooltipTrigger>
          <UiTooltipContent>
            <p>Password must be at least 8 characters</p>
            <UiTooltipArrow />
          </UiTooltipContent>
        </UiTooltip>
      </UiInputGroupAddon>
    </UiInputGroup>
    <UiInputGroup>
      <UiInputGroupInput placeholder="Your email address" />
      <UiInputGroupAddon align="inline-end">
        <UiTooltip>
          <UiTooltipTrigger as-child>
            <UiInputGroupButton variant="ghost" aria-label="Help" size="icon-xs">
              <Icon name="lucide:circle-help" />
            </UiInputGroupButton>
          </UiTooltipTrigger>
          <UiTooltipContent>
            <p>We'll use this to send you notifications</p>
            <UiTooltipArrow />
          </UiTooltipContent>
        </UiTooltip>
      </UiInputGroupAddon>
    </UiInputGroup>
    <UiInputGroup>
      <UiInputGroupInput placeholder="Enter API key" />
      <UiTooltip>
        <UiTooltipTrigger as-child>
          <UiInputGroupAddon>
            <UiInputGroupButton variant="ghost" aria-label="Help" size="icon-xs">
              <Icon name="lucide:circle-help" />
            </UiInputGroupButton>
          </UiInputGroupAddon>
        </UiTooltipTrigger>
        <UiTooltipContent side="left">
          <p>Click for help with API keys</p>
          <UiTooltipArrow />
        </UiTooltipContent>
      </UiTooltip>
    </UiInputGroup>
  </div>
</template>
```

<!-- /automd -->

::

### Textarea

::ShowCase

:DocsInputGroupTextarea

#code

<!-- automd:file src="../../app/components/content/Docs/InputGroup/DocsInputGroupTextarea.vue" code lang="vue" -->

```vue [DocsInputGroupTextarea.vue]
<template>
  <div class="mx-auto grid w-full max-w-md gap-4">
    <UiInputGroup>
      <UiInputGroupTextarea
        id="textarea-code-32"
        placeholder="console.log('Hello, world!');"
        class="min-h-[200px]"
      />
      <UiInputGroupAddon align="block-end" class="border-t">
        <UiInputGroupText>Line 1, Column 1</UiInputGroupText>
        <UiInputGroupButton size="sm" class="ml-auto" variant="default">
          Run <Icon name="lucide:corner-down-left" />
        </UiInputGroupButton>
      </UiInputGroupAddon>
      <UiInputGroupAddon align="block-start" class="border-b">
        <UiInputGroupText class="font-mono font-medium">
          <Icon name="logos:javascript" />
          script.js
        </UiInputGroupText>
        <UiInputGroupButton aria-label="Run" class="ml-auto" size="icon-xs">
          <Icon name="lucide:refresh-ccw" />
        </UiInputGroupButton>
        <UiInputGroupButton aria-label="Copy" variant="ghost" size="icon-xs">
          <Icon name="lucide:copy" />
        </UiInputGroupButton>
      </UiInputGroupAddon>
    </UiInputGroup>
  </div>
</template>
```

<!-- /automd -->

::

### Loader

::ShowCase

:DocsInputGroupLoader

#code

<!-- automd:file src="../../app/components/content/Docs/InputGroup/DocsInputGroupLoader.vue" code lang="vue" -->

```vue [DocsInputGroupLoader.vue]
<template>
  <div class="mx-auto grid w-full max-w-sm gap-4">
    <UiInputGroup data-disabled>
      <UiInputGroupInput placeholder="Searching..." disabled />
      <UiInputGroupAddon align="inline-end">
        <UiLoader icon="svg-spinners:wind-toy" />
      </UiInputGroupAddon>
    </UiInputGroup>
    <UiInputGroup data-disabled>
      <UiInputGroupInput placeholder="Processing..." disabled />
      <UiInputGroupAddon>
        <UiLoader icon="svg-spinners:blocks-wave" />
      </UiInputGroupAddon>
    </UiInputGroup>
    <UiInputGroup data-disabled>
      <UiInputGroupInput placeholder="Saving changes..." disabled />
      <UiInputGroupAddon align="inline-end">
        <UiInputGroupText>Saving...</UiInputGroupText>
        <UiLoader icon="svg-spinners:3-dots-fade" />
      </UiInputGroupAddon>
    </UiInputGroup>
    <UiInputGroup data-disabled>
      <UiInputGroupInput placeholder="Refreshing data..." disabled />
      <UiInputGroupAddon>
        <UiLoader />
      </UiInputGroupAddon>
      <UiInputGroupAddon align="inline-end">
        <UiInputGroupText class="text-muted-foreground"> Please wait... </UiInputGroupText>
      </UiInputGroupAddon>
    </UiInputGroup>
  </div>
</template>
```

<!-- /automd -->

::

### Label

::ShowCase

:DocsInputGroupLabel

#code

<!-- automd:file src="../../app/components/content/Docs/InputGroup/DocsInputGroupLabel.vue" code lang="vue" -->

```vue [DocsInputGroupLabel.vue]
<template>
  <div class="mx-auto grid w-full max-w-sm gap-4">
    <UiInputGroup>
      <UiInputGroupInput id="email" placeholder="baybreezy" />
      <UiInputGroupAddon>
        <UiLabel for="email">@</UiLabel>
      </UiInputGroupAddon>
    </UiInputGroup>
    <UiInputGroup>
      <UiInputGroupInput id="email-2" placeholder="behon.baker.com" />
      <UiInputGroupAddon align="block-start">
        <UiLabel for="email-2" class="text-foreground"> Email </UiLabel>
        <UiTooltip>
          <UiTooltipTrigger as-child>
            <UiInputGroupButton
              variant="ghost"
              aria-label="Help"
              class="ml-auto rounded-full"
              size="icon-xs"
            >
              <Icon name="lucide:info" />
            </UiInputGroupButton>
          </UiTooltipTrigger>
          <UiTooltipContent>
            <p>We'll use this to send you notifications</p>
          </UiTooltipContent>
        </UiTooltip>
      </UiInputGroupAddon>
    </UiInputGroup>
  </div>
</template>
```

<!-- /automd -->

::

### Dropdown

::ShowCase

:DocsInputGroupDropdown

#code

<!-- automd:file src="../../app/components/content/Docs/InputGroup/DocsInputGroupDropdown.vue" code lang="vue" -->

```vue [DocsInputGroupDropdown.vue]
<template>
  <div class="mx-auto grid w-full max-w-sm gap-4">
    <UiInputGroup>
      <UiInputGroupInput placeholder="Enter file name" />
      <UiInputGroupAddon align="inline-end">
        <UiDropdownMenu>
          <UiDropdownMenuTrigger as-child>
            <UiInputGroupButton variant="ghost" aria-label="More" size="icon-xs">
              <Icon name="lucide:ellipsis" />
            </UiInputGroupButton>
          </UiDropdownMenuTrigger>
          <UiDropdownMenuContent align="end">
            <UiDropdownMenuItem>Settings</UiDropdownMenuItem>
            <UiDropdownMenuItem>Copy path</UiDropdownMenuItem>
            <UiDropdownMenuItem>Open location</UiDropdownMenuItem>
          </UiDropdownMenuContent>
        </UiDropdownMenu>
      </UiInputGroupAddon>
    </UiInputGroup>
    <UiInputGroup class="[--radius:1rem]">
      <UiInputGroupInput placeholder="Enter search query" />
      <UiInputGroupAddon align="inline-end">
        <UiDropdownMenu>
          <UiDropdownMenuTrigger as-child>
            <UiInputGroupButton variant="ghost" class="!pr-1.5 text-xs">
              Search In... <Icon name="lucide:chevron-down" class="size-3" />
            </UiInputGroupButton>
          </UiDropdownMenuTrigger>
          <UiDropdownMenuContent align="end" class="[--radius:0.95rem]">
            <UiDropdownMenuItem>Documentation</UiDropdownMenuItem>
            <UiDropdownMenuItem>Blog Posts</UiDropdownMenuItem>
            <UiDropdownMenuItem>Changelog</UiDropdownMenuItem>
          </UiDropdownMenuContent>
        </UiDropdownMenu>
      </UiInputGroupAddon>
    </UiInputGroup>
  </div>
</template>
```

<!-- /automd -->

::
