<template>
  <!--
    Table toolbar with a column visibility menu
    Features: Columns dropdown with checkbox items, at least one column always stays visible, show all shortcut and a projects table that renders only the chosen columns
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>
        <p class="text-muted-foreground mt-2">{{ description }}</p>
      </div>
      <UiDropdownMenu>
        <UiDropdownMenuTrigger as-child>
          <UiButton variant="outline">
            <Icon name="lucide:columns-3" class="size-4" />
            Columns
            <Icon name="lucide:chevron-down" class="size-4" />
          </UiButton>
        </UiDropdownMenuTrigger>
        <UiDropdownMenuContent align="end" class="w-44">
          <UiDropdownMenuLabel>Toggle columns</UiDropdownMenuLabel>
          <UiDropdownMenuSeparator />
          <UiDropdownMenuCheckboxItem
            v-for="column in columns"
            :key="column.key"
            :model-value="visible.includes(column.key)"
            :disabled="visible.length === 1 && visible.includes(column.key)"
            @select.prevent
            @update:model-value="toggle(column.key)"
          >
            {{ column.label }}
          </UiDropdownMenuCheckboxItem>
          <UiDropdownMenuSeparator />
          <UiDropdownMenuItem @select="visible = columns.map((column) => column.key)">
            Show all
          </UiDropdownMenuItem>
        </UiDropdownMenuContent>
      </UiDropdownMenu>
    </div>

    <div class="mt-8 overflow-x-auto rounded-xl border">
      <UiTable>
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead v-for="column in shownColumns" :key="column.key" class="whitespace-nowrap">
              {{ column.label }}
            </UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <UiTableRow v-for="project in projects" :key="project.name">
            <UiTableCell v-for="column in shownColumns" :key="column.key" class="whitespace-nowrap">
              <span v-if="column.key === 'name'" class="font-medium">{{ project.name }}</span>
              <UiBadge
                v-else-if="column.key === 'status'"
                variant="soft"
                :color="project.status === 'On track' ? 'green' : 'amber'"
                shape="pill"
              >
                {{ project.status }}
              </UiBadge>
              <span v-else-if="column.key === 'budget'" class="tabular-nums">
                {{ money.format(project.budget) }}
              </span>
              <span v-else>{{ project[column.key] }}</span>
            </UiTableCell>
          </UiTableRow>
        </UiTableBody>
      </UiTable>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type ColumnKey = "name" | "owner" | "status" | "budget" | "deadline";

  type Project = {
    name: string;
    owner: string;
    status: "On track" | "At risk";
    budget: number;
    deadline: string;
  };

  withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      projects?: Project[];
    }>(),
    {
      title: "Projects",
      description: "Hide the columns you do not need and keep the table readable.",
      projects: () => [
        {
          name: "Website redesign",
          owner: "Sofia Alvarez",
          status: "On track",
          budget: 48000,
          deadline: "Nov 30, 2026",
        },
        {
          name: "Mobile app v2",
          owner: "Liam Carter",
          status: "At risk",
          budget: 125000,
          deadline: "Dec 15, 2026",
        },
        {
          name: "Billing migration",
          owner: "Noah Williams",
          status: "On track",
          budget: 36500,
          deadline: "Nov 12, 2026",
        },
        {
          name: "Brand refresh",
          owner: "Aisha Khan",
          status: "On track",
          budget: 22000,
          deadline: "Jan 20, 2027",
        },
        {
          name: "Data warehouse",
          owner: "Maya Chen",
          status: "At risk",
          budget: 89000,
          deadline: "Feb 28, 2027",
        },
      ],
    }
  );

  const columns: { key: ColumnKey; label: string }[] = [
    { key: "name", label: "Project" },
    { key: "owner", label: "Owner" },
    { key: "status", label: "Status" },
    { key: "budget", label: "Budget" },
    { key: "deadline", label: "Deadline" },
  ];

  const money = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  const visible = ref<ColumnKey[]>(columns.map((column) => column.key));

  const shownColumns = computed(() =>
    columns.filter((column) => visible.value.includes(column.key))
  );

  function toggle(key: ColumnKey) {
    if (visible.value.includes(key)) {
      if (visible.value.length > 1) visible.value = visible.value.filter((item) => item !== key);
    } else {
      visible.value = [...visible.value, key];
    }
  }
</script>
