<template>
  <!--
    Progress cards for several projects
    Features: Cards with circular progress, project name, task counts, due date, health badge, team avatars and a menu, sorted by health or progress with a select
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>
      <UiSelect v-model="sort">
        <UiSelectTrigger class="sm:w-44" aria-label="Sort projects"
          ><UiSelectValue
        /></UiSelectTrigger>
        <UiSelectContent>
          <UiSelectItem value="progress">Sort by progress</UiSelectItem>
          <UiSelectItem value="due">Sort by due date</UiSelectItem>
          <UiSelectItem value="name">Sort by name</UiSelectItem>
        </UiSelectContent>
      </UiSelect>
    </div>

    <ul class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="project in sorted" :key="project.name">
        <UiCard class="h-full">
          <UiCardHeader>
            <div class="flex items-start gap-4">
              <UiCircularProgress
                :progress="project.progress / 100"
                size="lg"
                show-value
                :aria-label="`${project.name} progress`"
              />
              <div class="min-w-0 flex-1">
                <UiCardTitle class="truncate text-base">{{ project.name }}</UiCardTitle>
                <UiCardDescription
                  >{{ project.done }} of {{ project.total }} tasks</UiCardDescription
                >
              </div>
              <UiDropdownMenu>
                <UiDropdownMenuTrigger as-child>
                  <UiButton
                    variant="ghost"
                    size="icon-sm"
                    :aria-label="`Options for ${project.name}`"
                    ><Icon name="lucide:ellipsis" class="size-4"
                  /></UiButton>
                </UiDropdownMenuTrigger>
                <UiDropdownMenuContent align="end">
                  <UiDropdownMenuItem @select="useSonner.info(`Opening ${project.name}`)"
                    >Open</UiDropdownMenuItem
                  >
                  <UiDropdownMenuItem @select="useSonner.info(`Archived ${project.name}`)"
                    >Archive</UiDropdownMenuItem
                  >
                </UiDropdownMenuContent>
              </UiDropdownMenu>
            </div>
          </UiCardHeader>
          <UiCardFooter class="flex-wrap items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              <UiBadge variant="soft" :color="health[project.health]" shape="pill">{{
                project.health
              }}</UiBadge>
              <span class="text-muted-foreground text-xs">Due {{ project.due }}</span>
            </div>
            <div class="flex -space-x-1.5">
              <UiAvatar
                v-for="person in project.team"
                :key="person"
                :src="`https://i.pravatar.cc/80?img=${person}`"
                fallback="?"
                class="ring-card size-6 ring-2"
              />
            </div>
          </UiCardFooter>
        </UiCard>
      </li>
    </ul>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Project = {
    name: string;
    done: number;
    total: number;
    progress: number;
    due: string;
    health: "On track" | "At risk" | "Late";
    team: number[];
  };

  const props = withDefaults(
    defineProps<{
      title?: string;
      projects?: Project[];
    }>(),
    {
      title: "Projects",
      projects: () => [
        {
          name: "Website relaunch",
          done: 41,
          total: 64,
          progress: 64,
          due: "Nov 30",
          health: "On track",
          team: [32, 12, 44],
        },
        {
          name: "Mobile app v2",
          done: 18,
          total: 80,
          progress: 23,
          due: "Dec 15",
          health: "At risk",
          team: [15, 45],
        },
        {
          name: "Billing migration",
          done: 27,
          total: 30,
          progress: 90,
          due: "Nov 12",
          health: "On track",
          team: [12, 33],
        },
        {
          name: "Brand refresh",
          done: 9,
          total: 40,
          progress: 22,
          due: "Oct 20",
          health: "Late",
          team: [44, 32, 45],
        },
        {
          name: "Data warehouse",
          done: 35,
          total: 70,
          progress: 50,
          due: "Jan 31",
          health: "On track",
          team: [15],
        },
        {
          name: "Customer portal",
          done: 12,
          total: 36,
          progress: 33,
          due: "Dec 02",
          health: "At risk",
          team: [12, 44, 33, 15],
        },
      ],
    }
  );

  const health = { "On track": "green", "At risk": "amber", Late: "red" } as const;
  const sort = ref("progress");

  const dueOrder = (value: string) => new Date(`${value} 2026`).getTime();

  const sorted = computed(() => {
    const list = [...props.projects];
    if (sort.value === "name") return list.sort((a, b) => a.name.localeCompare(b.name));
    if (sort.value === "due") return list.sort((a, b) => dueOrder(a.due) - dueOrder(b.due));
    return list.sort((a, b) => b.progress - a.progress);
  });
</script>
