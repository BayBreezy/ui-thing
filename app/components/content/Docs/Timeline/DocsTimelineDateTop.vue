<template>
  <div>
    <UiTimeline :model-value="3">
      <UiTimelineItem v-for="item in items" :key="item.id" :step="item.id">
        <UiTimelineHeader>
          <UiTimelineSeparator />
          <UiTimelineDate>{{ item.date }}</UiTimelineDate>
          <UiTimelineTitle>{{ item.title }}</UiTimelineTitle>
          <UiTimelineIndicator />
        </UiTimelineHeader>
        <UiTimelineContent>{{ item.description }}</UiTimelineContent>
      </UiTimelineItem>
    </UiTimeline>
  </div>
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
