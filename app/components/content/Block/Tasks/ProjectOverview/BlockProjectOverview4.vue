<template>
  <!--
    Milestones timeline for a project
    Features: Vertical timeline with done, current and upcoming milestones, dates, owner avatars, task progress inside each milestone, the next milestone highlighted and a days remaining label
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-2xl">
      <h1 class="text-3xl font-bold tracking-tight">{{ title }}</h1>
      <p class="text-muted-foreground mt-1 text-sm">
        {{ doneCount }} of {{ milestones.length }} milestones reached
      </p>

      <ol class="relative mt-8 space-y-6 border-l pl-8">
        <li v-for="milestone in milestones" :key="milestone.name" class="relative">
          <span
            class="absolute top-1 -left-[43px] grid size-6 place-items-center rounded-full border-2"
            :class="
              milestone.status === 'done'
                ? 'border-green-500 bg-green-500 text-white'
                : milestone.status === 'current'
                  ? 'border-primary bg-background text-primary'
                  : 'bg-background text-muted-foreground'
            "
          >
            <Icon
              :name="
                milestone.status === 'done'
                  ? 'lucide:check'
                  : milestone.status === 'current'
                    ? 'lucide:flag'
                    : 'lucide:circle'
              "
              class="size-3.5"
            />
          </span>
          <div
            class="rounded-xl border p-4"
            :class="milestone.status === 'current' ? 'border-primary/50 bg-primary/5' : ''"
            :aria-current="milestone.status === 'current' ? 'step' : undefined"
          >
            <div class="flex flex-wrap items-center justify-between gap-2">
              <h2 class="font-semibold">{{ milestone.name }}</h2>
              <span class="text-muted-foreground text-xs"
                >{{ milestone.date
                }}<template v-if="milestone.status === 'current'">
                  · {{ milestone.daysLeft }} days left</template
                ></span
              >
            </div>
            <p class="text-muted-foreground mt-1 text-sm">{{ milestone.description }}</p>
            <div class="mt-3 flex items-center gap-3">
              <UiProgress
                :model-value="(milestone.done / milestone.total) * 100"
                class="h-1.5 flex-1"
                :aria-label="`${milestone.name} progress`"
              />
              <span class="text-muted-foreground text-xs tabular-nums"
                >{{ milestone.done }}/{{ milestone.total }}</span
              >
              <UiAvatar :src="milestone.owner" fallback="?" class="size-6" />
            </div>
          </div>
        </li>
      </ol>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Milestone = {
    name: string;
    description: string;
    date: string;
    status: "done" | "current" | "upcoming";
    done: number;
    total: number;
    owner: string;
    daysLeft?: number;
  };

  const props = withDefaults(
    defineProps<{
      title?: string;
      milestones?: Milestone[];
    }>(),
    {
      title: "Website relaunch milestones",
      milestones: () => [
        {
          name: "Kickoff",
          description: "Goals, scope and team agreed.",
          date: "Sep 12",
          status: "done",
          done: 8,
          total: 8,
          owner: "https://i.pravatar.cc/80?img=45",
        },
        {
          name: "Design approved",
          description: "Final designs signed off by stakeholders.",
          date: "Oct 05",
          status: "done",
          done: 14,
          total: 14,
          owner: "https://i.pravatar.cc/80?img=32",
        },
        {
          name: "Beta launch",
          description: "Invite 50 customers to try the new site.",
          date: "Oct 28",
          status: "current",
          done: 19,
          total: 26,
          owner: "https://i.pravatar.cc/80?img=12",
          daysLeft: 10,
        },
        {
          name: "Public launch",
          description: "Announce, redirect the old site and monitor.",
          date: "Nov 30",
          status: "upcoming",
          done: 0,
          total: 16,
          owner: "https://i.pravatar.cc/80?img=45",
        },
      ],
    }
  );

  const doneCount = computed(
    () => props.milestones.filter((milestone) => milestone.status === "done").length
  );
</script>
