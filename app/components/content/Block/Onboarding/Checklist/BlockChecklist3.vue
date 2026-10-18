<template>
  <!--
    Collapsible checklist widget
    Features: Floating style widget with a header that collapses and expands, progress bar always visible, expandable task details, minimise and close buttons and a restore button after closing
  -->
  <UiContainer class="py-16 lg:py-24">
    <div class="mx-auto flex max-w-md justify-center">
      <UiCollapsible
        v-if="!closed"
        v-model:open="open"
        class="bg-card w-full rounded-xl border shadow-lg"
      >
        <div class="flex items-center gap-3 p-4">
          <UiCircularProgress
            :current-step="done"
            :total-steps="tasks.length"
            size="sm"
            aria-label="Checklist progress"
          />
          <div class="min-w-0 flex-1">
            <p class="text-sm font-semibold">Setup guide</p>
            <p class="text-muted-foreground text-xs" aria-live="polite">
              {{ done }} of {{ tasks.length }} complete
            </p>
          </div>
          <UiCollapsibleTrigger as-child>
            <UiButton
              variant="ghost"
              size="icon-sm"
              :aria-label="open ? 'Minimise setup guide' : 'Expand setup guide'"
            >
              <Icon
                name="lucide:chevron-down"
                class="size-4 transition-transform"
                :class="open ? '' : 'rotate-180'"
              />
            </UiButton>
          </UiCollapsibleTrigger>
          <UiButton
            variant="ghost"
            size="icon-sm"
            aria-label="Close setup guide"
            @click="closed = true"
          >
            <Icon name="lucide:x" class="size-4" />
          </UiButton>
        </div>
        <UiProgress
          :model-value="(done / tasks.length) * 100"
          class="h-1 rounded-none"
          aria-hidden="true"
        />
        <UiCollapsibleContent>
          <ul class="divide-y">
            <li v-for="task in tasks" :key="task.id">
              <button
                type="button"
                class="hover:bg-muted/50 focus-visible:ring-ring/50 flex w-full items-center gap-3 px-4 py-3 text-left outline-none focus-visible:ring-[3px] focus-visible:ring-inset"
                :aria-expanded="expanded === task.id"
                :aria-controls="`task-panel-${task.id}`"
                @click="expanded = expanded === task.id ? '' : task.id"
              >
                <span
                  class="grid size-5 shrink-0 place-items-center rounded-full border"
                  :class="task.done ? 'border-green-500 bg-green-500 text-white' : ''"
                >
                  <Icon v-if="task.done" name="lucide:check" class="size-3" />
                </span>
                <span
                  class="flex-1 text-sm font-medium"
                  :class="task.done ? 'text-muted-foreground line-through' : ''"
                >
                  {{ task.title }}
                </span>
              </button>
              <div
                v-if="expanded === task.id"
                :id="`task-panel-${task.id}`"
                class="px-4 pb-4 pl-12"
              >
                <p class="text-muted-foreground text-sm">{{ task.description }}</p>
                <UiButton v-if="!task.done" size="sm" class="mt-3" @click="task.done = true">
                  Mark as done
                </UiButton>
              </div>
            </li>
          </ul>
        </UiCollapsibleContent>
      </UiCollapsible>
      <UiButton v-else variant="outline" @click="closed = false">
        <Icon name="lucide:list-checks" class="size-4" />
        Show setup guide
      </UiButton>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Task = { id: string; title: string; description: string; done: boolean };

  const props = withDefaults(
    defineProps<{
      items?: Task[];
    }>(),
    {
      items: () => [
        {
          id: "a",
          title: "Create a project",
          description: "Projects hold your tasks, files and conversations.",
          done: true,
        },
        {
          id: "b",
          title: "Add your first task",
          description: "Break the work into small, finishable pieces.",
          done: false,
        },
        {
          id: "c",
          title: "Invite your team",
          description: "Share the project so everyone stays in sync.",
          done: false,
        },
        {
          id: "d",
          title: "Turn on notifications",
          description: "Never miss a mention or a deadline.",
          done: false,
        },
      ],
    }
  );

  const tasks = ref<Task[]>(props.items.map((item) => ({ ...item })));
  const open = ref(true);
  const closed = ref(false);
  const expanded = ref("");

  const done = computed(() => tasks.value.filter((task) => task.done).length);
</script>
