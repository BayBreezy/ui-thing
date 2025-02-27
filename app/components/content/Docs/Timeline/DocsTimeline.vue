<template>
  <div class="flex justify-center">
    <UiTimeline :model-value="3">
      <template v-for="(item, i) of items" :key="i">
        <UiTimelineItem :step="item.id">
          <UiTimelineHeader>
            <UiTimelineSeparator />
            <UiTimelineTitle class="-mt-0.5">{{ item.title }}</UiTimelineTitle>
            <UiTimelineIndicator />
          </UiTimelineHeader>
        </UiTimelineItem>
      </template>
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
