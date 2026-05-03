<script setup lang="ts">
  import type { Row } from "@tanstack/vue-table";

  interface DataTableRowActionsProps {
    row: Row<HomeTask>;
  }
  const props = defineProps<DataTableRowActionsProps>();

  const task = computed(() => props.row.original);
</script>

<template>
  <UiDropdownMenu>
    <UiDropdownMenuTrigger as-child>
      <UiButton variant="ghost" class="data-[state=open]:bg-muted flex size-8 p-0">
        <Icon name="lucide:ellipsis" class="size-4" />
        <span class="sr-only">Open menu</span>
      </UiButton>
    </UiDropdownMenuTrigger>
    <UiDropdownMenuContent align="end" class="w-[160px]">
      <UiDropdownMenuItem>Edit</UiDropdownMenuItem>
      <UiDropdownMenuItem>Make a copy</UiDropdownMenuItem>
      <UiDropdownMenuItem>Favorite</UiDropdownMenuItem>
      <UiDropdownMenuSeparator />
      <UiDropdownMenuSub>
        <UiDropdownMenuSubTrigger>Labels</UiDropdownMenuSubTrigger>
        <UiDropdownMenuSubContent>
          <UiDropdownMenuRadioGroup :value="task.label">
            <UiDropdownMenuRadioItem
              v-for="label in homeTasksLabels"
              :key="label.value"
              :value="label.value"
            >
              {{ label.label }}
            </UiDropdownMenuRadioItem>
          </UiDropdownMenuRadioGroup>
        </UiDropdownMenuSubContent>
      </UiDropdownMenuSub>
      <UiDropdownMenuSeparator />
      <UiDropdownMenuItem>
        Delete
        <UiDropdownMenuShortcut>⌘⌫</UiDropdownMenuShortcut>
      </UiDropdownMenuItem>
    </UiDropdownMenuContent>
  </UiDropdownMenu>
</template>
