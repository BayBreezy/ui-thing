---
title: Sources
description: Displays the links the agent used for a reply.
label: New
---

::prose-show-case

:DocsAiSources

#code

<!-- automd:file src="../../app/components/content/Docs/AiElements/Sources/DocsAiSources.vue" code lang="vue" -->

```vue [DocsAiSources.vue]
<template>
  <div class="mx-auto flex min-h-72 w-full max-w-sm flex-col gap-4 py-6 text-sm">
    <template v-for="message in messages" :key="message.id">
      <UiMessage v-if="message.role === 'user'" align="end">
        <UiMessageContent>
          <UiBubble align="end" variant="muted">
            <UiBubbleContent>{{ getText(message) }}</UiBubbleContent>
          </UiBubble>
        </UiMessageContent>
      </UiMessage>
      <UiMessage v-else>
        <UiMessageContent class="gap-4">
          <p v-if="getText(message)">
            {{ getText(message) }}
          </p>
          <UiTrace v-if="getSources(message).length > 0">
            <UiTraceCollapsible default-open>
              <UiTraceCollapsibleTrigger>
                <UiTraceLine>
                  <UiTraceIcon>
                    <Icon name="lucide:globe" class="size-4" />
                  </UiTraceIcon>
                  <UiTraceTitle>Used {{ getSources(message).length }} sources</UiTraceTitle>
                </UiTraceLine>
              </UiTraceCollapsibleTrigger>
              <UiTraceCollapsibleContent>
                <UiTrace>
                  <a
                    v-for="source in getSources(message)"
                    :key="source.url"
                    :href="source.url"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <UiTraceLine>
                      <UiTraceTitle>
                        {{ source.title ?? getHostname(source.url) }}
                        <span class="sr-only"> (opens in a new tab)</span>
                      </UiTraceTitle>
                      <UiTraceIcon>
                        <Icon name="lucide:arrow-up-right" class="size-4" />
                      </UiTraceIcon>
                    </UiTraceLine>
                  </a>
                </UiTrace>
              </UiTraceCollapsibleContent>
            </UiTraceCollapsible>
          </UiTrace>
        </UiMessageContent>
      </UiMessage>
    </template>
    <UiButton v-if="!busy" variant="outline" size="sm" class="mt-auto self-start" @click="replay">
      Replay
    </UiButton>
  </div>
</template>

<script lang="ts" setup>
  import { promiseTimeout } from "@vueuse/core";

  interface SourcePart {
    type: "source-url";
    sourceId: string;
    url: string;
    title?: string;
  }

  interface TextPart {
    type: "text";
    text: string;
  }

  interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    parts: (SourcePart | TextPart)[];
  }

  const QUESTION = "How do I start an Astro project with pnpm?";
  const ANSWER =
    "Run pnpm create astro@latest and follow the prompts. It scaffolds the project and installs the dependencies.";

  // The agent cites the Astro docs twice.
  const SOURCES: SourcePart[] = [
    {
      type: "source-url",
      sourceId: "source-0",
      url: "https://docs.astro.build/en/install-and-setup/",
      title: "Install Astro | docs.astro.build",
    },
    {
      type: "source-url",
      sourceId: "source-1",
      url: "https://www.npmjs.com/package/create-astro",
      title: "create-astro | npmjs.com",
    },
    {
      type: "source-url",
      sourceId: "source-2",
      url: "https://docs.astro.build/en/install-and-setup/",
      title: "Install Astro | docs.astro.build",
    },
    {
      type: "source-url",
      sourceId: "source-3",
      url: "https://pnpm.io/cli/create",
      title: "pnpm create | pnpm.io",
    },
  ];

  function transcript(): ChatMessage[] {
    return [
      { id: "user-0", role: "user", parts: [{ type: "text", text: QUESTION }] },
      {
        id: "assistant-0",
        role: "assistant",
        parts: [{ type: "text", text: ANSWER }, ...SOURCES],
      },
    ];
  }

  const messages = ref<ChatMessage[]>(transcript());
  const status = ref<"ready" | "submitted" | "streaming">("ready");
  const busy = computed(() => status.value !== "ready");

  // Unmounting bumps `run`, so a running script stops at its next wait.
  let run = 0;
  tryOnScopeDispose(() => run++);

  async function sleep(ms: number) {
    const id = run;
    await promiseTimeout(ms);
    return id === run;
  }

  async function streamInto(target: { text: string }, text: string, delayMs: number) {
    for (const chunk of text.match(/\S+\s*/g) ?? []) {
      target.text += chunk;
      if (!(await sleep(delayMs))) return false;
    }
    return true;
  }

  function getText(message: ChatMessage) {
    return message.parts
      .filter((part): part is TextPart => part.type === "text")
      .map((part) => part.text)
      .join("");
  }

  function getHostname(url: string) {
    return new URL(url).hostname;
  }

  function getSources(message: ChatMessage) {
    return message.parts
      .filter((part): part is SourcePart => part.type === "source-url")
      .filter((part, index, all) => all.findIndex((other) => other.url === part.url) === index);
  }

  async function replay() {
    const id = ++run;
    messages.value = [
      { id: `user-${id}`, role: "user", parts: [{ type: "text", text: QUESTION }] },
    ];
    status.value = "submitted";
    if (!(await sleep(300))) return;

    const message = reactive<ChatMessage>({ id: `assistant-${id}`, role: "assistant", parts: [] });
    messages.value.push(message);
    status.value = "streaming";

    const text = reactive<TextPart>({ type: "text", text: "" });
    message.parts.push(text);
    if (!(await streamInto(text, ANSWER, 20))) return;

    for (const source of SOURCES) {
      message.parts.push({ ...source });
      if (!(await sleep(20))) return;
    }
    status.value = "ready";
  }
</script>
```

<!-- /automd -->

::

Sources is a line that lists the links the agent used for a reply. It says how many there are, like "Used 3 sources", and opens into a link for each one.

Sources is built with `UiTrace` with a `UiTraceCollapsible` for the list.

## Installation

Sources is built with the [Trace](/components/trace) component.

:prose-pm-x{command="ui-thing@latest add trace"}

## Usage

```vue
<template>
  <UiTrace>
    <UiTraceCollapsible>
      <UiTraceCollapsibleTrigger>
        <UiTraceLine>
          <UiTraceIcon>
            <UiIcon name="lucide:globe" />
          </UiTraceIcon>
          <UiTraceTitle>Used {{ sources.length }} sources</UiTraceTitle>
        </UiTraceLine>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent>
        <UiTrace>
          <a
            v-for="source in sources"
            :key="source.url"
            :href="source.url"
            target="_blank"
            rel="noreferrer"
          >
            <UiTraceLine>
              <UiTraceIcon>
                <UiIcon name="lucide:globe" />
              </UiTraceIcon>
              <UiTraceTitle>
                {{ source.title ?? getHostname(source.url) }}
                <span class="sr-only"> (opens in a new tab)</span>
              </UiTraceTitle>
              <UiTraceIcon>
                <UiIcon name="lucide:arrow-up-right" />
              </UiTraceIcon>
            </UiTraceLine>
          </a>
        </UiTrace>
      </UiTraceCollapsibleContent>
    </UiTraceCollapsible>
  </UiTrace>
</template>

<script lang="ts" setup>
  function getHostname(url: string) {
    return new URL(url).hostname;
  }
</script>
```

## AI SDK

Collect the `source-url` parts of a message and render them after the text. The agent can cite the same page more than once, so dedupe them by `url`.

```ts
const sources = computed(() =>
  props.message.parts
    .filter((part) => part.type === "source-url")
    .filter((part, index, all) => all.findIndex((other) => other.url === part.url) === index)
);
```

`title` is optional on a `source-url` part. Fall back to the hostname of the URL.

## Accessibility

Each source is a plain link inside the list.

- Links open in a new tab. Add `sr-only` text, like "(opens in a new tab)", so screen readers announce it.
- The arrow icon is decorative. The title is the name of the link.
- The count in the trigger, like "Used 3 sources", tells the person what opens before they open it.

## API Reference

See [Trace](/components/trace#api-reference).
