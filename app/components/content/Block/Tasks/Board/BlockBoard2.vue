<template>
  <!--
    Kanban board with swimlanes
    Features: Rows grouped by priority and shared status columns, a draggable list in every cell, cards move across lanes and columns, lane headers with counts and collapsible lanes
  -->
  <UiContainer class="py-12 lg:py-20">
    <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>
    <p class="text-muted-foreground mt-1 mb-6 text-sm">
      Drag a card to change its status or its priority.
    </p>

    <div class="overflow-x-auto">
      <div class="grid min-w-[44rem] grid-cols-[8rem_repeat(3,1fr)] gap-2">
        <div />
        <h2
          v-for="status in statuses"
          :key="status"
          class="text-muted-foreground px-2 pb-1 text-xs font-semibold tracking-wide uppercase"
        >
          {{ status }}
        </h2>

        <template v-for="lane in lanes" :key="lane.id">
          <div class="flex items-start gap-1 pt-2">
            <UiButton
              variant="ghost"
              size="icon-sm"
              class="size-6"
              :aria-expanded="!collapsed.includes(lane.id)"
              :aria-label="`${collapsed.includes(lane.id) ? 'Expand' : 'Collapse'} ${lane.title} priority`"
              @click="toggle(lane.id)"
            >
              <Icon
                name="lucide:chevron-down"
                class="size-4 transition-transform"
                :class="collapsed.includes(lane.id) ? '-rotate-90' : ''"
              />
            </UiButton>
            <div>
              <p class="flex items-center gap-1.5 text-sm font-semibold">
                <span class="size-2 rounded-full" :class="lane.dot" aria-hidden="true" />
                {{ lane.title }}
              </p>
              <p class="text-muted-foreground text-xs">{{ count(lane) }} cards</p>
            </div>
          </div>
          <template v-if="!collapsed.includes(lane.id)">
            <UiDraggable
              v-for="(cell, index) in lane.cells"
              :key="`${lane.id}-${index}`"
              v-model="lane.cells[index]"
              group="board2"
              item-key="id"
              :animation="150"
              ghost-class="opacity-40"
              class="bg-muted/40 flex min-h-20 flex-col gap-2 rounded-lg border border-dashed p-2"
            >
              <template #item="{ element }">
                <article
                  class="bg-card cursor-grab rounded-md border p-2.5 text-sm shadow-xs active:cursor-grabbing"
                >
                  <p class="font-medium">{{ element.title }}</p>
                  <div class="text-muted-foreground mt-2 flex items-center gap-2 text-xs">
                    <UiAvatar
                      :src="element.avatar"
                      :fallback="element.assignee[0]"
                      class="size-5"
                    />
                    {{ element.assignee }}
                  </div>
                </article>
              </template>
            </UiDraggable>
          </template>
          <p v-else class="text-muted-foreground col-span-3 flex items-center text-xs">
            {{ count(lane) }} cards hidden
          </p>
        </template>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Card = { id: string; title: string; assignee: string; avatar: string };
  type Lane = { id: string; title: string; dot: string; cells: Card[][] };

  const props = withDefaults(
    defineProps<{
      title?: string;
      statuses?: string[];
      initial?: Lane[];
    }>(),
    {
      title: "Sprint 24",
      statuses: () => ["To do", "In progress", "Done"],
      initial: () => [
        {
          id: "high",
          title: "High",
          dot: "bg-red-500",
          cells: [
            [
              {
                id: "s1",
                title: "Fix checkout crash on Safari",
                assignee: "Liam",
                avatar: "https://i.pravatar.cc/80?img=12",
              },
            ],
            [
              {
                id: "s2",
                title: "Rotate leaked API key",
                assignee: "Maya",
                avatar: "https://i.pravatar.cc/80?img=45",
              },
            ],
            [],
          ],
        },
        {
          id: "medium",
          title: "Medium",
          dot: "bg-amber-500",
          cells: [
            [
              {
                id: "s3",
                title: "Add CSV export",
                assignee: "Noah",
                avatar: "https://i.pravatar.cc/80?img=15",
              },
              {
                id: "s4",
                title: "Improve empty states",
                assignee: "Sofia",
                avatar: "https://i.pravatar.cc/80?img=32",
              },
            ],
            [
              {
                id: "s5",
                title: "Dark mode polish",
                assignee: "Sofia",
                avatar: "https://i.pravatar.cc/80?img=32",
              },
            ],
            [
              {
                id: "s6",
                title: "Update dependencies",
                assignee: "Liam",
                avatar: "https://i.pravatar.cc/80?img=12",
              },
            ],
          ],
        },
        {
          id: "low",
          title: "Low",
          dot: "bg-slate-400",
          cells: [
            [
              {
                id: "s7",
                title: "Refresh the 404 page",
                assignee: "Aisha",
                avatar: "https://i.pravatar.cc/80?img=44",
              },
            ],
            [],
            [
              {
                id: "s8",
                title: "Rename legacy settings",
                assignee: "Noah",
                avatar: "https://i.pravatar.cc/80?img=15",
              },
            ],
          ],
        },
      ],
    }
  );

  const lanes = ref<Lane[]>(
    props.initial.map((lane) => ({
      ...lane,
      cells: lane.cells.map((cell) => cell.map((card) => ({ ...card }))),
    }))
  );
  const collapsed = ref<string[]>([]);

  const count = (lane: Lane) => lane.cells.reduce((sum, cell) => sum + cell.length, 0);

  function toggle(id: string) {
    collapsed.value = collapsed.value.includes(id)
      ? collapsed.value.filter((item) => item !== id)
      : [...collapsed.value, id];
  }
</script>
