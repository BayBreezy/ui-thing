<template>
  <!--
    Project header with key stats
    Features: Project title with status badge and team avatars, deadline countdown, four stat cards for tasks, completed, overdue and progress, a progress bar and quick actions
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <div class="flex flex-wrap items-center gap-3">
          <h1 class="text-3xl font-bold tracking-tight">{{ project.name }}</h1>
          <UiBadge
            variant="soft"
            :color="project.status === 'On track' ? 'green' : 'amber'"
            shape="pill"
            >{{ project.status }}</UiBadge
          >
        </div>
        <p class="text-muted-foreground mt-2 max-w-xl text-sm">{{ project.description }}</p>
        <div class="mt-4 flex items-center gap-3">
          <div class="flex -space-x-2">
            <UiAvatar
              v-for="member in project.team"
              :key="member.name"
              :src="member.avatar"
              :fallback="member.name[0]"
              class="ring-background size-8 ring-2"
            />
          </div>
          <span class="text-muted-foreground text-sm">{{ project.team.length }} members</span>
        </div>
      </div>
      <div class="flex gap-2">
        <UiButton variant="outline" @click="useSonner.info('Open your share dialog here')"
          ><Icon name="lucide:share-2" class="size-4" />Share</UiButton
        >
        <UiButton @click="useSonner.info('Open your new task form here')"
          ><Icon name="lucide:plus" class="size-4" />New task</UiButton
        >
      </div>
    </div>

    <dl class="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
      <div v-for="stat in stats" :key="stat.label" class="rounded-xl border p-4">
        <dt class="text-muted-foreground flex items-center gap-2 text-sm">
          <Icon :name="stat.icon" class="size-4" />{{ stat.label }}
        </dt>
        <dd class="mt-2 text-3xl font-bold tabular-nums" :class="stat.tone">{{ stat.value }}</dd>
      </div>
    </dl>

    <div class="mt-6 rounded-xl border p-4">
      <div class="flex items-center justify-between text-sm">
        <span class="font-medium">Overall progress</span>
        <span class="text-muted-foreground">{{ percent }}% · {{ project.daysLeft }} days left</span>
      </div>
      <UiProgress :model-value="percent" class="mt-3 h-2" aria-label="Overall progress" />
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Project = {
    name: string;
    status: string;
    description: string;
    daysLeft: number;
    tasks: { total: number; done: number; overdue: number };
    team: { name: string; avatar: string }[];
  };

  const props = withDefaults(
    defineProps<{
      project?: Project;
    }>(),
    {
      project: () => ({
        name: "Website relaunch",
        status: "On track",
        description:
          "A complete redesign of the marketing site with a faster build, new pricing and a content refresh.",
        daysLeft: 38,
        tasks: { total: 64, done: 41, overdue: 3 },
        team: [
          { name: "Sofia", avatar: "https://i.pravatar.cc/80?img=32" },
          { name: "Liam", avatar: "https://i.pravatar.cc/80?img=12" },
          { name: "Aisha", avatar: "https://i.pravatar.cc/80?img=44" },
          { name: "Noah", avatar: "https://i.pravatar.cc/80?img=15" },
          { name: "Maya", avatar: "https://i.pravatar.cc/80?img=45" },
        ],
      }),
    }
  );

  const percent = computed(() =>
    Math.round((props.project.tasks.done / props.project.tasks.total) * 100)
  );

  const stats = computed(() => [
    {
      label: "Total tasks",
      value: props.project.tasks.total,
      icon: "lucide:list-checks",
      tone: "",
    },
    {
      label: "Completed",
      value: props.project.tasks.done,
      icon: "lucide:circle-check",
      tone: "text-green-600 dark:text-green-400",
    },
    {
      label: "In progress",
      value: props.project.tasks.total - props.project.tasks.done - props.project.tasks.overdue,
      icon: "lucide:loader",
      tone: "",
    },
    {
      label: "Overdue",
      value: props.project.tasks.overdue,
      icon: "lucide:alarm-clock",
      tone: "text-red-600 dark:text-red-400",
    },
  ]);
</script>
