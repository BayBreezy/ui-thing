<script setup lang="ts">
  import type { Table } from "@tanstack/vue-table";

  interface DataTableViewOptionsProps {
    table: Table<HomeTaskTableFeatures, HomeTask>;
  }

  const props = defineProps<DataTableViewOptionsProps>();

  const columns = computed(() =>
    props.table
      .getAllColumns()
      .filter((column) => typeof column.accessorFn !== "undefined" && column.getCanHide())
  );
</script>

<template>
  <UiDropdownMenu>
    <UiDropdownMenuTrigger as-child>
      <UiButton variant="outline" size="sm" class="h-8 md:ml-auto">
        <Icon name="lucide:settings-2" class="mr-2 size-4" />
        View
      </UiButton>
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent align="end" class="w-[150px]">
      <UiDropdownMenuLabel>Toggle columns</UiDropdownMenuLabel>
      <UiDropdownMenuSeparator />

      <UiDropdownMenuCheckboxItem
        v-for="column in columns"
        :key="column.id"
        class="capitalize"
        :model-value="column.getIsVisible()"
        @update:model-value="(value) => column.toggleVisibility(!!value)"
      >
        {{ column.id }}
      </UiDropdownMenuCheckboxItem>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>
