<template>
  <!--
    Hero with a tabbed product tour
    Features: Centered headline, three tabs that swap a preview panel with a smooth transition, each panel built from interface pieces, keyboard friendly tabs
  -->
  <section class="relative overflow-hidden">
    <div
      class="from-primary/10 pointer-events-none absolute inset-x-0 top-0 h-80 bg-linear-to-b to-transparent"
      aria-hidden="true"
    />
    <UiContainer class="relative py-16 text-center lg:py-24">
      <Motion
        class="mx-auto max-w-3xl"
        :initial="{ opacity: 0, y: 16 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ type: 'spring', stiffness: 140, damping: 22 }"
      >
        <h1 class="text-4xl font-bold tracking-tight text-balance sm:text-6xl">
          {{ props.title }}
        </h1>
        <p class="text-muted-foreground mx-auto mt-6 max-w-2xl text-lg text-balance">
          {{ props.description }}
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
          <UiButton size="lg">Try it free</UiButton>
          <UiButton size="lg" variant="outline">Compare plans</UiButton>
        </div>
      </Motion>

      <UiTabs v-model="tab" class="mx-auto mt-14 max-w-4xl">
        <UiTabsList class="mx-auto grid w-full max-w-md grid-cols-3">
          <UiTabsTrigger v-for="item in tabs" :key="item.value" :value="item.value" class="gap-2">
            <Icon :name="item.icon" class="size-4" />
            {{ item.label }}
          </UiTabsTrigger>
        </UiTabsList>

        <div
          class="bg-card mt-6 min-h-80 overflow-hidden rounded-2xl border p-6 text-left shadow-xl"
        >
          <UiTabsContent v-for="item in tabs" :key="item.value" :value="item.value" class="mt-0">
            <div class="grid items-center gap-8 md:grid-cols-[1fr_1.2fr]">
              <div>
                <UiFancyIcon :icon="item.icon" theme="gradient" :color="item.color" size="lg" />
                <h2 class="mt-5 text-2xl font-bold tracking-tight">{{ item.heading }}</h2>
                <p class="text-muted-foreground mt-2">{{ item.text }}</p>
                <ul class="mt-5 space-y-2">
                  <li
                    v-for="point in item.points"
                    :key="point"
                    class="flex items-center gap-2 text-sm"
                  >
                    <Icon name="lucide:check" class="text-primary size-4" />
                    {{ point }}
                  </li>
                </ul>
              </div>
              <div class="bg-muted/40 space-y-2.5 rounded-xl border p-4" aria-hidden="true">
                <div
                  v-for="row in item.rows"
                  :key="row.label"
                  class="bg-card flex items-center gap-3 rounded-lg border p-3 shadow-xs"
                >
                  <span
                    class="flex size-8 items-center justify-center rounded-md"
                    :class="row.tone"
                  >
                    <Icon :name="row.icon" class="size-4" />
                  </span>
                  <span class="flex-1 text-sm font-medium">{{ row.label }}</span>
                  <span class="text-muted-foreground text-xs tabular-nums">{{ row.value }}</span>
                </div>
              </div>
            </div>
          </UiTabsContent>
        </div>
      </UiTabs>
    </UiContainer>
  </section>
</template>

<script lang="ts" setup>
  type Color = "primary" | "gray" | "error" | "warning" | "success" | "info";

  const props = withDefaults(defineProps<{ title?: string; description?: string }>(), {
    title: "One platform for planning, building and shipping",
    description: "Pick a tab to see how each part of the product fits into your day.",
  });

  const tabs: {
    value: string;
    label: string;
    icon: string;
    color: Color;
    heading: string;
    text: string;
    points: string[];
    rows: { label: string; value: string; icon: string; tone: string }[];
  }[] = [
    {
      value: "plan",
      label: "Plan",
      icon: "lucide:map",
      color: "info",
      heading: "Roadmaps that stay honest",
      text: "Turn goals into scoped work and see how it fits the calendar.",
      points: ["Drag and drop timelines", "Dependencies and milestones", "Shareable views"],
      rows: [
        {
          label: "Q4 launch",
          value: "Oct 12",
          icon: "lucide:flag",
          tone: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
        },
        {
          label: "Pricing revamp",
          value: "Nov 3",
          icon: "lucide:tag",
          tone: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
        },
        {
          label: "Mobile beta",
          value: "Nov 28",
          icon: "lucide:smartphone",
          tone: "bg-pink-500/15 text-pink-600 dark:text-pink-400",
        },
      ],
    },
    {
      value: "build",
      label: "Build",
      icon: "lucide:hammer",
      color: "warning",
      heading: "Work that moves itself",
      text: "Boards, automations and reviews that keep everyone unblocked.",
      points: ["Automated handoffs", "Inline reviews", "Git and CI integrations"],
      rows: [
        {
          label: "Review: billing page",
          value: "2 comments",
          icon: "lucide:message-square",
          tone: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
        },
        {
          label: "Deploy preview",
          value: "Ready",
          icon: "lucide:rocket",
          tone: "bg-green-500/15 text-green-600 dark:text-green-400",
        },
        {
          label: "Fix flaky test",
          value: "In progress",
          icon: "lucide:bug",
          tone: "bg-red-500/15 text-red-600 dark:text-red-400",
        },
      ],
    },
    {
      value: "measure",
      label: "Measure",
      icon: "lucide:chart-line",
      color: "success",
      heading: "Numbers you can act on",
      text: "Dashboards that explain what changed and why it matters.",
      points: ["Live dashboards", "Scheduled reports", "Anomaly alerts"],
      rows: [
        {
          label: "Weekly active users",
          value: "24.8k",
          icon: "lucide:users",
          tone: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
        },
        {
          label: "Conversion rate",
          value: "3.24%",
          icon: "lucide:target",
          tone: "bg-green-500/15 text-green-600 dark:text-green-400",
        },
        {
          label: "Churn",
          value: "1.9%",
          icon: "lucide:user-minus",
          tone: "bg-red-500/15 text-red-600 dark:text-red-400",
        },
      ],
    },
  ];

  const tab = ref("plan");
</script>
