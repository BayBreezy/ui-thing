<template>
  <!--
    Backlog list with drag to reorder
    Features: Drag handle on every row to change priority order, rank numbers that update, move up and down buttons as a keyboard alternative, estimate badges and a total estimate
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-2xl">
      <div class="flex items-end justify-between gap-4">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>
          <p class="text-muted-foreground mt-1 text-sm">
            Highest priority at the top. Drag the handle or use the arrows.
          </p>
        </div>
        <p class="text-muted-foreground text-sm whitespace-nowrap">{{ total }} points</p>
      </div>

      <UiDraggable
        v-model="items"
        item-key="id"
        handle=".handle"
        :animation="150"
        ghost-class="opacity-40"
        tag="ol"
        class="mt-6 divide-y rounded-xl border"
      >
        <template #item="{ element, index }">
          <li class="bg-card flex items-center gap-3 px-3 py-3">
            <span
              class="handle text-muted-foreground hover:text-foreground cursor-grab p-1"
              aria-hidden="true"
              ><Icon name="lucide:grip-vertical" class="size-4"
            /></span>
            <span class="text-muted-foreground w-5 text-center text-sm tabular-nums">{{
              index + 1
            }}</span>
            <div class="min-w-0 flex-1">
              <p class="truncate text-sm font-medium">{{ element.title }}</p>
              <p class="text-muted-foreground text-xs">{{ element.type }}</p>
            </div>
            <UiBadge variant="secondary">{{ element.points }} pts</UiBadge>
            <div class="flex">
              <UiButton
                variant="ghost"
                size="icon-sm"
                class="size-7"
                :disabled="index === 0"
                :aria-label="`Move ${element.title} up`"
                @click="move(index, -1)"
                ><Icon name="lucide:chevron-up" class="size-4"
              /></UiButton>
              <UiButton
                variant="ghost"
                size="icon-sm"
                class="size-7"
                :disabled="index === items.length - 1"
                :aria-label="`Move ${element.title} down`"
                @click="move(index, 1)"
                ><Icon name="lucide:chevron-down" class="size-4"
              /></UiButton>
            </div>
          </li>
        </template>
      </UiDraggable>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Item = { id: string; title: string; type: string; points: number };

  const props = withDefaults(
    defineProps<{
      title?: string;
      initial?: Item[];
    }>(),
    {
      title: "Backlog",
      initial: () => [
        { id: "p1", title: "Single sign on with SAML", type: "Feature", points: 8 },
        { id: "p2", title: "Fix double charge on upgrade", type: "Bug", points: 3 },
        { id: "p3", title: "Bulk edit tasks", type: "Feature", points: 5 },
        { id: "p4", title: "Improve search relevance", type: "Improvement", points: 5 },
        { id: "p5", title: "Add keyboard shortcuts help", type: "Improvement", points: 2 },
      ],
    }
  );

  const items = ref<Item[]>(props.initial.map((item) => ({ ...item })));
  const total = computed(() => items.value.reduce((sum, item) => sum + item.points, 0));

  function move(index: number, step: number) {
    const next = index + step;
    if (next < 0 || next >= items.value.length) return;
    const copy = [...items.value];
    [copy[index], copy[next]] = [copy[next]!, copy[index]!];
    items.value = copy;
  }
</script>
