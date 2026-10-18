<template>
  <!--
    Kanban with collapsible columns
    Features: Each column collapses into a slim vertical strip with its count, an expand button with an accessible name, cards still accept drops while collapsed and smooth width transitions that respect reduced motion
  -->
  <UiContainer class="py-12 lg:py-20">
    <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>
    <p class="text-muted-foreground mt-1 mb-6 text-sm">
      Collapse columns you are not working on to give the rest more room.
    </p>

    <div class="flex gap-3 overflow-x-auto pb-2">
      <section
        v-for="column in columns"
        :key="column.id"
        class="bg-muted/40 shrink-0 rounded-xl border p-2 transition-[width] duration-200 motion-reduce:transition-none"
        :class="column.collapsed ? 'w-14' : 'w-72'"
        :aria-label="column.title"
      >
        <header
          class="flex items-center gap-1 px-1 py-1"
          :class="column.collapsed ? 'flex-col' : 'justify-between'"
        >
          <UiButton
            variant="ghost"
            size="icon-sm"
            class="size-7"
            :aria-expanded="!column.collapsed"
            :aria-label="`${column.collapsed ? 'Expand' : 'Collapse'} ${column.title}`"
            @click="column.collapsed = !column.collapsed"
          >
            <Icon
              :name="column.collapsed ? 'lucide:chevrons-right' : 'lucide:chevrons-left'"
              class="size-4"
            />
          </UiButton>
          <h2 v-if="!column.collapsed" class="flex-1 text-sm font-semibold">{{ column.title }}</h2>
          <h2 v-else class="text-sm font-semibold [writing-mode:vertical-rl]">
            {{ column.title }}
          </h2>
          <UiBadge variant="secondary">{{ column.cards.length }}</UiBadge>
        </header>
        <UiDraggable
          v-model="column.cards"
          group="board4"
          item-key="id"
          :animation="150"
          ghost-class="opacity-40"
          class="mt-2 flex flex-col gap-2"
          :class="column.collapsed ? 'min-h-24' : 'min-h-16'"
        >
          <template #item="{ element }">
            <article
              v-show="!column.collapsed"
              class="bg-card cursor-grab rounded-lg border p-3 text-sm shadow-xs active:cursor-grabbing"
            >
              <p class="font-medium">{{ element.title }}</p>
              <p class="text-muted-foreground mt-1 text-xs">{{ element.meta }}</p>
            </article>
          </template>
        </UiDraggable>
      </section>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Card = { id: string; title: string; meta: string };
  type Column = { id: string; title: string; collapsed?: boolean; cards: Card[] };

  const props = withDefaults(
    defineProps<{
      title?: string;
      initial?: Column[];
    }>(),
    {
      title: "Hiring pipeline",
      initial: () => [
        {
          id: "applied",
          title: "Applied",
          cards: [
            { id: "h1", title: "Priya Nair", meta: "Product designer · 2 days ago" },
            { id: "h2", title: "Lukas Meyer", meta: "Frontend engineer · 3 days ago" },
            { id: "h3", title: "Chloe Martin", meta: "Product designer · 5 days ago" },
          ],
        },
        {
          id: "screen",
          title: "Phone screen",
          cards: [{ id: "h4", title: "Marco Rossi", meta: "Backend engineer · Thursday 10:00" }],
        },
        {
          id: "onsite",
          title: "Onsite",
          collapsed: true,
          cards: [
            { id: "h5", title: "Tomás Silva", meta: "Data analyst · Monday 14:00" },
            { id: "h6", title: "Hannah Lee", meta: "Engineering manager · Friday 11:30" },
          ],
        },
        {
          id: "offer",
          title: "Offer",
          cards: [{ id: "h7", title: "Ethan Brooks", meta: "Design lead · Offer sent" }],
        },
      ],
    }
  );

  const columns = ref<Column[]>(
    props.initial.map((column) => ({
      ...column,
      collapsed: column.collapsed ?? false,
      cards: column.cards.map((card) => ({ ...card })),
    }))
  );
</script>
