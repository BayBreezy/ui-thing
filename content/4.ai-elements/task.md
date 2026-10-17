---
title: Task
description: Displays the steps the agent takes, as it takes them.
label: New
---

::prose-show-case

:DocsAiTask

#code

<!-- automd:file src="../../app/components/content/Docs/AiElements/Task/DocsAiTask.vue" code lang="vue" -->

```vue [DocsAiTask.vue]
<template>
  <div class="mx-auto flex min-h-72 w-full max-w-sm flex-col gap-4 py-6 text-sm">
    <UiMessage align="end">
      <UiMessageContent>
        <UiBubble align="end" variant="muted">
          <UiBubbleContent>{{ QUESTION }}</UiBubbleContent>
        </UiBubble>
      </UiMessageContent>
    </UiMessage>
    <UiMessage v-if="rows.length > 0 || text">
      <UiMessageContent class="gap-4">
        <UiTrace v-if="rows.length > 0">
          <UiTraceCollapsible
            v-for="task in rows"
            :key="task.id"
            :open="openState[task.id] ?? task.status === 'running'"
            :unmount-on-hide="false"
            @update:open="openState[task.id] = $event"
          >
            <UiTraceCollapsibleTrigger>
              <UiTraceLine :status="task.status">
                <UiTraceIcon>
                  <Icon
                    v-if="task.status === 'running'"
                    name="lucide:loader-circle"
                    class="size-4 animate-spin"
                  />
                  <Icon
                    v-else-if="task.status === 'error'"
                    name="lucide:circle-alert"
                    class="size-4"
                  />
                  <Icon v-else name="lucide:circle-check" class="size-4" />
                </UiTraceIcon>
                <UiTraceTitle>{{ task.title }}</UiTraceTitle>
              </UiTraceLine>
            </UiTraceCollapsibleTrigger>
            <UiTraceCollapsibleContent>
              <UiTrace>
                <UiTraceLine v-for="step in task.steps" :key="step.title" :status="step.status">
                  <UiTraceTitle>{{ step.title }}</UiTraceTitle>
                </UiTraceLine>
              </UiTrace>
            </UiTraceCollapsibleContent>
          </UiTraceCollapsible>
        </UiTrace>
        <p v-if="text">
          {{ text }}
        </p>
      </UiMessageContent>
    </UiMessage>
    <UiButton v-if="!busy" variant="outline" size="sm" class="mt-auto self-start" @click="replay">
      Replay
    </UiButton>
  </div>
</template>

<script lang="ts" setup>
  import { promiseTimeout } from "@vueuse/core";

  type Status = "running" | "error" | undefined;

  interface TaskData {
    title: string;
    steps: { title: string; status: "done" | "running" | "error" }[];
  }

  const QUESTION = "Add Open Graph metadata to the home page.";
  const ANSWER =
    "Added Open Graph defaults to app/app.vue and a title, description and image for the home page in app/pages/index.vue.";

  const TASKS = [
    {
      id: "find",
      title: ["Finding the project files", "Found the project files"],
      steps: [
        ["Searching for useSeoMeta", "Searched for useSeoMeta"],
        ["Reading app/app.vue", "Read app/app.vue"],
        ["Reading app/pages/index.vue", "Read app/pages/index.vue"],
      ],
    },
    {
      id: "update",
      title: ["Updating the page metadata", "Updated the page metadata"],
      steps: [
        ["Editing app/app.vue", "Edited app/app.vue"],
        ["Editing app/pages/index.vue", "Edited app/pages/index.vue"],
      ],
    },
  ];

  function taskAt(task: (typeof TASKS)[number], done: number): TaskData {
    return {
      title: task.title[done < task.steps.length ? 0 : 1]!,
      steps: task.steps.slice(0, done + 1).map(([running, finished], index) => ({
        title: (index < done ? finished : running)!,
        status: index < done ? "done" : "running",
      })),
    };
  }

  function finalTasks() {
    return TASKS.map((task) => ({ id: task.id, data: taskAt(task, task.steps.length) }));
  }

  const tasks = ref<{ id: string; data: TaskData }[]>(finalTasks());
  const text = ref(ANSWER);
  const busy = ref(false);
  const openState = ref<Record<string, boolean>>({});

  function getStepStatus(status: TaskData["steps"][number]["status"], streaming: boolean): Status {
    if (status === "done") return undefined;

    return status === "running" && streaming ? "running" : "error";
  }

  const rows = computed(() =>
    tasks.value.map((task) => {
      const steps = task.data.steps.map((step) => ({
        title: step.title,
        status: getStepStatus(step.status, busy.value),
      }));
      const status: Status = steps.some((step) => step.status === "error")
        ? "error"
        : steps.some((step) => step.status === "running")
          ? "running"
          : undefined;

      return { id: task.id, title: task.data.title, steps, status };
    })
  );

  // Unmounting bumps `run`, so a running script stops at its next wait.
  let run = 0;
  tryOnScopeDispose(() => run++);

  async function wait(ms: number, id: number) {
    await promiseTimeout(ms);
    return id === run;
  }

  function writeTask(id: string, data: TaskData) {
    const index = tasks.value.findIndex((task) => task.id === id);
    if (index === -1) tasks.value.push({ id, data });
    else tasks.value[index] = { id, data };
  }

  async function replay() {
    const id = ++run;
    busy.value = true;
    tasks.value = [];
    text.value = "";
    openState.value = {};

    for (const task of TASKS) {
      for (let done = 0; done <= task.steps.length; done++) {
        writeTask(task.id, taskAt(task, done));
        if (!(await wait(900, id))) return;
      }
    }

    for (const word of ANSWER.split(/(?<= )/)) {
      if (!(await wait(20, id))) return;
      text.value += word;
    }

    busy.value = false;
  }
</script>
```

<!-- /automd -->

::

Task is a piece of work the agent is doing, such as finding the project files or updating a page. Each step, like a search, a read or an edit, appears under the task when the agent takes it.

Task is built with `UiTrace` with a `UiTraceCollapsible` for each task.

## Task or Plan

Both are a list of steps under a collapsible line. The difference is when the steps are known.

Use [Plan](/ai-elements/plan) when the agent decides the steps before it starts. Use Task when the steps come from the work itself, and the agent only knows the next one once it has taken the last.

|               | Plan                                   | Task                                            |
| ------------- | -------------------------------------- | ----------------------------------------------- |
| Steps         | Every step, from the start             | Each step, once the agent takes it              |
| Pending steps | Yes, waiting their turn                | None                                            |
| Title         | The goal, with progress: "2 of 4 done" | What the agent is doing, then what it did       |
| Per reply     | One plan                               | One or more tasks, each closing when it is done |

## Installation

Task is built with the [Trace](/components/trace) component.

:prose-pm-x{command="ui-thing@latest add trace"}

## Usage

```vue
<template>
  <UiTrace>
    <UiTraceCollapsible default-open :unmount-on-hide="false">
      <UiTraceCollapsibleTrigger>
        <UiTraceLine>
          <UiTraceTitle>Found the project files</UiTraceTitle>
        </UiTraceLine>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent>
        <UiTrace>
          <UiTraceLine>
            <UiTraceIcon>
              <UiIcon name="lucide:search" />
            </UiTraceIcon>
            <UiTraceTitle>Searched for app/pages/index.vue</UiTraceTitle>
          </UiTraceLine>
          <a href="/files/app/pages/index.vue">
            <UiTraceLine>
              <UiTraceIcon>
                <UiIcon name="lucide:file-text" />
              </UiTraceIcon>
              <UiTraceTitle>Read app/pages/index.vue</UiTraceTitle>
            </UiTraceLine>
          </a>
        </UiTrace>
      </UiTraceCollapsibleContent>
    </UiTraceCollapsible>
  </UiTrace>
</template>
```

## Status

Set the task's status from its steps. Write the title in the present tense while the task runs, and in the past tense once it is done.

| Steps                   | `status`    | Title                              |
| ----------------------- | ----------- | ---------------------------------- |
| A step is still running | `"running"` | Updating the page metadata         |
| A step failed           | `"error"`   | Failed to update the page metadata |
| Every step is done      | none        | Updated the page metadata          |

Put several tasks in one `UiTrace`. Keep the running task open, and close each task once it is done.

## AI SDK

Stream each task as a data part with its own `id`. The AI SDK replaces a data part with the same `id`, so writing a task again with a new step updates it in place.

```ts
const stream = createUIMessageStream({
  execute: async ({ writer }) => {
    writer.write({ type: "data-task", id: "update", data: { title, steps } });
  },
});
```

```ts
const tasks = message.parts.filter((part) => part.type === "data-task");
```

## API Reference

See [Trace](/components/trace#api-reference).
