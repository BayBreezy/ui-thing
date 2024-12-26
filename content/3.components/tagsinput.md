---
title: Tags Input
description: Tag inputs render tags inside an input, followed by an actual text input.
links:
  - title: Radix-Vue
    href: https://www.radix-vue.com/components/tags-input.html
    icon: "simple-icons:radixui"
  - title: API Reference
    href: https://www.radix-vue.com/components/tags-input.html#api-reference
    icon: "icon-park-solid:api"
---

## Source code

Click :SourceCodeLink{component="TagsInput"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

```bash
npx ui-thing@latest add tags-input
```

## Usage

### Basic example

::ShowCase

:DocsTagsInput

#code

<!-- automd:file src="../../app/components/content/Docs/TagsInput/DocsTagsInput.vue" code lang="vue" -->

```vue [DocsTagsInput.vue]
<template>
  <div class="">
    <UiTagsInput v-model="tags">
      <UiTagsInputItem v-for="tag in tags" :key="tag" :value="tag" />
      <UiTagsInputField placeholder="Add a tag..." />
      <UiTagsInputClear />
    </UiTagsInput>
  </div>
</template>

<script lang="ts" setup>
  const tags = ref(["Cars", "House", "Dogs"]);
</script>
```

<!-- /automd -->

::
