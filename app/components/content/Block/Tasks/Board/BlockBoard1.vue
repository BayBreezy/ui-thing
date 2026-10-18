<template>
  <!--
    Classic kanban board
    Features: Columns with counts, cards you can drag between columns, a move menu on every card as a keyboard alternative, inline add card form per column, labels, assignee avatars and due dates
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mb-6 flex items-end justify-between gap-4">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>
        <p class="text-muted-foreground mt-1 text-sm">
          Drag cards between columns, or use the menu on each card.
        </p>
      </div>
    </div>

    <div class="grid gap-4 md:grid-cols-3">
      <section
        v-for="column in columns"
        :key="column.id"
        class="bg-muted/40 flex min-h-0 flex-col rounded-xl border p-3"
        :aria-label="`${column.title} column`"
      >
        <header class="mb-3 flex items-center justify-between px-1">
          <h2 class="flex items-center gap-2 text-sm font-semibold">
            <span class="size-2 rounded-full" :class="column.dot" aria-hidden="true" />
            {{ column.title }}
            <UiBadge variant="secondary">{{ column.cards.length }}</UiBadge>
          </h2>
        </header>

        <UiDraggable
          v-model="column.cards"
          group="board1"
          item-key="id"
          :animation="150"
          ghost-class="opacity-40"
          class="flex min-h-16 flex-1 flex-col gap-2"
        >
          <template #item="{ element }">
            <article
              class="bg-card hover:border-primary/40 cursor-grab rounded-lg border p-3 shadow-xs active:cursor-grabbing"
            >
              <div class="flex items-start justify-between gap-2">
                <p class="text-sm font-medium">{{ element.title }}</p>
                <UiDropdownMenu>
                  <UiDropdownMenuTrigger as-child>
                    <UiButton
                      variant="ghost"
                      size="icon-sm"
                      class="-mt-1 -mr-1 size-6 shrink-0"
                      :aria-label="`Move ${element.title}`"
                    >
                      <Icon name="lucide:ellipsis" class="size-4" />
                    </UiButton>
                  </UiDropdownMenuTrigger>
                  <UiDropdownMenuContent align="end">
                    <UiDropdownMenuLabel>Move to</UiDropdownMenuLabel>
                    <UiDropdownMenuItem
                      v-for="target in columns.filter((item) => item.id !== column.id)"
                      :key="target.id"
                      @select="move(element, column, target)"
                    >
                      {{ target.title }}
                    </UiDropdownMenuItem>
                  </UiDropdownMenuContent>
                </UiDropdownMenu>
              </div>
              <div v-if="element.labels?.length" class="mt-2 flex flex-wrap gap-1">
                <UiBadge
                  v-for="label in element.labels"
                  :key="label.name"
                  variant="soft"
                  :color="label.color"
                  size="sm"
                  >{{ label.name }}</UiBadge
                >
              </div>
              <div class="text-muted-foreground mt-3 flex items-center justify-between text-xs">
                <span v-if="element.due" class="flex items-center gap-1">
                  <Icon name="lucide:calendar" class="size-3.5" />
                  {{ element.due }}
                </span>
                <span v-else />
                <UiAvatar :src="element.avatar" :fallback="element.assignee[0]" class="size-6" />
              </div>
            </article>
          </template>
        </UiDraggable>

        <form v-if="adding === column.id" class="mt-2 space-y-2" @submit.prevent="add(column)">
          <UiLabel :for="`new-${column.id}`" class="sr-only">New card title</UiLabel>
          <UiInput
            :id="`new-${column.id}`"
            v-model="draft"
            placeholder="Card title"
            autocomplete="off"
            @keydown.esc="adding = ''"
          />
          <div class="flex gap-2">
            <UiButton type="submit" size="sm" :disabled="!draft.trim()">Add card</UiButton>
            <UiButton type="button" variant="ghost" size="sm" @click="adding = ''">Cancel</UiButton>
          </div>
        </form>
        <UiButton
          v-else
          variant="ghost"
          size="sm"
          class="text-muted-foreground mt-2 justify-start"
          @click="startAdd(column.id)"
        >
          <Icon name="lucide:plus" class="size-4" />
          Add card
        </UiButton>
      </section>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Label = { name: string; color: "blue" | "green" | "amber" | "red" | "purple" };
  type Card = {
    id: string;
    title: string;
    assignee: string;
    avatar: string;
    due?: string;
    labels?: Label[];
  };
  type Column = { id: string; title: string; dot: string; cards: Card[] };

  const props = withDefaults(
    defineProps<{
      title?: string;
      initial?: Column[];
    }>(),
    {
      title: "Website relaunch",
      initial: () => [
        {
          id: "todo",
          title: "To do",
          dot: "bg-slate-400",
          cards: [
            {
              id: "c1",
              title: "Write the pricing page copy",
              assignee: "Aisha",
              avatar: "https://i.pravatar.cc/80?img=44",
              due: "Oct 24",
              labels: [{ name: "Content", color: "purple" }],
            },
            {
              id: "c2",
              title: "Audit image sizes",
              assignee: "Noah",
              avatar: "https://i.pravatar.cc/80?img=15",
              labels: [{ name: "Performance", color: "amber" }],
            },
            {
              id: "c3",
              title: "Plan the launch email",
              assignee: "Maya",
              avatar: "https://i.pravatar.cc/80?img=45",
              due: "Oct 30",
            },
          ],
        },
        {
          id: "doing",
          title: "In progress",
          dot: "bg-blue-500",
          cards: [
            {
              id: "c4",
              title: "Build the new navigation",
              assignee: "Liam",
              avatar: "https://i.pravatar.cc/80?img=12",
              due: "Oct 22",
              labels: [{ name: "Frontend", color: "blue" }],
            },
            {
              id: "c5",
              title: "Design the pricing table",
              assignee: "Sofia",
              avatar: "https://i.pravatar.cc/80?img=32",
              due: "Oct 23",
              labels: [{ name: "Design", color: "green" }],
            },
          ],
        },
        {
          id: "done",
          title: "Done",
          dot: "bg-green-500",
          cards: [
            {
              id: "c6",
              title: "Set up analytics",
              assignee: "Liam",
              avatar: "https://i.pravatar.cc/80?img=12",
              labels: [{ name: "Setup", color: "green" }],
            },
            {
              id: "c7",
              title: "Approve brand colors",
              assignee: "Maya",
              avatar: "https://i.pravatar.cc/80?img=45",
            },
          ],
        },
      ],
    }
  );

  const columns = ref<Column[]>(
    props.initial.map((column) => ({ ...column, cards: column.cards.map((card) => ({ ...card })) }))
  );
  const adding = ref("");
  const draft = ref("");
  let counter = 100;

  function startAdd(id: string) {
    adding.value = id;
    draft.value = "";
    nextTick(() => document.getElementById(`new-${id}`)?.focus());
  }

  function add(column: Column) {
    const title = draft.value.trim();
    if (!title) return;
    column.cards.push({
      id: `n${counter++}`,
      title,
      assignee: "You",
      avatar: "https://i.pravatar.cc/80?img=5",
    });
    draft.value = "";
    adding.value = "";
  }

  function move(card: Card, from: Column, to: Column) {
    from.cards = from.cards.filter((item) => item.id !== card.id);
    to.cards.push(card);
    useSonner.success(`Moved to ${to.title}`);
  }
</script>
