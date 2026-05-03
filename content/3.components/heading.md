---
title: Heading
description: Displays a semantic heading with multiple levels of size and style customization.
---

## Source code

Click :SourceCodeLink{component="Heading.vue"} to see the source code for this component on GitHub.

Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add heading"}

## Usage

### Basic example

::prose-show-case

:DocsHeadingBasic

#code

<!-- automd:file src="../../app/components/content/Docs/Heading/DocsHeadingBasic.vue" code lang="vue" -->

```vue [DocsHeadingBasic.vue]
<template>
  <div class="grid gap-2">
    <ui-heading>{{ text }}</ui-heading>
    <ui-heading :level="2">{{ text }}</ui-heading>
    <ui-heading :level="3">{{ text }}</ui-heading>
    <ui-heading :level="4">{{ text }}</ui-heading>
    <ui-heading :level="5">{{ text }}</ui-heading>
    <ui-heading :level="6">{{ text }}</ui-heading>
  </div>
</template>

<script lang="ts" setup>
  const text = "The quick brown fox jumps over the lazy dog.";
</script>
```

<!-- /automd -->

::
