<template>
  <!--
    My tasks inbox with due date sections
    Features: Overdue, today, this week and later sections computed from dates, a reference date prop for stable demos, quick complete checkboxes, snooze menu and a celebration message when everything is done
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-2xl">
      <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>
      <p class="text-muted-foreground mt-1 text-sm">
        {{ openCount }} open · {{ overdueCount }} overdue
      </p>

      <p
        v-if="!openCount"
        class="mt-8 rounded-xl border border-dashed py-12 text-center"
        role="status"
      >
        <Icon name="lucide:party-popper" class="text-muted-foreground mx-auto size-8" />
        <span class="mt-2 block font-medium">You are all caught up</span>
      </p>

      <section v-for="group in sections" :key="group.label" class="mt-8" :aria-label="group.label">
        <h2
          class="mb-2 flex items-center gap-2 text-sm font-semibold"
          :class="group.label === 'Overdue' ? 'text-red-600 dark:text-red-400' : ''"
        >
          {{ group.label }}
          <UiBadge variant="secondary">{{ group.items.length }}</UiBadge>
        </h2>
        <ul class="divide-y rounded-xl border">
          <li v-for="task in group.items" :key="task.id" class="flex items-center gap-3 px-4 py-3">
            <UiCheckbox
              :id="`tl4-${task.id}`"
              :model-value="task.done"
              @update:model-value="task.done = Boolean($event)"
            />
            <div class="min-w-0 flex-1">
              <UiLabel :for="`tl4-${task.id}`" class="cursor-pointer font-medium">{{
                task.title
              }}</UiLabel>
              <p class="text-muted-foreground text-xs">
                {{ task.project }} · {{ formatDate(task.due) }}
              </p>
            </div>
            <UiDropdownMenu>
              <UiDropdownMenuTrigger as-child>
                <UiButton variant="ghost" size="icon-sm" :aria-label="`Snooze ${task.title}`"
                  ><Icon name="lucide:alarm-clock" class="size-4"
                /></UiButton>
              </UiDropdownMenuTrigger>
              <UiDropdownMenuContent align="end">
                <UiDropdownMenuLabel>Snooze until</UiDropdownMenuLabel>
                <UiDropdownMenuItem @select="snooze(task, 1)">Tomorrow</UiDropdownMenuItem>
                <UiDropdownMenuItem @select="snooze(task, 3)">In 3 days</UiDropdownMenuItem>
                <UiDropdownMenuItem @select="snooze(task, 7)">Next week</UiDropdownMenuItem>
              </UiDropdownMenuContent>
            </UiDropdownMenu>
          </li>
        </ul>
      </section>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Task = { id: string; title: string; project: string; due: string; done: boolean };

  const props = withDefaults(
    defineProps<{
      title?: string;
      /** The date sections are measured from (ISO). Use today's date in your own app. */
      today?: string;
      initial?: Task[];
    }>(),
    {
      title: "Inbox",
      today: "2026-10-18",
      initial: () => [
        {
          id: "d1",
          title: "Send the signed contract",
          project: "Legal",
          due: "2026-10-15",
          done: false,
        },
        {
          id: "d2",
          title: "Approve the homepage design",
          project: "Website",
          due: "2026-10-18",
          done: false,
        },
        {
          id: "d3",
          title: "Prepare the board update",
          project: "Company",
          due: "2026-10-18",
          done: false,
        },
        {
          id: "d4",
          title: "Review pull request 482",
          project: "Engineering",
          due: "2026-10-21",
          done: false,
        },
        {
          id: "d5",
          title: "Book travel for the offsite",
          project: "People",
          due: "2026-10-24",
          done: false,
        },
        {
          id: "d6",
          title: "Plan Q1 roadmap workshop",
          project: "Product",
          due: "2026-11-10",
          done: false,
        },
      ],
    }
  );

  const tasks = ref<Task[]>(props.initial.map((task) => ({ ...task })));

  const day = (iso: string) =>
    Math.round((new Date(iso).getTime() - new Date(props.today).getTime()) / 86_400_000);

  const sections = computed(() => {
    const open = tasks.value
      .filter((task) => !task.done)
      .sort((a, b) => a.due.localeCompare(b.due));
    return [
      { label: "Overdue", items: open.filter((task) => day(task.due) < 0) },
      { label: "Today", items: open.filter((task) => day(task.due) === 0) },
      { label: "This week", items: open.filter((task) => day(task.due) > 0 && day(task.due) <= 7) },
      { label: "Later", items: open.filter((task) => day(task.due) > 7) },
    ].filter((group) => group.items.length);
  });

  const openCount = computed(() => tasks.value.filter((task) => !task.done).length);
  const overdueCount = computed(
    () => tasks.value.filter((task) => !task.done && day(task.due) < 0).length
  );

  function snooze(task: Task, days: number) {
    const next = new Date(props.today);
    next.setUTCDate(next.getUTCDate() + days);
    task.due = next.toISOString().slice(0, 10);
    useSonner.info(`Snoozed to ${formatDate(task.due)}`);
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      timeZone: "UTC",
    });
  }
</script>
