<template>
  <div>
    <UiTimeline :model-value="3">
      <UiTimelineItem v-for="item in items" :key="item.id" :step="item.id">
        <UiTimelineHeader>
          <UiTimelineSeparator />
          <UiTimelineTitle class="-mt-0.5">{{ item.title }}</UiTimelineTitle>
          <UiTimelineIndicator />
        </UiTimelineHeader>
        <UiTimelineContent>
          {{ item.description }}
          <UiTimelineDate class="mb-0 mt-2">{{ item.date }}</UiTimelineDate>
        </UiTimelineContent>
      </UiTimelineItem>
    </UiTimeline>
  </div>
</template>

<script lang="ts" setup>
  const items = [
    {
      id: 1,
      date: "15 minutes ago",
      title: "Pull Request Submitted",
      description:
        "Submitted PR #342 with new feature implementation. Waiting for code review from team leads.",
    },
    {
      id: 2,
      date: "10 minutes ago",
      title: "CI Pipeline Started",
      description:
        "Automated tests and build process initiated. Running unit tests and code quality checks.",
    },
    {
      id: 3,
      date: "5 minutes ago",
      title: "Code Review Feedback",
      description:
        "Received comments on PR. Minor adjustments needed in error handling and documentation.",
    },
    {
      id: 4,
      title: "Changes Pushed",
      description:
        "Implemented requested changes and pushed updates to feature branch. Awaiting final approval.",
    },
  ];
</script>
