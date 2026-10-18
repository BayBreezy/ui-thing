<template>
  <!--
    Kanban board with search and filters
    Features: Search across card titles, assignee and label filters, a result count, cards that do not match are hidden but keep their place in the column, clear filters and an empty message when nothing matches
  -->
  <UiContainer class="py-12 lg:py-20">
    <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>

    <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
      <div class="relative sm:w-64">
        <UiLabel for="board6-search" class="sr-only">Search cards</UiLabel>
        <Icon
          name="lucide:search"
          class="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
        />
        <UiInput id="board6-search" v-model="query" placeholder="Search cards" class="pl-9" />
      </div>
      <UiSelect v-model="assignee">
        <UiSelectTrigger class="sm:w-44" aria-label="Filter by assignee"
          ><UiSelectValue
        /></UiSelectTrigger>
        <UiSelectContent>
          <UiSelectItem value="all">Everyone</UiSelectItem>
          <UiSelectItem v-for="person in people" :key="person" :value="person">{{
            person
          }}</UiSelectItem>
        </UiSelectContent>
      </UiSelect>
      <UiSelect v-model="label">
        <UiSelectTrigger class="sm:w-44" aria-label="Filter by label"
          ><UiSelectValue
        /></UiSelectTrigger>
        <UiSelectContent>
          <UiSelectItem value="all">All labels</UiSelectItem>
          <UiSelectItem v-for="item in labels" :key="item" :value="item">{{ item }}</UiSelectItem>
        </UiSelectContent>
      </UiSelect>
      <UiButton v-if="filtering" variant="ghost" size="sm" @click="clear">Clear filters</UiButton>
      <p class="text-muted-foreground text-sm sm:ml-auto" aria-live="polite">
        {{ visible }} of {{ total }} cards
      </p>
    </div>

    <p
      v-if="!visible"
      class="text-muted-foreground mt-6 rounded-lg border border-dashed py-8 text-center text-sm"
      role="status"
    >
      No cards match your filters.
    </p>

    <div class="mt-4 grid gap-4 md:grid-cols-3">
      <section
        v-for="column in columns"
        :key="column.id"
        class="bg-muted/40 rounded-xl border p-3"
        :aria-label="column.title"
      >
        <header class="mb-3 flex items-center justify-between px-1">
          <h2 class="text-sm font-semibold">{{ column.title }}</h2>
          <UiBadge variant="secondary">{{ column.cards.filter(matches).length }}</UiBadge>
        </header>
        <UiDraggable
          v-model="column.cards"
          group="board6"
          item-key="id"
          :animation="150"
          ghost-class="opacity-40"
          class="flex min-h-16 flex-col gap-2"
        >
          <template #item="{ element }">
            <article
              v-show="matches(element)"
              class="bg-card cursor-grab rounded-lg border p-3 text-sm shadow-xs active:cursor-grabbing"
            >
              <p class="font-medium">{{ element.title }}</p>
              <div class="mt-2 flex items-center justify-between">
                <UiBadge variant="soft" color="blue" size="sm">{{ element.label }}</UiBadge>
                <span class="text-muted-foreground flex items-center gap-1.5 text-xs">
                  <UiAvatar :src="element.avatar" :fallback="element.assignee[0]" class="size-5" />
                  {{ element.assignee }}
                </span>
              </div>
            </article>
          </template>
        </UiDraggable>
      </section>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Card = { id: string; title: string; assignee: string; avatar: string; label: string };
  type Column = { id: string; title: string; cards: Card[] };

  const props = withDefaults(
    defineProps<{
      title?: string;
      initial?: Column[];
    }>(),
    {
      title: "Q4 roadmap",
      initial: () => [
        {
          id: "plan",
          title: "Planned",
          cards: [
            {
              id: "f1",
              title: "Public API v2",
              assignee: "Liam",
              avatar: "https://i.pravatar.cc/80?img=12",
              label: "Platform",
            },
            {
              id: "f2",
              title: "Redesigned billing page",
              assignee: "Sofia",
              avatar: "https://i.pravatar.cc/80?img=32",
              label: "Design",
            },
            {
              id: "f3",
              title: "Usage based pricing",
              assignee: "Maya",
              avatar: "https://i.pravatar.cc/80?img=45",
              label: "Growth",
            },
          ],
        },
        {
          id: "build",
          title: "In progress",
          cards: [
            {
              id: "f4",
              title: "Audit log export",
              assignee: "Noah",
              avatar: "https://i.pravatar.cc/80?img=15",
              label: "Platform",
            },
            {
              id: "f5",
              title: "Onboarding checklist",
              assignee: "Sofia",
              avatar: "https://i.pravatar.cc/80?img=32",
              label: "Growth",
            },
          ],
        },
        {
          id: "ship",
          title: "Shipped",
          cards: [
            {
              id: "f6",
              title: "Dark mode",
              assignee: "Liam",
              avatar: "https://i.pravatar.cc/80?img=12",
              label: "Design",
            },
            {
              id: "f7",
              title: "Slack integration",
              assignee: "Noah",
              avatar: "https://i.pravatar.cc/80?img=15",
              label: "Platform",
            },
          ],
        },
      ],
    }
  );

  const columns = ref<Column[]>(
    props.initial.map((column) => ({ ...column, cards: column.cards.map((card) => ({ ...card })) }))
  );
  const query = ref("");
  const assignee = ref("all");
  const label = ref("all");

  const all = computed(() => columns.value.flatMap((column) => column.cards));
  const people = computed(() => [...new Set(all.value.map((card) => card.assignee))]);
  const labels = computed(() => [...new Set(all.value.map((card) => card.label))]);

  function matches(card: Card) {
    const term = query.value.trim().toLowerCase();
    return (
      (!term || card.title.toLowerCase().includes(term)) &&
      (assignee.value === "all" || card.assignee === assignee.value) &&
      (label.value === "all" || card.label === label.value)
    );
  }

  const total = computed(() => all.value.length);
  const visible = computed(() => all.value.filter(matches).length);
  const filtering = computed(
    () => query.value || assignee.value !== "all" || label.value !== "all"
  );

  function clear() {
    query.value = "";
    assignee.value = "all";
    label.value = "all";
  }
</script>
