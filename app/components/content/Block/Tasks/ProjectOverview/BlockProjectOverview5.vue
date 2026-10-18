<template>
  <!--
    Project grid with search and status filter
    Features: Search field, status tabs with counts, project cards with color tile, description, progress and members, favorite stars you can toggle and an empty state
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>
      <div class="relative sm:w-64">
        <UiLabel for="po5-search" class="sr-only">Search projects</UiLabel>
        <Icon
          name="lucide:search"
          class="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2"
        />
        <UiInput id="po5-search" v-model="query" placeholder="Search projects" class="pl-9" />
      </div>
    </div>

    <UiTabs v-model="tab" class="mt-6">
      <UiTabsList>
        <UiTabsTrigger v-for="item in tabs" :key="item" :value="item" class="capitalize"
          >{{ item
          }}<UiBadge variant="secondary" class="ml-1.5">{{ count(item) }}</UiBadge></UiTabsTrigger
        >
      </UiTabsList>
    </UiTabs>

    <ul v-if="rows.length" class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <li
        v-for="project in rows"
        :key="project.id"
        class="relative rounded-xl border p-4 transition hover:shadow-md"
      >
        <div class="flex items-start gap-3">
          <span
            class="grid size-10 shrink-0 place-items-center rounded-lg text-white"
            :class="project.color"
            ><Icon :name="project.icon" class="size-5"
          /></span>
          <div class="min-w-0 flex-1">
            <h2 class="truncate font-semibold">{{ project.name }}</h2>
            <p class="text-muted-foreground line-clamp-2 text-sm">{{ project.description }}</p>
          </div>
          <UiButton
            variant="ghost"
            size="icon-sm"
            :aria-pressed="project.favorite"
            :aria-label="
              project.favorite
                ? `Remove ${project.name} from favorites`
                : `Add ${project.name} to favorites`
            "
            @click="project.favorite = !project.favorite"
          >
            <Icon
              name="lucide:star"
              class="size-4"
              :class="project.favorite ? 'fill-amber-400 text-amber-500' : ''"
            />
          </UiButton>
        </div>
        <div class="mt-4">
          <div class="text-muted-foreground mb-1.5 flex justify-between text-xs">
            <span class="capitalize">{{ project.status }}</span
            ><span>{{ project.progress }}%</span>
          </div>
          <UiProgress
            :model-value="project.progress"
            class="h-1.5"
            :aria-label="`${project.name} progress`"
          />
        </div>
        <div class="mt-4 flex -space-x-1.5">
          <UiAvatar
            v-for="person in project.team"
            :key="person"
            :src="`https://i.pravatar.cc/80?img=${person}`"
            fallback="?"
            class="ring-card size-6 ring-2"
          />
        </div>
      </li>
    </ul>
    <p
      v-else
      class="text-muted-foreground mt-6 rounded-xl border border-dashed py-12 text-center text-sm"
      role="status"
    >
      No projects match your search.
    </p>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Project = {
    id: string;
    name: string;
    description: string;
    status: "active" | "paused" | "completed";
    progress: number;
    color: string;
    icon: string;
    team: number[];
    favorite: boolean;
  };

  const props = withDefaults(
    defineProps<{
      title?: string;
      initial?: Project[];
    }>(),
    {
      title: "All projects",
      initial: () => [
        {
          id: "p1",
          name: "Website relaunch",
          description: "New marketing site with faster builds and pricing.",
          status: "active",
          progress: 64,
          color: "bg-indigo-500",
          icon: "lucide:globe",
          team: [32, 12, 44],
          favorite: true,
        },
        {
          id: "p2",
          name: "Mobile app v2",
          description: "Offline mode, push notifications and a refreshed design.",
          status: "active",
          progress: 23,
          color: "bg-emerald-500",
          icon: "lucide:smartphone",
          team: [15, 45],
          favorite: false,
        },
        {
          id: "p3",
          name: "Billing migration",
          description: "Move subscriptions to the new payment provider.",
          status: "active",
          progress: 90,
          color: "bg-amber-500",
          icon: "lucide:credit-card",
          team: [12, 33],
          favorite: false,
        },
        {
          id: "p4",
          name: "Brand refresh",
          description: "Updated logo, colors and brand guidelines.",
          status: "paused",
          progress: 22,
          color: "bg-rose-500",
          icon: "lucide:palette",
          team: [44, 32],
          favorite: false,
        },
        {
          id: "p5",
          name: "Help center",
          description: "Rewrite and reorganize all support articles.",
          status: "completed",
          progress: 100,
          color: "bg-sky-500",
          icon: "lucide:life-buoy",
          team: [45],
          favorite: true,
        },
      ],
    }
  );

  const tabs = ["all", "active", "paused", "completed"];

  const projects = ref<Project[]>(
    props.initial.map((project) => ({ ...project, team: [...project.team] }))
  );
  const query = ref("");
  const tab = ref("all");

  const count = (status: string) =>
    projects.value.filter((project) => status === "all" || project.status === status).length;
  const rows = computed(() => {
    const term = query.value.trim().toLowerCase();
    return projects.value.filter(
      (project) =>
        (tab.value === "all" || project.status === tab.value) &&
        (!term ||
          project.name.toLowerCase().includes(term) ||
          project.description.toLowerCase().includes(term))
    );
  });
</script>
