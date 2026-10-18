<template>
  <!--
    Portfolio table of projects
    Features: Sortable table with owner, status, progress bar, budget used and next milestone, row totals in the footer, over budget highlight and a status filter select
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>
      <UiSelect v-model="status">
        <UiSelectTrigger class="sm:w-44" aria-label="Filter by status"
          ><UiSelectValue
        /></UiSelectTrigger>
        <UiSelectContent>
          <UiSelectItem value="all">All statuses</UiSelectItem>
          <UiSelectItem v-for="item in statuses" :key="item" :value="item">{{ item }}</UiSelectItem>
        </UiSelectContent>
      </UiSelect>
    </div>

    <div class="mt-6 overflow-x-auto rounded-xl border">
      <UiTable>
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead :aria-sort="ariaSort('name')"
              ><button
                type="button"
                class="hover:text-foreground flex items-center gap-1"
                @click="sortBy('name')"
              >
                Project<Icon :name="icon('name')" class="size-3.5" /></button
            ></UiTableHead>
            <UiTableHead class="hidden md:table-cell">Owner</UiTableHead>
            <UiTableHead>Status</UiTableHead>
            <UiTableHead class="hidden w-40 sm:table-cell" :aria-sort="ariaSort('progress')"
              ><button
                type="button"
                class="hover:text-foreground flex items-center gap-1"
                @click="sortBy('progress')"
              >
                Progress<Icon :name="icon('progress')" class="size-3.5" /></button
            ></UiTableHead>
            <UiTableHead class="text-right" :aria-sort="ariaSort('spent')"
              ><button
                type="button"
                class="hover:text-foreground ml-auto flex items-center gap-1"
                @click="sortBy('spent')"
              >
                Budget used<Icon :name="icon('spent')" class="size-3.5" /></button
            ></UiTableHead>
            <UiTableHead class="hidden lg:table-cell">Next milestone</UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <UiTableRow v-for="project in rows" :key="project.name">
            <UiTableCell class="font-medium">{{ project.name }}</UiTableCell>
            <UiTableCell class="hidden md:table-cell"
              ><span class="flex items-center gap-2"
                ><UiAvatar :src="project.avatar" :fallback="project.owner[0]" class="size-6" />{{
                  project.owner
                }}</span
              ></UiTableCell
            >
            <UiTableCell
              ><UiBadge variant="soft" :color="colors[project.status]" shape="pill">{{
                project.status
              }}</UiBadge></UiTableCell
            >
            <UiTableCell class="hidden sm:table-cell"
              ><div class="flex items-center gap-2">
                <UiProgress
                  :model-value="project.progress"
                  class="h-1.5"
                  :aria-label="`${project.name} progress`"
                /><span class="text-muted-foreground w-9 text-xs tabular-nums"
                  >{{ project.progress }}%</span
                >
              </div></UiTableCell
            >
            <UiTableCell
              class="text-right tabular-nums"
              :class="project.spent > 100 ? 'font-medium text-red-600 dark:text-red-400' : ''"
              >{{ project.spent }}%</UiTableCell
            >
            <UiTableCell class="text-muted-foreground hidden whitespace-nowrap lg:table-cell">{{
              project.milestone
            }}</UiTableCell>
          </UiTableRow>
          <UiTableEmpty v-if="!rows.length" :colspan="6"
            >No projects with this status.</UiTableEmpty
          >
        </UiTableBody>
        <UiTableFooter>
          <UiTableRow>
            <UiTableCell colspan="3" class="font-medium">{{ rows.length }} projects</UiTableCell>
            <UiTableCell class="hidden sm:table-cell">Average {{ average }}%</UiTableCell>
            <UiTableCell colspan="2" />
          </UiTableRow>
        </UiTableFooter>
      </UiTable>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Status = "Active" | "At risk" | "Completed";
  type Project = {
    name: string;
    owner: string;
    avatar: string;
    status: Status;
    progress: number;
    spent: number;
    milestone: string;
  };
  type Key = "name" | "progress" | "spent";

  const props = withDefaults(
    defineProps<{
      title?: string;
      projects?: Project[];
    }>(),
    {
      title: "Project portfolio",
      projects: () => [
        {
          name: "Website relaunch",
          owner: "Sofia",
          avatar: "https://i.pravatar.cc/80?img=32",
          status: "Active",
          progress: 64,
          spent: 58,
          milestone: "Beta launch · Oct 28",
        },
        {
          name: "Mobile app v2",
          owner: "Liam",
          avatar: "https://i.pravatar.cc/80?img=12",
          status: "At risk",
          progress: 23,
          spent: 41,
          milestone: "Design freeze · Nov 04",
        },
        {
          name: "Billing migration",
          owner: "Noah",
          avatar: "https://i.pravatar.cc/80?img=15",
          status: "Active",
          progress: 90,
          spent: 104,
          milestone: "Cutover · Nov 12",
        },
        {
          name: "Brand refresh",
          owner: "Aisha",
          avatar: "https://i.pravatar.cc/80?img=44",
          status: "At risk",
          progress: 22,
          spent: 76,
          milestone: "Guidelines · Oct 20",
        },
        {
          name: "Help center",
          owner: "Maya",
          avatar: "https://i.pravatar.cc/80?img=45",
          status: "Completed",
          progress: 100,
          spent: 97,
          milestone: "Done",
        },
      ],
    }
  );

  const statuses: Status[] = ["Active", "At risk", "Completed"];
  const colors = { Active: "blue", "At risk": "amber", Completed: "green" } as const;

  const status = ref("all");
  const sortKey = ref<Key>("progress");
  const direction = ref<"asc" | "desc">("desc");

  const rows = computed(() => {
    const factor = direction.value === "asc" ? 1 : -1;
    return props.projects
      .filter((project) => status.value === "all" || project.status === status.value)
      .sort(
        (a, b) =>
          (sortKey.value === "name"
            ? a.name.localeCompare(b.name)
            : a[sortKey.value] - b[sortKey.value]) * factor
      );
  });

  const average = computed(() =>
    rows.value.length
      ? Math.round(
          rows.value.reduce((sum, project) => sum + project.progress, 0) / rows.value.length
        )
      : 0
  );

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
