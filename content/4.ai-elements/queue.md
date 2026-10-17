---
title: Queue
description: Displays the agent's todo list, split into what is left and what is done.
label: New
---

::prose-show-case

:DocsAiQueue

#code

<!-- automd:file src="../../app/components/content/Docs/AiElements/Queue/DocsAiQueue.vue" code lang="vue" -->

```vue [DocsAiQueue.vue]
<template>
  <div class="mx-auto flex min-h-72 w-full max-w-sm flex-col gap-4 py-6 text-sm">
    <UiMessage align="end">
      <UiMessageContent>
        <UiBubble align="end" variant="muted">
          <UiBubbleContent>{{ QUESTION }}</UiBubbleContent>
        </UiBubble>
      </UiMessageContent>
    </UiMessage>
    <UiMessage v-if="todos || text">
      <UiMessageContent class="gap-4">
        <UiTrace v-if="todos">
          <UiTraceCollapsible v-for="section in sections" :key="section.id" default-open>
            <UiTraceCollapsibleTrigger>
              <UiTraceLine>
                <UiTraceIcon>
                  <Icon :name="section.icon" class="size-4" />
                </UiTraceIcon>
                <UiTraceTitle>{{ section.title }}</UiTraceTitle>
              </UiTraceLine>
            </UiTraceCollapsibleTrigger>
            <UiTraceCollapsibleContent>
              <UiTrace>
                <UiTraceLine
                  v-for="todo in section.todos"
                  :key="todo.content"
                  :status="busy && todo.status === 'in_progress' ? 'running' : undefined"
                >
                  <UiTraceIcon>
                    <Icon
                      v-if="todo.status === 'completed'"
                      name="lucide:circle-check"
                      class="size-4"
                    />
                    <Icon
                      v-else-if="todo.status === 'in_progress'"
                      name="lucide:circle-dot"
                      class="size-4"
                    />
                    <Icon v-else name="lucide:circle" class="size-4" />
                  </UiTraceIcon>
                  <UiTraceTitle>{{ todo.content }}</UiTraceTitle>
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

  interface Todo {
    content: string;
    status: "pending" | "in_progress" | "completed";
  }

  const QUESTION = "Add dark mode to the settings page.";
  const ANSWER = "Dark mode is in. The toggle is under Settings, Appearance.";

  const TODOS = [
    "Add a dark variant to the theme tokens",
    "Read the theme from a cookie",
    "Add a toggle to the settings page",
    "Check contrast on the charts",
  ];

  function todosAt(current: number): Todo[] {
    return TODOS.map((content, index) => ({
      content,
      status: index < current ? "completed" : index === current ? "in_progress" : "pending",
    }));
  }

  // The last writeTodos call. Each call sends the whole list.
  const todos = ref<Todo[] | undefined>(todosAt(TODOS.length));
  const text = ref(ANSWER);
  const busy = ref(false);

  const sections = computed(() => {
    const list = todos.value ?? [];
    const pending = list.filter((todo) => todo.status !== "completed");
    const completed = list.filter((todo) => todo.status === "completed");

    return [
      { id: "pending", icon: "lucide:list-todo", title: `${pending.length} to do`, todos: pending },
      {
        id: "completed",
        icon: "lucide:list-checks",
        title: `${completed.length} completed`,
        todos: completed,
      },
    ].filter((section) => section.todos.length > 0);
  });

  // Unmounting bumps `run`, so a running script stops at its next wait.
  let run = 0;
  tryOnScopeDispose(() => run++);

  async function wait(ms: number, id: number) {
    await promiseTimeout(ms);
    return id === run;
  }

  async function replay() {
    const id = ++run;
    busy.value = true;
    todos.value = undefined;
    text.value = "";

    for (let index = 0; index < TODOS.length; index++) {
      todos.value = todosAt(index);
      if (!(await wait(1400, id))) return;
    }
    todos.value = todosAt(TODOS.length);

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

Queue is the agent's todo list. Todos sit in two sections, To do and Completed, and the icon on each todo shows its status. The agent updates the list as it works, so a todo moves from one section to the other when it is done.

Queue is built with `UiTrace` with a `UiTraceCollapsible` for each section.

## Installation

Queue is built with the [Trace](/components/trace) component.

:prose-pm-x{command="ui-thing@latest add trace"}

## Usage

```vue
<template>
  <UiTrace>
    <UiTraceCollapsible default-open>
      <UiTraceCollapsibleTrigger>
        <UiTraceLine>
          <UiTraceIcon>
            <UiIcon name="lucide:list-todo" />
          </UiTraceIcon>
          <UiTraceTitle>2 to do</UiTraceTitle>
        </UiTraceLine>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent>
        <UiTrace>
          <UiTraceLine>
            <UiTraceIcon>
              <UiIcon name="lucide:circle" />
            </UiTraceIcon>
            <UiTraceTitle>Update the registry snapshots</UiTraceTitle>
          </UiTraceLine>
          <UiTraceLine>
            <UiTraceIcon>
              <UiIcon name="lucide:circle" />
            </UiTraceIcon>
            <UiTraceTitle>Add tests for the combobox</UiTraceTitle>
          </UiTraceLine>
        </UiTrace>
      </UiTraceCollapsibleContent>
    </UiTraceCollapsible>
    <UiTraceCollapsible>
      <UiTraceCollapsibleTrigger>
        <UiTraceLine>
          <UiTraceIcon>
            <UiIcon name="lucide:list-checks" />
          </UiTraceIcon>
          <UiTraceTitle>1 completed</UiTraceTitle>
        </UiTraceLine>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent>
        <UiTrace>
          <UiTraceLine>
            <UiTraceIcon>
              <UiIcon name="lucide:circle-check" />
            </UiTraceIcon>
            <UiTraceTitle>Add a changeset</UiTraceTitle>
          </UiTraceLine>
        </UiTrace>
      </UiTraceCollapsibleContent>
    </UiTraceCollapsible>
  </UiTrace>
</template>
```

## Descriptions

A todo with a description is a `UiTraceCollapsible` that opens to show it. A todo without one stays a `UiTraceLine`.

::prose-show-case

:DocsAiQueueDescriptions

#code

<!-- automd:file src="../../app/components/content/Docs/AiElements/Queue/DocsAiQueueDescriptions.vue" code lang="vue" -->

```vue [DocsAiQueueDescriptions.vue]
<template>
  <UiTrace class="mx-auto max-w-sm">
    <UiTraceCollapsible
      v-for="section in sections"
      :key="section.id"
      :default-open="section.defaultOpen"
      :unmount-on-hide="false"
    >
      <UiTraceCollapsibleTrigger>
        <UiTraceLine>
          <UiTraceIcon>
            <Icon :name="section.icon" class="size-4" />
          </UiTraceIcon>
          <UiTraceTitle>{{ section.title }}</UiTraceTitle>
        </UiTraceLine>
      </UiTraceCollapsibleTrigger>
      <UiTraceCollapsibleContent>
        <UiTrace>
          <template v-for="todo in section.todos" :key="todo.title">
            <UiTraceCollapsible v-if="todo.description">
              <UiTraceCollapsibleTrigger>
                <UiTraceLine>
                  <UiTraceIcon>
                    <Icon v-if="todo.done" name="lucide:circle-check" class="size-4" />
                    <Icon v-else name="lucide:circle" class="size-4" />
                  </UiTraceIcon>
                  <UiTraceTitle>{{ todo.title }}</UiTraceTitle>
                </UiTraceLine>
              </UiTraceCollapsibleTrigger>
              <UiTraceCollapsibleContent>
                {{ todo.description }}
              </UiTraceCollapsibleContent>
            </UiTraceCollapsible>
            <UiTraceLine v-else>
              <UiTraceIcon>
                <Icon v-if="todo.done" name="lucide:circle-check" class="size-4" />
                <Icon v-else name="lucide:circle" class="size-4" />
              </UiTraceIcon>
              <UiTraceTitle>{{ todo.title }}</UiTraceTitle>
            </UiTraceLine>
          </template>
        </UiTrace>
      </UiTraceCollapsibleContent>
    </UiTraceCollapsible>
  </UiTrace>
</template>

<script lang="ts" setup>
  const todos: { title: string; description?: string; done: boolean }[] = [
    {
      title: "Write the migration guide",
      description: "Cover the renamed props and the new data attributes.",
      done: true,
    },
    { title: "Add a changeset", done: true },
    {
      title: "Fix the focus ring on the select trigger",
      description: "It is clipped by overflow-hidden on the field.",
      done: false,
    },
    { title: "Update the registry snapshots", done: false },
    {
      title: "Add tests for the combobox",
      description: "Typing, clearing and keyboard selection.",
      done: false,
    },
  ];

  const sections = [
    {
      id: "pending",
      icon: "lucide:list-todo",
      title: `${todos.filter((todo) => !todo.done).length} to do`,
      todos: todos.filter((todo) => !todo.done),
      defaultOpen: true,
    },
    {
      id: "completed",
      icon: "lucide:list-checks",
      title: `${todos.filter((todo) => todo.done).length} completed`,
      todos: todos.filter((todo) => todo.done),
      defaultOpen: false,
    },
  ];
</script>
```

<!-- /automd -->

::

```vue
<template>
  <UiTraceCollapsible>
    <UiTraceCollapsibleTrigger>
      <UiTraceLine>
        <UiTraceIcon>
          <CircleIcon />
        </UiTraceIcon>
        <UiTraceTitle>Fix the focus ring on the select trigger</UiTraceTitle>
      </UiTraceLine>
    </UiTraceCollapsibleTrigger>
    <UiTraceCollapsibleContent>
      It is clipped by overflow-hidden on the field.
    </UiTraceCollapsibleContent>
  </UiTraceCollapsible>
</template>
```

## AI SDK

The agent writes its todos with a tool, `writeTodos` in this example. Each call sends the whole list, so render the last call and skip one whose input is still streaming.

```ts
const todos = message.parts
  .filter((part) => part.type === "tool-writeTodos")
  .filter((part) => part.state !== "input-streaming")
  .at(-1)?.input?.todos;
```

Map each todo status to a section, an icon and a `UiTraceLine` status. Set `"running"` on the todo in progress only while the chat streams, so its title stops shimmering when the agent stops.

| Todo status   | Section   | Icon              | `UiTraceLine` status                 |
| ------------- | --------- | ----------------- | ---------------------------------- |
| `pending`     | To do     | `CircleIcon`      | none                               |
| `in_progress` | To do     | `CircleDotIcon`   | `"running"` while the chat streams |
| `completed`   | Completed | `CircleCheckIcon` | none                               |

## API Reference

See [Trace](/components/trace#api-reference).
