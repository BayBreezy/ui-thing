---
title: Button Group
description: A container that groups related buttons together with consistent styling.
label: New
---

## Source code

Click :SourceCodeLink{component="ButtonGroup"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add button-group"}

## Usage

### Basic

::ShowCase

:DocsButtonGroup

#code

<!-- automd:file src="../../app/components/content/Docs/ButtonGroup/DocsButtonGroup.vue" code lang="vue" -->

```vue [DocsButtonGroup.vue]
<template>
  <div class="flex items-center justify-center">
    <UiButtonGroup>
      <UiButtonGroup class="hidden sm:flex">
        <UiButton variant="outline" size="icon" aria-label="Go Back">
          <Icon name="lucide:arrow-left" />
        </UiButton>
      </UiButtonGroup>
      <UiButtonGroup>
        <UiButton variant="outline">Archive</UiButton>
        <UiButton variant="outline">Report</UiButton>
      </UiButtonGroup>
      <UiButtonGroup>
        <UiButton variant="outline">Snooze</UiButton>
        <UiDropdownMenu>
          <UiDropdownMenuTrigger as-child>
            <UiButton variant="outline" size="icon" aria-label="More Options">
              <Icon name="lucide:ellipsis" />
            </UiButton>
          </UiDropdownMenuTrigger>
          <UiDropdownMenuContent align="end" class="w-52">
            <UiDropdownMenuGroup>
              <UiDropdownMenuItem icon="lucide:mail-check" title="Mark as Read" />
              <UiDropdownMenuItem icon="lucide:archive" title="Archive" />
            </UiDropdownMenuGroup>
            <UiDropdownMenuSeparator />
            <UiDropdownMenuGroup>
              <UiDropdownMenuItem icon="lucide:clock" title="Snooze" />
              <UiDropdownMenuItem icon="lucide:calendar-plus" title="Add to Calendar" />
              <UiDropdownMenuItem icon="lucide:list-plus" title="Add to List" />
              <UiDropdownMenuSub>
                <UiDropdownMenuSubTrigger icon="lucide:tag" title="Label As..." />
                <UiDropdownMenuSubContent>
                  <UiDropdownMenuRadioGroup v-model="label">
                    <UiDropdownMenuRadioItem value="personal"> Personal </UiDropdownMenuRadioItem>
                    <UiDropdownMenuRadioItem value="work"> Work </UiDropdownMenuRadioItem>
                    <UiDropdownMenuRadioItem value="other"> Other </UiDropdownMenuRadioItem>
                  </UiDropdownMenuRadioGroup>
                </UiDropdownMenuSubContent>
              </UiDropdownMenuSub>
            </UiDropdownMenuGroup>
            <UiDropdownMenuSeparator />
            <UiDropdownMenuGroup>
              <UiDropdownMenuItem variant="destructive" icon="lucide:trash-2" title="Delete" />
            </UiDropdownMenuGroup>
          </UiDropdownMenuContent>
        </UiDropdownMenu>
      </UiButtonGroup>
    </UiButtonGroup>
  </div>
</template>

<script lang="ts" setup>
  const label = ref("personal");
</script>
```

<!-- /automd -->

::

### Orientation

::ShowCase

:DocsButtonGroupOrientation

#code

<!-- automd:file src="../../app/components/content/Docs/ButtonGroup/DocsButtonGroupOrientation.vue" code lang="vue" -->

```vue [DocsButtonGroupOrientation.vue]
<template>
  <div class="flex items-center justify-center">
    <UiButtonGroup orientation="vertical" aria-label="Media controls" class="h-fit">
      <UiButton variant="outline" size="icon">
        <Icon name="lucide:plus" />
      </UiButton>
      <UiButton variant="outline" size="icon">
        <Icon name="lucide:minus" />
      </UiButton>
    </UiButtonGroup>
  </div>
</template>
```

<!-- /automd -->

::

### Size

::ShowCase

:DocsButtonGroupSize

#code

<!-- automd:file src="../../app/components/content/Docs/ButtonGroup/DocsButtonGroupSize.vue" code lang="vue" -->

```vue [DocsButtonGroupSize.vue]
<template>
  <div class="flex items-center justify-center">
    <div class="flex flex-col items-start gap-8">
      <UiButtonGroup>
        <UiButton variant="outline" size="sm"> Small </UiButton>
        <UiButton variant="outline" size="sm"> Button </UiButton>
        <UiButton variant="outline" size="sm"> Group </UiButton>
        <UiButton variant="outline" size="icon-sm">
          <Icon name="lucide:plus" />
        </UiButton>
      </UiButtonGroup>
      <UiButtonGroup>
        <UiButton variant="outline">Default</UiButton>
        <UiButton variant="outline">Button</UiButton>
        <UiButton variant="outline">Group</UiButton>
        <UiButton variant="outline" size="icon">
          <Icon name="lucide:plus" />
        </UiButton>
      </UiButtonGroup>
      <UiButtonGroup>
        <UiButton variant="outline" size="lg"> Large </UiButton>
        <UiButton variant="outline" size="lg"> Button </UiButton>
        <UiButton variant="outline" size="lg"> Group </UiButton>
        <UiButton variant="outline" size="icon" class="size-10">
          <Icon name="lucide:plus" />
        </UiButton>
      </UiButtonGroup>
    </div>
  </div>
</template>
```

<!-- /automd -->

::

### Nested

::ShowCase

:DocsButtonGroupNested

#code

<!-- automd:file src="../../app/components/content/Docs/ButtonGroup/DocsButtonGroupNested.vue" code lang="vue" -->

```vue [DocsButtonGroupNested.vue]
<template>
  <div class="flex items-center justify-center">
    <UiButtonGroup>
      <UiButtonGroup>
        <UiButton v-for="item in 5" :key="item" variant="outline" size="sm"> {{ item }} </UiButton>
      </UiButtonGroup>
      <UiButtonGroup>
        <UiButton variant="outline" size="icon-sm" aria-label="Previous">
          <Icon name="lucide:arrow-left" />
        </UiButton>
        <UiButton variant="outline" size="icon-sm" aria-label="Next">
          <Icon name="lucide:arrow-right" />
        </UiButton>
      </UiButtonGroup>
    </UiButtonGroup>
  </div>
</template>
```

<!-- /automd -->

::

### Separator

The `ButtonGroupSeparator` component visually divides buttons within a group.

Buttons with variant `outline` do not need a separator since they have a border. For other variants, a separator is recommended to improve the visual hierarchy.

::ShowCase

:DocsButtonGroupSeparator

#code

<!-- automd:file src="../../app/components/content/Docs/ButtonGroup/DocsButtonGroupSeparator.vue" code lang="vue" -->

```vue [DocsButtonGroupSeparator.vue]
<template>
  <div class="flex items-center justify-center">
    <UiButtonGroup>
      <UiButton variant="secondary" size="sm"> Copy </UiButton>
      <UiButtonGroupSeparator />
      <UiButton variant="secondary" size="sm"> Paste </UiButton>
    </UiButtonGroup>
  </div>
</template>
```

<!-- /automd -->

::

### Split

::ShowCase

:DocsButtonGroupSplit

#code

<!-- automd:file src="../../app/components/content/Docs/ButtonGroup/DocsButtonGroupSplit.vue" code lang="vue" -->

```vue [DocsButtonGroupSplit.vue]
<template>
  <div class="flex items-center justify-center">
    <UiButtonGroup>
      <UiButton variant="secondary">Button</UiButton>
      <UiButtonGroupSeparator />
      <UiButton size="icon" variant="secondary">
        <Icon name="lucide:plus" />
      </UiButton>
    </UiButtonGroup>
  </div>
</template>
```

<!-- /automd -->

::

### Input

::ShowCase

:DocsButtonGroupInput

#code

<!-- automd:file src="../../app/components/content/Docs/ButtonGroup/DocsButtonGroupInput.vue" code lang="vue" -->

```vue [DocsButtonGroupInput.vue]
<template>
  <div class="flex items-center justify-center">
    <UiButtonGroup>
      <UiInput placeholder="Search..." />
      <UiButton variant="outline" aria-label="Search">
        <Icon name="lucide:search" />
      </UiButton>
    </UiButtonGroup>
  </div>
</template>
```

<!-- /automd -->

::

### Input Group

::ShowCase

:DocsButtonGroupInputGroup

#code

<!-- automd:file src="../../app/components/content/Docs/ButtonGroup/DocsButtonGroupInputGroup.vue" code lang="vue" -->

```vue [DocsButtonGroupInputGroup.vue]
<template>
  <div class="flex items-center justify-center">
    <UiButtonGroup class="[--radius:9999rem]">
      <UiButtonGroup>
        <UiButton variant="outline" size="icon">
          <Icon name="lucide:plus" />
        </UiButton>
      </UiButtonGroup>
      <UiButtonGroup>
        <UiInputGroup>
          <UiInputGroupInput
            :placeholder="voiceEnabled ? 'Record and send audio...' : 'Send a message...'"
            :disabled="voiceEnabled"
          />
          <UiInputGroupAddon align="inline-end">
            <UiTooltip>
              <UiTooltipTrigger as-child>
                <UiInputGroupButton
                  class="data-[active=true]:bg-orange-100 data-[active=true]:text-orange-700 dark:data-[active=true]:bg-orange-800 dark:data-[active=true]:text-orange-100"
                  size="icon-xs"
                  :data-active="voiceEnabled"
                  :aria-pressed="voiceEnabled"
                  @click="voiceEnabled = !voiceEnabled"
                >
                  <Icon name="lucide:audio-lines" />
                </UiInputGroupButton>
              </UiTooltipTrigger>
              <UiTooltipContent>Voice Mode</UiTooltipContent>
            </UiTooltip>
          </UiInputGroupAddon>
        </UiInputGroup>
      </UiButtonGroup>
    </UiButtonGroup>
  </div>
</template>

<script lang="ts" setup>
  const voiceEnabled = ref(false);
</script>
```

<!-- /automd -->

::

### Dropdown

::ShowCase

:DocsButtonGroupDropdown

#code

<!-- automd:file src="../../app/components/content/Docs/ButtonGroup/DocsButtonGroupDropdown.vue" code lang="vue" -->

```vue [DocsButtonGroupDropdown.vue]
<template>
  <div class="flex items-center justify-center">
    <UiButtonGroup>
      <UiButton variant="outline">Follow</UiButton>
      <UiDropdownMenu>
        <UiDropdownMenuTrigger as-child>
          <UiButton variant="outline" class="!pl-2">
            <Icon name="lucide:chevron-down" />
          </UiButton>
        </UiDropdownMenuTrigger>
        <UiDropdownMenuContent align="end" class="[--radius:1rem]">
          <UiDropdownMenuGroup>
            <UiDropdownMenuItem
              v-for="(item, i) in items"
              :key="i"
              :icon="item.icon"
              :title="item.label"
            />
          </UiDropdownMenuGroup>
          <UiDropdownMenuSeparator />
          <UiDropdownMenuGroup>
            <UiDropdownMenuItem variant="destructive">
              <Icon name="lucide:trash" />
              Delete Conversation
            </UiDropdownMenuItem>
          </UiDropdownMenuGroup>
        </UiDropdownMenuContent>
      </UiDropdownMenu>
    </UiButtonGroup>
  </div>
</template>

<script lang="ts" setup>
  const items = [
    { label: "Mute Conversation", icon: "lucide:volume-off" },
    { label: "Mark as Read", icon: "lucide:check" },
    { label: "Report Conversation", icon: "lucide:triangle-alert" },
    { label: "Block User", icon: "lucide:user-round-x" },
    { label: "Share Conversation", icon: "lucide:share" },
    { label: "Copy Conversation", icon: "lucide:copy" },
  ];
</script>
```

<!-- /automd -->

::

### Select

::ShowCase

:DocsButtonGroupSelect

#code

<!-- automd:file src="../../app/components/content/Docs/ButtonGroup/DocsButtonGroupSelect.vue" code lang="vue" -->

```vue [DocsButtonGroupSelect.vue]
<template>
  <div class="flex items-center justify-center">
    <UiButtonGroup>
      <UiButtonGroup>
        <UiSelect v-model="currency">
          <UiSelectTrigger class="w-fit font-mono">{{ currency }}</UiSelectTrigger>
          <UiSelectContent class="min-w-24">
            <UiSelectItem v-for="item in CURRENCIES" :key="item.value" :value="item.value">
              {{ item.value }}
              <span class="text-muted-foreground">{{ item.label }}</span>
            </UiSelectItem>
          </UiSelectContent>
        </UiSelect>
        <UiInput placeholder="10" pattern="^\d+(\.\d+)?$" />
      </UiButtonGroup>
      <UiButtonGroup>
        <UiButton aria-label="Send" size="icon" variant="outline">
          <Icon name="lucide:arrow-right" />
        </UiButton>
      </UiButtonGroup>
    </UiButtonGroup>
  </div>
</template>

<script lang="ts" setup>
  const currency = ref("$");
  const CURRENCIES = [
    { value: "$", label: "US Dollar" },
    { value: "€", label: "Euro" },
    { value: "£", label: "British Pound" },
  ];
</script>
```

<!-- /automd -->

::

### Popover

::ShowCase

:DocsButtonGroupPopover

#code

<!-- automd:file src="../../app/components/content/Docs/ButtonGroup/DocsButtonGroupPopover.vue" code lang="vue" -->

```vue [DocsButtonGroupPopover.vue]
<template>
  <div class="flex items-center justify-center">
    <UiButtonGroup>
      <UiButton variant="outline"> <Icon name="lucide:bot" /> Copilot </UiButton>
      <UiPopover>
        <UiPopoverTrigger as-child>
          <UiButton variant="outline" size="icon" aria-label="Open UiPopover">
            <Icon name="lucide:chevron-down" />
          </UiButton>
        </UiPopoverTrigger>
        <UiPopoverContent align="end" class="rounded-xl p-0 text-sm">
          <div class="px-4 py-3">
            <div class="text-sm font-medium">Agent Tasks</div>
          </div>
          <UiSeparator />
          <div class="p-4 text-sm *:[p:not(:last-child)]:mb-2">
            <UiTextarea
              placeholder="Describe your task in natural language."
              class="mb-4 resize-none"
            />
            <p class="font-medium">Start a new task with Copilot</p>
            <p class="text-muted-foreground">
              Describe your task in natural language. Copilot will work in the background and open a
              pull request for your review.
            </p>
          </div>
        </UiPopoverContent>
      </UiPopover>
    </UiButtonGroup>
  </div>
</template>
```

<!-- /automd -->

::
