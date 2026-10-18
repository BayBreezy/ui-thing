<template>
  <!--
    Task table with sortable columns
    Features: Table with checkbox, title, assignee, status badge, priority and due date, sortable headers with aria sort, status select per row and a footer summary
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>
        <p class="text-muted-foreground mt-1 text-sm">{{ done }} of {{ rows.length }} complete</p>
      </div>
    </div>

    <div class="mt-6 overflow-hidden rounded-xl border">
      <UiTable>
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead class="w-10"><span class="sr-only">Complete</span></UiTableHead>
            <UiTableHead :aria-sort="ariaSort('title')">
              <button
                type="button"
                class="hover:text-foreground flex items-center gap-1"
                @click="sortBy('title')"
              >
                Task<Icon :name="icon('title')" class="size-3.5" />
              </button>
            </UiTableHead>
            <UiTableHead class="hidden sm:table-cell">Assignee</UiTableHead>
            <UiTableHead class="w-40">Status</UiTableHead>
            <UiTableHead class="hidden md:table-cell" :aria-sort="ariaSort('priority')">
              <button
                type="button"
                class="hover:text-foreground flex items-center gap-1"
                @click="sortBy('priority')"
              >
                Priority<Icon :name="icon('priority')" class="size-3.5" />
              </button>
            </UiTableHead>
            <UiTableHead class="hidden text-right md:table-cell" :aria-sort="ariaSort('due')">
              <button
                type="button"
                class="hover:text-foreground ml-auto flex items-center gap-1"
                @click="sortBy('due')"
              >
                Due<Icon :name="icon('due')" class="size-3.5" />
              </button>
            </UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <UiTableRow
            v-for="task in sorted"
            :key="task.id"
            :data-state="task.status === 'Done' ? 'selected' : undefined"
          >
            <UiTableCell>
              <UiCheckbox
                :model-value="task.status === 'Done'"
                :aria-label="`Complete ${task.title}`"
                @update:model-value="task.status = $event ? 'Done' : 'To do'"
              />
            </UiTableCell>
            <UiTableCell
              class="font-medium"
              :class="task.status === 'Done' ? 'text-muted-foreground line-through' : ''"
              >{{ task.title }}</UiTableCell
            >
            <UiTableCell class="hidden sm:table-cell">
              <span class="flex items-center gap-2">
                <UiAvatar :src="task.avatar" :fallback="task.assignee[0]" class="size-6" />
                {{ task.assignee }}
              </span>
            </UiTableCell>
            <UiTableCell>
              <UiNativeSelect
                v-model="task.status"
                class="h-8"
                :aria-label="`Status of ${task.title}`"
              >
                <option v-for="status in statuses" :key="status">{{ status }}</option>
              </UiNativeSelect>
            </UiTableCell>
            <UiTableCell class="hidden md:table-cell">
              <UiBadge
                variant="soft"
                :color="colors[task.priority]"
                shape="pill"
                class="capitalize"
                >{{ task.priority }}</UiBadge
              >
            </UiTableCell>
            <UiTableCell
              class="text-muted-foreground hidden text-right whitespace-nowrap md:table-cell"
              >{{ task.due }}</UiTableCell
            >
          </UiTableRow>
        </UiTableBody>
      </UiTable>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Status = "To do" | "In progress" | "Done";
  type Row = {
    id: string;
    title: string;
    assignee: string;
    avatar: string;
    status: Status;
    priority: "high" | "medium" | "low";
    due: string;
  };
  type Key = "title" | "priority" | "due";

  const props = withDefaults(
    defineProps<{
      title?: string;
      initial?: Row[];
    }>(),
    {
      title: "Sprint tasks",
      initial: () => [
        {
          id: "r1",
          title: "Design the settings page",
          assignee: "Sofia",
          avatar: "https://i.pravatar.cc/80?img=32",
          status: "In progress",
          priority: "high",
          due: "2026-10-22",
        },
        {
          id: "r2",
          title: "Fix flaky checkout test",
          assignee: "Liam",
          avatar: "https://i.pravatar.cc/80?img=12",
          status: "To do",
          priority: "high",
          due: "2026-10-20",
        },
        {
          id: "r3",
          title: "Write release notes",
          assignee: "Aisha",
          avatar: "https://i.pravatar.cc/80?img=44",
          status: "To do",
          priority: "low",
          due: "2026-10-30",
        },
        {
          id: "r4",
          title: "Update onboarding emails",
          assignee: "Maya",
          avatar: "https://i.pravatar.cc/80?img=45",
          status: "Done",
          priority: "medium",
          due: "2026-10-15",
        },
        {
          id: "r5",
          title: "Audit API rate limits",
          assignee: "Noah",
          avatar: "https://i.pravatar.cc/80?img=15",
          status: "In progress",
          priority: "medium",
          due: "2026-10-27",
        },
      ],
    }
  );

  const statuses: Status[] = ["To do", "In progress", "Done"];
  const colors = { high: "red", medium: "amber", low: "slate" } as const;
  const rank = { high: 0, medium: 1, low: 2 };

  const rows = ref<Row[]>(props.initial.map((row) => ({ ...row })));
  const sortKey = ref<Key>("due");
  const direction = ref<"asc" | "desc">("asc");

  const done = computed(() => rows.value.filter((row) => row.status === "Done").length);

  const sorted = computed(() => {
    const factor = direction.value === "asc" ? 1 : -1;
    return [...rows.value].sort((a, b) => {
      if (sortKey.value === "priority") return (rank[a.priority] - rank[b.priority]) * factor;
      return a[sortKey.value].localeCompare(b[sortKey.value]) * factor;
    });
  });

  function sortBy(key: Key) {
    if (sortKey.value === key) direction.value = direction.value === "asc" ? "desc" : "asc";
    else {
      sortKey.value = key;
      direction.value = "asc";
    }
  }

  const ariaSort = (key: Key) =>
    sortKey.value !== key ? "none" : direction.value === "asc" ? "ascending" : "descending";
  const icon = (key: Key) =>
    sortKey.value !== key
      ? "lucide:arrow-up-down"
      : direction.value === "asc"
        ? "lucide:arrow-up"
        : "lucide:arrow-down";
</script>
