<template>
  <!--
    Kanban with work in progress limits
    Features: Column headers that show count and limit, a warning state when a column is over its limit, drops refused when a column is full, a message that explains why and a reset button
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>
        <p class="text-muted-foreground mt-1 text-sm">
          Columns stop accepting cards when they reach their limit.
        </p>
      </div>
      <UiButton variant="outline" size="sm" @click="reset"
        ><Icon name="lucide:rotate-ccw" class="size-4" />Reset</UiButton
      >
    </div>

    <UiAlert
      v-if="notice"
      variant="warning"
      icon="lucide:triangle-alert"
      :title="notice"
      class="mb-4"
      role="status"
    />

    <div class="grid gap-4 md:grid-cols-3">
      <section
        v-for="column in columns"
        :key="column.id"
        class="rounded-xl border p-3"
        :class="full(column) ? 'border-amber-500/60 bg-amber-500/5' : 'bg-muted/40'"
        :aria-label="column.title"
      >
        <header class="mb-3 flex items-center justify-between px-1">
          <h2 class="text-sm font-semibold">{{ column.title }}</h2>
          <UiBadge
            v-if="column.limit"
            :variant="full(column) ? 'soft' : 'secondary'"
            :color="full(column) ? 'amber' : undefined"
          >
            {{ column.cards.length }} / {{ column.limit }}
            <span class="sr-only">{{ full(column) ? "limit reached" : "within limit" }}</span>
          </UiBadge>
          <UiBadge v-else variant="secondary">{{ column.cards.length }}</UiBadge>
        </header>
        <UiDraggable
          v-model="column.cards"
          :group="{ name: 'board5', put: () => !full(column) }"
          item-key="id"
          :animation="150"
          ghost-class="opacity-40"
          class="flex min-h-20 flex-col gap-2"
          @change="(event: any) => event.added && check(column)"
        >
          <template #item="{ element }">
            <article
              class="bg-card cursor-grab rounded-lg border p-3 text-sm shadow-xs active:cursor-grabbing"
            >
              <p class="font-medium">{{ element.title }}</p>
              <p class="text-muted-foreground mt-1 text-xs">{{ element.owner }}</p>
            </article>
          </template>
        </UiDraggable>
      </section>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Card = { id: string; title: string; owner: string };
  type Column = { id: string; title: string; limit?: number; cards: Card[] };

  const props = withDefaults(
    defineProps<{
      title?: string;
      initial?: Column[];
    }>(),
    {
      title: "Support queue",
      initial: () => [
        {
          id: "new",
          title: "New",
          cards: [
            { id: "w1", title: "Refund request from Globex", owner: "Unassigned" },
            { id: "w2", title: "Login issue for Initech", owner: "Unassigned" },
            { id: "w3", title: "Question about invoices", owner: "Unassigned" },
            { id: "w4", title: "Feature request: dark mode", owner: "Unassigned" },
          ],
        },
        {
          id: "working",
          title: "Working",
          limit: 3,
          cards: [
            { id: "w5", title: "Billing bug for Umbrella", owner: "Liam" },
            { id: "w6", title: "Data export is slow", owner: "Sofia" },
          ],
        },
        {
          id: "review",
          title: "In review",
          limit: 2,
          cards: [
            { id: "w7", title: "SSO setup for Hooli", owner: "Maya" },
            { id: "w8", title: "Webhook failures", owner: "Noah" },
          ],
        },
      ],
    }
  );

  const columns = ref<Column[]>(
    props.initial.map((column) => ({ ...column, cards: column.cards.map((card) => ({ ...card })) }))
  );
  const notice = ref("");

  const full = (column: Column) =>
    column.limit !== undefined && column.cards.length >= column.limit;

  function check(column: Column) {
    notice.value = full(column)
      ? `${column.title} has reached its limit of ${column.limit}. Finish something before pulling in more.`
      : "";
  }

  function reset() {
    columns.value = props.initial.map((column) => ({
      ...column,
      cards: column.cards.map((card) => ({ ...card })),
    }));
    notice.value = "";
  }
</script>
