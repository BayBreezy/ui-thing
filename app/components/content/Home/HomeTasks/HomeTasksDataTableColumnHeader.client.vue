<script setup lang="ts">
  import type { Column } from "@tanstack/vue-table";
  import { twMerge } from "tailwind-merge";
  import type { HTMLAttributes } from "vue";

  interface DataTableColumnHeaderProps {
    column: Column<HomeTaskTableFeatures, HomeTask, any>;
    title: string;
    class?: HTMLAttributes["class"];
  }

  defineProps<DataTableColumnHeaderProps>();
</script>

<script lang="ts">
  export default {
    inheritAttrs: false,
  };
</script>

<template>
  <div
    v-if="column.getCanSort()"
    :class="twMerge('flex items-center space-x-2', $props.class ?? '')"
  >
    <UiDropdownMenu>
      <UiDropdownMenuTrigger as-child>
        <UiButton variant="ghost" size="sm" class="data-[state=open]:bg-accent -ml-3 h-8">
          <span>{{ title }}</span>
          <Icon
            v-if="column.getIsSorted() === 'desc'"
            name="lucide:arrow-down"
            class="ml-2 h-4 w-4"
          />
          <Icon
            v-else-if="column.getIsSorted() === 'asc'"
            name="lucide:arrow-up"
            class="ml-2 h-4 w-4"
          />
          <Icon v-else name="lucide:chevrons-up-down" class="ml-2 size-4" />
        </UiButton>
      </UiDropdownMenuTrigger>
      <UiDropdownMenuContent align="start">
        <UiDropdownMenuItem @click="column.toggleSorting(false)">
          <Icon name="lucide:arrow-up" class="text-muted-foreground/70 mr-2 size-3.5" />
          Asc
        </UiDropdownMenuItem>
        <UiDropdownMenuItem @click="column.toggleSorting(true)">
          <Icon name="lucide:arrow-down" class="text-muted-foreground/70 mr-2 size-3.5" />
          Desc
        </UiDropdownMenuItem>
        <UiDropdownMenuSeparator />
        <UiDropdownMenuItem @click="column.toggleVisibility(false)">
          <Icon name="lucide:eye-off" class="text-muted-foreground/70 mr-2 size-3.5" />
          Hide
        </UiDropdownMenuItem>
      </UiDropdownMenuContent>
    </UiDropdownMenu>
  </div>

  <div v-else :class="$attrs.class">
    {{ title }}
  </div>
</template>
