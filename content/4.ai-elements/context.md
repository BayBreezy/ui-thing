---
title: Context
description: How much of the context window the conversation has used.
label: New
---

::prose-show-case

:DocsAiContext

#code

<!-- automd:file src="../../app/components/content/Docs/AiElements/Context/DocsAiContext.vue" code lang="vue" -->

```vue [DocsAiContext.vue]
<template>
  <div class="flex justify-center py-12">
    <UiHoverCard :open-delay="10" :close-delay="100">
      <UiHoverCardTrigger as-child>
        <UiButton variant="outline" size="sm"> {{ percent }}% context </UiButton>
      </UiHoverCardTrigger>
      <UiHoverCardContent class="flex w-64 flex-col gap-3">
        <div class="flex items-center justify-between gap-3 text-sm">
          <span class="font-medium">Context</span>
          <span class="text-muted-foreground">
            {{ formatTokens(used) }} / {{ formatTokens(usage.limit) }}
          </span>
        </div>
        <UiProgress :model-value="percent" aria-label="Context used" />
        <div class="flex flex-col gap-1 text-sm">
          <div v-for="row in rows" :key="row.label" class="flex justify-between gap-3">
            <span class="text-muted-foreground">{{ row.label }}</span>
            <span>{{ formatTokens(row.value) }}</span>
          </div>
        </div>
      </UiHoverCardContent>
    </UiHoverCard>
  </div>
</template>

<script lang="ts" setup>
  const usage = {
    input: 8420,
    output: 1260,
    reasoning: 980,
    limit: 128000,
  };

  const used = usage.input + usage.output + usage.reasoning;
  const percent = Math.round((used / usage.limit) * 100);

  function formatTokens(value: number) {
    if (value < 1000) return String(value);

    return `${(value / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  }

  const rows = [
    { label: "Input", value: usage.input },
    { label: "Output", value: usage.output },
    { label: "Reasoning", value: usage.reasoning },
  ];
</script>
```

<!-- /automd -->

::

Context shows how much of the model's context window the conversation has used. It is a [Hover Card](/components/hover-card) with a [Progress](/components/progress) bar.

## Installation

Context is built with the [Hover Card](/components/hover-card) and [Progress](/components/progress) components.

:prose-pm-x{command="ui-thing@latest add hover-card progress"}

## Usage

```vue
<template>
  <UiHoverCard :open-delay="10" :close-delay="100">
    <UiHoverCardTrigger as-child>
      <UiButton variant="outline" size="sm"> {{ percent }}% context </UiButton>
    </UiHoverCardTrigger>
    <UiHoverCardContent class="flex w-64 flex-col gap-3">
      <div class="flex items-center justify-between gap-3 text-sm">
        <span class="font-medium">Context</span>
        <span class="text-muted-foreground"> {{ used }} / {{ limit }} </span>
      </div>
      <UiProgress :model-value="percent" aria-label="Context used" />
    </UiHoverCardContent>
  </UiHoverCard>
</template>
```

## AI SDK

Read usage from the metadata on the agent's message. `messageMetadata` runs when the stream finishes.

```ts
return result.toUIMessageStreamResponse({
  messageMetadata: ({ part }) => {
    if (part.type === "finish") {
      return { usage: part.totalUsage };
    }
  },
});
```

```ts
const usage = message.metadata?.usage;
const used = (usage?.inputTokens ?? 0) + (usage?.outputTokens ?? 0);
const percent = Math.round((used / limit) * 100);
```

`limit` is the model's context window. The AI SDK does not send it, so set it from the model you use.

