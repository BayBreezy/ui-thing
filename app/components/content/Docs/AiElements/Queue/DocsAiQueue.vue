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
