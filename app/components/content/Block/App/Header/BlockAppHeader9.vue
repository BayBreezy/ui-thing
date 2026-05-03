<template>
  <UiContainer class="px-4 py-5 md:px-6">
    <div class="flex flex-col gap-5">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <slot name="title">
          <h1 v-if="props.title" class="text-xl font-bold" v-html="props.title" />
        </slot>
        <div class="flex flex-wrap items-center gap-2">
          <slot name="actions">
            <UiButton variant="ghost" size="sm">
              <Icon name="lucide:filter" class="size-4" />
              Filter
            </UiButton>
            <UiButton variant="ghost" size="sm">
              <Icon name="lucide:download" class="size-4" />
              Export
            </UiButton>
            <UiButton size="sm">
              <Icon name="lucide:plus" class="size-4" />
              Add item
            </UiButton>
          </slot>
        </div>
      </div>
      <div class="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <slot name="stats">
          <div class="grid grid-cols-3 place-items-center md:flex md:flex-wrap md:gap-5">
            <div class="flex flex-col gap-1">
              <span class="text-muted-foreground text-xs font-medium">Total items</span>
              <span class="text-2xl font-bold">{{ props.totalItems }}</span>
            </div>
            <UiSeparator orientation="vertical" class="hidden h-12 md:block" />
            <div class="flex flex-col gap-1">
              <span class="text-muted-foreground text-xs font-medium">Active</span>
              <span class="text-primary text-2xl font-bold">{{ props.activeItems }}</span>
            </div>
            <UiSeparator orientation="vertical" class="hidden h-12 md:block" />
            <div class="flex flex-col gap-1">
              <span class="text-muted-foreground text-xs font-medium">Completed</span>
              <span class="text-muted-foreground text-2xl font-bold">{{
                props.completedItems
              }}</span>
            </div>
          </div>
        </slot>
        <slot name="search">
          <div class="relative w-full md:w-64">
            <UiVeeInput icon="lucide:search" :placeholder="props.searchPlaceholder" />
          </div>
        </slot>
      </div>
      <UiSeparator />
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      title?: string;
      totalItems?: number;
      activeItems?: number;
      completedItems?: number;
      searchPlaceholder?: string;
    }>(),
    {
      title: "Tasks",
      totalItems: 156,
      activeItems: 42,
      completedItems: 114,
      searchPlaceholder: "Search tasks...",
    }
  );
</script>
