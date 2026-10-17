---
title: Model Selector
description: Two menus. One picks the model the agent runs, the other picks how hard it thinks.
label: New
---

::prose-show-case

:DocsAiModelSelector

#code

<!-- automd:file src="../../app/components/content/Docs/AiElements/ModelSelector/DocsAiModelSelector.vue" code lang="vue" -->

```vue [DocsAiModelSelector.vue]
<template>
  <div class="mx-auto w-full max-w-lg py-6">
    <form ref="formRef" @submit.prevent="onSubmit">
      <UiInputGroup>
        <UiInputGroupTextarea
          v-model="text"
          placeholder="Ask the agent to change your code..."
          class="p-3"
          @keydown="onKeydown"
        />
        <UiInputGroupAddon align="block-end">
          <UiInputGroupButton
            size="icon-sm"
            variant="outline"
            class="rounded-full"
            aria-label="Attach"
          >
            <Icon name="lucide:plus" class="size-4" />
          </UiInputGroupButton>
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiInputGroupButton
                size="sm"
                variant="outline"
                :aria-label="`Model: ${currentModel.name}`"
                class="ml-auto"
              >
                {{ currentModel.name }}
                <Icon name="lucide:chevron-down" class="size-4" />
              </UiInputGroupButton>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent align="start" class="w-48">
              <UiDropdownMenuRadioGroup v-model="model">
                <template v-for="(provider, index) in providers" :key="provider.name">
                  <UiDropdownMenuSeparator v-if="index > 0" />
                  <UiDropdownMenuGroup>
                    <UiDropdownMenuLabel>{{ provider.name }}</UiDropdownMenuLabel>
                    <UiDropdownMenuRadioItem
                      v-for="item in provider.models"
                      :key="item.id"
                      :value="item.id"
                    >
                      {{ item.name }}
                    </UiDropdownMenuRadioItem>
                  </UiDropdownMenuGroup>
                </template>
              </UiDropdownMenuRadioGroup>
            </UiDropdownMenuContent>
          </UiDropdownMenu>
          <UiDropdownMenu>
            <UiDropdownMenuTrigger as-child>
              <UiInputGroupButton
                size="sm"
                variant="outline"
                :aria-label="`Effort: ${currentEffort.name}`"
              >
                <span class="text-muted-foreground">Effort</span>
                {{ currentEffort.name }}
                <Icon name="lucide:chevron-down" class="size-4" />
              </UiInputGroupButton>
            </UiDropdownMenuTrigger>
            <UiDropdownMenuContent align="start" class="w-36">
              <UiDropdownMenuGroup>
                <UiDropdownMenuLabel>Effort</UiDropdownMenuLabel>
                <UiDropdownMenuRadioGroup v-model="effort">
                  <UiDropdownMenuRadioItem v-for="item in efforts" :key="item.id" :value="item.id">
                    {{ item.name }}
                  </UiDropdownMenuRadioItem>
                </UiDropdownMenuRadioGroup>
              </UiDropdownMenuGroup>
            </UiDropdownMenuContent>
          </UiDropdownMenu>
          <UiInputGroupButton
            type="submit"
            size="icon-sm"
            variant="default"
            class="rounded-full"
            :disabled="!canSend"
            aria-label="Send"
          >
            <Icon name="lucide:arrow-up" class="size-4" />
          </UiInputGroupButton>
        </UiInputGroupAddon>
      </UiInputGroup>
    </form>
  </div>
</template>

<script lang="ts" setup>
  const providers = [
    {
      name: "OpenAI",
      models: [
        { id: "gpt-5", name: "GPT-5" },
        { id: "gpt-5-mini", name: "GPT-5 mini" },
      ],
    },
    {
      name: "Anthropic",
      models: [
        { id: "claude-sonnet-4-5", name: "Claude Sonnet 4.5" },
        { id: "claude-haiku-4-5", name: "Claude Haiku 4.5" },
      ],
    },
  ];

  const models = providers.flatMap((provider) => provider.models);

  const efforts = [
    { id: "low", name: "Low" },
    { id: "medium", name: "Medium" },
    { id: "high", name: "High" },
  ];

  const text = ref("");
  const model = ref(models[0]!.id);
  const effort = ref(efforts[1]!.id);
  const formRef = ref<HTMLFormElement | null>(null);
  const currentModel = computed(() => models.find((item) => item.id === model.value) ?? models[0]!);
  const currentEffort = computed(
    () => efforts.find((item) => item.id === effort.value) ?? efforts[1]!
  );
  const canSend = computed(() => text.value.trim().length > 0);

  function onSubmit() {
    if (!canSend.value) return;

    text.value = "";
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      formRef.value?.requestSubmit();
    }
  }
</script>
```

<!-- /automd -->

::

## Installation

Model Selector is built with the [Dropdown Menu](/components/dropdown-menu) and [Input Group](/components/input-group) components.

:prose-pm-x{command="ui-thing@latest add dropdown-menu input-group"}

## Usage

```vue
<template>
  <UiInputGroup>
    <UiInputGroupTextarea placeholder="Ask the agent to change your code..." />
    <UiInputGroupAddon align="block-end">
      <UiDropdownMenu>
        <UiDropdownMenuTrigger as-child>
          <UiInputGroupButton size="sm">
            GPT-5
            <UiIcon name="lucide:chevron-down" />
          </UiInputGroupButton>
        </UiDropdownMenuTrigger>
        <UiDropdownMenuContent align="start">
          <UiDropdownMenuRadioGroup v-model="model">
            <UiDropdownMenuGroup>
              <UiDropdownMenuLabel>OpenAI</UiDropdownMenuLabel>
              <UiDropdownMenuRadioItem value="gpt-5"> GPT-5 </UiDropdownMenuRadioItem>
              <UiDropdownMenuRadioItem value="gpt-5-mini"> GPT-5 mini </UiDropdownMenuRadioItem>
            </UiDropdownMenuGroup>
          </UiDropdownMenuRadioGroup>
        </UiDropdownMenuContent>
      </UiDropdownMenu>
      <UiDropdownMenu>
        <UiDropdownMenuTrigger as-child>
          <UiInputGroupButton size="sm">
            Medium
            <UiIcon name="lucide:chevron-down" />
          </UiInputGroupButton>
        </UiDropdownMenuTrigger>
        <UiDropdownMenuContent align="start">
          <UiDropdownMenuRadioGroup v-model="effort">
            <UiDropdownMenuRadioItem value="low"> Low </UiDropdownMenuRadioItem>
            <UiDropdownMenuRadioItem value="medium"> Medium </UiDropdownMenuRadioItem>
            <UiDropdownMenuRadioItem value="high"> High </UiDropdownMenuRadioItem>
          </UiDropdownMenuRadioGroup>
        </UiDropdownMenuContent>
      </UiDropdownMenu>
      <UiInputGroupButton type="submit" variant="default" class="ml-auto">
        <UiIcon name="lucide:arrow-up" />
      </UiInputGroupButton>
    </UiInputGroupAddon>
  </UiInputGroup>
</template>

<script lang="ts" setup>
  const model = ref("gpt-5");
  const effort = ref("medium");
</script>
```

## AI SDK

Send the model and the effort with the message. Map them to a model and provider options in the route.

```ts
chat.sendMessage({ text }, { body: { model: model.value, effort: effort.value } });
```

```ts
import { anthropic } from "@ai-sdk/anthropic";
import { openai } from "@ai-sdk/openai";
import type { UIMessage } from "ai";
import { convertToModelMessages, streamText } from "ai";

const models = {
  "gpt-5": openai("gpt-5"),
  "gpt-5-mini": openai("gpt-5-mini"),
  "claude-sonnet-4-5": anthropic("claude-sonnet-4-5"),
  "claude-haiku-4-5": anthropic("claude-haiku-4-5"),
};

export default defineEventHandler(async (event) => {
  const { messages, model, effort } = await readBody<{
    messages: UIMessage[];
    model: keyof typeof models;
    effort: "low" | "medium" | "high";
  }>(event);

  const result = streamText({
    model: models[model] ?? models["gpt-5"],
    messages: await convertToModelMessages(messages),
    providerOptions: {
      openai: { reasoningEffort: effort },
      anthropic: { effort },
    },
  });

  return result.toUIMessageStreamResponse();
});
```

Each provider reads its own key in `providerOptions` and ignores the rest.

