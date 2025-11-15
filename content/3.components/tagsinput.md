---
title: Tags Input
description: Tag inputs render tags inside an input, followed by an actual text input.
links:
  - title: Reka UI
    href: https://reka-ui.com/docs/components/tags-input.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://reka-ui.com/docs/components/tags-input.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="TagsInput"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add tags-input"}

## Usage

### Basic example

::ShowCase

:DocsTagsInput

#code

<!-- automd:file src="../../app/components/content/Docs/TagsInput/DocsTagsInput.vue" code lang="vue" -->

```vue [DocsTagsInput.vue]
<template>
  <div class="mx-auto grid max-w-sm grid-cols-1 gap-10 divide-y *:pb-10 *:last:pb-0">
    <div class="*:not-first:mt-2">
      <UiLabel :for="id">Input with tags</UiLabel>
      <!-- Take note of raw tags input usage -->
      <TagsInputRoot v-model="tags" class="flex flex-col gap-2">
        <!-- Take note of raw tags input usage -->
        <TagsInputInput :id="id" placeholder="Add a tag" as-child type="text">
          <UiInput />
        </TagsInputInput>
        <div class="flex flex-wrap gap-1">
          <UiTagsInputItem v-for="tag in tags" :key="tag" :value="tag" />
        </div>
      </TagsInputRoot>
    </div>

    <div class="*:not-first:mt-2">
      <UiLabel :for="id + 'some-other'">Input with inner tags</UiLabel>
      <UiTagsInput
        v-model="tags2"
        class="h-auto p-1 shadow-xs outline-none focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50"
      >
        <UiTagsInputItem v-for="tag in tags2" :key="tag" :value="tag" />

        <UiTagsInputInput
          :id="id + 'some-other'"
          placeholder="Add a tag"
          class="h-7 min-w-[80px] px-2 dark:bg-transparent"
          type="text"
        />
      </UiTagsInput>
    </div>
  </div>
</template>

<script lang="ts" setup>
  const tags = ref(["Cars", "House", "Dogs"]);
  const tags2 = ref(["Cars", "House", "Dogs"]);
  const id = useId();
</script>
```

<!-- /automd -->

::
