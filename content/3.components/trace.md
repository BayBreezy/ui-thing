---
title: Trace
description: The building block for reasoning, tool calls, sources and more.
label: New
links:
  - title: Collapsible
    href: /components/collapsible
    icon: lucide:chevrons-up-down
---

## Credits

Shout out to [Shadcn Vue](https://www.shadcn-vue.com/docs/components/trace) for the original `Trace`. This version adds more states, sizes, icon and chevron options, and renders any element through `as` / `as-child`.

## Source code

Click :SourceCodeLink{component="Trace"} to see the source code for this component on GitHub. Feel free to copy it and adjust it for your own use.

## Installation

:prose-pm-x{command="ui-thing@latest add trace"}

`Trace` uses the `shimmer` utility for the running state. If you have not added it yet, follow the steps in [Shimmer](/utilities/shimmer).

## About

`Trace` is a list of lines. Each line has an icon, a title, and an optional description and status. A line can expand to show more detail, link to a page, or open a dialog or sheet.

Every line has the same shape, so reasoning, tool calls, sources and plans built from `Trace` look and behave the same. Use `Trace` for the steps an agent takes, like calling a tool, running a subagent or editing a file. Use [Message](/components/message) for its reply, and [Marker](/components/marker) for notes and dividers between turns.

::prose-show-case

:DocsTraceDemo

#code

<!-- automd:file src="../../app/components/content/Docs/Trace/DocsTraceDemo.vue" code lang="vue" -->

```vue [DocsTraceDemo.vue]
<template>
  <DefineThinkingLine v-slot="{ running }">
    <UiTraceLine :status="running ? 'running' : undefined">
      <UiTraceIcon>
        <Icon v-if="running" name="lucide:loader-circle" class="size-4 animate-spin" />
        <Icon v-else name="lucide:circle-check" class="size-4" />
      </UiTraceIcon>
      <UiTraceTitle>
        {{ running ? "Thinking" : "Thought for 5s" }}
      </UiTraceTitle>
    </UiTraceLine>
  </DefineThinkingLine>
  <div class="mx-auto flex min-h-72 w-full max-w-sm flex-col gap-4 py-6 text-sm">
    <template v-for="message in messages" :key="message.id">
      <UiMessage v-if="message.role === 'user'" align="end">
        <UiMessageContent>
          <UiBubble align="end" variant="muted">
            <UiBubbleContent>{{ getMessageText(message) }}</UiBubbleContent>
          </UiBubble>
        </UiMessageContent>
      </UiMessage>
      <UiMessage v-else>
        <UiMessageContent class="gap-4">
          <UiTrace v-if="getRows(message).length + getSources(message).length > 0">
            <template
              v-for="(part, index) in getRows(message)"
              :key="part.type === 'tool-runCommand' ? part.toolCallId : index"
            >
              <!-- Thinking row -->
              <template v-if="part.type === 'reasoning'">
                <ThinkingLine
                  v-if="part.text.length === 0"
                  :running="isStreaming(message) && part.state === 'streaming'"
                />
                <UiTraceCollapsible
                  v-else
                  :open="
                    open[`${message.id}-${index}`] ??
                    (isStreaming(message) && part.state === 'streaming')
                  "
                  @update:open="open[`${message.id}-${index}`] = $event"
                >
                  <UiTraceCollapsibleTrigger>
                    <ThinkingLine :running="isStreaming(message) && part.state === 'streaming'" />
                  </UiTraceCollapsibleTrigger>
                  <UiTraceCollapsibleContent class="whitespace-pre-wrap">
                    {{ part.text }}
                  </UiTraceCollapsibleContent>
                </UiTraceCollapsible>
              </template>

              <!-- Tool row -->
              <template v-else-if="part.type === 'tool-runCommand'">
                <UiTraceCollapsible
                  v-if="part.state === 'output-available' || part.state === 'output-error'"
                  :default-open="index === 2"
                >
                  <UiTraceCollapsibleTrigger>
                    <UiTraceLine :status="part.state === 'output-error' ? 'error' : undefined">
                      <UiTraceIcon>
                        <Icon
                          v-if="part.state === 'output-error'"
                          name="lucide:circle-alert"
                          class="size-4"
                        />
                        <Icon v-else name="lucide:circle-check" class="size-4" />
                      </UiTraceIcon>
                      <UiTraceTitle>
                        {{ part.state === "output-error" ? "Failed to run" : "Ran" }}
                        {{ part.input.command }}
                      </UiTraceTitle>
                    </UiTraceLine>
                  </UiTraceCollapsibleTrigger>
                  <UiTraceCollapsibleContent>
                    <UiCodeBlock
                      v-if="part.state === 'output-error'"
                      size="sm"
                      variant="destructive"
                    >
                      <UiCodeBlockContent wrap class="max-h-64">
                        {{ part.errorText }}
                      </UiCodeBlockContent>
                    </UiCodeBlock>
                    <UiCodeBlock v-else size="sm">
                      <UiCodeBlockContent wrap class="max-h-64">
                        {{ part.output?.stdout }}
                      </UiCodeBlockContent>
                    </UiCodeBlock>
                  </UiTraceCollapsibleContent>
                </UiTraceCollapsible>
                <UiTraceLine v-else :status="isStreaming(message) ? 'running' : 'error'">
                  <UiTraceIcon>
                    <Icon
                      v-if="isStreaming(message)"
                      name="lucide:loader-circle"
                      class="size-4 animate-spin"
                    />
                    <Icon v-else name="lucide:circle-alert" class="size-4" />
                  </UiTraceIcon>
                  <UiTraceTitle>
                    {{ isStreaming(message) ? "Running" : "Failed to run" }}
                    {{ part.input.command }}
                  </UiTraceTitle>
                </UiTraceLine>
              </template>
            </template>

            <!-- Sources row -->
            <UiTraceCollapsible v-if="getSources(message).length > 0">
              <UiTraceCollapsibleTrigger>
                <UiTraceLine
                  :status="
                    isStreaming(message) && getMessageText(message).length === 0
                      ? 'running'
                      : undefined
                  "
                >
                  <UiTraceIcon>
                    <Icon
                      v-if="isStreaming(message) && getMessageText(message).length === 0"
                      name="lucide:loader-circle"
                      class="size-4 animate-spin"
                    />
                    <Icon v-else name="lucide:globe" class="size-4" />
                  </UiTraceIcon>
                  <UiTraceTitle>
                    {{
                      isStreaming(message) && getMessageText(message).length === 0
                        ? "Using"
                        : "Used"
                    }}
                    {{ getSources(message).length }} sources
                  </UiTraceTitle>
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
                      <UiTraceIcon>
                        <Icon name="lucide:globe" class="size-4" />
                      </UiTraceIcon>
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
          <p v-if="getMessageText(message)">
            {{ getMessageText(message) }}
          </p>
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

  interface TextPart {
    type: "text";
    text: string;
  }

  interface ReasoningPart {
    type: "reasoning";
    text: string;
    state: "streaming" | "done";
  }

  interface ToolPart {
    type: "tool-runCommand";
    toolCallId: string;
    input: { command: string };
    state: "input-available" | "output-available" | "output-error";
    output?: { stdout: string };
    errorText?: string;
  }

  interface SourcePart {
    type: "source-url";
    url: string;
    title?: string;
  }

  type Part = TextPart | ReasoningPart | ToolPart | SourcePart;

  interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    parts: Part[];
  }

  const question = "Why does pnpm install fail in CI?";
  const reasoning =
    "CI installs with a frozen lockfile, so the install stops when package.json and pnpm-lock.yaml disagree. I should check what the last commit changed, then reproduce the install.";
  const tools = [
    { command: "pnpm --version", delayMs: 700, stdout: "10.18.0" },
    {
      command: "git diff --stat HEAD~1 -- package.json pnpm-lock.yaml",
      delayMs: 900,
      stdout: " package.json | 2 +-\n 1 file changed, 1 insertion(+), 1 deletion(-)",
    },
    {
      command: "pnpm install --frozen-lockfile",
      delayMs: 1200,
      error:
        'ERR_PNPM_OUTDATED_LOCKFILE  Cannot install with "frozen-lockfile" because pnpm-lock.yaml is not up to date with package.json',
    },
  ];
  const sources = [
    {
      url: "https://pnpm.io/cli/install#--frozen-lockfile",
      title: "pnpm install | pnpm.io",
    },
    {
      url: "https://pnpm.io/continuous-integration",
      title: "Continuous Integration | pnpm.io",
    },
  ];
  const answer =
    "The last commit bumped a version in package.json without updating pnpm-lock.yaml, so the frozen install fails. Run pnpm install locally and commit the lockfile.";

  // The finished conversation, shown before the first replay.
  const transcript: ChatMessage[] = [
    { id: "user-0", role: "user", parts: [{ type: "text", text: question }] },
    {
      id: "assistant-0",
      role: "assistant",
      parts: [
        { type: "reasoning", text: reasoning, state: "done" },
        ...tools.map((tool, index): ToolPart => ({
          type: "tool-runCommand",
          toolCallId: `call-0-${index}`,
          input: { command: tool.command },
          ...(tool.error
            ? { state: "output-error" as const, errorText: tool.error }
            : { state: "output-available" as const, output: { stdout: tool.stdout! } }),
        })),
        ...sources.map((source): SourcePart => ({ type: "source-url", ...source })),
        { type: "text", text: answer },
      ],
    },
  ];

  const messages = ref<ChatMessage[]>(transcript);
  const status = ref<"ready" | "streaming">("ready");
  const open = ref<Record<string, boolean | undefined>>({});

  const [DefineThinkingLine, ThinkingLine] = createReusableTemplate<{ running: boolean }>();

  const busy = computed(() => status.value === "streaming");

  // Simulated streaming. Swap for `new Chat()` from `@ai-sdk/vue` in your app.
  let runId = 0;

  // Invalidate the running script on unmount so pending steps bail out.
  tryOnScopeDispose(() => {
    runId++;
  });

  async function stream(part: TextPart | ReasoningPart, text: string, delayMs: number, id: number) {
    for (const chunk of text.split(/(?<= )/)) {
      await promiseTimeout(delayMs);
      if (id !== runId) return false;
      part.text += chunk;
    }
    return true;
  }

  async function replay() {
    const id = ++runId;
    open.value = {};
    messages.value = [
      { id: `user-${id}`, role: "user", parts: [{ type: "text", text: question }] },
      { id: `assistant-${id}`, role: "assistant", parts: [] },
    ];
    const message = messages.value.at(-1)!;
    status.value = "streaming";

    message.parts.push({ type: "reasoning", text: "", state: "streaming" });
    const thinking = message.parts.at(-1) as ReasoningPart;
    if (!(await stream(thinking, reasoning, 40, id))) return;
    thinking.state = "done";

    for (const [index, tool] of tools.entries()) {
      message.parts.push({
        type: "tool-runCommand",
        toolCallId: `call-${id}-${index}`,
        input: { command: tool.command },
        state: "input-available",
      });
      const part = message.parts.at(-1) as ToolPart;
      await promiseTimeout(tool.delayMs);
      if (id !== runId) return;
      if (tool.error) {
        part.state = "output-error";
        part.errorText = tool.error;
      } else {
        part.state = "output-available";
        part.output = { stdout: tool.stdout! };
      }
    }

    for (const source of sources) message.parts.push({ type: "source-url", ...source });

    await promiseTimeout(1000);
    if (id !== runId) return;

    message.parts.push({ type: "text", text: "" });
    if (!(await stream(message.parts.at(-1) as TextPart, answer, 20, id))) return;

    status.value = "ready";
  }

  function getMessageText(message: ChatMessage) {
    return message.parts.map((part) => (part.type === "text" ? part.text : "")).join("");
  }

  function getRows(message: ChatMessage) {
    return message.parts.filter(
      (part): part is ReasoningPart | ToolPart =>
        part.type === "reasoning" || part.type === "tool-runCommand"
    );
  }

  function getSources(message: ChatMessage) {
    return message.parts.filter((part): part is SourcePart => part.type === "source-url");
  }

  function getHostname(url: string) {
    return new URL(url).hostname;
  }

  function isStreaming(message: ChatMessage) {
    return busy.value && message === messages.value.at(-1);
  }
</script>
```

<!-- /automd -->

::

## Built with Trace

Every pattern below is a composition of `Trace` parts. See [AI Elements](/ai-elements) for examples and code.

| Pattern                                                 | Shows                                                            |
| ------------------------------------------------------- | ---------------------------------------------------------------- |
| [Chain of Thought](/ai-elements/chain-of-thought)       | A summary that expands into the steps behind it.                 |
| [Plan](/ai-elements/plan)                               | The steps the agent plans to take, and how far it has got.       |
| [Queue](/ai-elements/queue)                             | The agent's todo list, split into what is left and what is done. |
| [Reasoning](/ai-elements/reasoning)                     | The agent's thinking as it streams.                              |
| [Sources](/ai-elements/sources)                         | The links the agent used for a reply.                            |
| [Stack Trace](/ai-elements/stack-trace)                 | A failed tool call and its stack frames.                         |
| [Subagent](/ai-elements/subagent)                       | A subagent run, with its tool calls and result.                  |
| [Task](/ai-elements/task)                               | The steps the agent takes, as it takes them.                     |
| [Terminal](/ai-elements/terminal)                       | A command the agent runs, with its output as it streams.         |
| [Test Results](/ai-elements/test-results)               | A test run by the agent, with its suites and failures.           |
| [Tool](/ai-elements/tool)                               | A tool call the agent makes, from input to output.               |

## Usage

Use a `UiTraceLine` for a single step:

```vue
<template>
  <UiTrace>
    <UiTraceLine>
      <UiTraceIcon name="lucide:search" />
      <UiTraceTitle>Searched for minimumReleaseAge</UiTraceTitle>
    </UiTraceLine>
  </UiTrace>
</template>
```

Wrap the line in a `UiTraceCollapsible` to show more detail when it expands:

```vue
<template>
  <UiTrace>
    <UiTraceCollapsible>
      <UiTraceCollapsibleTrigger>
        <UiTraceLine>
          <UiTraceIcon name="lucide:terminal" />
          <UiTraceTitle>Ran node --version</UiTraceTitle>
        </UiTraceLine>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent>v24.18.0</UiTraceCollapsibleContent>
    </UiTraceCollapsible>
  </UiTrace>
</template>
```

## Composition

Use the following composition to build a trace line:

```sh
UiTrace
└── UiTraceLine
    ├── UiTraceIcon
    ├── UiTraceTitle
    ├── UiTraceDescription
    └── UiTraceIcon
```

Wrap the line in a `UiTraceCollapsible` to show more detail when it expands:

```sh
UiTrace
└── UiTraceCollapsible
    ├── UiTraceCollapsibleTrigger
    │   └── UiTraceLine
    └── UiTraceCollapsibleContent
```

`UiTraceLine` is always the line. To make a line do something, wrap it in that thing's trigger.

## Features

- One row for reasoning, tool calls, sources, plans and tasks
- Rows that expand, link out, or open a dialog, sheet, drawer or popover
- `running`, `error`, `pending`, `success` and `warning` states, with a shimmer while running
- Two sizes, `default` and `sm`
- Icons by name (`<UiTraceIcon name="lucide:search" />`) or with your own markup
- A chevron you can hide, swap for another icon, or replace through a slot
- Nested rows, so a summary expands into steps and a step into its output
- Every part renders any element through `as` and `as-child`
- Works with reasoning, tool and source parts from the AI SDK
- Keyboard and screen reader support from the trigger that wraps each row
- Customizable styling through the `class` prop on every part

## Trace Line

Use a `UiTraceLine` on its own for a step with no detail to show. It reads as plain text.

::prose-show-case

:DocsTraceStatic

#code

<!-- automd:file src="../../app/components/content/Docs/Trace/DocsTraceStatic.vue" code lang="vue" -->

```vue [DocsTraceStatic.vue]
<template>
  <UiTrace class="mx-auto max-w-sm">
    <UiTraceLine>
      <UiTraceIcon>
        <Icon name="lucide:git-branch" class="size-4" />
      </UiTraceIcon>
      <UiTraceTitle>Created branch fix/frozen-lockfile</UiTraceTitle>
    </UiTraceLine>
  </UiTrace>
</template>

<script lang="ts" setup></script>
```

<!-- /automd -->

::

## Status

Set `status` on `UiTraceLine` when a step is running, has failed or hasn't started yet.

::prose-show-case

:DocsTraceStatus

#code

<!-- automd:file src="../../app/components/content/Docs/Trace/DocsTraceStatus.vue" code lang="vue" -->

```vue [DocsTraceStatus.vue]
<template>
  <UiTrace class="mx-auto max-w-sm">
    <UiTraceLine>
      <UiTraceIcon>
        <Icon name="lucide:circle-check" class="size-4" />
      </UiTraceIcon>
      <UiTraceTitle>Ran pnpm install</UiTraceTitle>
    </UiTraceLine>
    <UiTraceLine status="error">
      <UiTraceIcon>
        <Icon name="lucide:circle-alert" class="size-4" />
      </UiTraceIcon>
      <UiTraceTitle>Failed to run pnpm lint</UiTraceTitle>
    </UiTraceLine>
    <UiTraceLine status="running">
      <UiTraceIcon>
        <Icon name="lucide:loader-circle" class="size-4 animate-spin" />
      </UiTraceIcon>
      <UiTraceTitle>Running pnpm build</UiTraceTitle>
    </UiTraceLine>
    <UiTraceLine status="pending">
      <UiTraceIcon>
        <Icon name="lucide:circle" class="size-4" />
      </UiTraceIcon>
      <UiTraceTitle>Run pnpm test</UiTraceTitle>
    </UiTraceLine>
  </UiTrace>
</template>

<script lang="ts" setup></script>
```

<!-- /automd -->

::

| Status      | Use for                                                                       |
| ----------- | ----------------------------------------------------------------------------- |
| none        | Work that is done: "Ran pnpm install".                                        |
| `"success"` | Work that finished and you want to say so, in green.                          |
| `"warning"` | Work that finished with something to look at, in amber.                       |
| `"error"`   | Work that failed. Say so in the title: "Failed to run pnpm lint".             |
| `"running"` | Work in progress. Write the title in the present tense: "Running pnpm build". |
| `"pending"` | Work that has not started, such as a plan step: "Run pnpm test".              |

### Size

Use `size="sm"` for denser lists such as a long plan or a queue. The icon scales with the line.

::prose-show-case

:DocsTraceSizes

#code

<!-- automd:file src="../../app/components/content/Docs/Trace/DocsTraceSizes.vue" code lang="vue" -->

```vue [DocsTraceSizes.vue]
<template>
  <div class="mx-auto grid max-w-sm gap-6">
    <UiTrace>
      <UiTraceLine>
        <UiTraceIcon name="lucide:search" />
        <UiTraceTitle>Searched for minimumReleaseAge</UiTraceTitle>
        <UiTraceDescription>default</UiTraceDescription>
      </UiTraceLine>
      <UiTraceLine status="success">
        <UiTraceIcon name="lucide:circle-check" />
        <UiTraceTitle>Ran pnpm install</UiTraceTitle>
      </UiTraceLine>
    </UiTrace>

    <UiTrace>
      <UiTraceLine size="sm">
        <UiTraceIcon name="lucide:search" />
        <UiTraceTitle>Searched for minimumReleaseAge</UiTraceTitle>
        <UiTraceDescription>sm</UiTraceDescription>
      </UiTraceLine>
      <UiTraceLine size="sm" status="warning">
        <UiTraceIcon name="lucide:triangle-alert" />
        <UiTraceTitle>Ran pnpm lint with 2 warnings</UiTraceTitle>
      </UiTraceLine>
    </UiTrace>
  </div>
</template>
```

<!-- /automd -->

::

## Description

Put secondary text such as a diff stat, a duration or a count in a `UiTraceDescription` after the `UiTraceTitle`. It does not truncate.

::prose-show-case

:DocsTraceDescription

#code

<!-- automd:file src="../../app/components/content/Docs/Trace/DocsTraceDescription.vue" code lang="vue" -->

```vue [DocsTraceDescription.vue]
<template>
  <UiTrace class="mx-auto max-w-sm">
    <UiTraceLine>
      <UiTraceIcon>
        <Icon name="lucide:file-pen" class="size-4" />
      </UiTraceIcon>
      <UiTraceTitle> Edited components/settings/NotificationPreferencesForm.vue </UiTraceTitle>
      <UiTraceDescription class="font-mono"> +48 −12 </UiTraceDescription>
    </UiTraceLine>
    <UiTraceLine>
      <UiTraceIcon>
        <Icon name="lucide:terminal" class="size-4" />
      </UiTraceIcon>
      <UiTraceTitle>Ran pnpm test</UiTraceTitle>
      <UiTraceDescription>14s</UiTraceDescription>
    </UiTraceLine>
    <UiTraceLine>
      <UiTraceIcon>
        <Icon name="lucide:search" class="size-4" />
      </UiTraceIcon>
      <UiTraceTitle>Searched for useChat</UiTraceTitle>
      <UiTraceDescription>8 results</UiTraceDescription>
    </UiTraceLine>
  </UiTrace>
</template>

<script lang="ts" setup></script>
```

<!-- /automd -->

::

## Collapsible

Wrap the line in a `UiTraceCollapsible` to show more detail when it expands. Put the `UiTraceLine` inside `UiTraceCollapsibleTrigger` and the detail in `UiTraceCollapsibleContent`.

::prose-show-case

:DocsTraceCollapsible

#code

<!-- automd:file src="../../app/components/content/Docs/Trace/DocsTraceCollapsible.vue" code lang="vue" -->

```vue [DocsTraceCollapsible.vue]
<template>
  <div class="mx-auto w-full max-w-sm">
    <UiTraceCollapsible>
      <UiTraceCollapsibleTrigger>
        <UiTraceLine>
          <UiTraceIcon>
            <Icon name="lucide:terminal" class="size-4" />
          </UiTraceIcon>
          <UiTraceTitle>Ran node --version</UiTraceTitle>
        </UiTraceLine>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent>
        <UiCodeBlock size="sm">
          <UiCodeBlockContent wrap class="max-h-64">
            {{ "$ node --version\nv24.18.0" }}
          </UiCodeBlockContent>
        </UiCodeBlock>
      </UiTraceCollapsibleContent>
    </UiTraceCollapsible>
  </div>
</template>

<script lang="ts" setup></script>
```

<!-- /automd -->

::

### Chevron

The trigger adds a chevron after the line. Hide it with `:chevron="false"`, pick another icon with `chevron-icon`, or replace it through the `chevron` slot. Set `:bordered="false"` on the content to drop the rule and indent on its left.

::prose-show-case

:DocsTraceChevron

#code

<!-- automd:file src="../../app/components/content/Docs/Trace/DocsTraceChevron.vue" code lang="vue" -->

```vue [DocsTraceChevron.vue]
<template>
  <UiTrace class="mx-auto max-w-sm">
    <!-- Another icon -->
    <UiTraceCollapsible>
      <UiTraceCollapsibleTrigger chevron-icon="lucide:plus">
        <UiTraceLine>
          <UiTraceIcon name="lucide:file-text" />
          <UiTraceTitle>Read package.json</UiTraceTitle>
        </UiTraceLine>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent>
        Found 3 dependencies that are out of date.
      </UiTraceCollapsibleContent>
    </UiTraceCollapsible>

    <!-- No chevron, and no rule on the content -->
    <UiTraceCollapsible>
      <UiTraceCollapsibleTrigger :chevron="false">
        <UiTraceLine>
          <UiTraceIcon name="lucide:file-text" />
          <UiTraceTitle>Read pnpm-lock.yaml</UiTraceTitle>
        </UiTraceLine>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent :bordered="false">
        The lockfile is up to date.
      </UiTraceCollapsibleContent>
    </UiTraceCollapsible>

    <!-- Your own chevron, driven by the open state -->
    <UiTraceCollapsible v-slot="{ open }">
      <UiTraceCollapsibleTrigger>
        <UiTraceLine>
          <UiTraceIcon name="lucide:file-text" />
          <UiTraceTitle>Read tsconfig.json</UiTraceTitle>
        </UiTraceLine>
        <template #chevron>
          <span class="text-xs">{{ open ? "Hide" : "Show" }}</span>
        </template>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent>Strict mode is on.</UiTraceCollapsibleContent>
    </UiTraceCollapsible>
  </UiTrace>
</template>
```

<!-- /automd -->

::

## Open State

Rows start closed. Use `default-open` on `UiTraceCollapsible` to start open, or `v-model:open` to control a row. The default slot receives the current `open` state.

::prose-show-case

:DocsTraceOpen

#code

<!-- automd:file src="../../app/components/content/Docs/Trace/DocsTraceOpen.vue" code lang="vue" -->

```vue [DocsTraceOpen.vue]
<template>
  <div class="mx-auto flex w-full max-w-sm flex-col items-start gap-4">
    <UiTraceCollapsible default-open>
      <UiTraceCollapsibleTrigger>
        <UiTraceLine>
          <UiTraceIcon>
            <Icon name="lucide:terminal" class="size-4" />
          </UiTraceIcon>
          <UiTraceTitle>Ran node --version</UiTraceTitle>
        </UiTraceLine>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent>
        <UiCodeBlock size="sm">
          <UiCodeBlockContent wrap class="max-h-64">
            {{ "$ node --version\nv24.18.0" }}
          </UiCodeBlockContent>
        </UiCodeBlock>
      </UiTraceCollapsibleContent>
    </UiTraceCollapsible>
    <UiTraceCollapsible v-model:open="open">
      <UiTraceCollapsibleTrigger>
        <UiTraceLine>
          <UiTraceIcon>
            <Icon name="lucide:terminal" class="size-4" />
          </UiTraceIcon>
          <UiTraceTitle>Ran pnpm --version</UiTraceTitle>
        </UiTraceLine>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent>
        <UiCodeBlock size="sm">
          <UiCodeBlockContent wrap class="max-h-64">
            {{ "$ pnpm --version\n10.33.4" }}
          </UiCodeBlockContent>
        </UiCodeBlock>
      </UiTraceCollapsibleContent>
    </UiTraceCollapsible>
    <UiButton variant="outline" size="sm" @click="toggleOpen()">
      {{ open ? "Hide" : "Show" }} the pnpm output
    </UiButton>
  </div>
</template>

<script lang="ts" setup>
  const [open, toggleOpen] = useToggle(false);
</script>
```

<!-- /automd -->

::

To open a row while it streams and let the reader's click win, pass `open ?? running`.

```vue
<template>
  <UiTraceCollapsible :open="open ?? running" @update:open="open = $event">
    <UiTraceCollapsibleTrigger>
      <UiTraceLine :status="running ? 'running' : undefined">…</UiTraceLine>
    </UiTraceCollapsibleTrigger>
    <UiTraceCollapsibleContent>{{ text }}</UiTraceCollapsibleContent>
  </UiTraceCollapsible>
</template>

<script lang="ts" setup>
  defineProps<{ text: string; running: boolean }>();

  const open = ref<boolean>();
</script>
```

## Link

Wrap the `UiTraceLine` in an anchor. For a new tab, use an arrow-up-right icon and sr-only "(opens in a new tab)".

::prose-show-case

:DocsTraceLink

#code

<!-- automd:file src="../../app/components/content/Docs/Trace/DocsTraceLink.vue" code lang="vue" -->

```vue [DocsTraceLink.vue]
<template>
  <UiTrace class="mx-auto max-w-sm">
    <a href="#link">
      <UiTraceLine>
        <UiTraceIcon>
          <Icon name="lucide:file-text" class="size-4" />
        </UiTraceIcon>
        <UiTraceTitle>Read apps/v4/lib/docs.ts</UiTraceTitle>
        <UiTraceIcon>
          <Icon name="lucide:chevron-right" class="size-4" />
        </UiTraceIcon>
      </UiTraceLine>
    </a>
    <a href="https://docs.astro.build/en/install-and-setup/" target="_blank" rel="noreferrer">
      <UiTraceLine>
        <UiTraceIcon>
          <Icon name="lucide:globe" class="size-4" />
        </UiTraceIcon>
        <UiTraceTitle>
          Install Astro | docs.astro.build
          <span class="sr-only"> (opens in a new tab)</span>
        </UiTraceTitle>
        <UiTraceIcon>
          <Icon name="lucide:arrow-up-right" class="size-4" />
        </UiTraceIcon>
      </UiTraceLine>
    </a>
  </UiTrace>
</template>

<script lang="ts" setup></script>
```

<!-- /automd -->

::

```vue
<template>
  <a href="https://docs.astro.build" target="_blank" rel="noreferrer">
    <UiTraceLine>
      <UiTraceTitle>
        Install Astro
        <span class="sr-only"> (opens in a new tab)</span>
      </UiTraceTitle>
      <UiTraceIcon name="lucide:arrow-up-right" />
    </UiTraceLine>
  </a>
</template>
```

## Dialog

Wrap the `UiTraceLine` in the dialog's trigger. The dialog owns its open state, Escape and focus return.

::prose-show-case

:DocsTraceDialog

#code

<!-- automd:file src="../../app/components/content/Docs/Trace/DocsTraceDialog.vue" code lang="vue" -->

```vue [DocsTraceDialog.vue]
<template>
  <UiTrace class="mx-auto max-w-sm">
    <UiDialog>
      <UiDialogTrigger as-child>
        <button type="button">
          <UiTraceLine>
            <UiTraceIcon>
              <Icon name="lucide:globe" class="size-4" />
            </UiTraceIcon>
            <UiTraceTitle>Searched the web for cache keys</UiTraceTitle>
            <UiTraceIcon>
              <Icon name="lucide:chevron-right" class="size-4" />
            </UiTraceIcon>
          </UiTraceLine>
        </button>
      </UiDialogTrigger>
      <UiDialogContent>
        <UiDialogHeader>
          <UiDialogTitle>Searched the web for cache keys</UiDialogTitle>
          <UiDialogDescription> Three results were used in the response. </UiDialogDescription>
        </UiDialogHeader>
        <UiTrace>
          <a
            v-for="result in results"
            :key="result.url"
            :href="result.url"
            target="_blank"
            rel="noreferrer"
          >
            <UiTraceLine>
              <UiTraceIcon>
                <Icon name="lucide:globe" class="size-4" />
              </UiTraceIcon>
              <UiTraceTitle>
                {{ result.title }}
                <span class="sr-only"> (opens in a new tab)</span>
              </UiTraceTitle>
              <UiTraceIcon>
                <Icon name="lucide:arrow-up-right" class="size-4" />
              </UiTraceIcon>
            </UiTraceLine>
          </a>
        </UiTrace>
      </UiDialogContent>
    </UiDialog>
  </UiTrace>
</template>

<script lang="ts" setup>
  const results = [
    {
      title: "Caching build outputs",
      url: "https://nextjs.org/docs/app/guides/caching",
    },
    {
      title: "Image optimization reference",
      url: "https://nextjs.org/docs/app/api-reference/components/image",
    },
    {
      title: "Deploy hooks and cache keys",
      url: "https://vercel.com/docs/deploy-hooks",
    },
  ];
</script>
```

<!-- /automd -->

::

## Sheet

The same shape as the dialog. Drawer and Popover work the same way.

::prose-show-case

:DocsTraceSheet

#code

<!-- automd:file src="../../app/components/content/Docs/Trace/DocsTraceSheet.vue" code lang="vue" -->

```vue [DocsTraceSheet.vue]
<template>
  <UiTrace class="mx-auto max-w-sm">
    <UiSheet>
      <UiSheetTrigger as-child>
        <button type="button">
          <UiTraceLine>
            <UiTraceIcon>
              <Icon name="lucide:folder-search" class="size-4" />
            </UiTraceIcon>
            <UiTraceTitle>Explored 4 files</UiTraceTitle>
            <UiTraceIcon>
              <Icon name="lucide:chevron-right" class="size-4" />
            </UiTraceIcon>
          </UiTraceLine>
        </button>
      </UiSheetTrigger>
      <UiSheetContent>
        <UiSheetHeader>
          <UiSheetTitle>Explored 4 files</UiSheetTitle>
          <UiSheetDescription> Files read while preparing the response. </UiSheetDescription>
        </UiSheetHeader>
        <ul class="flex flex-col gap-2 px-6 font-mono text-xs">
          <li>apps/v4/lib/docs.ts</li>
          <li>apps/v4/lib/components.ts</li>
          <li>apps/v4/nuxt.config.ts</li>
          <li>apps/v4/package.json</li>
        </ul>
      </UiSheetContent>
    </UiSheet>
  </UiTrace>
</template>

<script lang="ts" setup></script>
```

<!-- /automd -->

::

## Group

Put rows that sit next to each other in a `UiTrace`. It also styles any trigger or link that wraps a `UiTraceLine`.

::prose-show-case

:DocsTraceGroup

#code

<!-- automd:file src="../../app/components/content/Docs/Trace/DocsTraceGroup.vue" code lang="vue" -->

```vue [DocsTraceGroup.vue]
<template>
  <UiTrace class="mx-auto max-w-sm">
    <UiTraceLine>
      <UiTraceIcon>
        <Icon name="lucide:search" class="size-4" />
      </UiTraceIcon>
      <UiTraceTitle>Searched for minimumReleaseAge</UiTraceTitle>
    </UiTraceLine>
    <UiTraceLine>
      <UiTraceIcon>
        <Icon name="lucide:file-text" class="size-4" />
      </UiTraceIcon>
      <UiTraceTitle>Read pnpm-workspace.yaml</UiTraceTitle>
    </UiTraceLine>
    <UiTraceLine>
      <UiTraceIcon>
        <Icon name="lucide:terminal" class="size-4" />
      </UiTraceIcon>
      <UiTraceTitle>Ran pnpm install</UiTraceTitle>
    </UiTraceLine>
  </UiTrace>
</template>

<script lang="ts" setup></script>
```

<!-- /automd -->

::

## Sources

A collapsible row whose detail is a `UiTrace` of link rows.

::prose-show-case

:DocsTraceSources

#code

<!-- automd:file src="../../app/components/content/Docs/Trace/DocsTraceSources.vue" code lang="vue" -->

```vue [DocsTraceSources.vue]
<template>
  <div class="mx-auto w-full max-w-sm">
    <UiTraceCollapsible default-open>
      <UiTraceCollapsibleTrigger>
        <UiTraceLine>
          <UiTraceIcon>
            <Icon name="lucide:globe" class="size-4" />
          </UiTraceIcon>
          <UiTraceTitle>Used {{ sources.length }} sources</UiTraceTitle>
        </UiTraceLine>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent>
        <UiTrace>
          <a
            v-for="source in sources"
            :key="source.href"
            :href="source.href"
            target="_blank"
            rel="noreferrer"
          >
            <UiTraceLine>
              <UiTraceIcon>
                <Icon name="lucide:globe" class="size-4" />
              </UiTraceIcon>
              <UiTraceTitle>
                {{ source.title }}
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
  </div>
</template>

<script lang="ts" setup>
  const sources = [
    {
      title: "Install Astro | docs.astro.build",
      href: "https://docs.astro.build/en/install-and-setup/",
    },
    {
      title: "create-astro | npmjs.com",
      href: "https://www.npmjs.com/package/create-astro",
    },
    {
      title: "Settings: minimumReleaseAge | pnpm.io",
      href: "https://pnpm.io/settings#minimumreleaseage",
    },
  ];
</script>
```

<!-- /automd -->

::

See [Sources](/ai-elements/sources) for more examples.

## Chain of Thought

A chain of thought is a collapsible row with step rows inside. Set the parent's status and title from its children.

::prose-show-case

:DocsTraceSteps

#code

<!-- automd:file src="../../app/components/content/Docs/Trace/DocsTraceSteps.vue" code lang="vue" -->

```vue [DocsTraceSteps.vue]
<template>
  <div class="mx-auto w-full max-w-sm">
    <UiTraceCollapsible default-open :unmount-on-hide="false">
      <UiTraceCollapsibleTrigger>
        <UiTraceLine status="running">
          <UiTraceTitle>Looking into the slow deploy</UiTraceTitle>
        </UiTraceLine>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent>
        <UiTrace>
          <UiTraceCollapsible>
            <UiTraceCollapsibleTrigger>
              <UiTraceLine>
                <UiTraceIcon>
                  <Icon name="lucide:search" class="size-4" />
                </UiTraceIcon>
                <UiTraceTitle>Searched for the checkout build log</UiTraceTitle>
              </UiTraceLine>
            </UiTraceCollapsibleTrigger>
            <UiTraceCollapsibleContent class="flex flex-wrap gap-1.5">
              <UiBadge variant="secondary"> vercel.com </UiBadge>
              <UiBadge variant="secondary"> github.com </UiBadge>
            </UiTraceCollapsibleContent>
          </UiTraceCollapsible>
          <a href="#steps">
            <UiTraceLine>
              <UiTraceIcon>
                <Icon name="lucide:file-text" class="size-4" />
              </UiTraceIcon>
              <UiTraceTitle>Read the last twelve deploys</UiTraceTitle>
              <UiTraceIcon>
                <Icon name="lucide:chevron-right" class="size-4" />
              </UiTraceIcon>
            </UiTraceLine>
          </a>
          <UiTraceCollapsible>
            <UiTraceCollapsibleTrigger>
              <UiTraceLine status="running">
                <UiTraceIcon>
                  <Icon name="lucide:search" class="size-4" />
                </UiTraceIcon>
                <UiTraceTitle>Searching for the cache key</UiTraceTitle>
              </UiTraceLine>
            </UiTraceCollapsibleTrigger>
            <UiTraceCollapsibleContent>
              <UiCodeBlock size="sm">
                <UiCodeBlockContent wrap class="max-h-64">
                  cache key image optimization
                </UiCodeBlockContent>
              </UiCodeBlock>
            </UiTraceCollapsibleContent>
          </UiTraceCollapsible>
        </UiTrace>
      </UiTraceCollapsibleContent>
    </UiTraceCollapsible>
  </div>
</template>

<script lang="ts" setup></script>
```

<!-- /automd -->

::

See [Chain of Thought](/ai-elements/chain-of-thought) and [Task](/ai-elements/task) for more examples.

## Commit

A commit is a collapsible row with a line for each changed file. Say what changed in the title, Added, Edited or Deleted, and put the line counts in the description. Each file opens its diff in a [Sheet](#sheet).

::prose-show-case

:DocsTraceCommit

#code

<!-- automd:file src="../../app/components/content/Docs/Trace/DocsTraceCommit.vue" code lang="vue" -->

```vue [DocsTraceCommit.vue]
<template>
  <UiTrace class="mx-auto max-w-sm">
    <UiTraceCollapsible default-open>
      <UiTraceCollapsibleTrigger>
        <UiTraceLine>
          <UiTraceIcon>
            <Icon name="lucide:git-commit-horizontal" class="size-4" />
          </UiTraceIcon>
          <UiTraceTitle>Committed a1b2c3: Fix the login redirect</UiTraceTitle>
        </UiTraceLine>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent>
        <UiTrace>
          <UiSheet v-for="file in files" :key="file.path">
            <UiSheetTrigger as-child>
              <button type="button">
                <UiTraceLine>
                  <UiTraceIcon>
                    <Icon v-if="file.added" name="lucide:file-plus" class="size-4" />
                    <Icon v-else name="lucide:file-pen" class="size-4" />
                  </UiTraceIcon>
                  <UiTraceTitle>
                    {{ file.added ? "Added" : "Edited" }} {{ file.path }}
                  </UiTraceTitle>
                  <UiTraceDescription class="font-mono">
                    +{{ file.additions }} −{{ file.deletions }}
                  </UiTraceDescription>
                  <UiTraceIcon>
                    <Icon name="lucide:chevron-right" class="size-4" />
                  </UiTraceIcon>
                </UiTraceLine>
              </button>
            </UiSheetTrigger>
            <UiSheetContent>
              <UiSheetHeader>
                <UiSheetTitle class="font-mono">
                  {{ file.path }}
                </UiSheetTitle>
                <UiSheetDescription>
                  {{ file.additions }} additions, {{ file.deletions }} deletions
                </UiSheetDescription>
              </UiSheetHeader>
              <UiCodeBlock class="mx-6 mb-6 w-auto">
                <UiCodeBlockContent>
                  <UiCodeBlockLine
                    v-for="(line, index) in diffLines(file.diff)"
                    :key="index"
                    :variant="line.variant"
                    :class="line.hunk ? 'text-muted-foreground' : undefined"
                  >
                    {{ line.text }}
                  </UiCodeBlockLine>
                </UiCodeBlockContent>
              </UiCodeBlock>
            </UiSheetContent>
          </UiSheet>
        </UiTrace>
      </UiTraceCollapsibleContent>
    </UiTraceCollapsible>
  </UiTrace>
</template>

<script lang="ts" setup>
  /* eslint-disable no-useless-escape */
  const files = [
    {
      path: "pages/login.vue",
      added: false,
      additions: 2,
      deletions: 2,
      diff: `@@ -1,6 +1,6 @@
 <script setup lang="ts">
 const route = useRoute()
 const next = route.query.next as string | undefined
-const redirectTo =
-  next && next.startsWith('/') ? next : '/'
+const redirectTo = safeRedirect(next)
+
 <\/script>`,
    },
    {
      path: "utils/redirect.ts",
      added: true,
      additions: 7,
      deletions: 0,
      diff: `@@ -0,0 +1,7 @@
+export function safeRedirect(next: string | undefined) {
+  if (!next || !next.startsWith('/') || next.startsWith('//')) {
+    return '/'
+  }
+
+  return next
+}`,
    },
  ];

  function diffLines(diff: string) {
    return diff.split("\n").map((line) => {
      if (line.startsWith("@@")) return { hunk: true, variant: "default" as const, text: line };

      return {
        hunk: false,
        variant: line.startsWith("+")
          ? ("added" as const)
          : line.startsWith("-")
            ? ("removed" as const)
            : ("default" as const),
        text: line.slice(1),
      };
    });
  }
</script>
```

<!-- /automd -->

::

## Whole Turn

Three levels: the turn, a summary, and the rows. Text between steps sits between two `UiTrace` lists.

::prose-show-case

:DocsTraceTurn

#code

<!-- automd:file src="../../app/components/content/Docs/Trace/DocsTraceTurn.vue" code lang="vue" -->

```vue [DocsTraceTurn.vue]
<template>
  <div class="mx-auto w-full max-w-sm">
    <UiTraceCollapsible default-open :unmount-on-hide="false">
      <UiTraceCollapsibleTrigger>
        <UiTraceLine status="error">
          <UiTraceTitle>Worked for 2m 4s, 1 command failed</UiTraceTitle>
        </UiTraceLine>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent class="flex flex-col gap-2">
        <UiTrace>
          <UiTraceCollapsible>
            <UiTraceCollapsibleTrigger>
              <UiTraceLine>
                <UiTraceIcon>
                  <Icon name="lucide:brain" class="size-4" />
                </UiTraceIcon>
                <UiTraceTitle>Thought</UiTraceTitle>
                <UiTraceDescription>12s</UiTraceDescription>
              </UiTraceLine>
            </UiTraceCollapsibleTrigger>
            <UiTraceCollapsibleContent class="whitespace-pre-wrap">
              I should check which package managers are installed before I scaffold anything.
            </UiTraceCollapsibleContent>
          </UiTraceCollapsible>
          <UiTraceCollapsible default-open :unmount-on-hide="false">
            <UiTraceCollapsibleTrigger>
              <UiTraceLine status="error">
                <UiTraceIcon>
                  <Icon name="lucide:terminal" class="size-4" />
                </UiTraceIcon>
                <UiTraceTitle>Ran 2 commands, 1 failed</UiTraceTitle>
              </UiTraceLine>
            </UiTraceCollapsibleTrigger>
            <UiTraceCollapsibleContent>
              <UiTrace>
                <UiTraceLine>
                  <UiTraceIcon>
                    <Icon name="lucide:terminal" class="size-4" />
                  </UiTraceIcon>
                  <UiTraceTitle>Ran node --version</UiTraceTitle>
                </UiTraceLine>
                <UiTraceCollapsible>
                  <UiTraceCollapsibleTrigger>
                    <UiTraceLine status="error">
                      <UiTraceIcon>
                        <Icon name="lucide:terminal" class="size-4" />
                      </UiTraceIcon>
                      <UiTraceTitle>Failed to run pnpm --version</UiTraceTitle>
                    </UiTraceLine>
                  </UiTraceCollapsibleTrigger>
                  <UiTraceCollapsibleContent>
                    <UiCodeBlock size="sm" variant="destructive">
                      <UiCodeBlockContent wrap class="max-h-64">
                        command not found: pnpm
                      </UiCodeBlockContent>
                    </UiCodeBlock>
                  </UiTraceCollapsibleContent>
                </UiTraceCollapsible>
              </UiTrace>
            </UiTraceCollapsibleContent>
          </UiTraceCollapsible>
        </UiTrace>
        <p>Node is installed and pnpm is not. Reading the docs config.</p>
        <UiTrace>
          <a href="#turn">
            <UiTraceLine>
              <UiTraceIcon>
                <Icon name="lucide:file-text" class="size-4" />
              </UiTraceIcon>
              <UiTraceTitle>Read apps/v4/lib/docs.ts</UiTraceTitle>
              <UiTraceIcon>
                <Icon name="lucide:chevron-right" class="size-4" />
              </UiTraceIcon>
            </UiTraceLine>
          </a>
        </UiTrace>
      </UiTraceCollapsibleContent>
    </UiTraceCollapsible>
  </div>
</template>

<script lang="ts" setup></script>
```

<!-- /automd -->

::

## Reasoning

Render a `reasoning` part from the AI SDK. The row is a `UiTraceLine` until the first text arrives. See [Open State](#open-state).

::prose-show-case

:DocsTraceThinking

#code

<!-- automd:file src="../../app/components/content/Docs/Trace/DocsTraceThinking.vue" code lang="vue" -->

```vue [DocsTraceThinking.vue]
<template>
  <DefineThinkingLine v-slot="{ running }">
    <UiTraceLine :status="running ? 'running' : undefined">
      <UiTraceIcon>
        <Icon name="lucide:brain" class="size-4" />
      </UiTraceIcon>
      <UiTraceTitle>
        {{ running ? "Thinking" : "Thought" }}
      </UiTraceTitle>
    </UiTraceLine>
  </DefineThinkingLine>
  <div class="mx-auto flex min-h-72 w-full max-w-sm flex-col gap-4 py-6 text-sm">
    <template v-for="message in messages" :key="message.id">
      <UiMessage v-if="message.role === 'user'" align="end">
        <UiMessageContent>
          <UiBubble align="end" variant="muted">
            <UiBubbleContent>{{ getMessageText(message) }}</UiBubbleContent>
          </UiBubble>
        </UiMessageContent>
      </UiMessage>
      <UiMessage v-else>
        <UiMessageContent class="gap-4">
          <template v-for="(run, runIndex) in groupParts(message.parts)" :key="runIndex">
            <UiTrace v-if="run.trace">
              <template v-for="(part, index) in run.parts" :key="index">
                <template v-if="part.type === 'reasoning'">
                  <ThinkingLine
                    v-if="part.text.length === 0"
                    :running="isLive(message) && part.state === 'streaming'"
                  />
                  <UiTraceCollapsible
                    v-else
                    :open="
                      open[`${message.id}-${runIndex}-${index}`] ??
                      (isLive(message) && part.state === 'streaming')
                    "
                    @update:open="open[`${message.id}-${runIndex}-${index}`] = $event"
                  >
                    <UiTraceCollapsibleTrigger>
                      <ThinkingLine :running="isLive(message) && part.state === 'streaming'" />
                    </UiTraceCollapsibleTrigger>
                    <UiTraceCollapsibleContent class="whitespace-pre-wrap">
                      {{ part.text }}
                    </UiTraceCollapsibleContent>
                  </UiTraceCollapsible>
                </template>
              </template>
            </UiTrace>
            <template v-else>
              <p v-for="(part, index) in run.parts" :key="`${runIndex}-${index}`">
                {{ part.text }}
              </p>
            </template>
          </template>
        </UiMessageContent>
      </UiMessage>
    </template>
    <UiButton
      v-if="!busy"
      variant="outline"
      size="sm"
      class="mt-auto self-start"
      @click="nextMessage ? sendMessage(nextMessage) : reset()"
    >
      {{ nextMessage ? "Send message" : "Reset" }}
    </UiButton>
  </div>
</template>

<script lang="ts" setup>
  import { promiseTimeout } from "@vueuse/core";

  interface Part {
    type: "reasoning" | "text";
    text: string;
    state: "streaming" | "done";
  }

  interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    parts: Part[];
  }

  const question = "Why is the checkout deploy so slow?";
  const reasoning =
    "The build log shows install and compile finish in under a minute. Image optimization takes almost four, and it reruns on every deploy because the cache key includes the commit hash.";
  const answer =
    "Image optimization is the bottleneck. Key its cache on the lockfile and the image directory instead of the commit hash.";

  const messages = ref<ChatMessage[]>([]);
  const status = ref<"ready" | "streaming">("ready");
  const open = ref<Record<string, boolean | undefined>>({});

  const [DefineThinkingLine, ThinkingLine] = createReusableTemplate<{ running: boolean }>();

  const busy = computed(() => status.value === "streaming");
  const nextMessage = computed(() => (messages.value.length === 0 ? question : undefined));

  // Simulated streaming. Swap for `new Chat()` from `@ai-sdk/vue` in your app.
  let runId = 0;

  // Invalidate the running script on unmount so pending steps bail out.
  tryOnScopeDispose(() => {
    runId++;
  });

  async function stream(part: Part, text: string, delayMs: number, id: number) {
    for (const chunk of text.split(/(?<= )/)) {
      await promiseTimeout(delayMs);
      if (id !== runId) return false;
      part.text += chunk;
    }
    part.state = "done";
    return true;
  }

  async function sendMessage(text: string) {
    const id = ++runId;
    messages.value.push({
      id: `user-${id}`,
      role: "user",
      parts: [{ type: "text", text, state: "done" }],
    });
    messages.value.push({ id: `assistant-${id}`, role: "assistant", parts: [] });
    const message = messages.value.at(-1)!;
    status.value = "streaming";

    message.parts.push({ type: "reasoning", text: "", state: "streaming" });
    if (!(await stream(message.parts.at(-1)!, reasoning, 60, id))) return;
    await promiseTimeout(400);
    if (id !== runId) return;
    message.parts.push({ type: "text", text: "", state: "streaming" });
    if (!(await stream(message.parts.at(-1)!, answer, 20, id))) return;

    status.value = "ready";
  }

  function reset() {
    runId++;
    messages.value = [];
    open.value = {};
    status.value = "ready";
  }

  function getMessageText(message: ChatMessage) {
    return message.parts
      .filter((part) => part.type === "text")
      .map((part) => part.text)
      .join("");
  }

  function groupParts(parts: Part[]) {
    const runs: { trace: boolean; parts: Part[] }[] = [];

    for (const part of parts) {
      const trace = part.type === "reasoning";

      if (!trace && part.type !== "text") continue;

      const last = runs.at(-1);

      if (last?.trace === trace) last.parts.push(part);
      else runs.push({ trace, parts: [part] });
    }

    return runs;
  }

  function isLive(message: ChatMessage) {
    return status.value === "streaming" && message === messages.value.at(-1);
  }
</script>
```

<!-- /automd -->

::

See [Reasoning](/ai-elements/reasoning) for more examples.

## Tool

Render tool parts from the AI SDK. Map the tool part as in [Tool](/ai-elements/tool#states).

::prose-show-case

:DocsTraceToolCalls

#code

<!-- automd:file src="../../app/components/content/Docs/Trace/DocsTraceToolCalls.vue" code lang="vue" -->

```vue [DocsTraceToolCalls.vue]
<template>
  <div class="mx-auto flex min-h-72 w-full max-w-sm flex-col gap-4 py-6 text-sm">
    <template v-for="message in messages" :key="message.id">
      <UiMessage v-if="message.role === 'user'" align="end">
        <UiMessageContent>
          <UiBubble align="end" variant="muted">
            <UiBubbleContent>{{ getMessageText(message) }}</UiBubbleContent>
          </UiBubble>
        </UiMessageContent>
      </UiMessage>
      <UiMessage v-else>
        <UiMessageContent class="gap-4">
          <template v-for="(run, runIndex) in groupParts(message.parts)" :key="runIndex">
            <UiTrace v-if="run.trace">
              <template
                v-for="(part, index) in run.parts"
                :key="part.type === 'dynamic-tool' ? part.toolCallId : index"
              >
                <template v-if="part.type === 'dynamic-tool'">
                  <UiTraceCollapsible
                    v-if="part.state === 'output-available' || part.state === 'output-error'"
                  >
                    <UiTraceCollapsibleTrigger>
                      <UiTraceLine :status="part.state === 'output-error' ? 'error' : undefined">
                        <UiTraceIcon>
                          <Icon name="lucide:terminal" class="size-4" />
                        </UiTraceIcon>
                        <UiTraceTitle>
                          {{ part.state === "output-error" ? "Failed to run" : "Ran" }}
                          {{ part.input.command }}
                        </UiTraceTitle>
                      </UiTraceLine>
                    </UiTraceCollapsibleTrigger>
                    <UiTraceCollapsibleContent>
                      <UiCodeBlock size="sm">
                        <UiCodeBlockContent wrap class="max-h-64">
                          {{ part.state === "output-error" ? part.errorText : part.output?.stdout }}
                        </UiCodeBlockContent>
                      </UiCodeBlock>
                    </UiTraceCollapsibleContent>
                  </UiTraceCollapsible>
                  <UiTraceLine v-else-if="part.state === 'output-denied'">
                    <UiTraceIcon>
                      <Icon name="lucide:terminal" class="size-4" />
                    </UiTraceIcon>
                    <UiTraceTitle>Denied {{ part.input.command }}</UiTraceTitle>
                  </UiTraceLine>
                  <UiTraceLine v-else :status="isLive(message) ? 'running' : 'error'">
                    <UiTraceIcon>
                      <Icon name="lucide:terminal" class="size-4" />
                    </UiTraceIcon>
                    <UiTraceTitle>
                      {{ isLive(message) ? "Running" : "Failed to run" }} {{ part.input.command }}
                    </UiTraceTitle>
                  </UiTraceLine>
                </template>
              </template>
            </UiTrace>
            <template v-else>
              <template v-for="(part, index) in run.parts" :key="`${runIndex}-${index}`">
                <p v-if="part.type === 'text'">
                  {{ part.text }}
                </p>
              </template>
            </template>
          </template>
        </UiMessageContent>
      </UiMessage>
    </template>
    <UiButton
      v-if="!busy"
      variant="outline"
      size="sm"
      class="mt-auto self-start"
      @click="nextMessage ? sendMessage(nextMessage) : reset()"
    >
      {{ nextMessage ? "Send message" : "Reset" }}
    </UiButton>
  </div>
</template>

<script lang="ts" setup>
  import { promiseTimeout } from "@vueuse/core";

  interface TextPart {
    type: "text";
    text: string;
  }

  interface ToolPart {
    type: "dynamic-tool";
    toolCallId: string;
    input: { command: string };
    state: "input-available" | "output-available" | "output-error" | "output-denied";
    output?: { stdout: string };
    errorText?: string;
  }

  type Part = TextPart | ToolPart;

  interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    parts: Part[];
  }

  const question = "Which package managers are installed?";
  const tools = [
    { command: "node --version", stdout: "v24.18.0" },
    { command: "npm --version", stdout: "11.6.2" },
    { command: "pnpm --version", error: "command not found: pnpm" },
  ];
  const answer = "Node 24 and npm 11 are installed. pnpm is not.";

  const messages = ref<ChatMessage[]>([]);
  const status = ref<"ready" | "streaming">("ready");

  const busy = computed(() => status.value === "streaming");
  const nextMessage = computed(() => (messages.value.length === 0 ? question : undefined));

  // Simulated streaming. Swap for `new Chat()` from `@ai-sdk/vue` in your app.
  let runId = 0;

  // Invalidate the running script on unmount so pending steps bail out.
  tryOnScopeDispose(() => {
    runId++;
  });

  async function sendMessage(text: string) {
    const id = ++runId;
    messages.value.push({
      id: `user-${id}`,
      role: "user",
      parts: [{ type: "text", text }],
    });
    messages.value.push({ id: `assistant-${id}`, role: "assistant", parts: [] });
    const message = messages.value.at(-1)!;
    status.value = "streaming";

    for (const [index, tool] of tools.entries()) {
      message.parts.push({
        type: "dynamic-tool",
        toolCallId: `call-${id}-${index}`,
        input: { command: tool.command },
        state: "input-available",
      });
      const part = message.parts.at(-1) as ToolPart;
      await promiseTimeout(900);
      if (id !== runId) return;
      if (tool.error) {
        part.state = "output-error";
        part.errorText = tool.error;
      } else {
        part.state = "output-available";
        part.output = { stdout: tool.stdout! };
      }
    }

    message.parts.push({ type: "text", text: "" });
    const part = message.parts.at(-1) as TextPart;
    for (const chunk of answer.split(/(?<= )/)) {
      await promiseTimeout(20);
      if (id !== runId) return;
      part.text += chunk;
    }

    status.value = "ready";
  }

  function reset() {
    runId++;
    messages.value = [];
    status.value = "ready";
  }

  function getMessageText(message: ChatMessage) {
    return message.parts.map((part) => (part.type === "text" ? part.text : "")).join("");
  }

  function groupParts(parts: Part[]) {
    const runs: { trace: boolean; parts: Part[] }[] = [];

    for (const part of parts) {
      const trace = part.type === "dynamic-tool";

      if (!trace && part.type !== "text") continue;

      const last = runs.at(-1);

      if (last?.trace === trace) last.parts.push(part);
      else runs.push({ trace, parts: [part] });
    }

    return runs;
  }

  function isLive(message: ChatMessage) {
    return status.value === "streaming" && message === messages.value.at(-1);
  }
</script>
```

<!-- /automd -->

::

See [Tool](/ai-elements/tool) for more examples.

## Accessibility

`Trace` adds no roles of its own. Each line gets its semantics from the element that wraps it.

- A `UiTraceLine` on its own is a `span`. It is read as text and is not a tab stop.
- Wrap it in a `UiTraceCollapsibleTrigger` and it becomes a button with `aria-expanded`. Wrap it in a link, or in the trigger for a dialog or sheet, and it takes the keyboard and focus behavior of that element.
- `UiTraceIcon` is hidden from assistive tech, so `UiTraceTitle` is the accessible name. Write it as a sentence that says what happened, like "Edited Trace.vue", not just "Trace.vue".
- When a link opens a new tab, add "(opens in a new tab)" to the title with `sr-only`.
- Status is shown with color and motion, so put it in the title too. Write "Running pnpm build" while it runs and "Failed to run pnpm build" when it errors.
- The shimmer on a running title stops when the reader prefers reduced motion. The title still says what is happening.
- `UiTraceCollapsibleContent` mutes its text. If you put a block with a muted background inside it, give the block `text-foreground` so it keeps its contrast. [Code Block](/components/code-block) sets its own text color.

## API Reference

Every part accepts `class`, and the parts built on a Reka `Primitive` also accept `as` and `as-child`.

### UiTrace

A list of rows. It also styles any trigger or link that wraps a `UiTraceLine`.

| Prop       | Type                  | Default | Description                              |
| ---------- | --------------------- | ------- | ---------------------------------------- |
| `as`       | `string \| Component` | `"div"` | The element to render.                   |
| `as-child` | `boolean`             | `false` | Render the child instead of an element.  |
| `class`    | `string`              | -       | Additional classes to apply to the list. |

### UiTraceLine

One line: an icon and a title. It is a span, so it is not a button or a tab stop. Wrap it in a trigger or a link to make it do something.

| Prop       | Type                                                            | Default     | Description                                        |
| ---------- | --------------------------------------------------------------- | ----------- | -------------------------------------------------- |
| `status`   | `"running" \| "error" \| "pending" \| "success" \| "warning"`   | -           | The state of the work the line reports.            |
| `size`     | `"default" \| "sm"`                                             | `"default"` | The text size of the line.                         |
| `as`       | `string \| Component`                                           | `"span"`    | The element to render.                             |
| `as-child` | `boolean`                                                       | `false`     | Render the child instead of an element.            |
| `class`    | `string`                                                        | -           | Additional classes to apply to the line.           |

### UiTraceIcon

A decorative icon slot, hidden from assistive tech. Before the title it names the action; after it, it is the indicator.

| Prop       | Type                  | Default  | Description                                                     |
| ---------- | --------------------- | -------- | --------------------------------------------------------------- |
| `name`     | `string`              | -        | An Iconify icon name. Used when the default slot is empty.      |
| `as`       | `string \| Component` | `"span"` | The element to render.                                          |
| `class`    | `string`              | -        | Additional classes to apply to the icon slot.                   |

### UiTraceTitle

One sentence on one line. It truncates and shimmers while the line is running.

| Prop    | Type                  | Default  | Description                               |
| ------- | --------------------- | -------- | ----------------------------------------- |
| `as`    | `string \| Component` | `"span"` | The element to render.                    |
| `class` | `string`              | -        | Additional classes to apply to the title. |

### UiTraceDescription

Secondary text after the title, such as a count or a duration. It does not truncate.

| Prop    | Type                  | Default  | Description                                     |
| ------- | --------------------- | -------- | ----------------------------------------------- |
| `as`    | `string \| Component` | `"span"` | The element to render.                          |
| `class` | `string`              | -        | Additional classes to apply to the description. |

### UiTraceCollapsible

A row that expands. It accepts the props of [`UiCollapsible`](/components/collapsible).

| Prop / Event      | Type                      | Default | Description                                                                                   |
| ----------------- | ------------------------- | ------- | --------------------------------------------------------------------------------------------- |
| `open`            | `boolean`                 | -       | The controlled open state. Use with `v-model:open`.                                           |
| `default-open`    | `boolean`                 | `false` | Whether the row starts open.                                                                  |
| `unmount-on-hide` | `boolean`                 | `true`  | Set to `false` to keep the detail mounted while closed, so nested rows keep their open state. |
| `update:open`     | `(open: boolean) => void` | -       | Emitted when the open state changes.                                                          |
| `class`           | `string`                  | -       | Additional classes to apply to the row.                                                       |

The default slot receives `{ open }`.

### UiTraceCollapsibleTrigger

The button that opens and closes the row. Put a `UiTraceLine` inside it. It adds a chevron after the line.

| Prop           | Type      | Default                  | Description                                 |
| -------------- | --------- | ------------------------ | ------------------------------------------- |
| `chevron`      | `boolean` | `true`                   | Show the trailing chevron.                  |
| `chevron-icon` | `string`  | `"lucide:chevron-right"` | The Iconify icon used for the chevron.      |
| `class`        | `string`  | -                        | Additional classes to apply to the trigger. |

| Slot      | Description                                                   |
| --------- | ------------------------------------------------------------- |
| `default` | The trace line.                                               |
| `chevron` | Replaces the chevron. Not rendered when `chevron` is `false`. |

### UiTraceCollapsibleContent

The detail of a row that expands.

| Prop          | Type      | Default | Description                                                                |
| ------------- | --------- | ------- | -------------------------------------------------------------------------- |
| `bordered`    | `boolean` | `true`  | Show the vertical rule and indent on the left of the content.              |
| `force-mount` | `boolean` | `false` | Always render the content, for use with your own animation library.        |
| `class`       | `string`  | -       | Additional classes to apply to the wrapper inside the animated container.  |

::prose-callout{variant="info" title="Keep nested rows open"}
To keep the detail mounted while closed, so nested rows keep their open state, set `:unmount-on-hide="false"` on the parent `UiTraceCollapsible`.
::
