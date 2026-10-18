<template>
  <!--
    List page header with stats and a working filter toolbar
    Features: Title with count badge, trend stats, search, status filter, sort select, list and grid view toggle, active filter chips with clear
  -->
  <UiContainer class="px-4 py-6 md:px-8">
    <Motion
      class="flex flex-col gap-6"
      :initial="{ opacity: 0, y: 8 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ type: 'spring', stiffness: 180, damping: 22 }"
    >
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <slot name="title">
            <h1 class="flex items-center gap-2 text-2xl font-bold tracking-tight">
              {{ props.title }}
              <UiBadge variant="secondary" class="tabular-nums">{{ total }}</UiBadge>
            </h1>
          </slot>
          <slot name="description">
            <p class="text-muted-foreground mt-1 text-sm">{{ props.description }}</p>
          </slot>
        </div>
        <slot>
          <div class="flex items-center gap-2">
            <UiButton variant="outline">
              <Icon name="lucide:download" class="size-4" />
              Export
            </UiButton>
            <UiButton>
              <Icon name="lucide:plus" class="size-4" />
              Add task
            </UiButton>
          </div>
        </slot>
      </div>

      <div class="grid grid-cols-3 divide-x rounded-xl border">
        <div v-for="stat in props.stats" :key="stat.label" class="px-4 py-3 md:px-5">
          <p class="text-muted-foreground text-xs">{{ stat.label }}</p>
          <div class="mt-1 flex items-baseline gap-2">
            <span class="text-xl font-bold tabular-nums md:text-2xl">{{ stat.value }}</span>
            <span
              class="hidden items-center text-xs font-medium sm:flex"
              :class="stat.up ? 'text-green-600' : 'text-red-500'"
            >
              <Icon
                :name="stat.up ? 'lucide:trending-up' : 'lucide:trending-down'"
                class="mr-0.5 size-3"
              />
              {{ stat.change }}
            </span>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-3">
        <div class="flex flex-wrap items-center gap-2">
          <div class="relative min-w-48 flex-1 md:max-w-xs">
            <Icon
              name="lucide:search"
              class="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
            />
            <UiInput
              v-model="query"
              placeholder="Search tasks"
              class="pl-9"
              aria-label="Search tasks"
            />
          </div>
          <UiNativeSelect v-model="status" class="w-36" aria-label="Status">
            <option value="">All statuses</option>
            <option v-for="option in props.statuses" :key="option">{{ option }}</option>
          </UiNativeSelect>
          <UiNativeSelect v-model="sort" class="w-40" aria-label="Sort by">
            <option>Newest first</option>
            <option>Oldest first</option>
            <option>Due date</option>
          </UiNativeSelect>
          <UiToggleGroup
            v-model="view"
            type="single"
            variant="outline"
            class="ml-auto"
            aria-label="View"
          >
            <UiToggleGroupItem value="list" aria-label="List view">
              <Icon name="lucide:list" class="size-4" />
            </UiToggleGroupItem>
            <UiToggleGroupItem value="grid" aria-label="Grid view">
              <Icon name="lucide:layout-grid" class="size-4" />
            </UiToggleGroupItem>
          </UiToggleGroup>
        </div>

        <div v-if="chips.length" class="flex flex-wrap items-center gap-2">
          <span class="text-muted-foreground text-xs">Filters</span>
          <button
            v-for="chip in chips"
            :key="chip.label"
            type="button"
            class="bg-muted hover:bg-accent flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-colors"
            @click="chip.clear()"
          >
            {{ chip.label }}
            <Icon name="lucide:x" class="size-3" />
          </button>
          <UiButton variant="link" size="xs" @click="clearAll">Clear all</UiButton>
        </div>
      </div>
    </Motion>
  </UiContainer>
</template>

<script lang="ts" setup>
  const props = withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      stats?: { label: string; value: string; change: string; up: boolean }[];
      statuses?: string[];
    }>(),
    {
      title: "Tasks",
      description: "Everything your team is working on this sprint.",
      stats: () => [
        { label: "Total", value: "156", change: "12%", up: true },
        { label: "Active", value: "42", change: "4%", up: true },
        { label: "Completed", value: "114", change: "2%", up: false },
      ],
      statuses: () => ["To do", "In progress", "In review", "Done"],
    }
  );

  const total = computed(() => props.stats[0]?.value);
  const query = ref("");
  const status = ref("");
  const sort = ref("Newest first");
  const view = ref("list");

  const chips = computed(() => [
    ...(query.value ? [{ label: `"${query.value}"`, clear: () => (query.value = "") }] : []),
    ...(status.value ? [{ label: status.value, clear: () => (status.value = "") }] : []),
  ]);

  function clearAll() {
    query.value = "";
    status.value = "";
  }
</script>
