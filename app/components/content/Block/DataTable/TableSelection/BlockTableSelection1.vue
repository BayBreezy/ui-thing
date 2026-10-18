<template>
  <!--
    Selectable table with a bulk action bar
    Features: Select all checkbox with an indeterminate state, row checkboxes, highlighted selected rows, a bulk bar with archive, delete and clear and an empty state
  -->
  <UiContainer class="py-12 lg:py-20">
    <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>
    <p class="text-muted-foreground mt-2">{{ description }}</p>

    <div class="mt-8 flex min-h-12 items-center">
      <div
        v-if="selected.length"
        class="bg-muted flex w-full flex-wrap items-center gap-2 rounded-lg border px-3 py-2"
        role="region"
        aria-label="Bulk actions"
      >
        <span class="text-sm font-medium" aria-live="polite">{{ selected.length }} selected</span>
        <div class="ml-auto flex items-center gap-2">
          <UiButton variant="outline" size="sm" @click="archive">
            <Icon name="lucide:archive" class="size-4" />
            Archive
          </UiButton>
          <UiButton variant="destructive" size="sm" @click="remove">
            <Icon name="lucide:trash-2" class="size-4" />
            Delete
          </UiButton>
          <UiButton variant="ghost" size="sm" @click="selected = []">Clear</UiButton>
        </div>
      </div>
      <p v-else class="text-muted-foreground text-sm">Select rows to see bulk actions.</p>
    </div>

    <div class="overflow-hidden rounded-xl border">
      <UiTable>
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead class="w-10">
              <UiCheckbox
                :model-value="headerState"
                aria-label="Select all"
                @update:model-value="toggleAll"
              />
            </UiTableHead>
            <UiTableHead>File</UiTableHead>
            <UiTableHead class="hidden sm:table-cell">Owner</UiTableHead>
            <UiTableHead>Status</UiTableHead>
            <UiTableHead class="hidden text-right md:table-cell">Size</UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <UiTableRow
            v-for="row in rows"
            :key="row.id"
            :data-state="selected.includes(row.id) ? 'selected' : undefined"
          >
            <UiTableCell>
              <UiCheckbox
                :model-value="selected.includes(row.id)"
                :aria-label="`Select ${row.name}`"
                @update:model-value="toggle(row.id)"
              />
            </UiTableCell>
            <UiTableCell class="font-medium">{{ row.name }}</UiTableCell>
            <UiTableCell class="hidden sm:table-cell">{{ row.owner }}</UiTableCell>
            <UiTableCell>
              <UiBadge variant="soft" :color="row.archived ? 'slate' : 'green'" shape="pill">
                {{ row.archived ? "Archived" : "Active" }}
              </UiBadge>
            </UiTableCell>
            <UiTableCell class="text-muted-foreground hidden text-right md:table-cell">
              {{ row.size }}
            </UiTableCell>
          </UiTableRow>
          <UiTableEmpty v-if="!rows.length" :colspan="5">Nothing left here.</UiTableEmpty>
        </UiTableBody>
      </UiTable>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Row = { id: string; name: string; owner: string; archived: boolean; size: string };

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      items?: Row[];
    }>(),
    {
      title: "Documents",
      description: "Pick one or many rows and act on them together.",
      items: () => [
        {
          id: "d1",
          name: "Q3 board deck.pdf",
          owner: "Maya Chen",
          archived: false,
          size: "4.2 MB",
        },
        {
          id: "d2",
          name: "Brand guidelines.fig",
          owner: "Sofia Alvarez",
          archived: false,
          size: "18.6 MB",
        },
        {
          id: "d3",
          name: "Roadmap 2027.xlsx",
          owner: "Liam Carter",
          archived: false,
          size: "612 KB",
        },
        {
          id: "d4",
          name: "Customer interviews.docx",
          owner: "Aisha Khan",
          archived: true,
          size: "1.1 MB",
        },
        {
          id: "d5",
          name: "Launch checklist.md",
          owner: "Noah Williams",
          archived: false,
          size: "12 KB",
        },
      ],
    }
  );

  const rows = ref<Row[]>(props.items.map((item) => ({ ...item })));
  const selected = ref<string[]>([]);

  const headerState = computed<boolean | "indeterminate">(() => {
    if (!selected.value.length) return false;
    return selected.value.length === rows.value.length ? true : "indeterminate";
  });

  function toggleAll(value: boolean | "indeterminate") {
    selected.value = value === true ? rows.value.map((row) => row.id) : [];
  }

  function toggle(id: string) {
    selected.value = selected.value.includes(id)
      ? selected.value.filter((item) => item !== id)
      : [...selected.value, id];
  }

  function archive() {
    rows.value = rows.value.map((row) =>
      selected.value.includes(row.id) ? { ...row, archived: true } : row
    );
    useSonner.success(`Archived ${selected.value.length} items`);
    selected.value = [];
  }

  function remove() {
    const count = selected.value.length;
    rows.value = rows.value.filter((row) => !selected.value.includes(row.id));
    selected.value = [];
    useSonner.success(`Deleted ${count} items`);
  }
</script>
