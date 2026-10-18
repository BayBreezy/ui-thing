<template>
  <!--
    Sprint planning with backlog and sprint lists
    Features: Backlog and current sprint side by side, move stories with buttons or by dragging between lists, capacity meter that warns when the sprint is overcommitted, story points and a start sprint action
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>
        <p class="text-muted-foreground mt-1 text-sm">
          Drag stories between lists, or use the buttons.
        </p>
      </div>
      <UiButton
        :disabled="!sprint.length || committed > capacity"
        @click="useSonner.success(`Sprint started with ${sprint.length} stories`)"
      >
        <Icon name="lucide:play" class="size-4" />Start sprint
      </UiButton>
    </div>

    <div class="mt-6 rounded-xl border p-4">
      <div class="flex items-center justify-between text-sm">
        <span class="font-medium">Sprint capacity</span>
        <span
          :class="
            committed > capacity
              ? 'font-semibold text-red-600 dark:text-red-400'
              : 'text-muted-foreground'
          "
          aria-live="polite"
          >{{ committed }} / {{ capacity }} points<template v-if="committed > capacity">
            · over capacity</template
          ></span
        >
      </div>
      <UiProgress
        :model-value="Math.min(100, (committed / capacity) * 100)"
        class="mt-2 h-2"
        :class="committed > capacity ? '[&>div]:bg-red-500' : ''"
        aria-label="Sprint capacity used"
      />
    </div>

    <div class="mt-6 grid gap-6 md:grid-cols-2">
      <section v-for="list in lists" :key="list.id" :aria-label="list.title">
        <h2 class="mb-2 flex items-center justify-between text-sm font-semibold">
          {{ list.title }}
          <span class="text-muted-foreground font-normal"
            >{{ list.items.value.length }} stories · {{ points(list.items.value) }} pts</span
          >
        </h2>
        <UiDraggable
          v-model="list.items.value"
          group="sprint1"
          item-key="id"
          :animation="150"
          ghost-class="opacity-40"
          class="bg-muted/30 min-h-32 space-y-2 rounded-xl border border-dashed p-2"
        >
          <template #item="{ element }">
            <article
              class="bg-card flex cursor-grab items-center gap-3 rounded-lg border p-3 text-sm shadow-xs active:cursor-grabbing"
            >
              <div class="min-w-0 flex-1">
                <p class="font-medium">{{ element.title }}</p>
                <p class="text-muted-foreground text-xs">{{ element.key }}</p>
              </div>
              <UiBadge variant="secondary">{{ element.points }}</UiBadge>
              <UiButton
                variant="ghost"
                size="icon-sm"
                class="size-7"
                :aria-label="`${list.id === 'backlog' ? 'Add' : 'Remove'} ${element.title} ${list.id === 'backlog' ? 'to' : 'from'} the sprint`"
                @click="transfer(element, list.id)"
              >
                <Icon
                  :name="list.id === 'backlog' ? 'lucide:arrow-right' : 'lucide:arrow-left'"
                  class="size-4"
                />
              </UiButton>
            </article>
          </template>
        </UiDraggable>
      </section>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Story = { id: string; key: string; title: string; points: number };

  const props = withDefaults(
    defineProps<{
      title?: string;
      capacity?: number;
      backlog?: Story[];
      current?: Story[];
    }>(),
    {
      title: "Sprint 25 planning",
      capacity: 20,
      backlog: () => [
        { id: "b1", key: "WEB-201", title: "Single sign on with SAML", points: 8 },
        { id: "b2", key: "WEB-205", title: "Bulk edit tasks", points: 5 },
        { id: "b3", key: "WEB-209", title: "Improve search relevance", points: 5 },
        { id: "b4", key: "WEB-214", title: "Keyboard shortcuts help", points: 2 },
        { id: "b5", key: "WEB-218", title: "Export audit log", points: 3 },
      ],
      current: () => [
        { id: "s1", key: "WEB-190", title: "Fix double charge on upgrade", points: 3 },
        { id: "s2", key: "WEB-195", title: "Onboarding checklist", points: 8 },
      ],
    }
  );

  const backlog = ref<Story[]>(props.backlog.map((story) => ({ ...story })));
  const sprint = ref<Story[]>(props.current.map((story) => ({ ...story })));
  const lists = [
    { id: "backlog", title: "Backlog", items: backlog },
    { id: "sprint", title: "This sprint", items: sprint },
  ];

  const points = (stories: Story[]) => stories.reduce((sum, story) => sum + story.points, 0);
  const committed = computed(() => points(sprint.value));

  function transfer(story: Story, from: string) {
    if (from === "backlog") {
      backlog.value = backlog.value.filter((item) => item.id !== story.id);
      sprint.value.push(story);
    } else {
      sprint.value = sprint.value.filter((item) => item.id !== story.id);
      backlog.value.push(story);
    }
  }
</script>
