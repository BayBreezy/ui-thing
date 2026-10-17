---
title: Tool
description: Displays a tool call the agent makes, from input to output.
label: New
---

::prose-show-case

:DocsAiTool

#code

<!-- automd:file src="../../app/components/content/Docs/AiElements/Tool/DocsAiTool.vue" code lang="vue" -->

```vue [DocsAiTool.vue]
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
          <UiTrace v-if="getTools(message).length > 0">
            <template v-for="part in getTools(message)" :key="part.toolCallId">
              <UiTraceCollapsible
                v-if="part.state === 'output-available' || part.state === 'output-error'"
                :default-open="initial && part.state === 'output-error'"
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
              <UiTraceLine v-else :status="isStreaming(message) ? 'running' : 'error'">
                <UiTraceIcon>
                  <Icon name="lucide:terminal" class="size-4" />
                </UiTraceIcon>
                <UiTraceTitle>
                  {{ isStreaming(message) ? "Running" : "Failed to run" }} {{ part.input.command }}
                </UiTraceTitle>
              </UiTraceLine>
            </template>
          </UiTrace>
          <p v-if="getText(message)">
            {{ getText(message) }}
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

  interface ToolPart {
    type: "tool-runCommand";
    toolCallId: string;
    state: "input-available" | "output-available" | "output-error";
    input: { command: string };
    output?: { stdout: string };
    errorText?: string;
  }

  interface TextPart {
    type: "text";
    text: string;
  }

  interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    parts: (ToolPart | TextPart)[];
  }

  const QUESTION = "Which package managers are installed?";
  const ANSWER = "Node 24 and npm 11 are installed. pnpm is not.";

  // The commands the agent runs, in order, with their result.
  const SCRIPT: ({ command: string; stdout: string } | { command: string; error: string })[] = [
    { command: "node --version", stdout: "v24.18.0" },
    { command: "npm --version", stdout: "11.6.2" },
    { command: "pnpm --version", error: "command not found: pnpm" },
  ];

  function finish(part: ToolPart, step: (typeof SCRIPT)[number]) {
    if ("error" in step) {
      part.state = "output-error";
      part.errorText = step.error;
    } else {
      part.state = "output-available";
      part.output = { stdout: step.stdout };
    }
    return part;
  }

  function transcript(): ChatMessage[] {
    return [
      { id: "user-0", role: "user", parts: [{ type: "text", text: QUESTION }] },
      {
        id: "assistant-0",
        role: "assistant",
        parts: [
          ...SCRIPT.map((step, index) =>
            finish(
              {
                type: "tool-runCommand",
                toolCallId: `call-0-${index}`,
                state: "input-available",
                input: { command: step.command },
              },
              step
            )
          ),
          { type: "text", text: ANSWER },
        ],
      },
    ];
  }

  const messages = ref<ChatMessage[]>(transcript());
  const status = ref<"ready" | "submitted" | "streaming">("ready");
  const busy = computed(() => status.value !== "ready");

  // The finished transcript starts with the failed call open.
  const initial = ref(true);

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

  function getTools(message: ChatMessage) {
    return message.parts.filter((part): part is ToolPart => part.type === "tool-runCommand");
  }

  function isStreaming(message: ChatMessage) {
    return busy.value && message === messages.value.at(-1);
  }

  async function replay() {
    const id = ++run;
    initial.value = false;
    messages.value = [
      { id: `user-${id}`, role: "user", parts: [{ type: "text", text: QUESTION }] },
    ];
    status.value = "submitted";
    if (!(await sleep(300))) return;

    const message = reactive<ChatMessage>({ id: `assistant-${id}`, role: "assistant", parts: [] });
    messages.value.push(message);
    status.value = "streaming";

    for (const [index, step] of SCRIPT.entries()) {
      const part = reactive<ToolPart>({
        type: "tool-runCommand",
        toolCallId: `call-${id}-${index}`,
        state: "input-available",
        input: { command: step.command },
      });
      message.parts.push(part);
      if (!(await sleep(900))) return;
      finish(part, step);
    }

    const text = reactive<TextPart>({ type: "text", text: "" });
    message.parts.push(text);
    if (!(await streamInto(text, ANSWER, 20))) return;
    status.value = "ready";
  }
</script>
```

<!-- /automd -->

::

Tool is a tool call the agent makes, such as running a command or reading a file. The line follows the call from input to output, including errors and calls that wait for approval.

Tool is built with `UiTrace` with a `UiTraceCollapsible` for each call that has output.

## Installation

Tool is built with the [Trace](/components/trace) and [Code Block](/components/code-block) components.

:prose-pm-x{command="ui-thing@latest add trace code-block"}

## Usage

```vue
<template>
  <UiTrace>
    <UiTraceCollapsible>
      <UiTraceCollapsibleTrigger>
        <UiTraceLine>
          <UiTraceIcon>
            <UiIcon name="lucide:terminal" />
          </UiTraceIcon>
          <UiTraceTitle>Ran git status --short</UiTraceTitle>
        </UiTraceLine>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent>
        <UiCodeBlock size="sm">
          <UiCodeBlockContent wrap class="max-h-64">
            {{ output }}
          </UiCodeBlockContent>
        </UiCodeBlock>
      </UiTraceCollapsibleContent>
    </UiTraceCollapsible>
  </UiTrace>
</template>
```

## States

Trace does not read tool parts. Map each part's `state` to a `status` and a title.

::prose-show-case

:DocsAiToolStates

#code

<!-- automd:file src="../../app/components/content/Docs/AiElements/Tool/DocsAiToolStates.vue" code lang="vue" -->

```vue [DocsAiToolStates.vue]
<template>
  <UiTrace class="mx-auto max-w-sm">
    <UiTraceCollapsible>
      <UiTraceCollapsibleTrigger>
        <UiTraceLine>
          <UiTraceIcon>
            <Icon name="lucide:terminal" class="size-4" />
          </UiTraceIcon>
          <UiTraceTitle>Ran git status --short</UiTraceTitle>
        </UiTraceLine>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent>
        <UiCodeBlock size="sm">
          <UiCodeBlockContent wrap class="max-h-64">
            {{ status }}
          </UiCodeBlockContent>
        </UiCodeBlock>
      </UiTraceCollapsibleContent>
    </UiTraceCollapsible>
    <UiTraceCollapsible>
      <UiTraceCollapsibleTrigger>
        <UiTraceLine status="error">
          <UiTraceIcon>
            <Icon name="lucide:terminal" class="size-4" />
          </UiTraceIcon>
          <UiTraceTitle>Failed to run pnpm dev</UiTraceTitle>
        </UiTraceLine>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent>
        <UiCodeBlock size="sm">
          <UiCodeBlockContent wrap class="max-h-64">
            Command timed out after 120 seconds.
          </UiCodeBlockContent>
        </UiCodeBlock>
      </UiTraceCollapsibleContent>
    </UiTraceCollapsible>
    <UiTraceLine>
      <UiTraceIcon>
        <Icon name="lucide:terminal" class="size-4" />
      </UiTraceIcon>
      <UiTraceTitle>Denied rm -rf dist</UiTraceTitle>
    </UiTraceLine>
    <UiTraceLine status="running">
      <UiTraceIcon>
        <Icon name="lucide:terminal" class="size-4" />
      </UiTraceIcon>
      <UiTraceTitle>Running pnpm test</UiTraceTitle>
    </UiTraceLine>
  </UiTrace>
</template>

<script lang="ts" setup>
  const status = ` M server/api/chat.post.ts
 M components/Chat.vue`;
</script>
```

<!-- /automd -->

::

| Tool part state                                           | `status`                             | Title                                                                |
| --------------------------------------------------------- | ------------------------------------ | -------------------------------------------------------------------- |
| `input-streaming`, `input-available`                      | `"running"` while the chat streams   | Running …                                                            |
| `input-streaming`, `input-available` after the chat stops | `"error"`                            | Failed to run …                                                      |
| `approval-requested`                                      | -                                    | Not a line. An `UiItem` outside `UiTrace` with Approve and Deny buttons. |
| `approval-responded`                                      | `"running"` if approved, none if not | Running … if approved, Denied … if not                               |
| `output-available`                                        | none                                 | Ran …                                                                |
| `output-error`                                            | `"error"`                            | Failed to run …                                                      |
| `output-denied`                                           | none                                 | Denied …                                                             |

A tool is a plain `UiTraceLine` while it runs, and a `UiTraceCollapsible` once its output arrives.

```vue
<template>
  <UiTraceLine v-if="denied">
    <UiTraceIcon>
      <UiIcon name="lucide:terminal" />
    </UiTraceIcon>
    <UiTraceTitle>Denied {{ command }}</UiTraceTitle>
  </UiTraceLine>
  <UiTraceCollapsible
    v-else-if="part.state === 'output-available' || part.state === 'output-error'"
  >
    <UiTraceCollapsibleTrigger>
      <UiTraceLine :status="failed ? 'error' : undefined">
        <UiTraceIcon>
          <UiIcon name="lucide:terminal" />
        </UiTraceIcon>
        <UiTraceTitle>{{ failed ? "Failed to run" : "Ran" }} {{ command }}</UiTraceTitle>
      </UiTraceLine>
    </UiTraceCollapsibleTrigger>
    <UiTraceCollapsibleContent>
      <UiCodeBlock size="sm">
        <UiCodeBlockContent wrap class="max-h-64">
          {{ part.state === "output-error" ? part.errorText : part.output.stdout }}
        </UiCodeBlockContent>
      </UiCodeBlock>
    </UiTraceCollapsibleContent>
  </UiTraceCollapsible>
  <UiTraceLine v-else :status="streaming ? 'running' : 'error'">
    <UiTraceIcon>
      <UiIcon name="lucide:terminal" />
    </UiTraceIcon>
    <UiTraceTitle>{{ streaming ? "Running" : "Failed to run" }} {{ command }}</UiTraceTitle>
  </UiTraceLine>
</template>

<script lang="ts" setup>
  const props = defineProps<{
    part: ToolPart;
    streaming: boolean;
  }>();

  const command = computed(() => props.part.input?.command);
  const denied = computed(
    () =>
      props.part.state === "output-denied" ||
      (props.part.state === "approval-responded" && !props.part.approval.approved)
  );
  const failed = computed(() => props.part.state === "output-error");
</script>
```

```vue
<template>
  <UiTrace>
    <ToolLine
      v-for="part in message.parts.filter((part) => part.type === 'tool-runCommand')"
      :key="part.toolCallId"
      :part="part"
      :streaming="streaming"
    />
  </UiTrace>
</template>
```

A tool that runs on the client stays `input-available` after the chat stops until you call `addToolOutput`. Treat it as waiting, not failed.

## Output in a Sheet

For long output, wrap the `UiTraceLine` in a `UiSheetTrigger` and show the output in the sheet.

::prose-show-case

:DocsAiToolSheet

#code

<!-- automd:file src="../../app/components/content/Docs/AiElements/Tool/DocsAiToolSheet.vue" code lang="vue" -->

```vue [DocsAiToolSheet.vue]
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
          <template v-for="(part, index) in message.parts" :key="index">
            <p v-if="part.type === 'text'">
              {{ part.text }}
            </p>
            <UiTrace v-else-if="part.state !== 'output-available'">
              <UiTraceLine :status="isStreaming(message) ? 'running' : 'error'">
                <UiTraceIcon>
                  <Icon name="lucide:file-text" class="size-4" />
                </UiTraceIcon>
                <UiTraceTitle>
                  {{ isStreaming(message) ? "Reading" : "Failed to read" }} {{ part.input.path }}
                </UiTraceTitle>
              </UiTraceLine>
            </UiTrace>
            <UiTrace v-else-if="part.output">
              <UiSheet>
                <UiSheetTrigger>
                  <UiTraceLine>
                    <UiTraceIcon>
                      <Icon name="lucide:file-text" class="size-4" />
                    </UiTraceIcon>
                    <UiTraceTitle>Read {{ part.output.path }}</UiTraceTitle>
                    <UiTraceIcon>
                      <Icon name="lucide:chevron-right" class="size-4" />
                    </UiTraceIcon>
                  </UiTraceLine>
                </UiSheetTrigger>
                <UiSheetContent>
                  <UiSheetHeader>
                    <UiSheetTitle class="font-mono">
                      {{ part.output.path }}
                    </UiSheetTitle>
                    <UiSheetDescription>
                      {{ part.output.content.split("\n").length }} lines
                    </UiSheetDescription>
                  </UiSheetHeader>
                  <UiCodeBlock class="mx-6 mb-6 w-auto">
                    <UiCodeBlockContent line-numbers>
                      {{ part.output.content }}
                    </UiCodeBlockContent>
                  </UiCodeBlock>
                </UiSheetContent>
              </UiSheet>
            </UiTrace>
          </template>
        </UiMessageContent>
      </UiMessage>
    </template>
    <UiButton
      v-if="!busy"
      variant="outline"
      size="sm"
      class="mt-auto self-start"
      @click="messages.length === 0 ? send() : reset()"
    >
      {{ messages.length === 0 ? "Send message" : "Reset" }}
    </UiButton>
  </div>
</template>

<script lang="ts" setup>
  import { promiseTimeout } from "@vueuse/core";

  interface ToolPart {
    type: "tool-readFile";
    toolCallId: string;
    state: "input-available" | "output-available";
    input: { path: string };
    output?: { path: string; content: string };
  }

  interface TextPart {
    type: "text";
    text: string;
  }

  interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    parts: (ToolPart | TextPart)[];
  }

  const PACKAGE_JSON = `{
  "name": "acme-chat",
  "private": true,
  "dependencies": {
    "@ai-sdk/vue": "^4.0.0",
    "ai": "^7.0.0",
    "nuxt": "^4.2.0"
  }
}`;

  const QUESTION = "Which AI SDK version does this app use?";
  const ANSWER = "It uses ai 7 with @ai-sdk/vue 4.";

  const messages = ref<ChatMessage[]>([]);
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

  function isStreaming(message: ChatMessage) {
    return busy.value && message === messages.value.at(-1);
  }

  async function send() {
    messages.value = [{ id: "user", role: "user", parts: [{ type: "text", text: QUESTION }] }];
    status.value = "submitted";
    if (!(await sleep(300))) return;

    const message = reactive<ChatMessage>({ id: "assistant", role: "assistant", parts: [] });
    messages.value.push(message);
    status.value = "streaming";

    const part = reactive<ToolPart>({
      type: "tool-readFile",
      toolCallId: "call-readFile",
      state: "input-available",
      input: { path: "package.json" },
    });
    message.parts.push(part);
    if (!(await sleep(900))) return;
    part.output = { path: "package.json", content: PACKAGE_JSON };
    part.state = "output-available";

    const text = reactive<TextPart>({ type: "text", text: "" });
    message.parts.push(text);
    if (!(await streamInto(text, ANSWER, 20))) return;
    status.value = "ready";
  }

  function reset() {
    messages.value = [];
  }
</script>
```

<!-- /automd -->

::

See [Trace](/components/trace#dialog).

## Approval

A pending approval is a question for the person, not a step the agent took, so it sits outside `UiTrace` as an `UiItem`. Once the person answers, the tool goes back to being a line. See [Confirmation](/ai-elements/confirmation).

::prose-show-case

:DocsAiToolApproval

#code

<!-- automd:file src="../../app/components/content/Docs/AiElements/Tool/DocsAiToolApproval.vue" code lang="vue" -->

```vue [DocsAiToolApproval.vue]
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
          <template v-for="(part, index) in message.parts" :key="index">
            <p v-if="part.type === 'text'">
              {{ part.text }}
            </p>
            <UiTrace v-else-if="part.type === 'reasoning'">
              <UiTraceCollapsible
                :open="openState[`${message.id}-${index}`] ?? part.state === 'streaming'"
                @update:open="openState[`${message.id}-${index}`] = $event"
              >
                <UiTraceCollapsibleTrigger>
                  <UiTraceLine :status="part.state === 'streaming' ? 'running' : undefined">
                    <UiTraceIcon>
                      <Icon
                        v-if="part.state === 'streaming'"
                        name="lucide:loader-circle"
                        class="size-4 animate-spin"
                      />
                      <Icon v-else name="lucide:circle-check" class="size-4" />
                    </UiTraceIcon>
                    <UiTraceTitle>{{
                      part.state === "streaming" ? "Thinking" : "Thought"
                    }}</UiTraceTitle>
                  </UiTraceLine>
                </UiTraceCollapsibleTrigger>
                <UiTraceCollapsibleContent class="whitespace-pre-wrap">
                  {{ part.text }}
                </UiTraceCollapsibleContent>
              </UiTraceCollapsible>
            </UiTrace>
            <!-- A pending approval is a prompt, not activity, so it sits outside Trace. -->
            <UiItem v-else-if="part.state === 'approval-requested'" variant="outline" size="sm">
              <UiItemMedia variant="icon">
                <Icon name="lucide:terminal" class="size-4" />
              </UiItemMedia>
              <UiItemContent>
                <UiItemTitle>Run {{ part.input.command }}?</UiItemTitle>
                <UiItemDescription> The command runs in this project. </UiItemDescription>
              </UiItemContent>
              <UiItemActions>
                <UiButton size="sm" variant="outline" @click="respond(part, false)">
                  Deny
                </UiButton>
                <UiButton size="sm" @click="respond(part, true)"> Approve </UiButton>
              </UiItemActions>
            </UiItem>
            <UiTrace v-else>
              <UiTraceLine
                :status="
                  !isDenied(part) && part.state !== 'output-available' ? 'running' : undefined
                "
              >
                <UiTraceIcon>
                  <Icon name="lucide:terminal" class="size-4" />
                </UiTraceIcon>
                <UiTraceTitle>
                  {{
                    isDenied(part)
                      ? "Denied"
                      : part.state === "output-available"
                        ? "Ran"
                        : "Running"
                  }}
                  {{ part.input.command }}
                </UiTraceTitle>
              </UiTraceLine>
            </UiTrace>
          </template>
        </UiMessageContent>
      </UiMessage>
    </template>
    <UiButton
      v-if="!busy"
      variant="outline"
      size="sm"
      class="mt-auto self-start"
      @click="messages.length === 0 ? send() : reset()"
    >
      {{ messages.length === 0 ? "Send message" : "Reset" }}
    </UiButton>
  </div>
</template>

<script lang="ts" setup>
  import { promiseTimeout } from "@vueuse/core";

  interface ToolPart {
    type: "tool-runCommand";
    toolCallId: string;
    state: "approval-requested" | "approval-responded" | "output-available" | "output-denied";
    input: { command: string };
    approval: { id: string; approved?: boolean };
  }

  interface ReasoningPart {
    type: "reasoning";
    text: string;
    state: "streaming" | "done";
  }

  interface TextPart {
    type: "text";
    text: string;
  }

  interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    parts: (ToolPart | ReasoningPart | TextPart)[];
  }

  const QUESTION = "Clean up the build folder.";
  const REASONING =
    "The build output lives in dist. Deleting it cannot be undone, so I should ask before I run the command.";

  const messages = ref<ChatMessage[]>([]);
  const status = ref<"ready" | "submitted" | "streaming">("ready");
  const busy = computed(() => status.value !== "ready");

  // The open state of each reasoning line, once the person opens or closes it.
  const openState = ref<Record<string, boolean | undefined>>({});

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

  function isDenied(part: ToolPart) {
    return (
      part.state === "output-denied" ||
      (part.state === "approval-responded" && !part.approval.approved)
    );
  }

  async function send() {
    messages.value = [{ id: "user", role: "user", parts: [{ type: "text", text: QUESTION }] }];
    openState.value = {};
    status.value = "submitted";
    if (!(await sleep(600))) return;

    const message = reactive<ChatMessage>({ id: "assistant", role: "assistant", parts: [] });
    messages.value.push(message);
    status.value = "streaming";

    const reasoning = reactive<ReasoningPart>({ type: "reasoning", text: "", state: "streaming" });
    message.parts.push(reasoning);
    if (!(await streamInto(reasoning, REASONING, 20))) return;
    reasoning.state = "done";
    if (!(await sleep(400))) return;

    message.parts.push({
      type: "tool-runCommand",
      toolCallId: "call-runCommand",
      state: "approval-requested",
      input: { command: "rm -rf dist" },
      approval: { id: "approval-runCommand" },
    });
    status.value = "ready";
  }

  // Answers the approval, then continues the chat, like
  // `sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithApprovalResponses`.
  async function respond(part: ToolPart, approved: boolean) {
    const message = messages.value.at(-1)!;
    part.state = "approval-responded";
    part.approval.approved = approved;
    status.value = "submitted";
    if (!(await sleep(600))) return;

    status.value = "streaming";
    part.state = approved ? "output-available" : "output-denied";

    const reply = approved ? "Removed the dist folder." : "Okay, I left the dist folder in place.";
    const text = reactive<TextPart>({ type: "text", text: "" });
    message.parts.push(text);
    if (!(await streamInto(text, reply, 20))) return;
    status.value = "ready";
  }

  function reset() {
    messages.value = [];
  }
</script>
```

<!-- /automd -->

::

```vue
<template>
  <UiItem v-if="part.state === 'approval-requested'" variant="outline" size="sm">
    <UiItemMedia variant="icon">
      <TerminalIcon />
    </UiItemMedia>
    <UiItemContent>
      <UiItemTitle>Run {{ part.input.command }}?</UiItemTitle>
    </UiItemContent>
    <UiItemActions>
      <UiButton
        size="sm"
        variant="outline"
        @click="chat.addToolApprovalResponse({ id: part.approval.id, approved: false })"
      >
        Deny
      </UiButton>
      <UiButton
        size="sm"
        @click="chat.addToolApprovalResponse({ id: part.approval.id, approved: true })"
      >
        Approve
      </UiButton>
    </UiItemActions>
  </UiItem>
</template>
```

Pass `sendAutomaticallyWhen: lastAssistantMessageIsCompleteWithApprovalResponses` to the `Chat` so the chat continues once every approval has an answer.

## API Reference

See [Trace](/components/trace#api-reference).
