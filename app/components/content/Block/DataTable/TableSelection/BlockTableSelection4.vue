<template>
  <!--
    Table with inline status select
    Features: Status select in every row, color coded badge preview, live status counts above the table, native keyboard support and a reset button
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>
        <p class="text-muted-foreground mt-2">{{ description }}</p>
      </div>
      <UiButton variant="outline" size="sm" @click="reset">
        <Icon name="lucide:rotate-ccw" class="size-4" />
        Reset
      </UiButton>
    </div>

    <ul class="mt-8 flex flex-wrap gap-2" aria-label="Status counts" aria-live="polite">
      <li v-for="status in statuses" :key="status.value">
        <UiBadge variant="soft" :color="status.color" shape="pill" size="md">
          {{ status.label }} · {{ counts[status.value] }}
        </UiBadge>
      </li>
    </ul>

    <div class="mt-4 overflow-hidden rounded-xl border">
      <UiTable>
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead>Task</UiTableHead>
            <UiTableHead class="hidden sm:table-cell">Assignee</UiTableHead>
            <UiTableHead class="w-44">Status</UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <UiTableRow v-for="task in rows" :key="task.id">
            <UiTableCell class="font-medium">{{ task.title }}</UiTableCell>
            <UiTableCell class="hidden sm:table-cell">
              <div class="flex items-center gap-2">
                <UiAvatar :src="task.avatar" :fallback="task.assignee[0]" class="size-6" />
                {{ task.assignee }}
              </div>
            </UiTableCell>
            <UiTableCell>
              <UiSelect v-model="task.status">
                <UiSelectTrigger size="sm" :aria-label="`Status of ${task.title}`">
                  <UiSelectValue />
                </UiSelectTrigger>
                <UiSelectContent>
                  <UiSelectItem
                    v-for="status in statuses"
                    :key="status.value"
                    :value="status.value"
                  >
                    <span
                      class="inline-block size-2 rounded-full"
                      :class="status.dot"
                      aria-hidden="true"
                    />
                    {{ status.label }}
                  </UiSelectItem>
                </UiSelectContent>
              </UiSelect>
            </UiTableCell>
          </UiTableRow>
        </UiTableBody>
      </UiTable>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Status = "todo" | "progress" | "review" | "done";

  type Task = { id: string; title: string; assignee: string; avatar: string; status: Status };

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      tasks?: Task[];
    }>(),
    {
      title: "Sprint tasks",
      description: "Change a status from the row and the counts follow.",
      tasks: () => [
        {
          id: "t1",
          title: "Design the pricing page",
          assignee: "Sofia",
          avatar: "https://i.pravatar.cc/80?img=32",
          status: "progress",
        },
        {
          id: "t2",
          title: "Migrate billing webhooks",
          assignee: "Liam",
          avatar: "https://i.pravatar.cc/80?img=12",
          status: "review",
        },
        {
          id: "t3",
          title: "Write release notes",
          assignee: "Aisha",
          avatar: "https://i.pravatar.cc/80?img=45",
          status: "todo",
        },
        {
          id: "t4",
          title: "Fix dark mode flicker",
          assignee: "Noah",
          avatar: "https://i.pravatar.cc/80?img=15",
          status: "done",
        },
        {
          id: "t5",
          title: "Audit API rate limits",
          assignee: "Maya",
          avatar: "https://i.pravatar.cc/80?img=47",
          status: "todo",
        },
      ],
    }
  );

  const statuses = [
    { value: "todo", label: "To do", color: "slate", dot: "bg-slate-400" },
    { value: "progress", label: "In progress", color: "blue", dot: "bg-blue-500" },
    { value: "review", label: "In review", color: "amber", dot: "bg-amber-500" },
    { value: "done", label: "Done", color: "green", dot: "bg-green-500" },
  ] as const;

  const rows = ref<Task[]>(props.tasks.map((task) => ({ ...task })));

  const counts = computed(() => {
    const result: Record<Status, number> = { todo: 0, progress: 0, review: 0, done: 0 };
    for (const task of rows.value) result[task.status]++;
    return result;
  });

  function reset() {
    rows.value = props.tasks.map((task) => ({ ...task }));
  }
</script>
