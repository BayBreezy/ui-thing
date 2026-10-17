---
title: Plan
description: Displays the steps the agent plans to take, and how far it has got.
label: New
---

::prose-show-case

:DocsAiPlan

#code

<!-- automd:file src="../../app/components/content/Docs/AiElements/Plan/DocsAiPlan.vue" code lang="vue" -->

```vue [DocsAiPlan.vue]
<template>
  <DefinePlanRow v-slot="{ plan, streaming }">
    <UiTraceCollapsible default-open>
      <UiTraceCollapsibleTrigger>
        <UiTraceLine
          :status="streaming && countDone(plan) < plan.steps.length ? 'running' : undefined"
        >
          <UiTraceIcon>
            <Icon name="lucide:route" class="size-4" />
          </UiTraceIcon>
          <UiTraceTitle>{{ plan.title }}</UiTraceTitle>
          <UiTraceDescription>
            {{ countDone(plan) }} of {{ plan.steps.length }} done
          </UiTraceDescription>
        </UiTraceLine>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent>
        <UiTrace>
          <UiTraceLine
            v-for="step in plan.steps"
            :key="step.title"
            :status="
              step.status === 'pending'
                ? 'pending'
                : streaming && step.status === 'running'
                  ? 'running'
                  : undefined
            "
          >
            <UiTraceIcon>
              <Icon v-if="step.status === 'done'" name="lucide:circle-check" class="size-4" />
              <Icon v-else-if="step.status === 'running'" name="lucide:circle-dot" class="size-4" />
              <Icon v-else name="lucide:circle" class="size-4" />
            </UiTraceIcon>
            <UiTraceTitle>{{ step.title }}</UiTraceTitle>
          </UiTraceLine>
        </UiTrace>
      </UiTraceCollapsibleContent>
    </UiTraceCollapsible>
  </DefinePlanRow>

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
          <UiTrace v-if="getPlan(message)">
            <PlanRow :plan="getPlan(message)!" :streaming="isStreaming(message)" />
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

  interface PlanData {
    title: string;
    steps: { title: string; status: "done" | "running" | "pending" }[];
  }

  interface PlanPart {
    type: "data-plan";
    id: string;
    data: PlanData;
  }

  interface TextPart {
    type: "text";
    text: string;
  }

  interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    parts: (PlanPart | TextPart)[];
  }

  const STEPS = [
    "Install @base-ui/react",
    "Replace the Radix imports",
    "Rename asChild to render",
    "Run the type checker",
  ];

  const QUESTION = "Migrate the dialog components to Base UI.";
  const ANSWER = "Migrated Dialog and AlertDialog. The type checker passes.";

  function planAt(current: number): PlanData {
    return {
      title: "Plan: migrate to Base UI",
      steps: STEPS.map((title, index) => ({
        title,
        status: index < current ? "done" : index === current ? "running" : "pending",
      })),
    };
  }

  function transcript(): ChatMessage[] {
    return [
      { id: "user-0", role: "user", parts: [{ type: "text", text: QUESTION }] },
      {
        id: "assistant-0",
        role: "assistant",
        parts: [
          { type: "data-plan", id: "plan", data: planAt(STEPS.length) },
          { type: "text", text: ANSWER },
        ],
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

  function getPlan(message: ChatMessage) {
    return message.parts.find((part): part is PlanPart => part.type === "data-plan")?.data;
  }

  function isStreaming(message: ChatMessage) {
    return busy.value && message === messages.value.at(-1);
  }

  function countDone(plan: PlanData) {
    return plan.steps.filter((step) => step.status === "done").length;
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

    // A data part with the same id replaces the previous one in place.
    const plan = reactive<PlanPart>({ type: "data-plan", id: "plan", data: planAt(0) });
    message.parts.push(plan);
    for (let index = 1; index <= STEPS.length; index++) {
      if (!(await sleep(1200))) return;
      plan.data = planAt(index);
    }

    const text = reactive<TextPart>({ type: "text", text: "" });
    message.parts.push(text);
    if (!(await streamInto(text, ANSWER, 20))) return;
    status.value = "ready";
  }

  const [DefinePlanRow, PlanRow] = createReusableTemplate<{
    plan: PlanData;
    streaming: boolean;
  }>();
</script>
```

<!-- /automd -->

::

Plan is the list of steps the agent decides on before it starts, such as the steps of a migration. Each step is done, running or pending, and the title counts how many are done.

Plan is built with `UiTrace` with a `UiTraceCollapsible` for the plan.

When the steps are not known up front, use [Task](/ai-elements/task#task-or-plan) instead.

## Installation

Plan is built with the [Trace](/components/trace) component.

:prose-pm-x{command="ui-thing@latest add trace"}

## Usage

```vue
<template>
  <UiTrace>
    <UiTraceCollapsible default-open>
      <UiTraceCollapsibleTrigger>
        <UiTraceLine status="running">
          <UiTraceIcon>
            <UiIcon name="lucide:route" />
          </UiTraceIcon>
          <UiTraceTitle>Plan: migrate to Base UI</UiTraceTitle>
          <UiTraceDescription>2 of 5 done</UiTraceDescription>
        </UiTraceLine>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent>
        <UiTrace>
          <UiTraceLine>
            <UiTraceIcon>
              <UiIcon name="lucide:circle-check" />
            </UiTraceIcon>
            <UiTraceTitle>Replace the Radix imports</UiTraceTitle>
          </UiTraceLine>
          <UiTraceLine status="running">
            <UiTraceIcon>
              <UiIcon name="lucide:circle-dot" />
            </UiTraceIcon>
            <UiTraceTitle>Rename asChild to render</UiTraceTitle>
          </UiTraceLine>
          <UiTraceLine status="pending">
            <UiTraceIcon>
              <UiIcon name="lucide:circle" />
            </UiTraceIcon>
            <UiTraceTitle>Run the type checker</UiTraceTitle>
          </UiTraceLine>
        </UiTrace>
      </UiTraceCollapsibleContent>
    </UiTraceCollapsible>
  </UiTrace>
</template>
```

## Details

Put a description above the steps, inside `UiTraceCollapsibleContent`.

::prose-show-case

:DocsAiPlanDescription

#code

<!-- automd:file src="../../app/components/content/Docs/AiElements/Plan/DocsAiPlanDescription.vue" code lang="vue" -->

```vue [DocsAiPlanDescription.vue]
<template>
  <UiTrace class="mx-auto max-w-sm">
    <UiTraceCollapsible default-open>
      <UiTraceCollapsibleTrigger>
        <UiTraceLine>
          <UiTraceIcon>
            <Icon name="lucide:route" class="size-4" />
          </UiTraceIcon>
          <UiTraceTitle>Plan: add dark mode</UiTraceTitle>
          <UiTraceDescription>1 of {{ steps.length }} done</UiTraceDescription>
        </UiTraceLine>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent class="flex flex-col gap-3">
        <p>
          Store the theme in a cookie so the server renders the right one and the page does not
          flash on load.
        </p>
        <UiTrace>
          <UiTraceLine
            v-for="(step, index) in steps"
            :key="step"
            :status="index > 0 ? 'pending' : undefined"
          >
            <UiTraceIcon>
              <Icon v-if="index === 0" name="lucide:circle-check" class="size-4" />
              <Icon v-else name="lucide:circle" class="size-4" />
            </UiTraceIcon>
            <UiTraceTitle>{{ step }}</UiTraceTitle>
          </UiTraceLine>
        </UiTrace>
      </UiTraceCollapsibleContent>
    </UiTraceCollapsible>
  </UiTrace>
</template>

<script lang="ts" setup>
  const steps = [
    "Add a dark variant to the theme tokens",
    "Read the theme from a cookie on the server",
    "Add a toggle to the settings page",
    "Check contrast on the charts",
  ];
</script>
```

<!-- /automd -->

::

## AI SDK

Stream the plan as a data part with a fixed `id`. The AI SDK replaces a data part with the same `id`, so it updates in place.

```ts
const stream = createUIMessageStream({
  execute: async ({ writer }) => {
    writer.write({ type: "data-plan", id: "plan", data: { title, steps } });
  },
});
```

```ts
const plan = computed(() => props.message.parts.find((part) => part.type === "data-plan"));
```

## API Reference

See [Trace](/components/trace#api-reference).
