<template>
  <div>
    <UiTimeline :model-value="3">
      <UiTimelineItem
        v-for="item in items"
        :key="item.id"
        :step="item.id"
        class="w-[calc(50%-1.5rem)] odd:!ml-auto odd:ms-auto even:text-right even:group-data-[orientation=vertical]/timeline:me-8 even:group-data-[orientation=vertical]/timeline:ms-0 [&_[data-slot=timeline-indicator]]:group-data-[orientation=vertical]/timeline:even:-right-6 [&_[data-slot=timeline-indicator]]:group-data-[orientation=vertical]/timeline:even:left-auto [&_[data-slot=timeline-indicator]]:group-data-[orientation=vertical]/timeline:even:translate-x-1/2 [&_[data-slot=timeline-separator]]:group-data-[orientation=vertical]/timeline:even:-right-6 [&_[data-slot=timeline-separator]]:group-data-[orientation=vertical]/timeline:even:left-auto [&_[data-slot=timeline-separator]]:group-data-[orientation=vertical]/timeline:even:translate-x-1/2"
      >
        <UiTimelineHeader>
          <UiTimelineSeparator />
          <UiTimelineDate>{{ item.date }}</UiTimelineDate>
          <UiTimelineTitle>{{ item.title }}</UiTimelineTitle>
          <UiTimelineIndicator />
        </UiTimelineHeader>
      </UiTimelineItem>
    </UiTimeline>
  </div>
</template>

<script lang="ts" setup>
  const items = [
    { id: 1, date: "Mar 15, 2024", title: "Project Kickoff" },
    { id: 2, date: "Mar 22, 2024", title: "Design Phase" },
    { id: 3, date: "Apr 5, 2024", title: "Development Sprint" },
    { id: 4, date: "Apr 19, 2024", title: "Testing & Deployment" },
    { id: 5, date: "May 3, 2024", title: "User Training" },
    { id: 6, date: "May 17, 2024", title: "Project Handover" },
  ];
</script>
