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
