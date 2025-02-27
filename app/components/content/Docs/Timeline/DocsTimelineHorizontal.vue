<template>
  <div class="overflow-x-auto">
    <UiTimeline :model-value="3" orientation="horizontal">
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
      description: "Initial team meeting.",
    },
    {
      id: 2,
      date: "Mar 22, 2024",
      title: "Design Phase",
      description: "Completed wireframes.",
    },
    {
      id: 3,
      date: "Apr 5, 2024",
      title: "Development Sprint",
      description: "Backend development.",
    },
    {
      id: 4,
      date: "Apr 19, 2024",
      title: "Testing & Deployment",
      description: "Performance optimization.",
    },
  ];
</script>
