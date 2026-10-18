<template>
  <!--
    Tasks with expandable subtasks
    Features: Parent tasks with a subtask progress bar, expand to see and tick subtasks, parent completes when every subtask is done, add subtask field and a count of remaining subtasks
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-2xl">
      <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>

      <ul class="mt-6 divide-y rounded-xl border">
        <li v-for="task in tasks" :key="task.id">
          <div class="flex items-center gap-3 px-4 py-3">
            <UiButton
              variant="ghost"
              size="icon-sm"
              class="size-7"
              :aria-expanded="expanded.includes(task.id)"
              :aria-controls="`subs-${task.id}`"
              :aria-label="`${expanded.includes(task.id) ? 'Hide' : 'Show'} subtasks of ${task.title}`"
              @click="toggle(task.id)"
            >
              <Icon
                name="lucide:chevron-right"
                class="size-4 transition-transform"
                :class="expanded.includes(task.id) ? 'rotate-90' : ''"
              />
            </UiButton>
            <UiCheckbox
              :model-value="complete(task)"
              :aria-label="`Complete ${task.title}`"
              @update:model-value="setAll(task, Boolean($event))"
            />
            <div class="min-w-0 flex-1">
              <p
                class="text-sm font-medium"
                :class="complete(task) ? 'text-muted-foreground line-through' : ''"
              >
                {{ task.title }}
              </p>
              <div class="mt-1.5 flex items-center gap-2">
                <UiProgress
                  :model-value="(doneCount(task) / Math.max(task.subtasks.length, 1)) * 100"
                  class="h-1 w-24"
                  aria-hidden="true"
                />
                <span class="text-muted-foreground text-xs tabular-nums"
                  >{{ doneCount(task) }}/{{ task.subtasks.length }} subtasks</span
                >
              </div>
            </div>
          </div>
          <div
            v-if="expanded.includes(task.id)"
            :id="`subs-${task.id}`"
            class="bg-muted/30 border-t py-1 pr-4 pl-14"
          >
            <ul>
              <li v-for="sub in task.subtasks" :key="sub.id" class="flex items-center gap-3 py-1.5">
                <UiCheckbox :id="`sub-${sub.id}`" v-model="sub.done" />
                <UiLabel
                  :for="`sub-${sub.id}`"
                  class="cursor-pointer text-sm font-normal"
                  :class="sub.done ? 'text-muted-foreground line-through' : ''"
                  >{{ sub.title }}</UiLabel
                >
              </li>
            </ul>
            <form class="flex items-center gap-2 py-1.5" @submit.prevent="addSub(task)">
              <Icon name="lucide:plus" class="text-muted-foreground size-4" />
              <UiLabel :for="`add-sub-${task.id}`" class="sr-only"
                >Add a subtask to {{ task.title }}</UiLabel
              >
              <input
                :id="`add-sub-${task.id}`"
                v-model="drafts[task.id]"
                placeholder="Add a subtask"
                autocomplete="off"
                class="placeholder:text-muted-foreground/70 min-w-0 flex-1 bg-transparent text-sm outline-none"
              />
            </form>
          </div>
        </li>
      </ul>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Sub = { id: string; title: string; done: boolean };
  type Task = { id: string; title: string; subtasks: Sub[] };

  const props = withDefaults(
    defineProps<{
      title?: string;
      initial?: Task[];
    }>(),
    {
      title: "Launch plan",
      initial: () => [
        {
          id: "t1",
          title: "Prepare the announcement",
          subtasks: [
            { id: "s1", title: "Write the blog post", done: true },
            { id: "s2", title: "Record a short demo video", done: false },
            { id: "s3", title: "Get legal sign off", done: false },
          ],
        },
        {
          id: "t2",
          title: "Update the documentation",
          subtasks: [
            { id: "s4", title: "Refresh screenshots", done: true },
            { id: "s5", title: "Add a migration guide", done: true },
          ],
        },
        {
          id: "t3",
          title: "Brief the support team",
          subtasks: [
            { id: "s6", title: "Share the FAQ", done: false },
            { id: "s7", title: "Host a Q and A call", done: false },
          ],
        },
      ],
    }
  );

  const tasks = ref<Task[]>(
    props.initial.map((task) => ({ ...task, subtasks: task.subtasks.map((sub) => ({ ...sub })) }))
  );
  const expanded = ref<string[]>(["t1"]);
  const drafts = reactive<Record<string, string>>({});
  let counter = 100;

  const doneCount = (task: Task) => task.subtasks.filter((sub) => sub.done).length;
  const complete = (task: Task) =>
    task.subtasks.length > 0 && doneCount(task) === task.subtasks.length;

  function toggle(id: string) {
    expanded.value = expanded.value.includes(id)
      ? expanded.value.filter((item) => item !== id)
      : [...expanded.value, id];
  }

  function setAll(task: Task, value: boolean) {
    task.subtasks.forEach((sub) => (sub.done = value));
  }

  function addSub(task: Task) {
    const title = drafts[task.id]?.trim();
    if (!title) return;
    task.subtasks.push({ id: `n${counter++}`, title, done: false });
    drafts[task.id] = "";
  }
</script>
