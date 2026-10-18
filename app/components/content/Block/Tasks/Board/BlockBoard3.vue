<template>
  <!--
    Compact kanban with a horizontal scroll
    Features: Fixed width columns in a scroll region that works with the keyboard, dense cards with priority bar, comment and attachment counts, stacked avatars and drag handles that leave the card text selectable
  -->
  <UiContainer class="py-12 lg:py-20">
    <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>

    <div
      class="-mx-4 mt-6 overflow-x-auto px-4 pb-4"
      tabindex="0"
      role="region"
      aria-label="Board columns, scroll sideways"
    >
      <div class="flex w-max gap-3">
        <section
          v-for="column in columns"
          :key="column.id"
          class="bg-muted/40 w-64 shrink-0 rounded-xl border p-2"
          :aria-label="column.title"
        >
          <header class="flex items-center justify-between px-2 py-1.5">
            <h2 class="text-sm font-semibold">{{ column.title }}</h2>
            <span class="text-muted-foreground text-xs tabular-nums">{{
              column.cards.length
            }}</span>
          </header>
          <UiDraggable
            v-model="column.cards"
            group="board3"
            item-key="id"
            handle=".drag-handle"
            :animation="150"
            ghost-class="opacity-40"
            class="flex min-h-12 flex-col gap-1.5"
          >
            <template #item="{ element }">
              <article
                class="bg-card relative flex overflow-hidden rounded-md border text-sm shadow-xs"
              >
                <span
                  class="w-1 shrink-0"
                  :class="priorityBar[element.priority]"
                  aria-hidden="true"
                />
                <div class="min-w-0 flex-1 p-2.5">
                  <div class="flex items-start gap-1">
                    <p class="flex-1 leading-snug font-medium">{{ element.title }}</p>
                    <span
                      class="drag-handle text-muted-foreground hover:text-foreground -mt-0.5 -mr-1 cursor-grab p-1"
                      aria-hidden="true"
                    >
                      <Icon name="lucide:grip-vertical" class="size-4" />
                    </span>
                  </div>
                  <div
                    class="text-muted-foreground mt-2.5 flex items-center justify-between text-xs"
                  >
                    <div class="flex items-center gap-2">
                      <span class="flex items-center gap-0.5"
                        ><Icon name="lucide:message-square" class="size-3.5" />{{
                          element.comments
                        }}</span
                      >
                      <span class="flex items-center gap-0.5"
                        ><Icon name="lucide:paperclip" class="size-3.5" />{{ element.files }}</span
                      >
                    </div>
                    <div class="flex -space-x-1.5">
                      <UiAvatar
                        v-for="person in element.people"
                        :key="person"
                        :src="`https://i.pravatar.cc/80?img=${person}`"
                        fallback="?"
                        class="ring-card size-5 ring-2"
                      />
                    </div>
                  </div>
                </div>
              </article>
            </template>
          </UiDraggable>
        </section>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Card = {
    id: string;
    title: string;
    priority: "high" | "medium" | "low";
    comments: number;
    files: number;
    people: number[];
  };
  type Column = { id: string; title: string; cards: Card[] };

  const props = withDefaults(
    defineProps<{
      title?: string;
      initial?: Column[];
    }>(),
    {
      title: "Product backlog",
      initial: () => [
        {
          id: "ideas",
          title: "Ideas",
          cards: [
            {
              id: "k1",
              title: "Offline mode for the mobile app",
              priority: "low",
              comments: 4,
              files: 0,
              people: [32],
            },
            {
              id: "k2",
              title: "Team activity digest email",
              priority: "medium",
              comments: 2,
              files: 1,
              people: [12, 44],
            },
          ],
        },
        {
          id: "planned",
          title: "Planned",
          cards: [
            {
              id: "k3",
              title: "Single sign on with SAML",
              priority: "high",
              comments: 9,
              files: 3,
              people: [45, 15],
            },
            {
              id: "k4",
              title: "Bulk edit for tasks",
              priority: "medium",
              comments: 1,
              files: 0,
              people: [12],
            },
          ],
        },
        {
          id: "building",
          title: "Building",
          cards: [
            {
              id: "k5",
              title: "New onboarding checklist",
              priority: "high",
              comments: 6,
              files: 2,
              people: [32, 44, 12],
            },
          ],
        },
        {
          id: "testing",
          title: "Testing",
          cards: [
            {
              id: "k6",
              title: "Faster search results",
              priority: "medium",
              comments: 3,
              files: 0,
              people: [15],
            },
          ],
        },
        {
          id: "shipped",
          title: "Shipped",
          cards: [
            {
              id: "k7",
              title: "Dark mode",
              priority: "low",
              comments: 12,
              files: 4,
              people: [32, 45],
            },
          ],
        },
      ],
    }
  );

  const priorityBar = {
    high: "bg-red-500",
    medium: "bg-amber-500",
    low: "bg-slate-300 dark:bg-slate-600",
  } as const;

  const columns = ref<Column[]>(
    props.initial.map((column) => ({ ...column, cards: column.cards.map((card) => ({ ...card })) }))
  );
</script>
