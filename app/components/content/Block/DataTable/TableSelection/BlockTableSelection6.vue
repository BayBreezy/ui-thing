<template>
  <!--
    Table with a delete confirmation dialog
    Features: One alert dialog shared by every row, names the item being deleted, destructive confirm button, bulk delete for selected rows and a toast on success
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>
        <p class="text-muted-foreground mt-2">{{ description }}</p>
      </div>
      <UiButton variant="destructive" :disabled="!selected.length" @click="askDelete(selected)">
        <Icon name="lucide:trash-2" class="size-4" />
        Delete selected
        <span v-if="selected.length">({{ selected.length }})</span>
      </UiButton>
    </div>

    <div class="mt-8 overflow-hidden rounded-xl border">
      <UiTable>
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead class="w-10"><span class="sr-only">Select</span></UiTableHead>
            <UiTableHead>Key</UiTableHead>
            <UiTableHead class="hidden sm:table-cell">Created</UiTableHead>
            <UiTableHead class="w-12"><span class="sr-only">Delete</span></UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <UiTableRow
            v-for="key in rows"
            :key="key.id"
            :data-state="selected.includes(key.id) ? 'selected' : undefined"
          >
            <UiTableCell>
              <UiCheckbox
                :model-value="selected.includes(key.id)"
                :aria-label="`Select ${key.name}`"
                @update:model-value="toggle(key.id)"
              />
            </UiTableCell>
            <UiTableCell>
              <p class="font-medium">{{ key.name }}</p>
              <p class="text-muted-foreground font-mono text-xs">{{ key.preview }}</p>
            </UiTableCell>
            <UiTableCell class="text-muted-foreground hidden sm:table-cell">
              {{ key.created }}
            </UiTableCell>
            <UiTableCell class="text-right">
              <UiButton
                variant="ghost"
                size="icon-sm"
                :aria-label="`Delete ${key.name}`"
                @click="askDelete([key.id])"
              >
                <Icon name="lucide:trash-2" class="text-destructive size-4" />
              </UiButton>
            </UiTableCell>
          </UiTableRow>
          <UiTableEmpty v-if="!rows.length" :colspan="4">You have no API keys.</UiTableEmpty>
        </UiTableBody>
      </UiTable>
    </div>

    <UiAlertDialog v-model:open="open">
      <UiAlertDialogContent>
        <UiAlertDialogHeader>
          <UiAlertDialogTitle>
            Delete {{ pending.length === 1 ? pendingNames : `${pending.length} API keys` }}?
          </UiAlertDialogTitle>
          <UiAlertDialogDescription>
            <template v-if="pending.length === 1">
              “{{ pendingNames }}” will stop working immediately. This cannot be undone.
            </template>
            <template v-else>
              These keys will stop working immediately. This cannot be undone.
            </template>
          </UiAlertDialogDescription>
        </UiAlertDialogHeader>
        <UiAlertDialogFooter>
          <UiAlertDialogCancel>Cancel</UiAlertDialogCancel>
          <UiAlertDialogAction variant="destructive" @click="confirmDelete">
            Delete
          </UiAlertDialogAction>
        </UiAlertDialogFooter>
      </UiAlertDialogContent>
    </UiAlertDialog>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Key = { id: string; name: string; preview: string; created: string };

  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      keys?: Key[];
    }>(),
    {
      title: "API keys",
      description: "Destructive actions ask for confirmation first.",
      keys: () => [
        {
          id: "k1",
          name: "Production server",
          preview: "sk_live_••••8f2a",
          created: "Aug 3, 2026",
        },
        { id: "k2", name: "Staging", preview: "sk_test_••••19cd", created: "Sep 12, 2026" },
        { id: "k3", name: "CI pipeline", preview: "sk_live_••••77b0", created: "Oct 1, 2026" },
        {
          id: "k4",
          name: "Local development",
          preview: "sk_test_••••c3e4",
          created: "Oct 14, 2026",
        },
      ],
    }
  );

  const rows = ref<Key[]>(props.keys.map((key) => ({ ...key })));
  const selected = ref<string[]>([]);
  const pending = ref<string[]>([]);
  const open = ref(false);

  const pendingNames = computed(
    () => rows.value.find((row) => row.id === pending.value[0])?.name ?? ""
  );

  function toggle(id: string) {
    selected.value = selected.value.includes(id)
      ? selected.value.filter((item) => item !== id)
      : [...selected.value, id];
  }

  function askDelete(ids: string[]) {
    pending.value = [...ids];
    open.value = true;
  }

  function confirmDelete() {
    const count = pending.value.length;
    rows.value = rows.value.filter((row) => !pending.value.includes(row.id));
    selected.value = selected.value.filter((id) => !pending.value.includes(id));
    pending.value = [];
    useSonner.success(count === 1 ? "API key deleted" : `${count} API keys deleted`);
  }
</script>
