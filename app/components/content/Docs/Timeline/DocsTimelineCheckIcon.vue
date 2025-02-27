<template>
  <UiTimeline :model-value="3">
    <UiTimelineItem
      v-for="item in items"
      :key="item.id"
      :step="item.id"
      class="group-data-[orientation=vertical]/timeline:ms-10"
    >
      <UiTimelineHeader>
        <UiTimelineSeparator
          class="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-[1.625rem]"
        />
        <UiTimelineDate>{{ item.date }}</UiTimelineDate>
        <UiTimelineTitle>{{ item.title }}</UiTimelineTitle>
        <UiTimelineIndicator
          class="flex size-6 items-center justify-center group-data-[orientation=vertical]/timeline:-left-7 group-data-[completed=true]/timeline-item:border-none group-data-[completed=true]/timeline-item:bg-primary group-data-[completed=true]/timeline-item:text-primary-foreground"
        >
          <Icon
            name="lucide:check"
            class="size-4 group-data-[completed=false]/timeline-item:hidden"
          />
        </UiTimelineIndicator>
      </UiTimelineHeader>
      <UiTimelineContent>{{ item.description }}</UiTimelineContent>
    </UiTimelineItem>
  </UiTimeline>
</template>

<script lang="ts" setup>
  const items = [
    {
      id: 1,
      date: "Mar 15, 2024",
      title: "Project Kickoff",
      description:
        "Initial team meeting and project scope definition. Established key milestones and resource allocation.",
    },
    {
      id: 2,
      date: "Mar 22, 2024",
      title: "Design Phase",
      description:
        "Completed wireframes and user interface mockups. Stakeholder review and feedback incorporated.",
    },
    {
      id: 3,
      date: "Apr 5, 2024",
      title: "Development Sprint",
      description: "Backend API implementation and frontend component development in progress.",
    },
    {
      id: 4,
      date: "Apr 19, 2024",
      title: "Testing & Deployment",
      description:
        "Quality assurance testing, performance optimization, and production deployment preparation.",
    },
  ];
</script>
