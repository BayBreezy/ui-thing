<template>
  <!--
    Tasks grouped by project
    Features: Collapsible project groups with progress counts, checkbox rows with strike through when done, priority dots, due dates that turn red when overdue and an add task field per group
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-2xl">
      <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>

      <div class="mt-8 space-y-6">
        <UiCollapsible
          v-for="group in groups"
          :key="group.name"
          v-model:open="open[group.name]"
          class="rounded-xl border"
        >
          <div class="flex items-center gap-2 px-4 py-3">
            <UiCollapsibleTrigger as-child>
              <button
                type="button"
                class="focus-visible:ring-ring/50 flex flex-1 items-center gap-2 rounded text-left outline-none focus-visible:ring-[3px]"
              >
                <Icon
                  name="lucide:chevron-down"
                  class="size-4 transition-transform"
                  :class="open[group.name] ? '' : '-rotate-90'"
                />
                <span class="font-semibold">{{ group.name }}</span>
                <span class="text-muted-foreground text-sm tabular-nums"
                  >{{ doneCount(group) }}/{{ group.tasks.length }}</span
                >
              </button>
            </UiCollapsibleTrigger>
            <UiProgress
              :model-value="(doneCount(group) / Math.max(group.tasks.length, 1)) * 100"
              class="h-1.5 w-24"
              :aria-label="`${group.name} progress`"
            />
          </div>
          <UiCollapsibleContent>
            <ul class="divide-y border-t">
              <li
                v-for="task in group.tasks"
                :key="task.id"
                class="flex items-center gap-3 px-4 py-2.5"
              >
                <UiCheckbox :id="`tl1-${task.id}`" v-model="task.done" />
                <UiLabel
                  :for="`tl1-${task.id}`"
                  class="flex-1 cursor-pointer font-normal"
                  :class="task.done ? 'text-muted-foreground line-through' : ''"
                >
                  {{ task.title }}
                </UiLabel>
                <span
                  class="size-2 rounded-full"
                  :class="dots[task.priority]"
                  :title="`${task.priority} priority`"
                />
                <span class="sr-only">{{ task.priority }} priority</span>
                <span
                  v-if="task.due"
                  class="w-14 text-right text-xs"
                  :class="
                    overdue(task)
                      ? 'font-medium text-red-600 dark:text-red-400'
                      : 'text-muted-foreground'
                  "
                >
                  {{ task.due }}
                </span>
              </li>
            </ul>
            <form class="flex items-center gap-2 border-t px-4 py-2" @submit.prevent="add(group)">
              <Icon name="lucide:plus" class="text-muted-foreground size-4" />
              <UiLabel :for="`add-${group.name}`" class="sr-only"
                >Add a task to {{ group.name }}</UiLabel
              >
              <input
                :id="`add-${group.name}`"
                v-model="drafts[group.name]"
                placeholder="Add a task"
                autocomplete="off"
                class="placeholder:text-muted-foreground/70 min-w-0 flex-1 bg-transparent py-1 text-sm outline-none"
              />
            </form>
          </UiCollapsibleContent>
        </UiCollapsible>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Task = {
    id: string;
    title: string;
    done: boolean;
    priority: "high" | "medium" | "low";
    due?: string;
    overdue?: boolean;
  };
  type Group = { name: string; tasks: Task[] };

  const props = withDefaults(
    defineProps<{
      title?: string;
      initial?: Group[];
    }>(),
    {
      title: "My tasks",
      initial: () => [
        {
          name: "Website relaunch",
          tasks: [
            { id: "a1", title: "Finalize homepage copy", done: true, priority: "medium" },
            {
              id: "a2",
              title: "Review pricing table",
              done: false,
              priority: "high",
              due: "Oct 12",
              overdue: true,
            },
            {
              id: "a3",
              title: "QA the checkout flow",
              done: false,
              priority: "high",
              due: "Oct 24",
            },
          ],
        },
        {
          name: "Marketing",
          tasks: [
            {
              id: "b1",
              title: "Schedule launch email",
              done: false,
              priority: "medium",
              due: "Oct 28",
            },
            { id: "b2", title: "Draft social posts", done: false, priority: "low" },
          ],
        },
        {
          name: "Personal",
          tasks: [{ id: "c1", title: "Book dentist appointment", done: true, priority: "low" }],
        },
      ],
    }
  );

  const dots = {
    high: "bg-red-500",
    medium: "bg-amber-500",
    low: "bg-slate-300 dark:bg-slate-600",
  } as const;

  const groups = ref<Group[]>(
    props.initial.map((group) => ({ ...group, tasks: group.tasks.map((task) => ({ ...task })) }))
  );
  const open = reactive<Record<string, boolean>>(
    Object.fromEntries(props.initial.map((group) => [group.name, true]))
  );
  const drafts = reactive<Record<string, string>>({});
  let counter = 100;

  const doneCount = (group: Group) => group.tasks.filter((task) => task.done).length;
  const overdue = (task: Task) => !task.done && Boolean(task.overdue);

  function add(group: Group) {
    const title = drafts[group.name]?.trim();
    if (!title) return;
    group.tasks.push({ id: `n${counter++}`, title, done: false, priority: "medium" });
    drafts[group.name] = "";
  }
</script>
