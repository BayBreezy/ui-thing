<template>
  <!--
    Simple checklist with progress and clear completed
    Features: Add field at the top, remaining count, filter tabs for all, active and completed, inline editing by double click or enter, delete buttons and a clear completed action
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-md">
      <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>

      <form class="mt-6 flex gap-2" @submit.prevent="add">
        <UiLabel for="tl2-new" class="sr-only">New task</UiLabel>
        <UiInput id="tl2-new" v-model="draft" placeholder="What needs doing?" autocomplete="off" />
        <UiButton type="submit" :disabled="!draft.trim()">Add</UiButton>
      </form>

      <UiTabs v-model="filter" class="mt-4">
        <UiTabsList class="w-full">
          <UiTabsTrigger
            v-for="item in filters"
            :key="item"
            :value="item"
            class="flex-1 capitalize"
            >{{ item }}</UiTabsTrigger
          >
        </UiTabsList>
      </UiTabs>

      <ul class="mt-2 divide-y">
        <li
          v-for="task in visible"
          :key="task.id"
          class="group/task flex items-center gap-3 py-2.5"
        >
          <UiCheckbox
            :id="`tl2-${task.id}`"
            v-model="task.done"
            :aria-label="`Complete ${task.title}`"
          />
          <template v-if="editing === task.id">
            <UiInput
              v-model="task.title"
              class="h-8 flex-1"
              :aria-label="`Edit ${task.title}`"
              @keydown.enter="editing = ''"
              @keydown.esc="editing = ''"
              @blur="editing = ''"
            />
          </template>
          <button
            v-else
            type="button"
            class="flex-1 rounded text-left text-sm outline-none focus-visible:underline"
            :class="task.done ? 'text-muted-foreground line-through' : ''"
            @dblclick="editing = task.id"
            @keydown.enter="editing = task.id"
          >
            {{ task.title }}
          </button>
          <UiButton
            variant="ghost"
            size="icon-sm"
            class="opacity-0 group-focus-within/task:opacity-100 group-hover/task:opacity-100"
            :aria-label="`Delete ${task.title}`"
            @click="remove(task.id)"
          >
            <Icon name="lucide:trash-2" class="size-4" />
          </UiButton>
        </li>
        <li v-if="!visible.length" class="text-muted-foreground py-8 text-center text-sm">
          Nothing to show.
        </li>
      </ul>

      <div class="text-muted-foreground mt-4 flex items-center justify-between text-sm">
        <span aria-live="polite"
          >{{ remaining }} {{ remaining === 1 ? "task" : "tasks" }} left</span
        >
        <UiButton
          variant="link"
          size="sm"
          class="h-auto p-0"
          :disabled="remaining === tasks.length"
          @click="clearDone"
          >Clear completed</UiButton
        >
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Task = { id: string; title: string; done: boolean };

  const props = withDefaults(
    defineProps<{
      title?: string;
      initial?: Task[];
    }>(),
    {
      title: "Today",
      initial: () => [
        { id: "t1", title: "Reply to Sofia about the mockups", done: true },
        { id: "t2", title: "Review the Q4 budget", done: false },
        { id: "t3", title: "Prepare slides for Thursday", done: false },
        { id: "t4", title: "Order new laptop stand", done: false },
      ],
    }
  );

  const filters = ["all", "active", "completed"];

  const tasks = ref<Task[]>(props.initial.map((task) => ({ ...task })));
  const draft = ref("");
  const filter = ref("all");
  const editing = ref("");
  let counter = 100;

  const visible = computed(() =>
    tasks.value.filter(
      (task) => filter.value === "all" || (filter.value === "active" ? !task.done : task.done)
    )
  );
  const remaining = computed(() => tasks.value.filter((task) => !task.done).length);

  function add() {
    const title = draft.value.trim();
    if (!title) return;
    tasks.value.unshift({ id: `n${counter++}`, title, done: false });
    draft.value = "";
  }

  function remove(id: string) {
    tasks.value = tasks.value.filter((task) => task.id !== id);
  }

  function clearDone() {
    tasks.value = tasks.value.filter((task) => !task.done);
  }
</script>
