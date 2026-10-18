<template>
  <!--
    Team workload overview
    Features: Capacity bars for every team member, over capacity warning color, open task counts, hours estimate, toggle between this week and next week and a summary of the team load
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-3xl">
      <div class="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>
          <p class="text-muted-foreground mt-1 text-sm" aria-live="polite">
            Team load {{ teamLoad }}% · {{ over }} over capacity
          </p>
        </div>
        <UiToggleGroup v-model="week" type="single" variant="outline" aria-label="Week">
          <UiToggleGroupItem value="this">This week</UiToggleGroupItem>
          <UiToggleGroupItem value="next">Next week</UiToggleGroupItem>
        </UiToggleGroup>
      </div>

      <ul class="mt-8 divide-y rounded-xl border">
        <li
          v-for="person in rows"
          :key="person.name"
          class="flex flex-col gap-3 p-4 sm:flex-row sm:items-center"
        >
          <div class="flex items-center gap-3 sm:w-48">
            <UiAvatar :src="person.avatar" :fallback="person.name[0]" />
            <div>
              <p class="text-sm font-medium">{{ person.name }}</p>
              <p class="text-muted-foreground text-xs">{{ person.role }}</p>
            </div>
          </div>
          <div class="flex-1">
            <div
              class="bg-muted h-2.5 overflow-hidden rounded-full"
              role="img"
              :aria-label="`${person.name}: ${person.hours} of ${person.capacity} hours`"
            >
              <div
                class="h-full rounded-full transition-all motion-reduce:transition-none"
                :class="
                  person.hours > person.capacity
                    ? 'bg-red-500'
                    : person.hours / person.capacity > 0.85
                      ? 'bg-amber-500'
                      : 'bg-primary'
                "
                :style="{ width: `${Math.min(100, (person.hours / person.capacity) * 100)}%` }"
              />
            </div>
          </div>
          <div class="flex items-center gap-3 text-sm sm:w-44 sm:justify-end">
            <span
              class="tabular-nums"
              :class="
                person.hours > person.capacity ? 'font-semibold text-red-600 dark:text-red-400' : ''
              "
              >{{ person.hours }}/{{ person.capacity }}h</span
            >
            <UiBadge variant="secondary">{{ person.tasks }} tasks</UiBadge>
          </div>
        </li>
      </ul>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Person = {
    name: string;
    role: string;
    avatar: string;
    capacity: number;
    this: { hours: number; tasks: number };
    next: { hours: number; tasks: number };
  };

  const props = withDefaults(
    defineProps<{
      title?: string;
      people?: Person[];
    }>(),
    {
      title: "Team workload",
      people: () => [
        {
          name: "Sofia Alvarez",
          role: "Designer",
          avatar: "https://i.pravatar.cc/80?img=32",
          capacity: 40,
          this: { hours: 44, tasks: 9 },
          next: { hours: 32, tasks: 6 },
        },
        {
          name: "Liam Carter",
          role: "Engineer",
          avatar: "https://i.pravatar.cc/80?img=12",
          capacity: 40,
          this: { hours: 36, tasks: 7 },
          next: { hours: 38, tasks: 8 },
        },
        {
          name: "Aisha Khan",
          role: "Marketing",
          avatar: "https://i.pravatar.cc/80?img=44",
          capacity: 32,
          this: { hours: 20, tasks: 5 },
          next: { hours: 26, tasks: 6 },
        },
        {
          name: "Noah Williams",
          role: "Engineer",
          avatar: "https://i.pravatar.cc/80?img=15",
          capacity: 40,
          this: { hours: 41, tasks: 8 },
          next: { hours: 44, tasks: 10 },
        },
        {
          name: "Maya Chen",
          role: "Product",
          avatar: "https://i.pravatar.cc/80?img=45",
          capacity: 40,
          this: { hours: 28, tasks: 6 },
          next: { hours: 30, tasks: 6 },
        },
      ],
    }
  );

  const week = ref<"this" | "next">("this");

  const rows = computed(() =>
    props.people.map((person) => ({
      name: person.name,
      role: person.role,
      avatar: person.avatar,
      capacity: person.capacity,
      ...person[week.value || "this"],
    }))
  );
  const teamLoad = computed(() =>
    Math.round(
      (rows.value.reduce((sum, p) => sum + p.hours, 0) /
        rows.value.reduce((sum, p) => sum + p.capacity, 0)) *
        100
    )
  );
  const over = computed(() => rows.value.filter((person) => person.hours > person.capacity).length);
</script>
