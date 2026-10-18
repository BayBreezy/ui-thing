<template>
  <!--
    Filterable job board
    Features: Department, location and type filters with live result count, rows with salary range and posted date, clear filters action, empty state
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-4xl">
      <div class="text-center">
        <h2 class="text-3xl font-bold lg:text-4xl">Find your next role</h2>
        <p class="text-muted-foreground mx-auto mt-3 max-w-xl text-lg">
          Filter by team, location or contract type. Every role lists its salary range up front.
        </p>
      </div>

      <div class="mt-10 grid gap-3 sm:grid-cols-3">
        <UiSelect v-model="department">
          <UiSelectTrigger class="w-full" aria-label="Department"
            ><UiSelectValue
          /></UiSelectTrigger>
          <UiSelectContent>
            <UiSelectItem value="all">All departments</UiSelectItem>
            <UiSelectItem v-for="item in departments" :key="item" :value="item">{{
              item
            }}</UiSelectItem>
          </UiSelectContent>
        </UiSelect>
        <UiSelect v-model="location">
          <UiSelectTrigger class="w-full" aria-label="Location"><UiSelectValue /></UiSelectTrigger>
          <UiSelectContent>
            <UiSelectItem value="all">All locations</UiSelectItem>
            <UiSelectItem v-for="item in locations" :key="item" :value="item">{{
              item
            }}</UiSelectItem>
          </UiSelectContent>
        </UiSelect>
        <UiSelect v-model="type">
          <UiSelectTrigger class="w-full" aria-label="Employment type"
            ><UiSelectValue
          /></UiSelectTrigger>
          <UiSelectContent>
            <UiSelectItem value="all">All types</UiSelectItem>
            <UiSelectItem v-for="item in types" :key="item" :value="item">{{ item }}</UiSelectItem>
          </UiSelectContent>
        </UiSelect>
      </div>

      <div class="mt-6 flex items-center justify-between gap-3">
        <p class="text-muted-foreground text-sm" role="status">
          {{ filtered.length }} {{ filtered.length === 1 ? "open role" : "open roles" }}
        </p>
        <UiButton v-if="active" variant="ghost" size="sm" @click="clear">
          <Icon name="lucide:x" class="size-4" />Clear filters
        </UiButton>
      </div>

      <ul v-if="filtered.length" class="mt-3 divide-y rounded-xl border">
        <li
          v-for="job in filtered"
          :key="job.id"
          class="hover:bg-muted/50 flex flex-col gap-3 p-5 transition-colors sm:flex-row sm:items-center sm:justify-between"
        >
          <div class="min-w-0">
            <div class="flex flex-wrap items-center gap-2">
              <h3 class="font-semibold">{{ job.title }}</h3>
              <UiBadge variant="outline" size="sm">{{ job.department }}</UiBadge>
            </div>
            <ul class="text-muted-foreground mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
              <li class="flex items-center gap-1.5">
                <Icon name="lucide:map-pin" class="size-3.5" />{{ job.location }}
              </li>
              <li class="flex items-center gap-1.5">
                <Icon name="lucide:briefcase" class="size-3.5" />{{ job.type }}
              </li>
              <li class="flex items-center gap-1.5">
                <Icon name="lucide:banknote" class="size-3.5" />{{ job.salary }}
              </li>
              <li class="flex items-center gap-1.5">
                <Icon name="lucide:calendar" class="size-3.5" />Posted {{ job.posted }}
              </li>
            </ul>
          </div>
          <UiButton variant="outline" size="sm" class="shrink-0 self-start sm:self-center">
            View role<Icon name="lucide:arrow-right" class="size-4" />
          </UiButton>
        </li>
      </ul>

      <div v-else class="mt-3 rounded-xl border border-dashed p-10 text-center">
        <p class="font-medium">No roles match those filters</p>
        <p class="text-muted-foreground mt-1 text-sm">
          Try a different combination, or send us a note and we will keep you in mind.
        </p>
        <UiButton variant="outline" size="sm" class="mt-4" @click="clear">Clear filters</UiButton>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Job = {
    id: string;
    title: string;
    department: string;
    location: string;
    type: string;
    salary: string;
    posted: string;
  };

  const props = withDefaults(
    defineProps<{
      jobs?: Job[];
    }>(),
    {
      jobs: () => [
        {
          id: "1",
          title: "Senior Product Designer",
          department: "Design",
          location: "Remote (Europe)",
          type: "Full-time",
          salary: "$110k to $135k",
          posted: "2 days ago",
        },
        {
          id: "2",
          title: "Staff Frontend Engineer",
          department: "Engineering",
          location: "Remote (Americas)",
          type: "Full-time",
          salary: "$150k to $180k",
          posted: "4 days ago",
        },
        {
          id: "3",
          title: "Backend Engineer",
          department: "Engineering",
          location: "Remote (Europe)",
          type: "Full-time",
          salary: "$120k to $150k",
          posted: "1 week ago",
        },
        {
          id: "4",
          title: "Content Marketing Lead",
          department: "Marketing",
          location: "Remote (Americas)",
          type: "Part-time",
          salary: "$70k to $90k",
          posted: "1 week ago",
        },
        {
          id: "5",
          title: "Customer Success Manager",
          department: "Support",
          location: "Remote (Asia-Pacific)",
          type: "Full-time",
          salary: "$80k to $100k",
          posted: "2 weeks ago",
        },
        {
          id: "6",
          title: "Brand Design Contractor",
          department: "Design",
          location: "Remote (Europe)",
          type: "Contract",
          salary: "$65 to $85 per hour",
          posted: "3 weeks ago",
        },
      ],
    }
  );

  const department = ref("all");
  const location = ref("all");
  const type = ref("all");

  const unique = (pick: (job: Job) => string) => [...new Set(props.jobs.map(pick))];
  const departments = computed(() => unique((job) => job.department));
  const locations = computed(() => unique((job) => job.location));
  const types = computed(() => unique((job) => job.type));

  const active = computed(
    () => department.value !== "all" || location.value !== "all" || type.value !== "all"
  );

  const filtered = computed(() =>
    props.jobs.filter(
      (job) =>
        (department.value === "all" || job.department === department.value) &&
        (location.value === "all" || job.location === location.value) &&
        (type.value === "all" || job.type === type.value)
    )
  );

  function clear() {
    department.value = "all";
    location.value = "all";
    type.value = "all";
  }
</script>
