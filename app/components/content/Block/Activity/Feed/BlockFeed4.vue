<template>
  <!--
    Timeline feed grouped by date
    Features: A vertical line with colored markers, date headings, a title and details for each event, an optional status badge and a reverse order toggle
  -->
  <UiContainer class="py-12 lg:py-20">
    <div class="mx-auto max-w-2xl">
      <div class="flex items-center justify-between gap-3">
        <h1 class="text-2xl font-bold tracking-tight">Project timeline</h1>
        <UiButton
          variant="outline"
          size="sm"
          :aria-pressed="oldestFirst"
          @click="oldestFirst = !oldestFirst"
          ><Icon name="lucide:arrow-up-down" class="size-4" />{{
            oldestFirst ? "Oldest first" : "Newest first"
          }}</UiButton
        >
      </div>

      <div class="mt-8 space-y-8" aria-live="polite">
        <section v-for="group in groups" :key="group.date" :aria-label="group.label">
          <h2 class="text-muted-foreground mb-4 text-xs font-semibold tracking-wide uppercase">
            {{ group.label }}
          </h2>
          <ol class="border-border ml-3 space-y-6 border-l">
            <li v-for="item in group.items" :key="item.id" class="relative pl-8">
              <span
                class="ring-background absolute top-1 -left-[0.5625rem] size-[1.125rem] rounded-full ring-4"
                :class="dots[item.tone]"
                aria-hidden="true"
              />
              <div class="flex flex-wrap items-center gap-2">
                <p class="text-sm font-medium">{{ item.title }}</p>
                <UiBadge v-if="item.status" variant="soft" shape="pill" :color="item.tone">{{
                  item.status
                }}</UiBadge>
                <span class="text-muted-foreground ml-auto text-xs">{{ item.time }}</span>
              </div>
              <p class="text-muted-foreground mt-1 text-sm">{{ item.detail }}</p>
            </li>
          </ol>
        </section>
      </div>
    </div>
  </UiContainer>
</template>

<script lang="ts" setup>
  type Tone = "blue" | "green" | "amber" | "red";
  type Item = {
    id: string;
    date: string;
    time: string;
    title: string;
    detail: string;
    tone: Tone;
    status?: string;
  };

  const props = withDefaults(
    defineProps<{
      items?: Item[];
    }>(),
    {
      items: () => [
        {
          id: "t1",
          date: "2026-10-18",
          time: "10:02 AM",
          title: "Design handoff",
          detail: "Final screens were shared with engineering.",
          tone: "blue",
          status: "In review",
        },
        {
          id: "t2",
          date: "2026-10-18",
          time: "8:10 AM",
          title: "Release 2.4 shipped",
          detail: "Deployed to production with no errors.",
          tone: "green",
          status: "Shipped",
        },
        {
          id: "t3",
          date: "2026-10-17",
          time: "4:45 PM",
          title: "Build failed on staging",
          detail: "A missing environment variable stopped the deploy. Fixed in the next commit.",
          tone: "red",
          status: "Failed",
        },
        {
          id: "t4",
          date: "2026-10-17",
          time: "11:00 AM",
          title: "Scope change approved",
          detail: "The reporting module moved to the next quarter.",
          tone: "amber",
        },
        {
          id: "t5",
          date: "2026-10-15",
          time: "9:00 AM",
          title: "Kickoff meeting",
          detail: "Goals, owners and the schedule were agreed.",
          tone: "blue",
        },
      ],
    }
  );

  const dots: Record<Tone, string> = {
    blue: "bg-blue-500",
    green: "bg-green-500",
    amber: "bg-amber-500",
    red: "bg-red-500",
  };

  const oldestFirst = ref(false);

  const groups = computed(() => {
    const dates = [...new Set(props.items.map((item) => item.date))].sort();
    if (!oldestFirst.value) dates.reverse();
    return dates.map((date) => {
      const items = props.items.filter((item) => item.date === date);
      return {
        date,
        label: new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          timeZone: "UTC",
        }),
        items: oldestFirst.value ? [...items].reverse() : items,
      };
    });
  });
</script>
