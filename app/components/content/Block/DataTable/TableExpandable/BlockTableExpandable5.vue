<template>
  <!--
    Table loading, empty and error states
    Features: Skeleton rows while loading, a friendly empty state with an action, an error state with retry, a state switcher for previewing each one and a busy table for screen readers
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>
        <p class="text-muted-foreground mt-2">{{ description }}</p>
      </div>
      <UiToggleGroup
        v-model="state"
        type="single"
        variant="outline"
        size="sm"
        aria-label="Preview state"
      >
        <UiToggleGroupItem v-for="item in states" :key="item" :value="item" class="px-3 capitalize">
          {{ item }}
        </UiToggleGroupItem>
      </UiToggleGroup>
    </div>

    <div class="mt-8 overflow-hidden rounded-xl border">
      <UiTable :aria-busy="state === 'loading'">
        <UiTableHeader>
          <UiTableRow>
            <UiTableHead>Project</UiTableHead>
            <UiTableHead class="hidden sm:table-cell">Owner</UiTableHead>
            <UiTableHead>Status</UiTableHead>
            <UiTableHead class="text-right">Updated</UiTableHead>
          </UiTableRow>
        </UiTableHeader>
        <UiTableBody>
          <template v-if="state === 'loading'">
            <UiTableRow v-for="row in 4" :key="row" aria-hidden="true">
              <UiTableCell><UiSkeleton class="h-4 w-40" /></UiTableCell>
              <UiTableCell class="hidden sm:table-cell"
                ><UiSkeleton class="h-4 w-24"
              /></UiTableCell>
              <UiTableCell><UiSkeleton class="h-5 w-16 rounded-full" /></UiTableCell>
              <UiTableCell class="text-right"><UiSkeleton class="ml-auto h-4 w-16" /></UiTableCell>
            </UiTableRow>
          </template>
          <template v-else-if="state === 'data'">
            <UiTableRow v-for="project in projects" :key="project.name">
              <UiTableCell class="font-medium">{{ project.name }}</UiTableCell>
              <UiTableCell class="hidden sm:table-cell">{{ project.owner }}</UiTableCell>
              <UiTableCell>
                <UiBadge
                  variant="soft"
                  :color="project.status === 'Live' ? 'green' : 'amber'"
                  shape="pill"
                >
                  {{ project.status }}
                </UiBadge>
              </UiTableCell>
              <UiTableCell class="text-muted-foreground text-right">{{
                project.updated
              }}</UiTableCell>
            </UiTableRow>
          </template>
          <UiTableRow v-else class="hover:bg-transparent">
            <UiTableCell colspan="4" class="py-12">
              <div class="mx-auto flex max-w-sm flex-col items-center text-center" role="status">
                <span class="bg-muted mb-4 grid size-12 place-items-center rounded-full">
                  <Icon
                    :name="state === 'error' ? 'lucide:triangle-alert' : 'lucide:folder-open'"
                    class="size-6"
                    :class="state === 'error' ? 'text-destructive' : 'text-muted-foreground'"
                  />
                </span>
                <h2 class="font-semibold">
                  {{ state === "error" ? "We could not load your projects" : "No projects yet" }}
                </h2>
                <p class="text-muted-foreground mt-1 text-sm text-balance">
                  {{
                    state === "error"
                      ? "Something went wrong on our side. Check your connection and try again."
                      : "Create your first project to start tracking work here."
                  }}
                </p>
                <UiButton
                  class="mt-4"
                  size="sm"
                  @click="state = state === 'error' ? 'loading' : 'data'"
                >
                  <Icon
                    :name="state === 'error' ? 'lucide:rotate-ccw' : 'lucide:plus'"
                    class="size-4"
                  />
                  {{ state === "error" ? "Try again" : "New project" }}
                </UiButton>
              </div>
            </UiTableCell>
          </UiTableRow>
        </UiTableBody>
      </UiTable>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type State = "loading" | "data" | "empty" | "error";

  type Project = { name: string; owner: string; status: "Live" | "Draft"; updated: string };

  withDefaults(
    defineProps<{
      title?: string;
      description?: string;
      projects?: Project[];
    }>(),
    {
      title: "Projects",
      description: "Every table needs a plan for loading, empty and error states.",
      projects: () => [
        { name: "Marketing site", owner: "Sofia Alvarez", status: "Live", updated: "2 hours ago" },
        { name: "Customer portal", owner: "Liam Carter", status: "Draft", updated: "Yesterday" },
        { name: "Mobile app", owner: "Noah Williams", status: "Live", updated: "3 days ago" },
      ],
    }
  );

  const states: State[] = ["loading", "data", "empty", "error"];
  const state = ref<State>("data");
</script>
